<?php

use Cart\Length;

require_once(DIR_SYSTEM . 'library/wtools/history.php');

class ControllerHistoryHistory extends Controller
{

    private $error = array();
    private static $new_item_id = 0;

    public function index()
    {
        $this->load->model('history/history');

        $this->getList();
    }

    public function edit()
    {
        $this->load->model('catalog/item');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_catalog_item->editItem($this->request->post['item_id'], $this->request->post);
            $history_data = array(
                'item_id' => $this->request->post['item_id'],
                'date_changed' => (new DateTime($this->request->post['date_changed']))->format('Y-m-d'),
                'history_tarif_id' => $this->request->post['tarif_id'] ? $this->request->post['tarif_id'] : $this->request->post['tarif_group_id'],
                'history_discount_id' => $this->request->post['discount_id'] ? $this->request->post['discount_id'] : $this->request->post['discount_group_id'],
            );
            $this->model_catalog_item->addItemHistory($history_data);
        }
    }

    public function getList()
    {
        $this->load->model('history/history');

       // $data['items'] = array();
        $date_start = (new DateTime())->format('Y-m-d');
        $date_end = (new DateTime())->format('Y-m-d');
       // if ($this->config->get('config_history_date_start')) {
       //     $date_start = (new DateTime($this->config->get('config_history_date_start')))->format('Y-m-d');
       // }
       // if ($this->config->get('config_history_autoperiod') && $this->config->get('config_history_period')) {
       //     $date_start = (new DateTime('- ' . $this->config->get('config_history_period') . ' month'))->format('Y-m-d');
       // }
      
        $filter_data = array(            
            'date_start' => isset($this->request->get['date_start']) ? (new DateTime($this->request->get['date_start']))->format("Y-m-d") : $date_start,
            'date_end'   => isset($this->request->get['date_end']) ? (new DateTime($this->request->get['date_end']))->format("Y-m-d") : $date_end, 
            'start'      => isset($this->request->get['start']) ? $this->request->get['start'] : 0,
            'limit'      => isset($this->request->get['limit']) ? $this->request->get['limit'] : 2000           
        );

        $total = $this->model_history_history->getTotalHistory($filter_data);
        $results = $this->model_history_history->getHistory($filter_data);

        foreach ($results as $result) {           
            $result['deleted'] = $result['deleted'] && ($result['date_changed'] >= $result['date_modified']) ? $result['deleted'] : 0;               
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode(['pos' => $filter_data['start'], 'total_count' => $total, 'data' => $results], JSON_UNESCAPED_UNICODE));
    }

    public function getForm()
    {
       
        $this->load->model('catalog/item');
        $data['heading_title'] = $this->language->get('heading_title');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->request->get['item_id']) && ($this->request->get['item_id'] != 'undefined')) {
            $item_info = $this->model_catalog_item->getItem($this->request->get['item_id']);
            $data['item_id'] = $this->request->get['item_id'];
        } else {
            $item_info = $this->model_catalog_item->getItem($this->new_item_id);
            $data['item_id'] = $this->new_item_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['itemname'])) {
            $data['itemname'] = $this->request->post['itemname'];
        } elseif (!empty($item_info)) {
            $data['itemname'] = $item_info['itemname'];
        } else {
            $data['itemname'] = '';
        }

        if (isset($this->request->post['deleted'])) {
            $data['deleted'] = $this->request->post['deleted'];
        } elseif (!empty($item_info)) {
            $data['deleted'] = $item_info['deleted'];
        } else {
            $data['deleted'] = '';
        }

        if (isset($this->request->post['server_id'])) {
            $data['server_id'] = $this->request->post['server_id'];
        } elseif (!empty($item_info)) {
            $data['server_id'] = $item_info['server_id'];
        } else {
            $data['server_id'] = '';
        }

        if (!empty($item_info)) {
            $data['date_created'] = date($this->language->get('date_format_short'), strtotime($item_info['date_created']));
        }
        if (!empty($item_info)) {
            $data['date_last'] = date($this->language->get('date_format_short'), strtotime($item_info['date_last']));
        }
        if (!empty($item_info)) {
            $data['date_modified'] = date($this->language->get('date_format_short'), strtotime($item_info['date_modified']));
        }

        if (isset($this->request->post['wialon_id'])) {
            $data['wialon_id'] = $this->request->post['wialon_id'];
        } elseif (!empty($item_info)) {
            $data['wialon_id'] = $item_info['wialon_id'];
        } else {
            $data['wialon_id'] = '';
        }

        if (isset($this->request->post['servername'])) {
            $data['servername'] = $this->request->post['servername'];
        } elseif (!empty($item_info)) {
            $data['servername'] = $item_info['servername'];
        } else {
            $data['servername'] = '';
        }


        if (isset($this->request->post['wialon_groupname'])) {
            $data['wialon_groupname'] = $this->request->post['wialon_groupname'];
        } elseif (!empty($item_info)) {
            $data['wialon_groupname'] = $item_info['wialon_groupname'];
        } else {
            $data['wialon_groupname'] = '';
        }

        if (isset($this->request->post['wialon_group_off'])) {
            $data['wialon_group_off'] = $this->request->post['wialon_group_off'];
        } elseif (!empty($item_info)) {
            $data['wialon_group_off'] = $item_info['wialon_group_off'];
        } else {
            $data['wialon_group_off'] = '';
        }

        if (isset($this->request->post['ownername'])) {
            $data['ownername'] = $this->request->post['ownername'];
        } elseif (!empty($item_info)) {
            $data['ownername'] = $item_info['ownername'];
        } else {
            $data['ownername'] = '';
        }

        if (isset($this->request->post['owner_id'])) {
            $data['owner_id'] = $this->request->post['owner_id'];
        } elseif (!empty($item_info)) {
            $data['owner_id'] = $item_info['owner_id'];
        } else {
            $data['owner_id'] = '';
        }

        if (isset($this->request->post['tracker_hw'])) {
            $data['tracker_hw'] = $this->request->post['tracker_hw'];
        } elseif (!empty($item_info)) {
            $data['tracker_hw'] = $item_info['tracker_hw'];
        } else {
            $data['tracker_hw'] = '';
        }

        if (isset($this->request->post['trackername'])) {
            $data['tracker_hw'] = $this->request->post['trackername'];
        } elseif (!empty($item_info)) {
            $data['trackername'] = $item_info['trackername'];
        } else {
            $data['trackername'] = '';
        }

        if (isset($this->request->post['tracker_uid'])) {
            $data['tracker_uid'] = $this->request->post['tracker_uid'];
        } elseif (!empty($item_info)) {
            $data['tracker_uid'] = $item_info['tracker_uid'];
        } else {
            $data['tracker_uid'] = '';
        }

        if (isset($this->request->post['password'])) {
            $data['password'] = $this->request->post['password'];
        } elseif (!empty($item_info)) {
            $data['password'] = $item_info['password'];
        } else {
            $data['password'] = '';
        }

        if (isset($this->request->post['sim2'])) {
            $data['sim2'] = $this->request->post['sim2'];
        } elseif (!empty($item_info)) {
            $data['sim2'] = $item_info['sim2'];
        } else {
            $data['sim2'] = '';
        }

        if (isset($this->request->post['sim1'])) {
            $data['sim1'] = $this->request->post['sim1'];
        } elseif (!empty($item_info)) {
            $data['sim1'] = $item_info['sim1'];
        } else {
            $data['sim1'] = '';
        }

        if (isset($this->request->post['tarif_id'])) {
            $data['tarif_id'] = $this->request->post['tarif_id'];
        } elseif (!empty($item_info)) {
            $data['tarif_id'] = $item_info['tarif_id'];
        } else {
            $data['tarif_id'] = 0;
        }

        if (isset($this->request->post['tarif_group_id'])) {
            $data['tarif_group_id'] = $this->request->post['tarif_group_id'];
        } elseif (!empty($item_info)) {
            $data['tarif_group_id'] = $item_info['tarif_group_id'];
        } else {
            $data['tarif_group_id'] = 0;
        }


        if (isset($this->request->post['discount_id'])) {
            $data['discount_id'] = $this->request->post['discount_id'];
        } elseif (!empty($item_info)) {
            $data['discount_id'] = $item_info['discount_id'];
        } else {
            $data['discount_id'] = 0;
        }

        if (isset($this->request->post['discount_group_id'])) {
            $data['discount_group_id'] = $this->request->post['discount_group_id'];
        } elseif (!empty($item_info)) {
            $data['discount_group_id'] = $item_info['discount_group_id'];
        } else {
            $data['discount_group_id'] = 0;
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($item_info)) {
            $data['sort_order'] = $item_info['sort_order'];
        } else {
            $data['sort_order'] = 0;
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($item_info)) {
            $data['status'] = $item_info['status'];
        } else {
            $data['status'] = 0;
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm()
    {
        if (!$this->user->hasPermission('modify', 'catalog/item')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
        //return !$this->error;
    }

    public function validateDelete()
    {
        if (!$this->user->hasPermission('modify', 'catalog/item')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->load->model('catalog/product');

        // foreach ($this->request->post['selected'] as $item_id) {
        $product_total = $this->model_catalog_product->getTotalProductsByItemId($this->request->post['item_id']);

        if ($product_total) {
            $this->error['warning'] = sprintf($this->language->get('error_product'), $product_total);
        }
        // }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

    public function getServers()
    {
        $this->load->model('setting/server');
        $arrayselect = [];
        $data['servers'] = $this->model_setting_server->getServers();
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['servers'] as $server) {
            $arrayselect[] = array('id' => $server['server_id'], 'value' => $server['servername']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getDiscounts()
    {
        $this->load->model('billing/discount');
        $arrayselect = [];
        $data['discounts'] = $this->model_billing_discount->getDiscounts();
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['discounts'] as $discount) {
            $arrayselect[] = array('id' => $discount['discount_id'], 'value' => $discount['discountname']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getTarifs()
    {
        $this->load->model('billing/tarif');
        $arrayselect = [];
        $data['tarifs'] = $this->model_billing_tarif->getTarifs();
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['tarifs'] as $tarif) {
            $arrayselect[] = array('id' => $tarif['tarif_id'], 'value' => $tarif['tarifname']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getItemHistory()
    {
        $this->load->model('catalog/item');

        if (isset($this->request->get['item_id']) && ($this->request->get['item_id'] != 'undefined')) {
            $date_start = '';
            $date_end = (new DateTime())->format('Y-m-d');
            if ($this->config->get('config_history_date_start')) {
                $date_start = (new DateTime($this->config->get('config_history_date_start')))->format('Y-m-d');
            }
            if ($this->config->get('config_history_autoperiod') && $this->config->get('config_history_period')) {
                $date_start = (new DateTime('- ' . $this->config->get('config_history_period') . ' month'))->format('Y-m-d');
            }
            $history = new History($this->request->get['item_id'], $this->request->get['owner_id'], $date_start, $date_end, $this->db);
            $item_history = $history->history_data;
            // $item_history = $this->model_catalog_item->getItemHistory($this->request->get['item_id'],$date_start, $date_end);
        }

        $data['items'] = array();

        if (!empty($item_history)) {
            foreach ($item_history as $result) {    // попробовать вывести без массива напрямую в json
                $data['items'][] = array(
                    'item_history_id' => $result['item_history_id'],
                    'item_id' => $result['item_id'],
                    'itemname' => $result['itemname'],
                    'wialon_id' => $result['wialon_id'],
                    'server_id' => $result['server_id'],
                    'servername' => $result['servername'],
                    'date_changed' => $result['date_changed'],
                    'date_modified' => $result['date_modified'],
                    'wialon_group_id' => $result['wialon_group_id'],
                    'wialon_groupname' => $result['wialon_groupname'],
                    'wialon_group_off' => $result['wialon_group_off'],
                    // 'tarif_group_id' => $result['tarif_group_id'],
                    // 'discount_group_id' => $result['discount_group_id'],
                    'owner_id' => $result['owner_id'],
                    'ownername' => $result['ownername'],
                    'tracker_uid' => $result['tracker_uid'],
                    'tracker_hw' => $result['tracker_hw'],
                    'trackername' => $result['trackername'],
                    'sim1' => $result['sim1'],
                    'sim2' => $result['sim2'],
                    'history_tarif_id' => $result['history_tarif_id'],
                    'history_discount_id' => $result['history_discount_id'],
                    //  'sort_order' => $result['sort_order'],
                    'deleted' => $result['deleted'] && ($result['date_changed'] >= $result['date_modified']) ? $result['deleted'] : 0,
                    'status' => $result['status'],
                    'online' => $result['online'],
                );
            }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['items'], JSON_UNESCAPED_UNICODE));
    }
}
