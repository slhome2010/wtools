<?php

class ModelCatalogItem extends Model {

    public function editItem($item_id, $data) {
        $this->db->query("UPDATE " . DB_PREFIX . "item SET  tarif_id = '" . (int) $data['tarif_id'] . "', discount_id = '" . (int) $data['discount_id'] . "', status = '"
                . (int) $data['status'] . "', sort_order = '" . (int) $data['sort_order'] . "' WHERE item_id = '" . (int) $item_id . "'");

        $this->cache->delete('item');
    }

    public function addItemHistory($data) {
        $sql = "UPDATE " . DB_PREFIX . "item_history SET  history_tarif_id = '" . (int) $data['history_tarif_id'] . "', history_discount_id = '" . (int) $data['history_discount_id'] . "'"
                . " WHERE item_id = '" . (int) $data['item_id'] . "' AND  date_changed >= '" . $data['date_changed'] . "'";

        $this->db->query($sql);

        $this->cache->delete('item');
    }

     public function addGroupHistory($data) {
        $sql = "UPDATE " . DB_PREFIX . "item_history SET  history_tarif_id = '" . (int) $data['history_tarif_id'] . "', history_discount_id = '" . (int) $data['history_discount_id'] . "'"
                . ", wialon_group_off = '" . (int) $data['wialon_group_off'] . "'"
                . " WHERE wialon_group_id = '" . (int) $data['wialon_group_id'] . "' AND  date_changed >= '" . $data['date_changed'] . "'";

        // If group tarif or group discount has been changed
        if (isset($data['old_discount_id']))
            $sql .= " AND (history_discount_id = '" . (int) $data['old_discount_id'] . "' OR history_discount_id = '0')";
        if (isset($data['old_tarif_id']))
            $sql .= " AND (history_tarif_id = '" . (int) $data['old_tarif_id'] . "' OR history_tarif_id = '0')";

        $this->db->query($sql);

        $this->cache->delete('item');
    }

    public function getItem($item_id) {
        $sql = "SELECT i.item_id, i.itemname, i.wialon_id, i.date_created, i.date_last, i.date_modified, i.server_id,
                                i.wialon_group_id, wg.wialon_groupname, wg.owner_id, wg.wialon_group_off, wg.tarif_id AS tarif_group_id, wg.discount_id AS discount_group_id,
                                i.deleted,
                                i.tracker_uid, i.tracker_hw, i.password, i.sim1, i.sim2,
                                (SELECT t.trackername FROM " . DB_PREFIX . "tracker t WHERE t.tracker_id = (SELECT tts.tracker_id FROM " . DB_PREFIX . "tracker_to_server tts WHERE i.server_id = tts.server_id AND i.tracker_hw = tts.tracker_hw)) AS trackername,
                                i.tarif_id, i.discount_id, i.sort_order, i.status,
                                (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE i.server_id = s.server_id) AS servername,
                                (SELECT o.ownername FROM " . DB_PREFIX . "owner o WHERE wg.owner_id = o.owner_id) AS ownername
                                FROM " . DB_PREFIX . "item i LEFT JOIN " . DB_PREFIX . "wialongroups wg ON (i.wialon_group_id = wg.wialon_group_id)";

        $query = $this->db->query($sql . "WHERE i.item_id = '" . (int) $item_id . "'");

        return $query->row;
    }

    public function getItems($data = array()) {
        $sql_filter = '';
        $where = "WHERE";

        if (isset($data['date_start']) && !is_null($data['date_start'])) {
            $date_start = $data['date_start'];
        }
        if (isset($data['date_end']) && !is_null($data['date_end'])) {
            $date_end = $data['date_end'];
        }

        if (isset($date_start) && isset($date_end) && !isset($data['filter_deleted'])) {
            $sql_filter .= "WHERE i.date_created BETWEEN '" . $date_start . "' AND  '" . $date_end . "'";
            $where = "AND";
        } else {
            if (isset($date_start)) {
                $sql_filter .= " " . $where . " i.date_modified >= '" . $date_start . "'";
                $where = "AND";
            }
            if (isset($date_end)) {
                $sql_filter .= " " . $where . " i.date_created  <= '" . $date_end . "'";
                $where = "AND";
            }
        }

        $sql = "SELECT i.item_id, i.itemname, i.wialon_id, i.date_created, i.date_last, i.date_modified, i.server_id,
                                i.wialon_group_id, wg.wialon_groupname, wg.owner_id, wg.wialon_group_off, wg.tarif_id AS tarif_group_id, wg.discount_id AS discount_group_id,
                                i.deleted,
                                i.tracker_uid, i.tracker_hw, i.password, i.sim1, i.sim2,
                                i.tarif_id, i.discount_id, i.sort_order, i.status,
                                (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE i.server_id = s.server_id) AS servername,
                                (SELECT o.ownername FROM " . DB_PREFIX . "owner o WHERE wg.owner_id = o.owner_id) AS ownername
                                FROM " . DB_PREFIX . "item i LEFT JOIN " . DB_PREFIX . "wialongroups wg ON (i.wialon_group_id = wg.wialon_group_id) " . $sql_filter;

        if (!empty($data['filter_name'])) {
            $sql .= " " . $where . " i.itemname LIKE '" . $this->db->escape($data['filter_name']) . "%'";
            $where = "AND";
        }

        if (isset($data['filter_status']) && !is_null($data['filter_status'])) {
            $sql .= " " . $where . " i.status = '" . (int) $data['filter_status'] . "'";
            $where = "AND";
        }

        if (isset($data['filter_group']) && !is_null($data['filter_group'])) {
            $sql .= " " . $where . " i.wialon_group_id = '" . (int) $data['filter_group'] . "'";
            $where = "AND";
        }

        if (isset($data['filter_owner']) && !is_null($data['filter_owner'])) {
            $sql .= " " . $where . " wg.owner_id = '" . (int) $data['filter_owner'] . "'";
            $where = "AND";
        }

        if (isset($data['filter_items']) && $data['filter_items']) {
            $sql .= " " . $where . " i.item_id IN (" . implode(',', $data['filter_items']) . ")";
            $where = "AND";
        }

        //  if (isset($data['filter_deleted'])) {
        //       $sql .= " ".$where." (i.deleted = '" . (int) $data['filter_deleted'] . "' AND i.date_modified > '" . $date_start . "')";
        //       $where = "AND";
        //   }

        $sort_data = array(
            'i.itemname',
            'i.sort_order',
            'i.wialon_group_id',
            'wg.owner_id'
        );


        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY i.item_id";
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

    public function getItemHistory($item_id, $date_start = "", $date_end = "", $order = "DESC") {
        $sql = "SELECT ih.item_history_id, ih.item_id, ih.itemname, ih.date_changed, ih.item_status, ih.wialon_group_off, ih.history_tarif_id, ih.history_discount_id,
                                ih.wialon_group_id, wg.wialon_groupname, wg.owner_id, wg.tarif_id AS tarif_group_id, wg.discount_id AS discount_group_id,
                                i.server_id, i.wialon_id, i.deleted,i.status, i.date_created, i.date_modified, i.tarif_id, i.discount_id,
                                ih.tracker_uid, ih.tracker_hw, ih.sim1, ih.sim2,
                                (SELECT t.trackername FROM " . DB_PREFIX . "tracker t WHERE t.tracker_id = (SELECT tts.tracker_id FROM " . DB_PREFIX . "tracker_to_server tts WHERE i.server_id = tts.server_id AND ih.tracker_hw = tts.tracker_hw)) AS trackername,
                                (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE i.server_id = s.server_id) AS servername,
                                (SELECT o.ownername FROM " . DB_PREFIX . "owner o WHERE wg.owner_id = o.owner_id) AS ownername
                                FROM " . DB_PREFIX . "item_history ih
                                LEFT JOIN " . DB_PREFIX . "wialongroups wg ON (ih.wialon_group_id = wg.wialon_group_id)
                                LEFT JOIN " . DB_PREFIX . "item i ON (ih.item_id = i.item_id)";
        $sql .= "WHERE ih.item_id = '" . (int) $item_id . "'";

        if ($date_start && $date_end) {
            $sql .= " AND ih.date_changed BETWEEN  '" . $date_start . "' AND  '" . $date_end . "'";
        }

        $query = $this->db->query($sql . " ORDER BY ih.date_changed " . $order);

        return $query->rows;
    }

}
