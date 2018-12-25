<?php

class ModelSettingServer extends Model {

    public function addServer($data) {

       $this->db->query("INSERT INTO `" . DB_PREFIX . "server` SET servername = '" . $this->db->escape($data['servername']) . "', link = '" . $this->db->escape($data['link']) . "', ip = '" . $this->db->escape($data['ip']) . "', soft = '" . $this->db->escape($data['soft']) . "', total = '" . (int) $data['total'] . "', sort_order = '" . (int) $data['sort_order'] . "', status = '" . (int)$data['status'] . "'");
       $server_id = $this->db->getLastId();

       $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "tracker");
       $trackers = $query->rows;

        foreach ($trackers as $tracker) {
            $new_hw = base_convert(uniqid(),16,10);
            $this->db->query("INSERT IGNORE INTO `" . DB_PREFIX . "tracker_to_server` SET server_id = '" . (int) $server_id . "', tracker_id = '" . (int) $tracker['tracker_id'] . "', tracker_hw = '" . $new_hw . "'");
        }

        $this->cache->delete('server');
        $this->cache->delete('tracker');

        return $server_id;
    }

    public function editServer($server_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "server` SET servername = '" . $this->db->escape($data['servername']) . "', link = '" . $this->db->escape($data['link']) . "', ip = '" . $this->db->escape($data['ip']) . "', soft = '" . $this->db->escape($data['soft']) . "', total = '" . (int) $data['total'] . "', sort_order = '" . (int) $data['sort_order'] . "', status = '" . (int)$data['status'] . "' WHERE server_id = '" . (int) $server_id . "'");

        $this->cache->delete('server');
    }

    public function deleteServer($server_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "server WHERE server_id = '" . (int) $server_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "tracker_to_server WHERE server_id = '" . (int) $server_id . "'");

        $this->cache->delete('server');
        $this->cache->delete('tracker');
    }

    public function getServer($server_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "server o WHERE o.server_id = '" . (int) $server_id . "'");

        return $query->row;
    }

    public function getServerDescriptions($server_id) {
        //$server_description_data = array();

        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "server_description WHERE server_id = '" . (int) $server_id . "'");

        return $query->row;
    }

    public function getServers($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "server";

        $sql = "SELECT * FROM " . DB_PREFIX . "server";

        if (!empty($data['filter_name'])) {
            $sql .= " WHERE servername LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        $sort_data = array(
            'servername',
            'sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY servername";
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
                $data['limit'] = 20;
            }

            $sql .= " LIMIT " . (int) $data['start'] . "," . (int) $data['limit'];
        }

        $query = $this->db->query($sql);

        return $query->rows;
    }


    public function getTotalServers() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "server");

        return $query->row['total'];
    }

}
