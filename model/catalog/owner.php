<?php

class ModelCatalogOwner extends Model {

    public function addOwner($data) {

        $this->db->query("INSERT INTO `" . DB_PREFIX . "owner` SET ownername = '" . $this->db->escape($data['ownername']) . "', sort_order = '" . (int) $data['sort_order'] . "', "
                . "status = '" . (int) $data['status'] . "', date_added = NOW(), description = '" . $this->db->escape($data['description']) . "', contactname = '" . $this->db->escape($data['contactname'])
                . "', telephone = '" . $this->db->escape($data['telephone']) . "', email = '" . $this->db->escape($data['email']) . "', address = '" . $this->db->escape($data['address']) . "', bin = '" . $this->db->escape($data['bin']) . "'");
        $owner_id = $this->db->getLastId();

        // $this->db->query("INSERT INTO `" . DB_PREFIX . "owner_description` SET owner_id = '" . (int)$owner_id . "', description = '" . $this->db->escape($data['description']) . "', contactname = '" . $this->db->escape($data['contactname']) . "', telephone = '" . $this->db->escape($data['telephone']) . "', email = '" . $this->db->escape($data['email']) . "', address = '" . $this->db->escape($data['address']) . "', bin = '" . $this->db->escape($data['bin']) .  "'");

        $this->cache->delete('owner');
        return $owner_id;
    }

    public function editOwner($owner_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "owner` SET ownername = '" . $this->db->escape($data['ownername']) . "', sort_order = '" . (int) $data['sort_order'] . "',"
                . " status = '" . (int) $data['status'] . "', description = '" . $this->db->escape($data['description']) . "', contactname = '" . $this->db->escape($data['contactname'])
                . "', telephone = '" . $this->db->escape($data['telephone']) . "', email = '" . $this->db->escape($data['email']) . "', address = '" . $this->db->escape($data['address'])
                . "', bin = '" . $this->db->escape($data['bin']) . "' WHERE owner_id = '" . (int) $owner_id . "'");

        //  $this->db->query("UPDATE `" . DB_PREFIX . "owner_description` SET description = '" . $this->db->escape($data['description']) . "', contactname = '" . $this->db->escape($data['contactname'])
        //         . "', telephone = '" . $this->db->escape($data['telephone']) . "', email = '" . $this->db->escape($data['email']) . "', address = '" . $this->db->escape($data['address']) . "', bin = '" . $this->db->escape($data['bin']) . "' WHERE owner_id = '" . (int) $owner_id . "'");

        $this->cache->delete('owner');
    }

    public function deleteOwner($owner_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "owner WHERE owner_id = '" . (int) $owner_id . "'");
        //  $this->db->query("DELETE FROM " . DB_PREFIX . "owner_description WHERE owner_id = '" . (int) $owner_id . "'");

        $this->cache->delete('owner');
    }

    public function getOwner($owner_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "owner o WHERE o.owner_id = '" . (int) $owner_id . "'");

        return $query->row;
    }

    public function getOwners($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "owner";

        $sql = "SELECT * FROM " . DB_PREFIX . "owner";

        if (!empty($data['filter_name'])) {
            $sql .= " WHERE ownername LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }
        if (!empty($data['filter_status'])) {
            $sql .= " WHERE status = '" . (int) $data['filter_status'] . "'";
        }
        $sort_data = array(
            'owner_id',
            'ownername',
            'sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY ownername";
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

    public function getWialongroupsByOwner($owner_id=0) {
        $query = $this->db->query("SELECT wialon_group_id AS id, wialon_groupname AS value FROM " . DB_PREFIX . "wialongroups WHERE owner_id = '" . (int) $owner_id . "'");

        return $query->rows;
    }

    public function updateWialongroupsByOwner($owner_id, $update) {
        $this->db->query("UPDATE `" . DB_PREFIX . "wialongroups` SET owner_id = '" . (int) $owner_id . "' WHERE wialon_group_id IN (" . implode(",", $update) . ")");

        $this->cache->delete('wialon_group');

    }

    public function getTotalOwners() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "owner");

        return $query->row['total'];
    }

}
