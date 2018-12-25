<?php

class ModelUserValidate extends Model {


    public function getTotalById($tablename, $totalname, $total_id) { // should replace this function instead all TotalID functions
        $exist = $this->db->query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='" . DB_PREFIX . $tablename . "' AND COLUMN_NAME = '" . $totalname . "_id'");
        If ($exist->num_rows) {
            $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . $tablename . " WHERE " . $totalname . "_id = '" . (int) $total_id . "'");

            return (int) $query->row['total'];
        }

        return 0;
    }

    public function getTotalItemsByHw($hw) {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "item WHERE tracker_hw = '" . $hw . "'");

        return (int) $query->row['total'];
    }

    public function getTotalByHw($tracker_id, $server_id, $hw) {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "tracker_to_server WHERE tracker_hw = '" . $hw . "' AND server_id = '" . $server_id . "' AND tracker_id != '" . $tracker_id . "'");

        return (int) $query->row['total'];
    }
}
