<?php

Class History {

    private $object_id;
    private $history_data = array();         // массив истории для объекта
    private $history_events;                 // исторические события
    private $history_intervals;              // интервалы между событиями
    private $date_start, $date_end;          // начало и конец расчетного периода
    private $date_start_ymd, $date_end_ymd;  // начало и конец в строковом представлении
    private $date_created;                   // дата создания объекта
    private $date_modified;                  // дата модификации ишется ежедневно пока существует объект
    private $history_date_start, $history_date_end;  // начало и конец истории
    private $months;
    private $db;

    public function __construct($_object_id, $_date_start, $_date_end, $_db = '', $_history_data = array()) {
        //if ($_date_start)
        $this->date_start = new DateTime($_date_start);
        $this->date_end = new DateTime($_date_end);
        $this->date_start_ymd = $this->date_start->format("Y-m-d");
        $this->date_end_ymd = $this->date_end->format("Y-m-d");
        $this->months = $this->checkMonthInRange('first');
        $this->db = $_db;
        $this->object_id = $_object_id;
        if ($_history_data) {
            $this->history_data = $_history_data;
        } else {
            $this->history_data = $this->getObjectHistory($this->date_start < $this->date_end ? "ASC" : "DESC");
        }

        $this->date_created = new DateTime($this->history_data[0]['date_created']);
        $this->history_date_start = new DateTime($this->history_data[0]['date_changed']);
        $end_of_history = end($this->history_data);
        // Дата последней модификации
        $this->date_modified = new DateTime($end_of_history['date_modified']);
        // Дата последней записи в истории
        $this->history_date_end = new DateTime($end_of_history['date_changed']);
        reset($this->history_data);

        $this->history_events = $this->checkHistoryEvents();

        $this->history_intervals = $this->makeHistoryIntervals();
    }

    private function getObjectHistory($order = "DESC") {
        $sql = "SELECT ih.item_history_id, ih.item_id, ih.itemname, ih.item_status, ih.online, ih.wialon_group_off, ih.history_tarif_id, ih.history_discount_id,
                                i.date_created, i.date_modified, ih.date_changed,
                                ih.wialon_group_id, wg.wialon_groupname, wg.owner_id, wg.tarif_id AS tarif_group_id, wg.discount_id AS discount_group_id,
                                i.server_id, i.wialon_id, i.deleted, i.status, i.tarif_id, i.discount_id,
                                ih.tracker_uid, ih.tracker_hw, ih.sim1, ih.sim2,
                                (SELECT t.trackername FROM " . DB_PREFIX . "tracker t WHERE t.tracker_id = (SELECT tts.tracker_id FROM " . DB_PREFIX . "tracker_to_server tts WHERE i.server_id = tts.server_id AND ih.tracker_hw = tts.tracker_hw)) AS trackername,
                                (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE i.server_id = s.server_id) AS servername,
                                (SELECT o.ownername FROM " . DB_PREFIX . "owner o WHERE wg.owner_id = o.owner_id) AS ownername
                                FROM " . DB_PREFIX . "item_history ih
                                LEFT JOIN " . DB_PREFIX . "wialongroups wg ON (ih.wialon_group_id = wg.wialon_group_id)
                                LEFT JOIN " . DB_PREFIX . "item i ON (ih.item_id = i.item_id)";

        $sql .= " WHERE ih.item_id = '" . (int) $this->object_id . "'";
        $sql .= " AND i.date_modified >= '" . $this->date_start_ymd . "'";  // объект возможно удален раньш

        if ($this->date_start_ymd && $this->date_end_ymd) {
            $sql .= " AND ih.date_changed BETWEEN  '" . $this->date_start_ymd . "' AND  '" . $this->date_end_ymd . "'";
        }
        //$this->db = $this->registry->get('db');
        if ($this->db) {
            $query = $this->db->query($sql . " ORDER BY ih.date_changed " . $order);
            return $query->rows;
        } else {
            return array();
        }
    }

    // Catch history events and their names
    private function checkHistoryEvents() {
        if (!$this->history_data)
            return array();
        $events = array();
        // первое событие - это начало истории или создание объекта
        $this->history_data[0]['event_name'] = 'Начало истории';
        $events[] = $this->history_data[0];

        foreach ($this->months as $end_of_month) {
            // новый месяц
            if ($end_of_month >= $this->date_created && $end_of_month < $this->date_end) {
                // объект был создан раньше этого месяца и месяц попадает в расчетный период
                $next = current($this->history_data);
                while ($next != false && (new DateTime($next['date_changed'])) <= $end_of_month) {
                    // события внутри месяца
                    $current = current($this->history_data);
                    $next = next($this->history_data);
                    if ($next != false && (new DateTime($next['date_changed'])) <= $end_of_month) {
                        $diff = array_diff_assoc($next, $current);
                        $event_name = $this->getEventName($diff);
                        if ($event_name) {
                            $next['event_name'] = 'Изменение' . $event_name;
                            $events[] = $next;
                        }
                    }
                }
                if ($next) {
                    // конец месяца тоже событие
                    if (isset($current)) {
                        // В этом месяце была история
                        $last_events = end($events);
                        if ((new DateTime($last_events['date_changed'])) == $end_of_month) {
                            // События совпали с изменением месяца
                            $last_events['event_name'] .= ' месяца';
                            array_pop($events);
                            $events[] = $last_events;
                        } else {
                            $end_month_event = $current;
                            $end_month_event['date_changed'] = $end_of_month->format('Y-m-d');
                            $end_month_event['event_name'] = 'Начало месяца';
                            $events[] = $end_month_event;
                        }
                    } else {
                        // В этом месяце не было истории
                        $end_month_event = $next;
                        $end_month_event['date_changed'] = $end_of_month->format('Y-m-d');
                        $end_month_event['event_name'] = 'Начало месяца';
                        $events[] = $end_month_event;
                    }
                } else {
                    // История закончилась раньше конца месяца, но период не закончен
                    $end_of_history = $current;
                    if ($this->history_date_end < $this->date_end) {
                        if ($this->history_date_end != (new DateTime($current['date_changed']))) {
                            // Событий в этот день не было - история закончилась естественным образом
                            $end_of_history['event_name'] = 'Конец истории';
                            $events[] = $end_of_history;
                        } elseif ($end_of_history['deleted'] || $end_of_history['wialon_group_off']) {
                            // Событие совпало с концом истории (Отключение или Удаление)
                            $end_of_history['event_name'] = 'Удаление/Отключение';
                            $events[] = $end_of_history;
                        }
                    }

                    $end_month_event = $current;
                    $end_month_event['date_changed'] = $end_of_month->format('Y-m-d');
                    $end_month_event['event_name'] = 'Начало месяца';
                    $events[] = $end_month_event;
                }
            }
        }
        // события последнего месяца
        $next = current($this->history_data);
        while ($next != false) {
            // История еще есть в последнем месяце периода
            $current = current($this->history_data);
            $next = next($this->history_data);
            if ($next) {
                // события еще возможны
                $diff = array_diff_assoc($next, $current);
                $event_name = $this->getEventName($diff);
                if ($event_name) {
                    $next['event_name'] = 'Изменение' . $event_name;
                    $events[] = $next;
                }
            } else {
                // конец истории - это последние событие если оно случилось до окончания периода
                $end_of_history = end($this->history_data);
                if ($this->history_date_end < $this->date_end) {
                    if ($this->history_date_end != (new DateTime($current['date_changed']))) {
                        // Событий в этот день не было - история закончилась естественным образом
                        $end_of_history['event_name'] = 'Конец истории';
                        $events[] = $end_of_history;
                    } elseif ($end_of_history['deleted'] || $end_of_history['wialon_group_off']) {
                        // Событие совпало с концом истории (Отключение или Удаление)
                        $end_of_history['event_name'] = 'Удаление/Отключение';
                        $events[] = $end_of_history;
                    }
                }
            }
        }
        // Возможно мы вышли без событий, тогда будет единственное событие - начало истории или начало периода?
        // Sort events by date DESC
        usort($events, function($a, $b) {
            if ((new DateTime($a['date_changed'])) === (new DateTime($b['date_changed'])))
                return 0;

            return (new DateTime($a['date_changed'])) > (new DateTime($b['date_changed'])) ? 1 : -1;
        });
        // $e = $this->unique_multidim_array($events, 'date_changed');
        return $events;
    }

    private function makeHistoryIntervals() {
        if (!$this->history_events)
            return array();
        $intervals = array();
        $first_event_date = new DateTime($this->history_events[0]['date_changed']);
        $pred_history_date = new DateTime($this->history_events[0]['date_changed'] . '-1 day');
        $next = true;

        // событие происходит позже чем дата начала периода расчета - или сбой или объект был создан позже
        if ($first_event_date > $this->date_start && $this->date_created <= $this->date_start) {
            // если сбой, придумаем предысторию
            $intervals[] = array(
                'date_start' => $this->date_start_ymd,
                'date_end' => $pred_history_date->format("Y-m-d"), // -1 day
                'tarif_id' => $this->getTarifId($this->history_events[0]),
                'discount_id' => $this->getDiscountId($this->history_events[0]),
                'event_status' => $pred_history_date > $this->date_modified ? $this->history_events[0]['wialon_group_off'] || $this->history_events[0]['deleted'] : false,
                'event_name' => 'Начало периода',
            );
        }

        while ($next != false) {
            $current = current($this->history_events);
            $next = next($this->history_events);
            $date_current = new DateTime($current['date_changed']);
            $date_next = $next ? new DateTime($next['date_changed'] . '-1 day') : $date_current;

            // if ($next) {
            $intervals[] = array(
                'date_start' => $date_current->format("Y-m-d"),
                'date_end' => $date_next->format("Y-m-d"),
                'tarif_id' => $this->getTarifId($current),
                'discount_id' => $this->getDiscountId($current),
                'event_status' => $date_next >= $this->date_modified ? $current['wialon_group_off'] || $current['deleted'] : false,
                'event_name' => $current['event_name'],
            );
            // }
        }

        $last_event = end($this->history_events);
        $last_event_date = new DateTime($last_event['date_changed']);
        // история заканчивается или событие происходит раньше чем дата окончания расчета, а может сбой, а возможно объект уже удален
        if ($last_event_date < $this->date_end) {
            // Додумаем историю
            if (isset($date_current) && ($date_current >= $last_event_date)) {
                // Дата последнего события совпадает или отличается на день от предыдущего
                $last_event_date = new DateTime($last_event['date_changed'] . '+1 day');
            }
            $intervals[] = array(
                'date_start' => $last_event_date->format("Y-m-d"),
                'date_end' => $this->date_end_ymd, // -1 day
                'tarif_id' => $this->getTarifId($last_event),
                'discount_id' => $this->getDiscountId($last_event),
                'event_status' => $last_event_date > $this->date_modified ? $last_event['wialon_group_off'] || $last_event['deleted'] : false,
                'event_name' => 'Конец периода',
                    // 'event_name' => $last_event['event_name'] ? $last_event['event_name'] : 'Конец периода',
            );
            $s = 0;
        }
        return $intervals;
    }

    private function getEventName($diff) {
        $event_name = '';
        If (array_key_exists('wialon_group_id', $diff)) {
            $event_name .= ' группы,';
        }
        If (array_key_exists('history_discount_id', $diff)) {
            $event_name .= ' скидки,';
        }
        If (array_key_exists('history_tarif_id', $diff)) {
            $event_name .= ' тарифа,';
        }
        If (array_key_exists('wialon_group_off', $diff)) {
            if (!$diff['wialon_group_off']) {
                $event_name .= ' включение';
            } else {
                $event_name .= ' отключение';
            }
        }
        If (array_key_exists('deleted', $diff)) {
            $event_name .= ' удаление';
        }

        return $event_name;
    }

    private function checkMonthInRange($direct = 'last', $type = 'DateTime') {
        //  $args = func_get_args();
        $start = (new DateTime($this->date_start_ymd));
        $end = (new DateTime($this->date_end_ymd));

        $interval = new DateInterval('P1M');
        $period = new DatePeriod($start, $interval, $end);
        if ($direct == 'last') {
            $m = 'this';
        } else {
            $m = 'next';
        }

        $months = [];
        foreach ($period as $month) {
            if ($type == 'DateTime') {
                $months[] = $month->modify($direct . ' day of ' . $m . ' month');
            } else {
                $months[] = $month->modify($direct . ' day of ' . $m . ' month')->format("Y-m-d");
            }
        }
        return $months;
    }

    private function getDiscountId($item_history) {
        $discount_id = $item_history['history_discount_id'];
        if (!$discount_id) {
            $discount_id = $item_history['discount_id'] ? $item_history['discount_id'] : $item_history['discount_group_id'];
        }
        return $discount_id;
    }

    private function getTarifId($item_history) {
        $tarif_id = $item_history['history_tarif_id'];
        if (!$tarif_id) {
            $tarif_id = $item_history['tarif_id'] ? $item_history['tarif_id'] : $item_history['tarif_group_id'];
        }
        return $tarif_id;
    }

    public function getLastDayOfMonth($dateInISO8601) {
        // Проверяем дату на корректность
        $date = explode('-', $dateInISO8601);
        if (!checkdate($date[1], $date[2], $date[0]))
            return false;

        $start = new DateTime($dateInISO8601);
        $end = new DateTime($dateInISO8601);
        $end->add(new DateInterval('P2M'));
        $interval = new DateInterval('P1D');
        $daterange = new DatePeriod($start, $interval, $end);

        $prev = $start;
        // Проходимся по периодам, если номер месяца
        // предыдущего периода не совпадает с текущим номером месяца
        // то возвращаем последний день предыдущего месяца
        foreach ($daterange as $date) {
            if ($prev->format('m') != $date->format('m'))
                return (int) $prev->format('d');

            $prev = $date;
        }

        return false;
    }

    private function unique_multidim_array($array, $key) {
        $temp_array = array();
        $i = 0;
        $key_array = array();

        foreach ($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i] = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    public function __get($property) {
        switch ($property) {
            case 'history_events':
                return $this->history_events;
            case 'history_intervals':
                return $this->history_intervals;
            case 'history_data':
                return $this->history_data;
        }
    }

}
