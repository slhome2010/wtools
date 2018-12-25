<?php

class ControllerUserUser extends Controller {

    private $error = array();
    private static $new_user_id = 0;

    public function index() {
        $this->load->language('user/user');

        $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('user/user');

        $this->getList();
    }

    public function add() {

        $this->load->model('user/user');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_user_id = $this->model_user_user->addUser($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        //  $this->load->language('user/user');
        //   $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('user/user');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_user_user->editUser($this->request->post['user_id'], $this->request->post);
        }
        // $this->getForm();
    }

    public function delete() {
        //$this->load->language('user/user');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('user/user');

        if (isset($this->request->post['user_id'])) {
            //foreach ($this->request->post['selected'] as $user_id) {
            $this->model_user_user->deleteUser($this->request->post['user_id']);
            //}
        }
    }

    public function getList() {
        $this->load->model('user/user');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'username';
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

        $data['users'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => $this->config->get('config_limit_admin')
        );

        // $user_total = $this->model_user_user->getTotalUsers();

        $results = $this->model_user_user->getUsers($filter_data);

        $this->load->model('tool/image');

        foreach ($results as $result) {
            $data['users'][] = array(
                'user_id' => $result['user_id'],
                'username' => $result['username'],
                'user_group_id' => $result['user_group_id'],
                'user_group_name' => $result['user_group_name'],
                'status' => $result['status'],
                'password' => '',
                'confirm' => '',
                'firstname' => $result['firstname'],
                'lastname' => $result['lastname'],
                'email' => $result['email'],
                'image' => '',
                'thumb' => ($result['image'] && is_file(DIR_IMAGE . $result['image'])) ? $this->model_tool_image->resize($result['image'], 100, 100) : $this->model_tool_image->resize('no_image.png', 100, 100),
                'thumb2' => ($result['image'] && is_file(DIR_IMAGE . $result['image'])) ? $this->model_tool_image->resize($result['image'], 30, 30) : $this->model_tool_image->resize('no_image.png', 30, 30),
                //'status'     => ($result['status'] ? $this->language->get('text_enabled') : $this->language->get('text_disabled')),
                'date_added' => date($this->language->get('date_format_short'), strtotime($result['date_added'])),
                'edit' => '',
            );
        }


        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['users'], JSON_UNESCAPED_UNICODE));
        //$this->response->setOutput($this->load->view('user/user_list', $data));
    }

    public function getForm() {
        $this->load->model('user/user');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->request->get['user_id']) && ($this->request->get['user_id'] != 'undefined')) {
            $user_info = $this->model_user_user->getUser($this->request->get['user_id']);
            $data['user_id'] = $this->request->get['user_id'];
        } else {
            $user_info = $this->model_user_user->getUser($this->new_user_id);
            $data['user_id'] = $this->new_user_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['username'])) {
            $data['username'] = $this->request->post['username'];
        } elseif (!empty($user_info)) {
            $data['username'] = $user_info['username'];
        } else {
            $data['username'] = '';
        }

        if (isset($this->request->post['user_group_id'])) {
            $data['user_group_id'] = $this->request->post['user_group_id'];
        } elseif (!empty($user_info)) {
            $data['user_group_id'] = $user_info['user_group_id'];
        } else {
            $data['user_group_id'] = '';
        }

        // $this->load->model('user/user_group');
        // $data['user_groups'] = $this->model_user_user_group->getUserGroups();

        if (isset($this->request->post['password'])) {
            $data['password'] = $this->request->post['password'];
        } else {
            $data['password'] = '';
        }

        if (isset($this->request->post['confirm'])) {
            $data['confirm'] = $this->request->post['confirm'];
        } else {
            $data['confirm'] = '';
        }

        if (isset($this->request->post['firstname'])) {
            $data['firstname'] = $this->request->post['firstname'];
        } elseif (!empty($user_info)) {
            $data['firstname'] = $user_info['firstname'];
        } else {
            $data['firstname'] = '';
        }

        if (isset($this->request->post['lastname'])) {
            $data['lastname'] = $this->request->post['lastname'];
        } elseif (!empty($user_info)) {
            $data['lastname'] = $user_info['lastname'];
        } else {
            $data['lastname'] = '';
        }

        if (isset($this->request->post['email'])) {
            $data['email'] = $this->request->post['email'];
        } elseif (!empty($user_info)) {
            $data['email'] = $user_info['email'];
        } else {
            $data['email'] = '';
        }

        if (isset($this->request->post['image'])) {
            $data['image'] = $this->request->post['image'];
        } elseif (!empty($user_info)) {
            $data['image'] = $user_info['image'];
        } else {
            $data['image'] = '';
        }

        $this->load->model('tool/image');

        if (isset($this->request->post['image']) && is_file(DIR_IMAGE . $this->request->post['image'])) {
            $data['thumb'] = $this->model_tool_image->resize($this->request->post['image'], 100, 100);
        } elseif (!empty($user_info) && $user_info['image'] && is_file(DIR_IMAGE . $user_info['image'])) {
            $data['thumb'] = $this->model_tool_image->resize($user_info['image'], 100, 100);
        } else {
            $data['thumb'] = $this->model_tool_image->resize('no_image.png', 100, 100);
        }

        if (isset($this->request->post['image']) && is_file(DIR_IMAGE . $this->request->post['image'])) {
            $data['thumb2'] = $this->model_tool_image->resize($this->request->post['image'], 30, 30);
        } elseif (!empty($user_info) && $user_info['image'] && is_file(DIR_IMAGE . $user_info['image'])) {
            $data['thumb2'] = $this->model_tool_image->resize($user_info['image'], 30, 30);
        } else {
            $data['thumb2'] = $this->model_tool_image->resize('no_image.png', 30, 30);
        }

        if (!empty($user_info)) {
            $data['date_added'] = date($this->language->get('date_format_short'), strtotime($user_info['date_added']));
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($user_info)) {
            $data['status'] = $user_info['status'];
        } else {
            $data['status'] = 0;
        }

        // $data['header'] = $this->load->controller('common/header');
        //  $data['column_left'] = $this->load->controller('common/column_left');
        //  $data['footer'] = $this->load->controller('common/footer');
        // $this->response->setOutput($this->load->view('user/user_form', $data));
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function getUserGroups() {
        $this->load->model('user/user_group');
        $arrayselect = [];
        $data['user_groups'] = $this->model_user_user_group->getUserGroups();
        foreach ($data['user_groups'] as $group) {
            $arrayselect[] = array('id' => $group['user_group_id'], 'value' => $group['name']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function validateForm() {
        $this->load->language('user/user');

        $this->load->model('user/user');

        if (!$this->user->hasPermission('modify', 'user/user')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $user_info = $this->model_user_user->getUserByUsername($this->request->post['username']);

        if (!isset($this->request->post['user_id'])) {
            if ($user_info) {
                $this->error['warning'] = $this->language->get('error_exists_username');
            }
        } else {
            if ($user_info && ($this->request->post['user_id'] != $user_info['user_id'])) {
                $this->error['warning'] = $this->language->get('error_exists_username');
            }
        }

        $user_info = $this->model_user_user->getUserByEmail($this->request->post['email']);

        if (!isset($this->request->post['user_id'])) {
            if ($user_info) {
                $this->error['warning'] = $this->language->get('error_exists_email');
            }
        } else {
            if ($user_info && ($this->request->post['user_id'] != $user_info['user_id'])) {
                $this->error['warning'] = $this->language->get('error_exists_email');
            }
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
        //  return $this->error['warning'];
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
        $this->load->language('user/user');

        if (!$this->user->hasPermission('modify', 'user/user')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        //  foreach ($this->request->post['selected'] as $user_id) {
        if ($this->user->getId() == $this->request->post['user_id']) {
            $this->error['warning'] = $this->language->get('error_account');
        }
        //   }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

}
