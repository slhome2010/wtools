<?php

class ControllerSettingSetting extends Controller {

    private $error = array();

    public function index() {
        $this->load->language('setting/setting');

        //       $this->document->setTitle($this->language->get('heading_title'));
//
//        $this->load->model('localisation/language');
//        $data['heading_title'] = $this->language->get('heading_title');

        $data['entry_order_status'] = $this->language->get('entry_order_status');
        $data['entry_processing_status'] = $this->language->get('entry_processing_status');
        $data['entry_complete_status'] = $this->language->get('entry_complete_status');

        $data['button_save'] = $this->language->get('button_save');
        $data['button_cancel'] = $this->language->get('button_cancel');

        $data['tab_general'] = $this->language->get('tab_general');
        $data['tab_store'] = $this->language->get('tab_store');
        $data['tab_local'] = $this->language->get('tab_local');
        $data['tab_option'] = $this->language->get('tab_option');
        $data['tab_image'] = $this->language->get('tab_image');
        $data['tab_ftp'] = $this->language->get('tab_ftp');
        $data['tab_mail'] = $this->language->get('tab_mail');
        $data['tab_server'] = $this->language->get('tab_server');
        $data['tab_google'] = $this->language->get('tab_google');
        $data['tab_sms'] = $this->language->get('tab_sms');

        $data['sms_gatenames'] = array();

        $files = glob(DIR_SYSTEM . 'smsgate/*.php');

        foreach ($files as $file) {
            $data['sms_gatenames'][] = basename($file, '.php');
        }

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->error['name'])) {
            $data['error_name'] = $this->error['name'];
        } else {
            $data['error_name'] = '';
        }

        if (isset($this->error['owner'])) {
            $data['error_owner'] = $this->error['owner'];
        } else {
            $data['error_owner'] = '';
        }

        if (isset($this->error['address'])) {
            $data['error_address'] = $this->error['address'];
        } else {
            $data['error_address'] = '';
        }

        if (isset($this->error['email'])) {
            $data['error_email'] = $this->error['email'];
        } else {
            $data['error_email'] = '';
        }

        if (isset($this->error['telephone'])) {
            $data['error_telephone'] = $this->error['telephone'];
        } else {
            $data['error_telephone'] = '';
        }

        if (isset($this->error['meta_title'])) {
            $data['error_meta_title'] = $this->error['meta_title'];
        } else {
            $data['error_meta_title'] = '';
        }

        if (isset($this->error['country'])) {
            $data['error_country'] = $this->error['country'];
        } else {
            $data['error_country'] = '';
        }

        if (isset($this->error['zone'])) {
            $data['error_zone'] = $this->error['zone'];
        } else {
            $data['error_zone'] = '';
        }

        if (isset($this->error['customer_group_display'])) {
            $data['error_customer_group_display'] = $this->error['customer_group_display'];
        } else {
            $data['error_customer_group_display'] = '';
        }

        if (isset($this->error['login_attempts'])) {
            $data['error_login_attempts'] = $this->error['login_attempts'];
        } else {
            $data['error_login_attempts'] = '';
        }

        if (isset($this->error['voucher_min'])) {
            $data['error_voucher_min'] = $this->error['voucher_min'];
        } else {
            $data['error_voucher_min'] = '';
        }

        if (isset($this->error['voucher_max'])) {
            $data['error_voucher_max'] = $this->error['voucher_max'];
        } else {
            $data['error_voucher_max'] = '';
        }

        if (isset($this->error['processing_status'])) {
            $data['error_processing_status'] = $this->error['processing_status'];
        } else {
            $data['error_processing_status'] = '';
        }

        if (isset($this->error['complete_status'])) {
            $data['error_complete_status'] = $this->error['complete_status'];
        } else {
            $data['error_complete_status'] = '';
        }

        if (isset($this->error['ftp_hostname'])) {
            $data['error_ftp_hostname'] = $this->error['ftp_hostname'];
        } else {
            $data['error_ftp_hostname'] = '';
        }

        if (isset($this->error['ftp_port'])) {
            $data['error_ftp_port'] = $this->error['ftp_port'];
        } else {
            $data['error_ftp_port'] = '';
        }

        if (isset($this->error['ftp_username'])) {
            $data['error_ftp_username'] = $this->error['ftp_username'];
        } else {
            $data['error_ftp_username'] = '';
        }

        if (isset($this->error['ftp_password'])) {
            $data['error_ftp_password'] = $this->error['ftp_password'];
        } else {
            $data['error_ftp_password'] = '';
        }

        if (isset($this->error['error_filename'])) {
            $data['error_error_filename'] = $this->error['error_filename'];
        } else {
            $data['error_error_filename'] = '';
        }

        if (isset($this->error['limit_admin'])) {
            $data['error_limit_admin'] = $this->error['limit_admin'];
        } else {
            $data['error_limit_admin'] = '';
        }

        if (isset($this->error['mail_regexp'])) {
            $data['error_mail_regexp'] = $this->error['mail_regexp'];
        } else {
            $data['error_mail_regexp'] = '';
        }

        if (isset($this->error['encryption'])) {
            $data['error_encryption'] = $this->error['encryption'];
        } else {
            $data['error_encryption'] = '';
        }

        // $data['breadcrumbs'] = array();
        // $data['breadcrumbs'][] = array(
        //     'text' => $this->language->get('text_home'),
        //     'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], true)
        // );
        //  $data['breadcrumbs'][] = array(
        //      'text' => $this->language->get('text_stores'),
        //      'href' => $this->url->link('setting/store', 'token=' . $this->session->data['token'], true)
        //  );
        //  $data['breadcrumbs'][] = array(
        //      'text' => $this->language->get('heading_title'),
        //      'href' => $this->url->link('setting/setting', 'token=' . $this->session->data['token'], true)
        //  );

        if (isset($this->session->data['success'])) {
            $data['success'] = $this->session->data['success'];

            unset($this->session->data['success']);
        } else {
            $data['success'] = '';
        }

        if (isset($this->request->post['config_order_status_id'])) {
            $data['config_order_status_id'] = $this->request->post['config_order_status_id'];
        } else {
            $data['config_order_status_id'] = $this->config->get('config_order_status_id');
        }

        if (isset($this->request->post['config_processing_status'])) {
            $data['config_processing_status'] = $this->request->post['config_processing_status'];
        } elseif ($this->config->get('config_processing_status')) {
            $data['config_processing_status'] = $this->config->get('config_processing_status');
        } else {
            $data['config_processing_status'] = array();
        }

        if (isset($this->request->post['config_complete_status'])) {
            $data['config_complete_status'] = $this->request->post['config_complete_status'];
        } elseif ($this->config->get('config_complete_status')) {
            $data['config_complete_status'] = $this->config->get('config_complete_status');
        } else {
            $data['config_complete_status'] = array();
        }
        if (isset($this->request->post['config_unsuccess_status'])) {
            $data['config_unsuccess_status'] = $this->request->post['config_unsuccess_status'];
        } elseif ($this->config->get('config_unsuccess_status')) {
            $data['config_unsuccess_status'] = $this->config->get('config_unsuccess_status');
        } else {
            $data['config_unsuccess_status'] = array();
        }

        //  if (isset($this->request->post['config_langdata'])) {
        //      $data['config_langdata'] = $this->request->post['config_langdata'];
        //  } else {
        //      $data['config_langdata'] = $this->config->get('config_langdata');
        //  }

        if (isset($this->request->post['config_theme'])) {
            $data['config_theme'] = $this->request->post['config_theme'];
        } else {
            $data['config_theme'] = $this->config->get('config_theme');
        }


        //  if (isset($this->request->post['config_language'])) {
        //      $data['config_language'] = $this->request->post['config_language'];
        //  } else {
        //      $data['config_language'] = $this->config->get('config_language');
        //  }


        if (isset($this->request->post['config_admin_language'])) {
            $data['config_admin_language'] = $this->request->post['config_admin_language'];
        } else {
            $data['config_admin_language'] = $this->config->get('config_admin_language');
        }


// history settings
        if (isset($this->request->post['config_history_period'])) {
            $data['config_history_period'] = $this->request->post['config_history_period'];
        } else {
            $data['config_history_period'] = $this->config->get('config_history_period');
        }
        if (isset($this->request->post['config_history_date_start'])) {
            $data['config_history_date_start'] = $this->request->post['config_history_date_start'];
        } else {
            $data['config_history_date_start'] = $this->config->get('config_history_date_start');
        }
        if (isset($this->request->post['config_history_autoperiod'])) {
            $data['config_history_autoperiod'] = $this->request->post['config_history_autoperiod'];
        } else {
            $data['config_history_autoperiod'] = $this->config->get('config_history_autoperiod');
        }
// suspicious settings
        if (isset($this->request->post['config_suspicious_range'])) {
            $data['config_suspicious_range'] = $this->request->post['config_suspicious_range'];
        } else {
            $data['config_suspicious_range'] = $this->config->get('config_suspicious_range');
        }
        if (isset($this->request->post['config_suspicious_date'])) {
            $data['config_suspicious_date'] = $this->request->post['config_suspicious_date'];
        } else {
            $data['config_suspicious_date'] = $this->config->get('config_suspicious_date');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function edit() {
        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('config', $this->request->post);
        }
    }

    public function validate() {
        if (!$this->user->hasPermission('modify', 'setting/setting')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        /*  foreach ($this->request->post['config_langdata'] as $language_id => $value) {
          if (!$value['name']) {
          $this->error['name'][$language_id] = $this->language->get('error_name');
          }
          }

          if ((utf8_strlen($this->request->post['config_email']) > 96) || !filter_var($this->request->post['config_email'], FILTER_VALIDATE_EMAIL)) {
          $this->error['email'] = $this->language->get('error_email');
          }

          if ((utf8_strlen($this->request->post['config_telephone']) < 3) || (utf8_strlen($this->request->post['config_telephone']) > 32)) {
          $this->error['telephone'] = $this->language->get('error_telephone');
          }

          if (!empty($this->request->post['config_customer_group_display']) && !in_array($this->request->post['config_customer_group_id'], $this->request->post['config_customer_group_display'])) {
          $this->error['customer_group_display'] = $this->language->get('error_customer_group_display');
          }

          if (!$this->request->post['config_limit_admin']) {
          $this->error['limit_admin'] = $this->language->get('error_limit');
          }

          if ($this->request->post['config_login_attempts'] < 1) {
          $this->error['login_attempts'] = $this->language->get('error_login_attempts');
          }

          if (!$this->request->post['config_voucher_min']) {
          $this->error['voucher_min'] = $this->language->get('error_voucher_min');
          }

          if (!$this->request->post['config_voucher_max']) {
          $this->error['voucher_max'] = $this->language->get('error_voucher_max');
          }

          if (!isset($this->request->post['config_processing_status'])) {
          $this->error['processing_status'] = $this->language->get('error_processing_status');
          }

          if (!isset($this->request->post['config_complete_status'])) {
          $this->error['complete_status'] = $this->language->get('error_complete_status');
          }

          if ($this->request->post['config_ftp_status']) {
          if (!$this->request->post['config_ftp_hostname']) {
          $this->error['ftp_hostname'] = $this->language->get('error_ftp_hostname');
          }

          if (!$this->request->post['config_ftp_port']) {
          $this->error['ftp_port'] = $this->language->get('error_ftp_port');
          }

          if (!$this->request->post['config_ftp_username']) {
          $this->error['ftp_username'] = $this->language->get('error_ftp_username');
          }

          if (!$this->request->post['config_ftp_password']) {
          $this->error['ftp_password'] = $this->language->get('error_ftp_password');
          }
          }

          if (!$this->request->post['config_error_filename']) {
          $this->error['error_filename'] = $this->language->get('error_error_filename');
          } else {
          if (preg_match('/\.\.[\/\\\]?/', $this->request->post['config_error_filename'])) {
          $this->error['error_filename'] = $this->language->get('error_malformed_filename');
          }
          }

          if (!$this->request->post['config_limit_admin']) {
          $this->error['limit_admin'] = $this->language->get('error_limit');
          }

          if (!trim($this->request->post['config_mail_regexp'])) {
          $this->error['mail_regexp'] = $this->language->get('error_mail_regexp');
          }

          if ((utf8_strlen($this->request->post['config_encryption']) < 32) || (utf8_strlen($this->request->post['config_encryption']) > 1024)) {
          $this->error['encryption'] = $this->language->get('error_encryption');
          }

          if ($this->error && !isset($this->error['warning'])) {
          $this->error['warning'] = $this->language->get('error_warning');
          }
         */
        return !$this->error;
    }

    public function theme() {
        if ($this->request->server['HTTPS']) {
            $server = HTTPS_CATALOG;
        } else {
            $server = HTTP_CATALOG;
        }

        // This is only here for compatibility with old themes.
        if ($this->request->get['theme'] == 'theme_default') {
            $theme = $this->config->get('theme_default_directory');
        } else {
            $theme = basename($this->request->get['theme']);
        }

        if (is_file(DIR_CATALOG . 'view/theme/' . $theme . '/image/' . $theme . '.png')) {
            $this->response->setOutput($server . 'catalog/view/theme/' . $theme . '/image/' . $theme . '.png');
        } else {
            $this->response->setOutput($server . 'image/no_image.png');
        }
    }

    public function getLanguages() {
        $this->load->model('localisation/language');
        $data['languages'] = $this->model_localisation_language->getLanguages();
        $arrayselect = [];
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['languages'] as $language) {
            $arrayselect[] = array('id' => $language['code'], 'value' => $language['name']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getOrderStatuses() {
        $this->load->model('localisation/order_status');
        $data['statuses'] = $this->model_localisation_order_status->getOrderStatuses();
        $arrayselect = [];
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['statuses'] as $item) {
            $arrayselect[] = array('id' => $item['order_status_id'], 'value' => $item['name']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

}
