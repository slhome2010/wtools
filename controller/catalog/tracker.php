<?php

class ControllerCatalogTracker extends Controller {

    private $error = array();
    private static $new_tracker_id = 0;

    public function index() {
        //$this->load->language('catalog/tracker');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('catalog/tracker');

        $this->getList();
    }

    public function add() {
        $this->load->model('catalog/tracker');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_tracker_id = $this->model_catalog_tracker->addTracker($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('catalog/tracker');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_catalog_tracker->editTracker($this->request->post['tracker_id'], $this->request->post);
        }
    }

    public function delete() {
        $this->load->model('catalog/tracker');

        if (isset($this->request->post['tracker_id'])) {
            $this->model_catalog_tracker->deleteTracker($this->request->post['tracker_id']);
        }
    }

    public function getList() {
        $this->load->model('catalog/tracker');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'trackername';
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

        $data['trackers'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => 0
        );

        //$tracker_total = $this->model_catalog_tracker->getTotalManufacturers();

        $results = $this->model_catalog_tracker->getTrackers($filter_data);

        foreach ($results as $result) {
            $data['trackers'][] = array(
                'tracker_id' => $result['tracker_id'],
                'trackername' => $result['trackername'],
                'sort_order' => $result['sort_order'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['trackers'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {
        //CKEditor

        $this->document->addScript('view/javascript/ckeditor/ckeditor.js');
        $this->document->addScript('view/javascript/ckeditor/ckeditor_init.js');

        $this->load->model('catalog/tracker');
        $data['heading_title'] = $this->language->get('heading_title');


        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }


        if (isset($this->request->get['tracker_id']) && ($this->request->get['tracker_id'] != 'undefined')) {
            $tracker_info = $this->model_catalog_tracker->getTracker($this->request->get['tracker_id']);
            $data['tracker_id'] = $this->request->get['tracker_id'];
        } else {
            $tracker_info = $this->model_catalog_tracker->getTracker($this->new_tracker_id);
            $data['tracker_id'] = $this->new_tracker_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['trackername'])) {
            $data['trackername'] = $this->request->post['trackername'];
        } elseif (!empty($tracker_info)) {
            $data['trackername'] = $tracker_info['trackername'];
        } else {
            $data['trackername'] = '';
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($tracker_info)) {
            $data['sort_order'] = $tracker_info['sort_order'];
        } else {
            $data['sort_order'] = '';
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($tracker_info)) {
            $data['status'] = $tracker_info['status'];
        } else {
            $data['status'] = 0;
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
        $this->load->model('catalog/validate');

        if (!$this->user->hasPermission('modify', 'catalog/tracker')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $total = 0;
        $servers = json_decode(str_replace('&quot;', '"', $this->request->post['hw']));
        foreach ($servers as $server) {
            $total += $this->model_catalog_validate->getTotalByHw($this->request->post['tracker_id'], $server->server_id, $server->tracker_hw);
        }

        if ($total) {
            $this->error['warning'] = sprintf($this->language->get('error_hw'), (int) $total);
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
        //return !$this->error;
    }

    public function validateDelete() {

        $this->load->language('catalog/validate');
        $this->load->model('catalog/validate');

        if (!$this->user->hasPermission('modify', 'catalog/tracker')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $total = 0;
        if (isset($this->request->post['hw'])) {
            $servers = json_decode(str_replace('&quot;', '"', $this->request->post['hw']));
            foreach ($servers as $server) {
                $total += $this->model_catalog_validate->getTotalItemsByHw($server->tracker_hw);
            }
        }
        if ($total) {
            $this->error['warning'] = sprintf($this->language->get('error_total'), (int) $total);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

    public function getHw() {
        $this->load->model('catalog/tracker');
        if (isset($this->request->get['tracker_id']) && ($this->request->get['tracker_id'] != 'undefined')) {
            $id = $this->request->get['tracker_id'];
        } else {
            $id = 0;
        }

        $output = array();
        $results = $this->model_catalog_tracker->getHw($id);

        foreach ($results as $result) {
            $output[] = array(
                'tracker_id' => $result['tracker_id'],
                'server_id' => $result['server_id'],
                'servername' => $result['servername'],
                'tracker_hw' => $result['tracker_hw'],
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($output));
    }

    public function getServers() {
        $this->load->model('setting/server');
        $arrayselect = [];
        $data['servers'] = $this->model_setting_server->getServers();
        // $arrayselect[] = array('id' => 0, 'value' => '- Не выбрано -');
        foreach ($data['servers'] as $server) {
            $arrayselect[] = array('id' => $server['server_id'], 'value' => $server['servername']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

}
