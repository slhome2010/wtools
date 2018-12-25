<?php

class Billing {

    private $billing_data = array();
    private $tarif;

    public function __construct($discount_interval, $tarif, $original_event = '') {
        $days = $discount_interval['date_start']->diff($discount_interval['date_end'])->days + 1;
        $day_in_month = cal_days_in_month(CAL_GREGORIAN, (int) $discount_interval['date_end']->format("m"), (int) $discount_interval['date_end']->format("Y"));
        $this->tarif = $tarif ? $tarif['price'] : 0;
        $discount = $discount_interval['percent'] ? $this->tarif * $discount_interval['value'] / 100 : (float)$discount_interval['value'];
       // $tarif_whis_discount = $discount_interval['percent'] ? $this->tarif - $this->tarif * $discount_interval['value'] / 100 : $this->tarif - $discount_interval['value'];

        $this->billing_data = array(
            'date_start' => $discount_interval['date_start']->format("d.m.Y"),
            'date_end' => $discount_interval['date_end']->format("d.m.Y"),
            'count' => $days,
            'tarif' => $this->tarif,
            'discount' => $discount,
            'sum' => round(($this->tarif - $discount) / $day_in_month * ($days)),
            'event_name' => $discount_interval['event_name'] ? $discount_interval['event_name'] : $original_event,
        );
    }

    public function __get($name) {
        return $this->$name;
    }

    public function __set($name, $value) {
        $this->$name = $value;
    }

}

class Discount {

    private $discount_id;
    private $date_start, $date_end;
    private $discount_data = array();
    private $discount_intervals = array();
    private $db;

    public function __construct($_discount_id, $date_start, $date_end, $_db = '', $_discount_data = array()) {
        $this->db = $_db;
        $this->discount_id = $_discount_id;
        $this->date_start = $date_start;
        $this->date_end = $date_end;

        if ($_discount_data) {
            $this->discount_data = $_discount_data;
        } else {
            $this->discount_data = $this->getDiscount();
        }

        if ($this->discount_data) {
            $discount_intervals = $this->interval_intersect($this->date_start, $this->date_end, 0, $this->discount_data['date_start'], $this->discount_data['date_end'], $this->discount_data['price']);
            foreach ($discount_intervals as $interval) {
                $this->discount_intervals[] = array_merge($interval,['percent' => $this->discount_data['percent']]);
            }
        } else {
            $this->discount_intervals[] = ['date_start' => new DateTime($this->date_start), 'value' => 0, 'date_end' => new DateTime($this->date_end), 'event_name' => '', 'percent' => 0];
        }
    }

    public function __get($name) {
        return $this->$name;
    }

    public function __set($name, $value) {
        $this->$name = $value;
    }

    private function getDiscount() {
        $sql = "SELECT * FROM " . DB_PREFIX . "discount d WHERE d.discount_id = '" . (int) $this->discount_id . "'";
        if ($this->date_start && $this->date_end) {
            $sql .= " AND d.date_start <= '" . $this->date_end . "' AND d.date_end >= '" . $this->date_start . "'";
        }

        if ($this->db) {
            $query = $this->db->query($sql);
            return $query->row;
        } else {
            return array();
        }
    }

    private function interval_intersect($start, $end, $value1, $start_2, $end_2, $value2) {
        $date_start = new DateTime($start); // можно сравнивать обычными операторами
        $date_end = new DateTime($end);
        $date_start_2 = new DateTime($start_2);
        $date_end_2 = new DateTime($end_2);
        $intervals = [];

        /* поглощение и совпадение */
        if ($date_start_2 <= $date_start && $date_end_2 >= $date_end) {
            $intervals[] = ['date_start' => $date_start, 'value' => $value2, 'date_end' => $date_end, 'event_name' => ''];
        }
        /* смещение назад */
        if ($date_start_2 < $date_start && $date_end_2 < $date_end) {  // скидка начала действовать раньше b закончила действовать до истечения периода
            $intervals[] = ['date_start' => $date_start, 'value' => $value2, 'date_end' => $date_end_2, 'event_name' => 'Закончилась скидка'];
            $intervals[] = ['date_start' => new DateTime($end_2 . ' +1 day'), 'value' => $value1, 'date_end' => $date_end, 'event_name' => 'Продолжение периода'];
        }
        /* смещение вперед */
        if ($date_start_2 > $date_start && $date_end_2 > $date_end) { // скидка начала действовать внутри периода b продолжает действовать после истечения периода
            $intervals[] = ['date_start' => $date_start, 'value' => $value1, 'date_end' => $date_start_2, 'event_name' => ''];
            $intervals[] = ['date_start' => new DateTime($start_2 . ' +1 day'), 'value' => $value2, 'date_end' => $date_end, 'event_name' => 'Началась скидка'];
        }
        /* вхождение */
        if ($date_start_2 > $date_start && $date_end_2 < $date_end) {   // скидка начала действовать внутри периода b закончила действовать до истечения периода
            $intervals[] = ['date_start' => $date_start, 'value' => $value1, 'date_end' => $date_start_2, 'event_name' => ''];
            $intervals[] = ['date_start' => new DateTime($start_2 . ' +1 day'), 'value' => $value2, 'date_end' => $date_end_2, 'event_name' => 'Действует скидка'];
            $intervals[] = ['date_start' => new DateTime($end_2 . ' +1 day'), 'value' => $value1, 'date_end' => $date_end, 'event_name' => 'Продолжение периода'];
        }

        return $intervals;
    }

}
