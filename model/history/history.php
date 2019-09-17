<?php

class ModelHistoryHistory extends Model
{
    public function getHistory($data = array())
    {       
        $sql = "SELECT ih.item_history_id, ih.item_id, i.itemname, ih.date_changed, ih.item_status, ih.wialon_group_off, ih.online, 
                ih.history_tarif_id, ih.history_discount_id,
                ih.wialon_group_id, wg.wialon_groupname,
                o.owner_id, o.ownername,
                wg.tarif_id AS tarif_group_id, wg.discount_id AS discount_group_id,
                i.server_id, i.wialon_id, i.deleted, i.status, i.date_created, i.date_modified, i.date_last, i.tarif_id, i.discount_id, i.sort_order, 
                ih.tracker_uid, ih.tracker_hw, ih.sim1, ih.sim2,                                
                (SELECT t.trackername FROM " . DB_PREFIX . "tracker t WHERE t.tracker_id = 
                (SELECT tts.tracker_id FROM " . DB_PREFIX . "tracker_to_server tts WHERE i.server_id = tts.server_id AND ih.tracker_hw = tts.tracker_hw)) AS trackername,
                (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE i.server_id = s.server_id) AS servername                                
                FROM " . DB_PREFIX . "item_history ih, " . DB_PREFIX . "item i, " . DB_PREFIX . "wialongroups wg , " . DB_PREFIX . "owner o 
                WHERE ih.date_changed BETWEEN  '" . $data['date_start'] . "' AND  '" . $data['date_end'] . "' AND i.item_id = ih.item_id AND wg.wialon_group_id = ih.wialon_group_id AND o.owner_id = wg.owner_id"; 
               
                $sql .= "  ORDER BY o.owner_id, ih.wialon_group_id, ih.date_changed DESC";


        $query = $this->db->query($sql);

        return $query->rows;
    }
   
    public function addItemHistory($data)
    {
        $sql = "UPDATE " . DB_PREFIX . "item_history SET  history_tarif_id = '" . (int) $data['history_tarif_id'] . "', history_discount_id = '" . (int) $data['history_discount_id'] . "'"
            . " WHERE item_id = '" . (int) $data['item_id'] . "' AND  date_changed >= '" . $data['date_changed'] . "'";

        $this->db->query($sql);

        $this->cache->delete('item');
    }

    public function addGroupHistory($data)
    {
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

    public function getItemsFromHistory($data = array())
    {       
        $sql = "SELECT ih.item_history_id, ih.item_id, i.itemname, ih.date_changed, ih.item_status, ih.wialon_group_off, ih.history_tarif_id, ih.history_discount_id,
                ih.wialon_group_id, wg.wialon_groupname,
                o.owner_id, o.ownername,
                wg.tarif_id AS tarif_group_id, wg.discount_id AS discount_group_id,
                i.server_id, i.wialon_id, i.deleted, i.status, i.date_created, i.date_modified, i.date_last, i.tarif_id, i.discount_id, i.sort_order, 
                ih.tracker_uid, ih.tracker_hw, ih.sim1, ih.sim2,                                
                (SELECT t.trackername FROM " . DB_PREFIX . "tracker t WHERE t.tracker_id = 
                (SELECT tts.tracker_id FROM " . DB_PREFIX . "tracker_to_server tts WHERE i.server_id = tts.server_id AND ih.tracker_hw = tts.tracker_hw)) AS trackername,
                (SELECT s.servername FROM " . DB_PREFIX . "server s WHERE i.server_id = s.server_id) AS servername                                
                FROM " . DB_PREFIX . "item_history ih, " . DB_PREFIX . "item i, " . DB_PREFIX . "wialongroups wg , " . DB_PREFIX . "owner o 
                WHERE ih.date_changed BETWEEN  '" . $data['date_start'] . "' AND  '" . $data['date_end'] . "' AND i.item_id = ih.item_id AND wg.wialon_group_id = ih.wialon_group_id AND o.owner_id = wg.owner_id"; 

                if (isset($data['filter_items']) && $data['filter_items']) {
                    $sql .= " AND i.item_id IN (" . implode(',', $data['filter_items']) . ")";                    
                } 

                $sql .= " GROUP BY ih.item_id, o.owner_id ORDER BY o.owner_id, ih.item_id";


        $query = $this->db->query($sql);

        return $query->rows;
    }

    public function getItemHistory($item_id, $date_start = "", $date_end = "", $order = "DESC")
    {
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
