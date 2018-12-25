<?php

class ControllerCommonLogin extends Controller {

    private $error = array();

    public function index() {
        $this->load->language('common/login');

        // user init
        $this->load->model('user/user');
        $this->load->model('tool/image');
        $data['userinfo'] = json_encode(array(
            'user_id' => '',
            'username' => '',
            'user_group_id' => '',
            //'user_group_name' => $user_info['user_group_name'],
            'status' => '',
            'firstname' => '',
            'lastname' => '',
            'email' => '',
            'image' => '',
            'thumb' => $this->model_tool_image->resize('no_image.png', 100, 100),
            'date_added' => '',
            'token' => isset($this->session->data['token']) ? $this->session->data['token'] : '',
                ), JSON_UNESCAPED_UNICODE);

        // Status was requested
        if (isset($this->request->get['status'])) {
            if ($this->user->isLogged() && isset($this->request->get['token']) && ($this->request->get['token'] == $this->session->data['token'])) {
                $data['userinfo'] = $this->getUserInfo();
                $this->response->addHeader('Content-Type: application/json');
                $this->response->setOutput($data['userinfo']);
                return;
            } else {
                $this->response->addHeader('Content-Type: application/json');
                $this->response->setOutput(json_encode(null));
                return;
            }
        }

        // Logout was requested
        if (isset($this->request->get['logout'])) {
            $this->user->logout();
            unset($this->session->data['token']);
        }

        // Login was requested
        // If user always is login
        if ($this->user->isLogged() && isset($this->request->get['token']) && ($this->request->get['token'] == $this->session->data['token'])) {
            $data['userinfo'] = $this->getUserInfo();
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput($data['userinfo']);
            return;
        }
        // If we had the new POST data
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->session->data['token'] = token(32);

            $data['userinfo'] = $this->getUserInfo();
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput($data['userinfo']);
            return;
        }

        if ((isset($this->session->data['token']) && !isset($this->request->get['token'])) || ((isset($this->request->get['token']) && (isset($this->session->data['token']) && ($this->request->get['token'] != $this->session->data['token']))))) {
            $this->error['warning'] = $this->language->get('error_token');
        }

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->session->data['success'])) {
            $data['success'] = $this->session->data['success'];

            unset($this->session->data['success']);
        } else {
            $data['success'] = '';
        }

        $data['action'] = $this->url->link('common/login', '', true);

        if (isset($this->request->post['username'])) {
            $data['username'] = $this->request->post['username'];
        } else {
            $data['username'] = '';
        }

        if (isset($this->request->post['password'])) {
            $data['password'] = $this->request->post['password'];
        } else {
            $data['password'] = '';
        }

        if (isset($this->request->get['route'])) {
            $route = $this->request->get['route'];

            unset($this->request->get['route']);
            unset($this->request->get['token']);

            $url = '';

            if ($this->request->get) {
                $url .= http_build_query($this->request->get);
            }

            $data['redirect'] = $this->url->link($route, $url, true);
        } else {
            $data['redirect'] = '';
        }

        $data['logo'] = HTTP_SERVER . "image/wtools/logo.png";
        $data['token'] = isset($this->session->data['token']) ? $this->session->data['token'] : '';
        $data['header'] = $this->load->controller('common/header');

        if (isset($this->request->get['login'])) {
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode(null));
        } else {
            $this->response->setOutput($this->load->view('common/login', $data));
        }
    }

    protected function validate() {
        if (!isset($this->request->post['username']) || !isset($this->request->post['password']) || !$this->user->login($this->request->post['username'], html_entity_decode($this->request->post['password'], ENT_QUOTES, 'UTF-8'))) {
            $this->error['warning'] = $this->language->get('error_login');
        }

        return !$this->error;
    }

    protected function getUserInfo() {
        $user_info = $this->model_user_user->getUser($this->user->getId());
        return json_encode(array(
            'user_id' => $user_info['user_id'],
            'username' => $user_info['username'],
            'user_group_id' => $user_info['user_group_id'],
            //'user_group_name' => $user_info['user_group_name'],
            'status' => $user_info['status'],
            'firstname' => $user_info['firstname'],
            'lastname' => $user_info['lastname'],
            'email' => $user_info['email'],
            'image' => $user_info['image'],
            'thumb' => ($user_info['image'] && is_file(DIR_IMAGE . $user_info['image'])) ? $this->model_tool_image->resize($user_info['image'], 100, 100) : $this->model_tool_image->resize('no_image.png', 100, 100),
            'date_added' => date($this->language->get('date_format_short'), strtotime($user_info['date_added'])),
            'token' => isset($this->session->data['token']) ? $this->session->data['token'] : '',
                ), JSON_UNESCAPED_UNICODE);
    }

}
