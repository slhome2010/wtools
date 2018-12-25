<?php

class ModelReportTotal extends Model {

    public function getTotalObjects() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "item");

        return (int) $query->row['total'];
    }

    public function getTotalObjectsOff() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "item WHERE wialon_group_id IN (SELECT wg.wialon_group_id FROM  " . DB_PREFIX . "wialongroups wg WHERE wg.wialon_group_off = '1') AND deleted='0'");

        return (int) $query->row['total'];
    }

    public function getTotalObjectsDeleted() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "item WHERE deleted = '1'");

        return (int) $query->row['total'];
    }

    public function getTotalObjectsByServer($server_id) {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "item WHERE deleted = '0' AND server_id = '" . (int) $server_id . "'");

        return (int) $query->row['total'];
    }

    public function getTotalObjectsByDate($filter) {
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

        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "item WHERE date_created " . $sql_filter);

        return (int) $query->row['total'];
    }

    public function getTotalObjectsHistory($filter = array()) {
        if (isset($filter['date_start']) && !is_null($filter['date_start'])) {
            $date_start = $filter['date_start'];
        }
        if (isset($filter['date_end']) && !is_null($filter['date_end'])) {
            $date_end = $filter['date_end'];
        }

        if (isset($date_start) && isset($date_end)) {
            $sql_filter = " BETWEEN '" . $date_start . "' AND  '" . $date_end . "'";
        } elseif (isset($date_start)) {
            $sql_filter = " = '" . $date_start . "'";
        } else {
            $sql_filter = " < '" . $date_end . "'";
        }

        $sql = "SELECT (SELECT  COUNT(ih.online) AS total_online
                            FROM " . DB_PREFIX . "item_history ih
                            WHERE ih.online = 1
                            AND ih.wialon_group_off = 0
                            AND ih.date_changed" . $sql_filter . ") total_online,
                        (SELECT  COUNT(ih.online) AS total_offline
                            FROM " . DB_PREFIX . "item_history ih
                            WHERE ih.online = 0
                            AND ih.wialon_group_off = 0
                            AND ih.date_changed" . $sql_filter . ") total_offline,
                        (SELECT  COUNT(ih.wialon_group_off) AS total_off
                            FROM " . DB_PREFIX . "item_history ih
                            WHERE ih.wialon_group_off = 1
                            AND ih.date_changed" . $sql_filter . ") total_off,
                        (SELECT  COUNT(ih.item_id) AS total_objects
                            FROM " . DB_PREFIX . "item_history ih
                            WHERE ih.date_changed" . $sql_filter . ") total_objects";

        $query = $this->db->query($sql);
        return $query->row;
    }

    public function getTotalByOwners($filter = array()) {

        $sql = "SELECT o.owner_id, o.ownername, count(i.item_id) AS total_objects,
                (SELECT COUNT(i.item_id) FROM " . DB_PREFIX . "item i WHERE i.wialon_group_id IN
                    (SELECT wg.wialon_group_id FROM " . DB_PREFIX . "wialongroups wg WHERE wg.owner_id = o.owner_id AND wg.wialon_group_off = '0')) AS total_on
                FROM " . DB_PREFIX . "item i
                LEFT JOIN " . DB_PREFIX . "wialongroups wg ON wg.wialon_group_id = i.wialon_group_id
                LEFT JOIN " . DB_PREFIX . "owner o ON wg.owner_id = o.owner_id
                WHERE o.owner_id IS NOT null AND i.deleted = '0'
                GROUP BY o.owner_id  ORDER BY total_on DESC";

        $query = $this->db->query($sql);
        return $query->rows;
    }
    public function getTotalByOwner($owner_id) {

        $sql = "SELECT count(i.item_id) AS total_objects
                FROM " . DB_PREFIX . "item i
                LEFT JOIN " . DB_PREFIX . "wialongroups wg ON wg.wialon_group_id = i.wialon_group_id
                LEFT JOIN " . DB_PREFIX . "owner o ON wg.owner_id = o.owner_id
                WHERE o.owner_id  = '" . (int) $owner_id . "' AND o.owner_id IS NOT null AND i.deleted = '0'";

        $query = $this->db->query($sql);
        return $query->row;
    }
    public function getTotalOnByOwners() {
        $sql = "SELECT o.owner_id, o.ownername, COUNT(i.item_id) AS total_on FROM " . DB_PREFIX . "item i
  LEFT JOIN " . DB_PREFIX . "wialongroups wg ON wg.wialon_group_id = i.wialon_group_id
  LEFT JOIN " . DB_PREFIX . "owner o ON wg.owner_id = o.owner_id
  WHERE i.wialon_group_id = wg.wialon_group_id
  AND wg.wialon_group_off = '0'
  AND o.owner_id IS NOT null AND i.deleted = '0'
  GROUP BY o.owner_id  ORDER BY total_on DESC";

        $query = $this->db->query($sql);
        return $query->rows;
    }
    public function getAvgByOwners($filter = array()) {
        if (isset($filter['owner_id']) && !is_null($filter['owner_id'])) {
            $owner_id = $filter['owner_id'];
        }
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

        $sql = "SELECT
                (SELECT AVG(online_daily) FROM (SELECT COUNT(ih.item_id) AS online_daily FROM " . DB_PREFIX . "item_history ih WHERE ih.wialon_group_id IN
                    (SELECT wg.wialon_group_id FROM " . DB_PREFIX . "wialongroups wg WHERE wg.owner_id = " . $owner_id . " AND ih.online = '1')
                AND ih.date_changed " . $sql_filter . "
                group BY ih.date_changed) onl) AS total_online,
                (SELECT AVG(offline_daily) FROM (SELECT COUNT(ih.item_id) AS offline_daily FROM " . DB_PREFIX . "item_history ih WHERE ih.wialon_group_id IN
                    (SELECT wg.wialon_group_id FROM " . DB_PREFIX . "wialongroups wg WHERE wg.owner_id = " . $owner_id . " AND ih.online = '0')
                AND ih.date_changed " . $sql_filter . "
                group BY ih.date_changed) ofl) AS total_offline";

        $query = $this->db->query($sql);
        return $query->row;
    }

    public function getTotalObjectsBySelect($selected = '1') {

        switch ($selected) {
            case '1':
                $sql = "SELECT t.trackername AS name, count(i.item_id) AS total_objects FROM " . DB_PREFIX . "item i
                        LEFT JOIN " . DB_PREFIX . "tracker_to_server tts ON tts.tracker_hw = i.tracker_hw
                        LEFT JOIN " . DB_PREFIX . "tracker t ON tts.tracker_id = t.tracker_id
                        WHERE i.deleted = '0'
                        GROUP BY t.tracker_id
                        ORDER BY total_objects DESC";
                break;
            case '2':
                $sql = "SELECT t.tarifname AS name, count(i.item_id) AS total_objects FROM " . DB_PREFIX . "item i
                        LEFT JOIN " . DB_PREFIX . "tarif t ON t.tarif_id = i.tarif_id
                        WHERE t.tarif_id IS NOT null AND i.deleted = '0'
                        GROUP BY t.tarif_id
                        ORDER BY total_objects DESC";
                break;
            case '3':
                $sql = "SELECT o.ownername AS name, count(i.item_id) AS total_objects FROM " . DB_PREFIX . "item i
                        LEFT JOIN " . DB_PREFIX . "wialongroups wg ON wg.wialon_group_id = i.wialon_group_id
                        LEFT JOIN " . DB_PREFIX . "owner o ON wg.owner_id = o.owner_id
                        WHERE o.owner_id IS NOT null AND i.deleted = '0'
                        GROUP BY o.owner_id
                        ORDER BY total_objects DESC";
                break;

            default:
                break;
        }

        $query = $this->db->query($sql);
        return $query->rows;
    }
}
