<?php

class ModelBillingDiscount extends Model {

    public function addDiscount($data) {

        $this->db->query("INSERT INTO `" . DB_PREFIX . "discount` SET discountname = '" . $this->db->escape($data['discountname']) . "', description = '" . $this->db->escape($data['description']) . "', price = '" . (float) $data['price'] . "', percent = '" . (int) $data['percent'] . "', priority = '" . (int) $data['priority'] . "', status = '" . (int) $data['status'] . "', date_start = '" . $this->db->escape($data['date_start']) . "', date_end = '" . $this->db->escape($data['date_end']) . "'");
        $discount_id = $this->db->getLastId();

        $this->cache->delete('discount');
        return $discount_id;
    }

    public function editDiscount($discount_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "discount` SET discountname = '" . $this->db->escape($data['discountname']) . "', description = '" . $this->db->escape($data['description']) . "', price = '" . (float) $data['price'] . "', percent = '" . (int) $data['percent'] . "', priority = '" . (int) $data['priority'] . "', status = '" . (int) $data['status'] . "', date_start = '" . $this->db->escape($data['date_start']) . "', date_end = '" . $this->db->escape($data['date_end']) . "' WHERE discount_id = '" . (int) $discount_id . "'");

        $this->cache->delete('discount');
    }

    public function deleteDiscount($discount_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "discount WHERE discount_id = '" . (int) $discount_id . "'");

        $this->cache->delete('discount');
    }

    public function getDiscount($discount_id, $date_start = "", $date_end = "") {
        $sql = "SELECT * FROM " . DB_PREFIX . "discount o WHERE o.discount_id = '" . (int) $discount_id . "'";
        if ($date_start && $date_end) {
            $sql .= " AND o.date_start <= '" . $date_end . "' AND o.date_end >= '" . $date_start . "'";
        }
        
        $query = $this->db->query($sql);
        return $query->row;
    }

    public function getDiscounts($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "discount";

        $sql = "SELECT * FROM " . DB_PREFIX . "discount";

        if (!empty($data['filter_name'])) {
            $sql .= " WHERE discountname LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        $sort_data = array(
            'discountname',
            'sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY discountname";
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

    public function getTotalDiscounts() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "discount");

        return $query->row['total'];
    }

}
