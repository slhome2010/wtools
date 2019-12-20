<?php

class ControllerCatalogOwner extends Controller {

    private $error = array();
    private static $new_owner_id = 0;

    public function index() {
        //$this->load->language('catalog/owner');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('catalog/owner');

        $this->getList();
    }

    public function add() {
        $this->load->model('catalog/owner');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_owner_id = $this->model_catalog_owner->addOwner($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('catalog/owner');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_catalog_owner->editOwner($this->request->post['owner_id'], $this->request->post);

            $existgroups = array_column($this->model_catalog_owner->getWialongroupsByOwner($this->request->post['owner_id']), 'id');
            $requestgroups = explode(",", $this->request->post['wialon_groups']);

                $diff_remove = array_diff($existgroups, $requestgroups);
                if ($diff_remove) {
                    $this->model_catalog_owner->updateWialongroupsByOwner('0', $diff_remove);
                }
                $diff_update = array_diff($requestgroups, $existgroups);
                if ($diff_update && $requestgroups[0]) {
                    $this->model_catalog_owner->updateWialongroupsByOwner($this->request->post['owner_id'], $diff_update);
                }

        }
    }

    public function delete() {
        $this->load->model('catalog/owner');

        if (isset($this->request->post['owner_id'])) {
            //foreach ($this->request->post['selected'] as $owner_id) {
            $this->model_catalog_owner->deleteOwner($this->request->post['owner_id']);
            //}
        }
    }

    public function getList() {
        $this->load->model('catalog/owner');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'owner_id';
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

        $data['owners'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => 0
        );

        //$owner_total = $this->model_catalog_owner->getTotalManufacturers();

        $results = $this->model_catalog_owner->getOwners($filter_data);

        foreach ($results as $result) {
            $data['owners'][] = array(
                'owner_id' => $result['owner_id'],
                'ownername' => $result['ownername'],
                'status' => $result['status'],
                'contactname' => $result['contactname'],
                'telephone' => $result['telephone'],
                'email' => $result['email'],
                'bin' => $result['bin'],
                'address' => $result['address'],
                'description' => $result['description'],
                'date_added' => date($this->language->get('date_format_short'), strtotime($result['date_added'])),
                'sort_order' => $result['sort_order'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['owners'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {
        //CKEditor
        // $this->document->addScript('view/javascript/ckeditor/ckeditor.js');
        // $this->document->addScript('view/javascript/ckeditor/ckeditor_init.js');

        $this->load->model('catalog/owner');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->request->get['owner_id']) && ($this->request->get['owner_id'] != 'undefined')) {
            $owner_info = $this->model_catalog_owner->getOwner($this->request->get['owner_id']);
            $data['owner_id'] = $this->request->get['owner_id'];
        } else {
            $owner_info = $this->model_catalog_owner->getOwner($this->new_owner_id);
            $data['owner_id'] = $this->new_owner_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['ownername'])) {
            $data['ownername'] = $this->request->post['ownername'];
        } elseif (!empty($owner_info)) {
            $data['ownername'] = $owner_info['ownername'];
        } else {
            $data['ownername'] = '';
        }

        if (isset($this->request->post['description'])) {
            $data['description'] = $this->request->post['description'];
        } elseif (!empty($owner_info)) {
            $data['description'] = $owner_info['description'];
        } else {
            $data['description'] = '';
        }

        if (isset($this->request->post['contactname'])) {
            $data['contactname'] = $this->request->post['contactname'];
        } elseif (!empty($owner_info)) {
            $data['contactname'] = $owner_info['contactname'];
        } else {
            $data['contactname'] = '';
        }

        if (isset($this->request->post['telephone'])) {
            $data['telephone'] = $this->request->post['telephone'];
        } elseif (!empty($owner_info)) {
            $data['telephone'] = $owner_info['telephone'];
        } else {
            $data['telephone'] = '';
        }

        if (isset($this->request->post['email'])) {
            $data['email'] = $this->request->post['email'];
        } elseif (!empty($owner_info)) {
            $data['email'] = $owner_info['email'];
        } else {
            $data['email'] = '';
        }

        if (isset($this->request->post['bin'])) {
            $data['bin'] = $this->request->post['bin'];
        } elseif (!empty($owner_info)) {
            $data['bin'] = $owner_info['bin'];
        } else {
            $data['bin'] = '';
        }

        if (isset($this->request->post['address'])) {
            $data['address'] = $this->request->post['address'];
        } elseif (!empty($owner_info)) {
            $data['address'] = $owner_info['address'];
        } else {
            $data['address'] = '';
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($owner_info)) {
            $data['sort_order'] = $owner_info['sort_order'];
        } else {
            $data['sort_order'] = '';
        }

        if (!empty($owner_info)) {
            $data['date_added'] = date($this->language->get('date_format_short'), strtotime($owner_info['date_added']));
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($owner_info)) {
            $data['status'] = $owner_info['status'];
        } else {
            $data['status'] = 1;
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
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

    public function validateForm() {
        $this->load->language('catalog/validate');

        if (!$this->user->hasPermission('modify', 'catalog/owner')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

    public function validateDelete() {

        $this->load->language('catalog/validate');
        $this->load->model('catalog/validate');

        if (isset($this->request->post['grid_id'])) {
            $grid_id = $this->request->post['grid_id'];
        } else {
            $grid_id = "";
        }
        // $this->error['accordance'] = $grid_id;

        if ($grid_id) {
            if (!$this->user->hasPermission('modify', str_replace('-', '/', $grid_id))) {
                $this->error['warning'] = $this->language->get('error_permission');
            }
        } else {
            $this->error['warning'] = $this->language->get('error_id');
        }

        if (!isset($this->error['warning'])) {
            $total1 = $this->model_catalog_validate->getTotalById("item", "owner", $this->request->post['owner_id']);
            $total2 = $this->model_catalog_validate->getTotalById("wialongroup", "owner", $this->request->post['owner_id']);

            if ($total1 || $total2) {
                $this->error['warning'] = sprintf($this->language->get('error_total'), (int) $total1 + (int) $total2);
            }
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

    public function getWialonGroups() {

        $this->load->model('catalog/owner');

        $ownergroups = [];
        $lostgroups = $this->model_catalog_owner->getWialongroupsByOwner(0);

        if (isset($this->request->get['owner_id']) && ($this->request->get['owner_id'] != 'undefined')) {
            $ownergroups = $this->model_catalog_owner->getWialongroupsByOwner($this->request->get['owner_id']);
        }

        $json = array_merge($lostgroups, $ownergroups);

        $sort_order = array();
        foreach ($json as $key => $value) {
            $sort_order[$key] = $value['value'];
        }
        array_multisort($sort_order, SORT_ASC, $json);

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }

    public function getOwnerGroups() {

        $this->load->model('catalog/owner');

        $ownergroups = [];

        if (isset($this->request->get['owner_id']) && ($this->request->get['owner_id'] != 'undefined')) {
            $ownergroups = $this->model_catalog_owner->getWialongroupsByOwner($this->request->get['owner_id']);
        }

        $json = array_column($ownergroups, 'id');

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }

}
