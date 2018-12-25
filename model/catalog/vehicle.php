<?php

class ModelCatalogVehicle extends Model {

    public function addVehicle($data) {

       $this->db->query("INSERT INTO `" . DB_PREFIX . "vehicle` SET vehiclename = '" . $this->db->escape($data['vehiclename']) . "', status = '" . (int)$data['status'] . "', sort_order = '" . (int) $data['sort_order'] ."'");
       $vehicle_id = $this->db->getLastId();

        $this->cache->delete('vehicle');
        return $vehicle_id;
    }

    public function editVehicle($vehicle_id, $data) {
        $this->db->query("UPDATE `" . DB_PREFIX . "vehicle` SET vehiclename = '" . $this->db->escape($data['vehiclename']) . "', status = '" . (int)$data['status'] . "', sort_order = '" . (int) $data['sort_order'] ."' WHERE vehicle_id = '" . (int) $vehicle_id . "'");

        $this->cache->delete('vehicle');
    }

    public function deleteVehicle($vehicle_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "vehicle WHERE vehicle_id = '" . (int) $vehicle_id . "'");
        $this->cache->delete('vehicle');
    }

    public function getVehicle($vehicle_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "vehicle WHERE vehicle_id = '" . (int) $vehicle_id . "'");

        return $query->row;
    }

    public function getVehicles($data = array()) {
        //$sql = "SELECT * FROM " . DB_PREFIX . "vehicle";

        $sql = "SELECT * , (SELECT s.vehiclename FROM `" . DB_PREFIX . "vehicle` s WHERE s.vehicle_id = wg.vehicle_id) AS vehiclename FROM " . DB_PREFIX . "vehicle wg";

        if (!empty($data['filter_name'])) {
            $sql .= " AND vehiclename LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        $sort_data = array(
            'vehiclename',
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY vehiclename";
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

    public function getTotalVehicles() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "vehicle");

        return $query->row['total'];
    }

}
