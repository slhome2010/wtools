<?php

class ControllerCatalogWialongroup extends Controller {

    private $error = array();
    private static $new_wialon_group_id = 0;

    public function index() {
        //$this->load->language('catalog/wialongroup');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('catalog/wialongroup');

        $this->getList();
    }

    public function add() {
        $this->load->model('catalog/wialongroup');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_wialon_group_id = $this->model_catalog_wialongroup->addWialongroup($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('catalog/wialongroup');
        $this->load->model('catalog/item');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_catalog_wialongroup->editWialongroup($this->request->post['wialon_group_id'], $this->request->post);

            $history_data = array(
                'wialon_group_id' => $this->request->post['wialon_group_id'],
                'date_changed' => (new DateTime($this->request->post['date_changed']))->format('Y-m-d'),
                'history_tarif_id' => $this->request->post['tarif_id'],
                'history_discount_id' => $this->request->post['discount_id'],
                'wialon_group_off' => $this->request->post['wialon_group_off'],
            );
            if (isset($this->request->post['old_tarif_id'])) {
                $history_data['old_tarif_id'] = $this->request->post['old_tarif_id'];
            }
            if (isset($this->request->post['old_discount_id'])) {
                $history_data['old_discount_id'] = $this->request->post['old_discount_id'];
            }

            $this->model_catalog_item->addGroupHistory($history_data);
        }
    }

    public function delete() {
        $this->load->model('catalog/wialongroup');

        if (isset($this->request->post['wialon_group_id'])) {
            //foreach ($this->request->post['selected'] as $wialongroup_id) {
            $this->model_catalog_wialongroup->deleteWialongroup($this->request->post['wialon_group_id']);
            //}
        }
    }

    public function getList() {
        $this->load->model('catalog/wialongroup');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'wialon_group_id';
        }

        if (isset($this->request->get['order'])) {
            $order = $this->request->get['order'];
        } else {
            $order = 'ASC';
        }

        if (isset($this->request->get['page'])) {
            $page = $this->request->get['page'];
        } else {
            $page = 1;
        }

        $data['wialon_groups'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => 0
        );

        //$wialongroup_total = $this->model_catalog_wialongroup->getTotalManufacturers();

        $results = $this->model_catalog_wialongroup->getWialongroups($filter_data);

        foreach ($results as $result) {
            $data['wialon_groups'][] = array(
                'wialon_group_id' => $result['wialon_group_id'],
                'wialon_groupname' => $result['wialon_groupname'],
                'wialon_group_off' => $result['wialon_group_off'],
                'server_id' => $result['server_id'],
                'servername' => $result['servername'],
                'wialon_id' => $result['wialon_id'],
                'owner_id' => $result['owner_id'],
                'tarif_id' => $result['tarif_id'],
                'discount_id' => $result['discount_id'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['wialon_groups'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {
        //CKEditor

        $this->document->addScript('view/javascript/ckeditor/ckeditor.js');
        $this->document->addScript('view/javascript/ckeditor/ckeditor_init.js');

        $this->load->model('catalog/wialongroup');
        $data['heading_title'] = $this->language->get('heading_title');


        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->request->get['wialon_group_id']) && ($this->request->get['wialon_group_id'] != 'undefined')) {
            $wialon_group_info = $this->model_catalog_wialongroup->getWialongroup($this->request->get['wialon_group_id']);
            $data['wialon_group_id'] = $this->request->get['wialon_group_id'];
        } else {
            $wialon_group_info = $this->model_catalog_wialongroup->getWialongroup($this->new_wialon_group_id);
            $data['wialon_group_id'] = $this->new_wialon_group_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['wialon_groupname'])) {
            $data['wialon_groupname'] = $this->request->post['wialon_groupname'];
        } elseif (!empty($wialon_group_info)) {
            $data['wialon_groupname'] = $wialon_group_info['wialon_groupname'];
        } else {
            $data['wialon_groupname'] = '';
        }

        if (isset($this->request->post['wialon_group_off'])) {
            $data['wialon_group_off'] = $this->request->post['wialon_group_off'];
        } elseif (!empty($wialon_group_info)) {
            $data['wialon_group_off'] = $wialon_group_info['wialon_group_off'];
        } else {
            $data['wialon_group_off'] = '';
        }

        if (isset($this->request->post['server_id'])) {
            $data['server_id'] = $this->request->post['server_id'];
        } elseif (!empty($wialon_group_info)) {
            $data['server_id'] = $wialon_group_info['server_id'];
        } else {
            $data['server_id'] = '';
        }

        if (isset($this->request->post['servername'])) {
            $data['servername'] = $this->request->post['servername'];
        } elseif (!empty($wialon_group_info)) {
            $data['servername'] = $wialon_group_info['servername'];
        } else {
            $data['servername'] = '';
        }

        if (isset($this->request->post['wialon_id'])) {
            $data['wialon_id'] = $this->request->post['wialon_id'];
        } elseif (!empty($wialon_group_info)) {
            $data['wialon_id'] = $wialon_group_info['wialon_id'];
        } else {
            $data['wialon_id'] = '';
        }

        if (isset($this->request->post['owner_id'])) {
            $data['owner_id'] = $this->request->post['owner_id'];
        } elseif (!empty($wialon_group_info)) {
            $data['owner_id'] = $wialon_group_info['owner_id'];
        } else {
            $data['owner_id'] = '';
        }

        if (isset($this->request->post['tarif_id'])) {
            $data['tarif_id'] = $this->request->post['tarif_id'];
        } elseif (!empty($wialon_group_info)) {
            $data['tarif_id'] = $wialon_group_info['tarif_id'];
        } else {
            $data['tarif_id'] = '';
        }

        if (isset($this->request->post['discount_id'])) {
            $data['discount_id'] = $this->request->post['discount_id'];
        } elseif (!empty($wialon_group_info)) {
            $data['discount_id'] = $wialon_group_info['discount_id'];
        } else {
            $data['discount_id'] = '';
        }


        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($wialon_group_info)) {
            $data['status'] = $wialon_group_info['status'];
        } else {
            $data['status'] = 0;
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm() {
        if (!$this->user->hasPermission('modify', 'catalog/wialongroup')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
        //return !$this->error;
    }

    public function validateAdd() {
        $this->load->language('catalog/validate');

        if (isset($this->request->post['grid_id'])) {
            $grid_id = $this->request->post['grid_id'];
        } else {
            $grid_id = "";
        }

        if ($grid_id) {
            if (!$this->user->hasPermission('modify', str_replace('-', '/', $grid_id))) {
                $this->error['warning'] = $this->language->get('error_permission');
            }
        } else {
            $this->error['warning'] = $this->language->get('error_id');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

    public function validateDelete() {
        if (!$this->user->hasPermission('modify', 'catalog/wialongroup')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->load->model('catalog/product');

        // foreach ($this->request->post['selected'] as $wialongroup_id) {
        $product_total = $this->model_catalog_validate->getTotalById("wialon_group", $this->request->post['wialon_group_id']);

        if ($product_total) {
            $this->error['warning'] = sprintf($this->language->get('error_product'), $product_total);
        }
        // }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

    public function getServers() {
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

    public function getOwners() {
        $this->load->model('catalog/owner');
        $arrayselect = [];
        $data['owners'] = $this->model_catalog_owner->getOwners();
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['owners'] as $owner) {
            $arrayselect[] = array('id' => $owner['owner_id'], 'value' => $owner['ownername']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getDiscounts() {
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

    public function getTarifs() {
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

}
