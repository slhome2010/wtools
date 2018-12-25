<?php

class ControllerBillingTarif extends Controller {

    private $error = array();
    private static $new_tarif_id = 0;

    public function index() {
        //$this->load->language('billing/tarif');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('billing/tarif');

        $this->getList();
    }

    public function add() {
        $this->load->model('billing/tarif');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_tarif_id = $this->model_billing_tarif->addTarif($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('billing/tarif');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_billing_tarif->editTarif($this->request->post['tarif_id'], $this->request->post);
        }
    }

    public function delete() {
        $this->load->model('billing/tarif');

        if (isset($this->request->post['tarif_id']) && $this->validateDelete()) {
            $this->model_billing_tarif->deleteTarif($this->request->post['tarif_id']);
        }
    }

    public function getList() {
        $this->load->model('billing/tarif');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'tarifname';
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

        $data['tarifs'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => $this->config->get('config_limit_admin')
        );

        //$tarif_total = $this->model_billing_tarif->getTotalManufacturers();

        $results = $this->model_billing_tarif->getTarifs($filter_data);

        foreach ($results as $result) {
            $data['tarifs'][] = array(
                'tarif_id' => $result['tarif_id'],
                'tarifname' => $result['tarifname'],
                'price' => $result['price'],
                'roaming' => $result['roaming'],
                'gprs' => $result['gprs'],
                'description' => $result['description'],
                'date_added' => date($this->language->get('date_format_short'), strtotime($result['date_added'])),
                'date_modified' => date($this->language->get('date_format_short'), strtotime($result['date_modified'])),
                'sort_order' => $result['sort_order'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['tarifs'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {

        $this->load->model('billing/tarif');
        $data['heading_title'] = $this->language->get('heading_title');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }


        if (isset($this->request->get['tarif_id']) && ($this->request->get['tarif_id'] != 'undefined')) {
            $tarif_info = $this->model_billing_tarif->getTarif($this->request->get['tarif_id']);
            $data['tarif_id'] = $this->request->get['tarif_id'];
        } else {
            $tarif_info = $this->model_billing_tarif->getTarif($this->new_tarif_id);
            $data['tarif_id'] = $this->new_tarif_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['tarifname'])) {
            $data['tarifname'] = $this->request->post['tarifname'];
        } elseif (!empty($tarif_info)) {
            $data['tarifname'] = $tarif_info['tarifname'];
        } else {
            $data['tarifname'] = '';
        }

        if (isset($this->request->post['description'])) {
            $data['description'] = $this->request->post['description'];
        } elseif (!empty($tarif_info)) {
            $data['description'] = $tarif_info['description'];
        } else {
            $data['description'] = '';
        }

        if (isset($this->request->post['price'])) {
            $data['price'] = $this->request->post['price'];
        } elseif (!empty($tarif_info)) {
            $data['price'] = $tarif_info['price'];
        } else {
            $data['price'] = '';
        }

        if (isset($this->request->post['roaming'])) {
            $data['roaming'] = $this->request->post['roaming'];
        } elseif (!empty($tarif_info)) {
            $data['roaming'] = $tarif_info['roaming'];
        } else {
            $data['roaming'] = '';
        }
        if (isset($this->request->post['gprs'])) {
            $data['gprs'] = $this->request->post['gprs'];
        } elseif (!empty($tarif_info)) {
            $data['gprs'] = $tarif_info['gprs'];
        } else {
            $data['gprs'] = '';
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($tarif_info)) {
            $data['sort_order'] = $tarif_info['sort_order'];
        } else {
            $data['sort_order'] = '';
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($tarif_info)) {
            $data['status'] = $tarif_info['status'];
        } else {
            $data['status'] = 0;
        }

        if (!empty($tarif_info)) {
            $data['date_added'] = date($this->language->get('date_format_short'), strtotime($tarif_info['date_added']));
        }
        if (!empty($tarif_info)) {
            $data['date_modified'] = date($this->language->get('date_format_short'), strtotime($tarif_info['date_modified']));
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm() {
        if (!$this->user->hasPermission('modify', 'billing/tarif')) {
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

        $this->load->language('catalog/validate');
        $this->load->model('catalog/validate');

        if (!$this->user->hasPermission('modify', 'billing/tarif')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $total1 = $this->model_catalog_validate->getTotalById("item", "tarif", $this->request->post['tarif_id']);
        $total2 = $this->model_catalog_validate->getTotalById("wialongroup", "tarif", $this->request->post['tarif_id']);

        if ($total1 || $total2) {
            $this->error['warning'] = sprintf($this->language->get('error_total'), (int) $total1 + (int) $total2);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

}
