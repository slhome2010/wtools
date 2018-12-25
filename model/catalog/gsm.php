<?php

class ModelCatalogGsm extends Model {

    public function addGsm($data) {

       $this->db->query("INSERT INTO `" . DB_PREFIX . "gsm` SET gsmname = '" . $this->db->escape($data['gsmname']) . "', status = '" . (int)$data['status'] . "', sort_order = '" . (int) $data['sort_order'] ."'");
       $gsm_id = $this->db->getLastId();

        $this->cache->delete('gsm');
        return $gsm_id;
    }

    public function editGsm($gsm_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "gsm` SET gsmname = '" . $this->db->escape($data['gsmname']) . "', status = '" . (int)$data['status'] . "', sort_order = '" . (int) $data['sort_order'] ."' WHERE gsm_id = '" . (int) $gsm_id . "'");

        $this->cache->delete('gsm');
    }

    public function deleteGsm($gsm_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "gsm WHERE gsm_id = '" . (int) $gsm_id . "'");
        $this->cache->delete('gsm');
    }

    public function getGsm($gsm_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "gsm WHERE gsm_id = '" . (int) $gsm_id . "'");

        return $query->row;
    }

    public function getGsms($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "gsm";

        $sql = "SELECT * , (SELECT s.gsmname FROM `" . DB_PREFIX . "gsm` s WHERE s.gsm_id = wg.gsm_id) AS gsmname FROM " . DB_PREFIX . "gsm wg";

        if (!empty($data['filter_name'])) {
            $sql .= " AND gsmname LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        $sort_data = array(
            'gsmname',
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY gsmname";
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

    public function getTotalGsms() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "gsm");

        return $query->row['total'];
    }

}
