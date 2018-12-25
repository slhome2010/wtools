<?php

class ModelCatalogWialongroup extends Model {

    public function addWialongroup($data) {

        $this->db->query("INSERT INTO `" . DB_PREFIX . "wialongroups` SET wialon_groupname = '" . $this->db->escape($data['wialon_groupname']) . "', wialon_group_off = '" . (int) $data['wialon_group_off'] . "', "
                . "status = '" . (int) $data['status'] . "', server_id = '" . (int) $data['server_id'] . "',  wialon_id = '" . (int) $data['wialon_id']
                . "', owner_id = '" . (int) $data['owner_id'] . "', tarif_id = '" . (int) $data['tarif_id'] . "', discount_id = '" . (int) $data['discount_id'] . "'");
        $wialon_group_id = $this->db->getLastId();

        // $this->db->query("INSERT INTO `" . DB_PREFIX . "wialon_group_description` SET wialon_group_id = '" . (int)$wialon_group_id . "', description = '" . $this->db->escape($data['description']) . "', contactname = '" . $this->db->escape($data['contactname']) . "', telephone = '" . $this->db->escape($data['telephone']) . "', email = '" . $this->db->escape($data['email']) . "', address = '" . $this->db->escape($data['address']) . "', bin = '" . $this->db->escape($data['bin']) .  "'");

        $this->cache->delete('wialon_group');
        return $wialon_group_id;
    }

    public function editWialongroup($wialon_group_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "wialongroups` SET wialon_groupname = '" . $this->db->escape($data['wialon_groupname']) . "', wialon_group_off = '" . (int) $data['wialon_group_off'] . "', "
                . "status = '" . (int) $data['status'] . "', server_id = '" . (int) $data['server_id'] . "', server_id = '" . (int) $data['server_id'] . "', wialon_id = '" . (int) $data['wialon_id']
                . "', owner_id = '" . (int) $data['owner_id'] . "', tarif_id = '" . (int) $data['tarif_id'] . "', discount_id = '" . (int) $data['discount_id'] . "' WHERE wialon_group_id = '" . (int) $wialon_group_id . "'");

        //  $this->db->query("UPDATE `" . DB_PREFIX . "wialon_group_description` SET description = '" . $this->db->escape($data['description']) . "', contactname = '" . $this->db->escape($data['contactname'])
        //         . "', telephone = '" . $this->db->escape($data['telephone']) . "', email = '" . $this->db->escape($data['email']) . "', address = '" . $this->db->escape($data['address']) . "', bin = '" . $this->db->escape($data['bin']) . "' WHERE wialon_group_id = '" . (int) $wialon_group_id . "'");

        $this->cache->delete('wialon_group');
    }

    public function deleteWialongroup($wialon_group_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "wialongroups WHERE wialon_group_id = '" . (int) $wialon_group_id . "'");
        //  $this->db->query("DELETE FROM " . DB_PREFIX . "wialon_group_description WHERE wialon_group_id = '" . (int) $wialon_group_id . "'");

        $this->cache->delete('wialon_group');
    }

    public function getWialongroup($wialon_group_id) {
        $query = $this->db->query("SELECT *, (SELECT s.servername FROM `" . DB_PREFIX . "server` s WHERE s.server_id = wg.server_id) AS servername FROM " . DB_PREFIX . "wialongroups wg WHERE wg.wialon_group_id = '" . (int) $wialon_group_id . "'");

        return $query->row;
    }

    public function getWialongroups($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "wialon_group";

        $sql = "SELECT * , (SELECT s.servername FROM `" . DB_PREFIX . "server` s WHERE s.server_id = wg.server_id) AS servername FROM " . DB_PREFIX . "wialongroups wg";

        if (!empty($data['filter_name'])) {
            $sql .= " WHERE wialon_groupname LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }
        if (!empty($data['filter_status'])) {
            $sql .= " WHERE status = '" . (int) $data['filter_status'] . "'";
        }
        $sort_data = array(
            'wialon_group_id',
            'wialon_groupname',
            'sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY wialon_groupname";
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

    public function getTotalWialongroups() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "wialongroups");

        return $query->row['total'];
    }

}
