<?php

class ModelBillingTarif extends Model {

    public function addTarif($data) {

       $this->db->query("INSERT INTO `" . DB_PREFIX . "tarif` SET tarifname = '" . $this->db->escape($data['tarifname']) . "', description = '" . $this->db->escape($data['description']) . "', price = '" . (float)$data['price'] . "', roaming = '" . (int)$data['roaming'] . "', gprs = '" . (int)$data['gprs'] . "', sort_order = '" . (int) $data['sort_order'] . "', status = '" . (int)$data['status'] . "', date_added = NOW(), date_modified = NOW()");
       $tarif_id = $this->db->getLastId();

        $this->cache->delete('tarif');
        return $tarif_id;
    }

    public function editTarif($tarif_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "tarif` SET tarifname = '" . $this->db->escape($data['tarifname']) . "', description = '" . $this->db->escape($data['description']) . "', price = '" . (float)$data['price'] . "', roaming = '" . (int)$data['roaming'] . "', gprs = '" . (int)$data['gprs'] . "', sort_order = '" . (int) $data['sort_order'] . "', status = '" . (int)$data['status'] . "', date_modified = NOW() WHERE tarif_id = '" . (int) $tarif_id . "'");

        $this->cache->delete('tarif');
    }

    public function deleteTarif($tarif_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "tarif WHERE tarif_id = '" . (int) $tarif_id . "'");

        $this->cache->delete('tarif');
    }

    public function getTarif($tarif_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "tarif o WHERE o.tarif_id = '" . (int) $tarif_id . "'");

        return $query->row;
    }

    public function getTarifs($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "tarif";

        $sql = "SELECT * FROM " . DB_PREFIX . "tarif";

        if (!empty($data['filter_name'])) {
            $sql .= " WHERE tarifname LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        $sort_data = array(
            'tarifname',
            'sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY tarifname";
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


    public function getTotalTarifs() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "tarif");

        return $query->row['total'];
    }

}
