<?php

class ControllerCatalogGsm extends Controller {

    private $error = array();
    private static $new_gsm_id = 0;

    public function index() {
        //$this->load->language('catalog/gsm');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('catalog/gsm');

        $this->getList();
    }

    public function add() {
        $this->load->model('catalog/gsm');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_gsm_id = $this->model_catalog_gsm->addGsm($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('catalog/gsm');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_catalog_gsm->editGsm($this->request->post['gsm_id'], $this->request->post);
        }
    }

    public function delete() {
        $this->load->model('catalog/gsm');

        if (isset($this->request->post['gsm_id'])) {
            //foreach ($this->request->post['selected'] as $gsm_id) {
            $this->model_catalog_gsm->deleteGsm($this->request->post['gsm_id']);
            //}
        }
    }

    public function getList() {
        $this->load->model('catalog/gsm');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'gsmname';
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

        $data['gsms'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => 0
        );

        //$gsm_total = $this->model_catalog_gsm->getTotalManufacturers();

        $results = $this->model_catalog_gsm->getGsms($filter_data);

        foreach ($results as $result) {
            $data['gsms'][] = array(
                'gsm_id' => $result['gsm_id'],
                'gsmname' => $result['gsmname'],
                'sort_order' => $result['sort_order'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['gsms'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {
        //CKEditor

        $this->document->addScript('view/javascript/ckeditor/ckeditor.js');
        $this->document->addScript('view/javascript/ckeditor/ckeditor_init.js');

        $this->load->model('catalog/gsm');
        $data['heading_title'] = $this->language->get('heading_title');


        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }


        if (isset($this->request->get['gsm_id']) && ($this->request->get['gsm_id'] != 'undefined')) {
            $gsm_info = $this->model_catalog_gsm->getGsm($this->request->get['gsm_id']);
            $data['gsm_id'] = $this->request->get['gsm_id'];
        } else {
            $gsm_info = $this->model_catalog_gsm->getGsm($this->new_gsm_id);
            $data['gsm_id'] = $this->new_gsm_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['gsmname'])) {
            $data['gsmname'] = $this->request->post['gsmname'];
        } elseif (!empty($gsm_info)) {
            $data['gsmname'] = $gsm_info['gsmname'];
        } else {
            $data['gsmname'] = '';
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($gsm_info)) {
            $data['sort_order'] = $gsm_info['sort_order'];
        } else {
            $data['sort_order'] = '';
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($gsm_info)) {
            $data['status'] = $gsm_info['status'];
        } else {
            $data['status'] = 0;
        }

        // $data['header'] = $this->load->controller('common/header');
        //  $data['column_left'] = $this->load->controller('common/column_left');
        //  $data['footer'] = $this->load->controller('common/footer');
        // $this->response->setOutput($this->load->view('gsm/gsm_form', $data));
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm() {
        if (!$this->user->hasPermission('modify', 'catalog/gsm')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
        //return !$this->error;
    }

    public function validateDelete() {
        if (!$this->user->hasPermission('modify', 'catalog/gsm')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->load->model('catalog/product');

        // foreach ($this->request->post['selected'] as $gsm_id) {
        $product_total = $this->model_catalog_product->getTotalById("gsm", $this->request->post['gsm_id']);

        if ($product_total) {
            $this->error['warning'] = sprintf($this->language->get('error_product'), $product_total);
        }
        // }

         $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

}
