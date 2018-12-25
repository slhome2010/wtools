<?php

class ControllerSettingServer extends Controller {

    private $error = array();
    private static $new_server_id = 0;

    public function index() {
        //$this->load->language('setting/server');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('setting/server');

        $this->getList();
    }

    public function add() {
        $this->load->model('setting/server');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_server_id = $this->model_setting_server->addServer($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('setting/server');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_setting_server->editServer($this->request->post['server_id'], $this->request->post);
        }
    }

    public function delete() {
        $this->load->model('setting/server');

        if (isset($this->request->post['server_id'])) {
            $this->model_setting_server->deleteServer($this->request->post['server_id']);
        }
    }

    public function getList() {
        $this->load->model('setting/server');

        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'servername';
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

        $data['servers'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => $this->config->get('config_limit_admin')
        );

        //$server_total = $this->model_setting_server->getTotalManufacturers();

        $results = $this->model_setting_server->getServers($filter_data);

        foreach ($results as $result) {
            $data['servers'][] = array(
                'server_id' => $result['server_id'],
                'servername' => $result['servername'],
                'link' => $result['link'],
                'ip' => $result['ip'],
                'soft' => $result['soft'],
                'total' => $result['total'],
                'sort_order' => $result['sort_order'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['servers'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {

        $this->load->model('setting/server');
        $data['heading_title'] = $this->language->get('heading_title');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }


        if (isset($this->request->get['server_id']) && ($this->request->get['server_id'] != 'undefined')) {
            $server_info = $this->model_setting_server->getServer($this->request->get['server_id']);
            $data['server_id'] = $this->request->get['server_id'];
        } else {
            $server_info = $this->model_setting_server->getServer($this->new_server_id);
            $data['server_id'] = $this->new_server_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['servername'])) {
            $data['servername'] = $this->request->post['servername'];
        } elseif (!empty($server_info)) {
            $data['servername'] = $server_info['servername'];
        } else {
            $data['servername'] = '';
        }

        if (isset($this->request->post['link'])) {
            $data['link'] = $this->request->post['link'];
        } elseif (!empty($server_info)) {
            $data['link'] = $server_info['link'];
        } else {
            $data['link'] = '';
        }

        if (isset($this->request->post['ip'])) {
            $data['ip'] = $this->request->post['ip'];
        } elseif (!empty($server_info)) {
            $data['ip'] = $server_info['ip'];
        } else {
            $data['ip'] = '';
        }

        if (isset($this->request->post['soft'])) {
            $data['soft'] = $this->request->post['soft'];
        } elseif (!empty($server_info)) {
            $data['soft'] = $server_info['soft'];
        } else {
            $data['soft'] = '';
        }

        if (isset($this->request->post['total'])) {
            $data['total'] = $this->request->post['total'];
        } elseif (!empty($server_info)) {
            $data['total'] = $server_info['total'];
        } else {
            $data['total'] = '';
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($server_info)) {
            $data['sort_order'] = $server_info['sort_order'];
        } else {
            $data['sort_order'] = '';
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($server_info)) {
            $data['status'] = $server_info['status'];
        } else {
            $data['status'] = 0;
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm() {
        if (!$this->user->hasPermission('modify', 'setting/server')) {
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

        if (!$this->user->hasPermission('modify', 'setting/server')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $total1 = $this->model_catalog_validate->getTotalById("item", "server", $this->request->post['server_id']);
        $total2 = $this->model_catalog_validate->getTotalById("wialongroup", "server", $this->request->post['server_id']);

        if ($total1 || $total2) {
            $this->error['warning'] = sprintf($this->language->get('error_total'), (int) $total1 + (int) $total2);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

}
