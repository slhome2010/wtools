<?php

class ControllerBillingDiscount extends Controller {

    private $error = array();
    private static $new_discount_id = 0;

    public function index() {
        //$this->load->language('billing/discount');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('billing/discount');

        $this->getList();
    }

    public function add() {
        $this->load->model('billing/discount');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_discount_id = $this->model_billing_discount->addDiscount($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('billing/discount');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_billing_discount->editDiscount($this->request->post['discount_id'], $this->request->post);
        }
    }

    public function delete() {
        $this->load->model('billing/discount');

        if (isset($this->request->post['discount_id']) && $this->validateDelete()) {
            //foreach ($this->request->post['selected'] as $discount_id) {
            $this->model_billing_discount->deleteDiscount($this->request->post['discount_id']);
            //}
        }
    }

    public function getList() {
        $this->load->model('billing/discount');

        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'discountname';
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

        $data['discounts'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => $this->config->get('config_limit_admin')
        );

        //$discount_total = $this->model_billing_discount->getTotalManufacturers();

        $results = $this->model_billing_discount->getDiscounts($filter_data);

        foreach ($results as $result) {
            $data['discounts'][] = array(
                'discount_id' => $result['discount_id'],
                'discountname' => $result['discountname'],
                'price' => $result['price'],
                'percent' => $result['percent'],
                'description' => $result['description'],
                'date_start' => $result['date_start'],
                'date_end' => $result['date_end'],
                'priority' => $result['priority'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['discounts'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {

        $this->load->model('billing/discount');
        $data['heading_title'] = $this->language->get('heading_title');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }


        if (isset($this->request->get['discount_id']) && ($this->request->get['discount_id'] != 'undefined')) {
            $discount_info = $this->model_billing_discount->getDiscount($this->request->get['discount_id']);
            $data['discount_id'] = $this->request->get['discount_id'];
        } else {
            $discount_info = $this->model_billing_discount->getDiscount($this->new_discount_id);
            $data['discount_id'] = $this->new_discount_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['discountname'])) {
            $data['discountname'] = $this->request->post['discountname'];
        } elseif (!empty($discount_info)) {
            $data['discountname'] = $discount_info['discountname'];
        } else {
            $data['discountname'] = '';
        }

        if (isset($this->request->post['description'])) {
            $data['description'] = $this->request->post['description'];
        } elseif (!empty($discount_info)) {
            $data['description'] = $discount_info['description'];
        } else {
            $data['description'] = '';
        }

        if (isset($this->request->post['price'])) {
            $data['price'] = $this->request->post['price'];
        } elseif (!empty($discount_info)) {
            $data['price'] = $discount_info['price'];
        } else {
            $data['price'] = '';
        }

        if (isset($this->request->post['percent'])) {
            $data['percent'] = $this->request->post['percent'];
        } elseif (!empty($discount_info)) {
            $data['percent'] = $discount_info['percent'];
        } else {
            $data['percent'] = '';
        }

        if (isset($this->request->post['date_start'])) {
            $data['date_start'] = $this->request->post['date_start'];
        } elseif (!empty($discount_info)) {
            $data['date_start'] = $discount_info['date_start'];
        } else {
            $data['date_start'] = '';
        }
        if (isset($this->request->post['date_end'])) {
            $data['date_end'] = $this->request->post['date_end'];
        } elseif (!empty($discount_info)) {
            $data['date_end'] = $discount_info['date_end'];
        } else {
            $data['date_end'] = '';
        }

        if (isset($this->request->post['priority'])) {
            $data['priority'] = $this->request->post['priority'];
        } elseif (!empty($discount_info)) {
            $data['priority'] = $discount_info['priority'];
        } else {
            $data['priority'] = '';
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($discount_info)) {
            $data['status'] = $discount_info['status'];
        } else {
            $data['status'] = 0;
        }

        //  if (!empty($discount_info)) {
        //      $data['date_start'] = date($this->language->get('date_format_short'), strtotime($discount_info['date_start']));
        //  }
        //  if (!empty($discount_info)) {
        //      $data['date_end'] = date($this->language->get('date_format_short'), strtotime($discount_info['date_end']));
        //  }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm() {
        if (!$this->user->hasPermission('modify', 'billing/discount')) {
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

        if (!$this->user->hasPermission('modify', 'billing/discount')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $total1 = $this->model_catalog_validate->getTotalById("item", "discount", $this->request->post['discount_id']);
        $total2 = $this->model_catalog_validate->getTotalById("item_history", "discount", $this->request->post['discount_id']);
        $total3 = $this->model_catalog_validate->getTotalById("wialongroup", "discount", $this->request->post['discount_id']);

        if ($total1 || $total2 || $total3) {
            $this->error['warning'] = sprintf($this->language->get('error_total'), (int) $total1 + (int) $total2 + (int) $total3);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

}
