<?php

class ModelReportSuspicious extends Model {

    public function getSuspicious($filter = array()) {

        if (isset($filter['date_start']) && !is_null($filter['date_start'])) {
            $date_start = $filter['date_start'];
        }
        if (isset($filter['date_end']) && !is_null($filter['date_end'])) {
            $date_end = $filter['date_end'];
        } else {
            $date_end = ' NOW()';
        }

        if (isset($date_start) && isset($date_end)) {
            $sql_filter = " BETWEEN '" . $date_start . "' AND  '" . $date_end . "'";
        } elseif (isset($date_start)) {
            $sql_filter = " = '" . $date_start . "'";
        } else {
            $sql_filter = " < '" . $date_end . "'";
        }

        $sql = "SELECT ih.item_id, ih.itemname, ih.date_changed, wg.wialon_groupname, o.ownername, ih.online, COUNT(ih.date_changed) AS total
                    FROM " . DB_PREFIX . "item_history ih
                    LEFT JOIN " . DB_PREFIX . "item i ON i.item_id = ih.item_id
                    LEFT JOIN " . DB_PREFIX . "wialongroups wg ON wg.wialon_group_id = ih.wialon_group_id
                    LEFT JOIN " . DB_PREFIX . "owner o ON wg.owner_id = o.owner_id
                    WHERE wg.wialon_group_off = '0' AND i.deleted = '0' AND ih.online = '0'
                    AND ih.date_changed " . $sql_filter . "
                    GROUP BY ih.item_id
                    HAVING total >= '" . $filter['dangerous_range'] . "'";

        $sql2 = "SELECT i.`item_id`, i.`itemname`, i.`date_last`, wg.`wialon_groupname`,"
                . " o.`ownername`, (DATEDIFF(CURDATE(), i.`date_last`)) AS total "
                . "FROM `" . DB_PREFIX . "item` i, `" . DB_PREFIX . "wialongroups` wg, `" . DB_PREFIX . "owner` o "
                . "WHERE wg.`wialon_group_id` = i.`wialon_group_id` "
                . "AND wg.`wialon_group_off` <> 1 "
                . "AND o.`owner_id` = wg.`owner_id` "
                . "AND i.`date_last` <= SUBDATE(CURDATE(), INTERVAL " . $filter['dangerous_range'] . " DAY)"
                . " AND i.`deleted` <> 1 ORDER BY i.`date_last`";

        $query = $this->db->query($sql2);

        return $query->rows;
    }

}
