<?php

require_once(DIR_SYSTEM . 'library/wtools/tree.php');
require_once(DIR_SYSTEM . 'library/wtools/history.php');
require_once(DIR_SYSTEM . 'library/wtools/billing.php');

class ControllerReportBilling extends Controller {

    public function getItemBiling() {
        $this->load->model('catalog/item');
        $this->load->model('billing/tarif');

        $checked = explode(',', $this->request->get['checked']);
        $checked_obj = [];
        foreach ($checked as $check) {
            if (preg_match("/^\d*[\.]\d*[\.]\d*$/", $check)) {
                $ch = explode('.', $check);
                $checked_obj[] = $ch[2];
            }
        }
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'wg.owner_id';
        }

        if (isset($this->request->get['order'])) {
            $order = $this->request->get['order'];
        } else {
            $order = 'ASC';
        }

        $filter_data = array(
            'filter_items' => $checked_obj,
            'sort' => $sort,
            'order' => $order,
            'start' => 0,
            'limit' => 0
        );

        $results = $this->model_catalog_item->getItems($filter_data);

        $data['items'] = array();
        $total = 0;
        $data['billings'] = array();

        foreach ($results as $result) {
            $item_history = new History($result['item_id'], $this->request->get['date_start'], $this->request->get['date_end'], $this->db);
            $history_intervals = $item_history->history_intervals;

            if ($history_intervals) {
                $data['billings'] = $this->BillingFor($history_intervals);

                $total = 0;
                foreach ($data['billings'] as $billing) {
                    $total += $billing['sum'];
                }
            }

            $data['items'][] = array(
                'item_id' => $result['item_id'],
                'itemname' => $result['itemname'],
                'wialon_id' => $result['wialon_id'],
                'server_id' => $result['server_id'],
                'servername' => $result['servername'],
                'date_created' => date($this->language->get('date_format_short'), strtotime($result['date_created'])),
                'date_last' => date($this->language->get('date_format_short'), strtotime($result['date_last'])),
                'date_modified' => date($this->language->get('date_format_short'), strtotime($result['date_modified'])),
                'wialon_group_id' => $result['wialon_group_id'],
                'wialon_groupname' => $result['wialon_groupname'],
                'wialon_group_off' => $result['wialon_group_off'],
                'tarif_group_id' => $result['tarif_group_id'],
                'discount_group_id' => $result['discount_group_id'],
                'owner_id' => $result['owner_id'],
                'ownername' => $result['ownername'],
                'deleted' => $result['deleted'],
                'tracker_uid' => $result['tracker_uid'],
                'tracker_hw' => $result['tracker_hw'],
                // 'trackername' => $result['trackername'],
                'sim1' => $result['sim1'],
                'sim2' => $result['sim2'],
                'tarif_id' => $result['tarif_id'],
                'discount_id' => $result['discount_id'],
                'sort_order' => $result['sort_order'],
                'status' => $result['status'],
                'billing' => $total
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['billings'], JSON_UNESCAPED_UNICODE));
    }

    public function getOwnersTree() {
        $this->load->model('catalog/item');
        $this->load->model('catalog/owner');
        $this->load->model('catalog/wialongroup');

        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            //$sort = 'wg.owner_id';
            $sort = 'itemname';
        }

        if (isset($this->request->get['order'])) {
            $order = $this->request->get['order'];
        } else {
            $order = 'ASC';
        }

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => 0,
            'limit' => 0
        );

        $results = $this->model_catalog_item->getItems($filter_data);

        $filter_data = array(
            'filter_status' => '1',
        );
        $owners = $this->model_catalog_owner->getOwners($filter_data);
        $wialon_groups = $this->model_catalog_wialongroup->getWialongroups($filter_data);

        $wialon_groups_by_owner_id = $this->GroupBy($wialon_groups, 'owner_id');
        $items_group_by_group = $this->GroupBy($results, 'wialon_group_id');

        $ownerNode = new Node();
        foreach ($owners as $owner) {
            $owner_id = $owner['owner_id'];
            $wgroupNode = new Node();
            if (isset($wialon_groups_by_owner_id[$owner_id])) {
                foreach ($wialon_groups_by_owner_id[$owner_id] as $group) {
                    $itemNode = new Node();
                    $group_id = $group['wialon_group_id'];
                    if (isset($items_group_by_group[$group_id])) {
                        foreach ($items_group_by_group[$group_id] as $item) {
                            $itemNode->addSibling(new Node(['id' => $owner_id . '.' . $group_id . '.' . $item['item_id'], 'value' => $item['itemname']]));
                        }
                    }
                    $itemNode->sort('value');
                    $wgroupNode->addSibling(new Node(['id' => $owner_id . '.' . $group_id, 'value' => $group['wialon_groupname'], 'data' => $itemNode->render()]));
                }
            }
            $wgroupNode->sort('value');
            $ownerNode->addSibling(new Node(array("id" => $owner_id, "value" => $owner['ownername'], "data" => $wgroupNode->render())));
        }
        $ownerNode->sort('value');

        $rootData = array(
            "value" => 'Владельцы',
            "id" => 'root',
            "open" => 'true',
            "data" => $ownerNode->render(),
        );
        $ownerTree = new Tree(new Node($rootData));

        $tree_data = $ownerTree->render();

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($tree_data));
    }

    public function getOwnersBillingTree() {
        $this->load->model('catalog/item');
        $this->load->model('catalog/owner');
        $this->load->model('catalog/wialongroup');
        $this->load->model('billing/tarif');

        $checked = explode(',', trim($this->request->post['checked'],'[]'));
        $checked_obj = [];
        foreach ($checked as $check) {
            $checked_clear = str_replace('&quot;', "", $check);
            if (preg_match("/^\d*[\.]\d*[\.]\d*$/", $checked_clear)) {
                $ch = explode('.', $checked_clear);
                $checked_obj[] = $ch[2];
            }
        }
        if (isset($this->request->post['sort'])) {
            $sort = $this->request->post['sort'];
        } else {
            $sort = 'wg.owner_id';
        }

        if (isset($this->request->post['order'])) {
            $order = $this->request->post['order'];
        } else {
            $order = 'ASC';
        }

        $filter_data = array(
            'filter_items' => $checked_obj,
            'filter_deleted' => 0,
            'date_start' => (new DateTime($this->request->post['date_start']))->format("Y-m-d"),
            'date_end' => (new DateTime($this->request->post['date_end']))->format("Y-m-d"),
            'sort' => $sort,
            'order' => $order,
            'start' => 0,
            'limit' => 0
        );

        $results = $this->model_catalog_item->getItems($filter_data);
        $data['items'] = array();
        $total = 0;
        $data['billings'] = array();

        $owners_group = $this->GroupBy($results, 'owner_id');

        $wialon_group = [];
        foreach ($owners_group as $key => $owner_data) {
            $wialon_group[$key] = $this->GroupBy($owner_data, 'wialon_group_id');
        }
        $items_group = [];
        foreach ($wialon_group as $wialon_group_data) {
            foreach ($wialon_group_data as $key => $group_data) {
                $items_group[$key] = $this->GroupBy($group_data, 'item_id');
            }
        }

        // $owners = $this->model_catalog_owner->getOwners();
        // $wialon_groups = $this->model_catalog_wialongroup->getWialongroups();
        $owners = array_column($results, 'ownername', 'owner_id');
        $wialon_groups_ready = array_column($results, 'wialon_groupname', 'wialon_group_id');
        //  $wialon_groups_ready = $this->StructureBy($wialon_groups, 'wialon_group_id', 'wialon_groupname');
        $ownerNode = new Node();
        foreach ($owners as $owner_id => $ownername) {
            // $owner_id = $owner['owner_id'];
            $total_owner = 0;
            $wgroupNode = new Node();
            if (isset($wialon_group[$owner_id])) {
                foreach ($wialon_group[$owner_id] as $group_id => $group) {
                    $total_group = 0;
                    $itemNode = new Node();
                    if (isset($items_group[$group_id])) {
                        foreach ($items_group[$group_id] as $id => $item) {
                            $data['billings'] = array();
                            $item_history = new History($id, $this->request->post['date_start'], $this->request->post['date_end'], $this->db);
                            $history_intervals = $item_history->history_intervals;
                            if ($history_intervals) {
                                $data['billings'] = $this->BillingFor($history_intervals);
                            }
                            $total = 0;
                            foreach ($data['billings'] as $billing) {
                                $total += $billing['sum'];
                            }
                            $total_group += $total;
                            $itemNode->addSibling(new Node(['id' => $owner_id . '.' . $group_id . '.' . $id, 'value' => $item[0]['itemname'] . ' (' . $total . ')', 'data' => $data['billings']]));
                        }
                    }
                    $itemNode->sort('value');
                    $total_owner += $total_group;
                    $wgroupNode->addSibling(new Node(['id' => $owner_id . '.' . $group_id, 'value' => $wialon_groups_ready[$group_id] . ' (Сумма: ' . $total_group . ')', 'data' => $itemNode->render()]));
                }
            }
            $wgroupNode->sort('value');
            $ownerNode->addSibling(new Node(array("id" => $owner_id, "value" => $ownername . ' (Итого: ' . $total_owner . ')', "data" => $wgroupNode->render())));
        }
        $ownerNode->sort('value');

        $rootData = array(
            "value" => 'Владельцы',
            "id" => 'root',
            "open" => 'true',
            "data" => $ownerNode->render(),
        );
        $ownerTree = new Tree(new Node($rootData));

        $tree_data = $ownerTree->render();

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($tree_data));
    }

    private function GroupBy($array, $key) {
        $resultArr = array();
        foreach ($array as $row) {
            //   $resultArr[$row[$id]][] = ['id' => $row[$id], 'value' => $row[$key], 'data' => $row];
            $resultArr[$row[$key]][] = $row;
        }
        //  ksort($resultArr, SORT_ASC);
        return $resultArr;
    }

    private function StructureBy($array, $id, $value) {
        $resultArr = array();
        foreach ($array as $row) {
            $resultArr[$row[$id]][] = ['id' => $row[$id], 'value' => $row[$value],];
            // $resultArr[$row[$id]][] = $row;
        }
        //  ksort($resultArr, SORT_ASC);
        return $resultArr;
    }

    private function BillingFor($history_intervals) {

        $data['billings'] = array();
        foreach ($history_intervals as $history_interval) {
            $tarif = !$history_interval['event_status'] ? $this->model_billing_tarif->getTarif($history_interval['tarif_id']) : 0;

            $discount = new Discount($history_interval['discount_id'], $history_interval['date_start'], $history_interval['date_end'], $this->db);
            $discount_intervals = $discount->discount_intervals;

            foreach ($discount_intervals as $discount_interval) {
                $billing_for_discount_interval = new Billing($discount_interval, $tarif, $history_interval['event_name']);
                $data['billings'][] = $billing_for_discount_interval->billing_data;
            }
        }

        return $data['billings'];
    }

}
