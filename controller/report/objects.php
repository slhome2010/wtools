<?php

class ControllerReportObjects extends Controller {

    public function index() {
        $this->load->language('report/product_purchased');

        $this->document->setTitle($this->language->get('heading_title'));
        $date_start = (new DateTime($this->request->get['date_start']))->format('Y-m-d');
        $date_end = (new DateTime($this->request->get['date_end']))->format('Y-m-d');

      /*  $sql = "SELECT oc_item_history.item_id AS id"
                . ", oc_item.itemname AS itemName"
                . ", COALESCE(oc_owner.ownername, '0 Не присвоено') AS organizationName"
                . ", oc_server.servername AS servername"
                . ", COALESCE(count_on.count, 0) AS 'on'"
                . ", COALESCE(count_off.count, 0) AS off"
                . ", COALESCE(count_disconnect.count, 0) AS disconnect"
                . ", COALESCE(count_total.count, 0) AS total "
                . "FROM oc_item_history "
                . "LEFT JOIN oc_item ON oc_item.item_id = oc_item_history.item_id "
                . "LEFT JOIN oc_wialongroups ON oc_wialongroups.wialon_group_id = oc_item_history.wialon_group_id "
                . "LEFT JOIN oc_owner ON oc_owner.owner_id = oc_wialongroups.owner_id "
                . "LEFT JOIN oc_server ON oc_server.server_id = oc_item.server_id "
                . "LEFT JOIN "
                . "(SELECT oc_item_history.item_id, COUNT(oc_item_history.online) AS count "
                . "FROM oc_item_history "
                . "WHERE oc_item_history.online = 1 "
                . "AND oc_item_history.wialon_group_off = 0 "
                . "AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                . "GROUP BY oc_item_history.item_id) count_on ON count_on.item_id = oc_item_history.item_id "
                . "LEFT JOIN "
                . "(SELECT oc_item_history.item_id, COUNT(oc_item_history.online) AS count "
                . "FROM oc_item_history "
                . "WHERE oc_item_history.online = 0 "
                . "AND oc_item_history.wialon_group_off = 0 "
                . "AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                . "GROUP BY oc_item_history.item_id) count_off ON count_off.item_id = oc_item_history.item_id "
                . "LEFT JOIN "
                . "(SELECT oc_item_history.item_id, COUNT(oc_item_history.wialon_group_off) AS count "
                . "FROM oc_item_history "
                . "WHERE oc_item_history.wialon_group_off = 1 "
                //. "AND oc_item_history.wialon_group_off = 1 "
                . "AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                . "GROUP BY oc_item_history.item_id) count_disconnect ON count_disconnect.item_id = oc_item_history.item_id "
                . "LEFT JOIN "
                . "(SELECT oc_item_history.item_id, COUNT(oc_item_history.item_id) AS count "
                . "FROM oc_item_history "
                . "WHERE oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                . "GROUP BY oc_item_history.item_id) count_total ON count_total.item_id = oc_item_history.item_id "
                . "WHERE "
                . "oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                . "GROUP BY oc_item_history.item_id";*/

        $sql = "SELECT oc_item_history.item_id AS item_id"
                    . ", oc_owner.owner_id"
                    . ", oc_item.itemname AS itemName"
                    . ", oc_owner.ownername AS organizationName"
                    . ", oc_server.servername AS servername"
                    . ", COALESCE(count_on.count, 0) AS 'on'"
                    . ", COALESCE(count_off.count, 0) AS off"
                    . ", COALESCE(count_disconnect.count, 0) AS disconnect"
                    . ", COALESCE(count_total.count, 0) AS total "
                    . "FROM oc_item_history "
                    . "LEFT JOIN oc_item ON oc_item.item_id = oc_item_history.item_id "
                    . "LEFT JOIN oc_wialongroups ON oc_wialongroups.wialon_group_id = oc_item_history.wialon_group_id "
                    . "LEFT JOIN oc_owner ON oc_owner.owner_id = oc_wialongroups.owner_id "
                    . "LEFT JOIN oc_server ON oc_server.server_id = oc_item.server_id "
                    . "LEFT JOIN "
                        . "(SELECT oc_item_history.item_id, oc_wialongroups.owner_id, COUNT(oc_item_history.online) AS count "
                        . "FROM oc_item_history, oc_wialongroups "
                        . "WHERE oc_item_history.online = 1 "
                        . "AND oc_wialongroups.wialon_group_id = oc_item_history.wialon_group_id "
                        . "AND oc_item_history.wialon_group_off = 0 "
                        . "AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                        . "GROUP BY oc_item_history.item_id, oc_wialongroups.owner_id) count_on ON (count_on.item_id = oc_item_history.item_id AND count_on.owner_id = oc_wialongroups.owner_id) "
                    . "LEFT JOIN "
                        . "(SELECT oc_item_history.item_id, oc_wialongroups.owner_id, COUNT(oc_item_history.online) AS count "
                        . "FROM oc_item_history, oc_wialongroups "
                        . "WHERE oc_item_history.online = 0 "
                        . "AND oc_wialongroups.wialon_group_id = oc_item_history.wialon_group_id "
                        . "AND oc_item_history.wialon_group_off = 0 "
                        ."AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                        . "GROUP BY oc_item_history.item_id, oc_wialongroups.owner_id) count_off ON (count_off.item_id = oc_item_history.item_id AND count_off.owner_id = oc_wialongroups.owner_id) "
                    . "LEFT JOIN "
                        . "(SELECT oc_item_history.item_id, oc_wialongroups.owner_id, COUNT(oc_item_history.wialon_group_off) AS count "
                        . "FROM oc_item_history, oc_wialongroups "
                        . "WHERE oc_item_history.wialon_group_off = 1 "
                        . "AND oc_wialongroups.wialon_group_id = oc_item_history.wialon_group_id "
                        //. "AND oc_item_history.wialon_group_off = 1 "
                        . "AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                        . "GROUP BY oc_item_history.item_id, oc_wialongroups.owner_id) count_disconnect ON (count_disconnect.item_id = oc_item_history.item_id AND count_disconnect.owner_id = oc_wialongroups.owner_id) "
                    . "LEFT JOIN "
                        . "(SELECT oc_item_history.item_id, oc_wialongroups.owner_id, COUNT(oc_item_history.item_id) AS count "
                        . "FROM oc_item_history, oc_wialongroups "
                        . "WHERE "
                        . "oc_wialongroups.wialon_group_id = oc_item_history.wialon_group_id "
                        . "AND oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                        . "GROUP BY oc_item_history.item_id, oc_wialongroups.owner_id) count_total ON (count_total.item_id = oc_item_history.item_id AND count_total.owner_id = oc_wialongroups.owner_id) "
                    . "WHERE "
                    . "oc_item_history.date_changed BETWEEN '" . $date_start . "' AND  '" . $date_end . "' "
                    . "GROUP BY oc_item_history.item_id, oc_owner.ownername";

        $result = $this->db->query($sql)->rows;

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($result, JSON_UNESCAPED_UNICODE));
    }

}
