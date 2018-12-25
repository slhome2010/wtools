<?php

class ModelCatalogTracker extends Model {

    public function addTracker($data) {

        $this->db->query("INSERT INTO `" . DB_PREFIX . "tracker` SET trackername = '" . $this->db->escape($data['trackername']) . "', status = '" . (int) $data['status'] . "', sort_order = '" . (int) $data['sort_order'] . "'");
        $tracker_id = $this->db->getLastId();

        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "server");
        $servers = $query->rows;

        foreach ($servers as $server) {
            $new_hw = base_convert(uniqid(),16,10);
          //      $new_hw = $this->db->escape((string) ($tracker_id + 1000));
            $this->db->query("INSERT IGNORE INTO `" . DB_PREFIX . "tracker_to_server` SET server_id = '" . (int) $server['server_id'] . "', tracker_id = '" . (int) $tracker_id . "', tracker_hw = '" . $new_hw . "'");
            // . "' ON DUPLICATE KEY UPDATE tracker_hw = '" . $this->db->escape((string)($tracker_id+1000)) . "'");
        }

        $this->cache->delete('server');
        $this->cache->delete('tracker');

        return $tracker_id;
    }

    public function editTracker($tracker_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "tracker` SET trackername = '" . $this->db->escape($data['trackername']) . "', status = '" . (int) $data['status'] . "', sort_order = '" . (int) $data['sort_order'] . "' WHERE tracker_id = '" . (int) $tracker_id . "'");
        if (isset($data['hw'])) {
            $servers = json_decode(str_replace('&quot;', '"', $data['hw']));
            foreach ($servers as $server) {
                $this->db->query("UPDATE IGNORE `" . DB_PREFIX . "tracker_to_server` SET tracker_hw = '" . $this->db->escape($server->tracker_hw) . "' WHERE tracker_id = '" . (int) $tracker_id . "' AND server_id = '" . (int) $server->server_id . "'");
            }
        }

        $this->cache->delete('server');
        $this->cache->delete('tracker');
    }

    public function deleteTracker($tracker_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "tracker WHERE tracker_id = '" . (int) $tracker_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "tracker_to_server WHERE tracker_id = '" . (int) $tracker_id . "'");
        $this->cache->delete('tracker');
    }

    public function getTracker($tracker_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "tracker WHERE tracker_id = '" . (int) $tracker_id . "'");

        return $query->row;
    }

    public function getTrackers($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "tracker";

        $sql = "SELECT *  FROM " . DB_PREFIX . "tracker t";

        if (!empty($data['filter_name'])) {
            $sql .= " AND trackername LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        $sort_data = array(
            'trackername',
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY trackername";
        }

        if (isset($data['order']) && ($data['order'] == 'DESC')) {
            $sql .= " DESC";
        } else {
            $sql .= " ASC";
        }

        if (isset($data['start']) || isset($data['limit'])) {
            if ($data['start'] < 0) {
                $data['start'] = 0;
            }

            if ($data['limit'] < 1) {
                $data['limit'] = 999999;
            }

            $sql .= " LIMIT " . (int) $data['start'] . "," . (int) $data['limit'];
        }

        $query = $this->db->query($sql);

        return $query->rows;
    }

    public function getTotalTrackers() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "tracker");

        return $query->row['total'];
    }

    public function getHw($tracker_id) {
        $query = $this->db->query("SELECT *, (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE tts.server_id = s.server_id) AS servername
                                 FROM " . DB_PREFIX . "tracker_to_server tts WHERE tts.tracker_id = '" . (int) $tracker_id . "'");

        return $query->rows;
    }

}
