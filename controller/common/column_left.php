<?php

class ControllerCommonColumnLeft extends Controller {

    public function index() {
        if (isset($this->request->get['token']) && isset($this->session->data['token']) && ($this->request->get['token'] == $this->session->data['token'])) {
            $this->load->language('common/column_left');

            $this->load->model('user/user');

            $this->load->model('tool/image');

            $user_info = $this->model_user_user->getUser($this->user->getId());

            if ($user_info) {
                $data['firstname'] = $user_info['firstname'];
                $data['lastname'] = $user_info['lastname'];

                $data['user_group'] = $user_info['user_group'];

                if (is_file(DIR_IMAGE . $user_info['image'])) {
                    $data['image'] = $this->model_tool_image->resize($user_info['image'], 45, 45);
                } else {
                    $data['image'] = '';
                }
            } else {
                $data['firstname'] = '';
                $data['lastname'] = '';
                $data['user_group'] = '';
                $data['image'] = '';
            }

            // Create a 3 level menu array
            // Level 2 can not have children
            // Menu

            $data['menus'][] = array(
                'id' => 'dashboard',
                'icon' => 'mdi mdi-monitor-dashboard',
                'value' => $this->language->get('text_dashboard'),
                '$css' => 'dashboard',
                'details' => 'reports and statistics'
            );
            if ($this->user->hasPermission('access', 'catalog/product')) {
                $data['menus'][] = array(
                    'id' => 'items',
                    'value' => 'Объекты',
                    'icon' => 'mdi mdi-car',
                    '$css' => 'products',
                    'details' => 'вся техника'
                );
            }

            $data['menus'][] = array(
                'id' => 'orders',
                'value' => 'Заявки',
                'icon' => 'mdi mdi-checkbox-multiple-marked-outline',
                '$css' => 'orders',
                'details' => 'заявки в техподдержку'
            );

            // Catalog
            $catalog = array();

            if ($this->user->hasPermission('access', 'catalog/owner')) {
                $catalog[] = array(
                    'id' => 'owners',
                    'value' => 'Владельцы',
                    'icon' => 'mdi mdi-tie',
                    '$css' => 'second-level',
                    'details' => 'владельцы транспортных средств'
                );
            }

            if ($this->user->hasPermission('access', 'catalog/wialongroup')) {
                $catalog[] = array(
                    'id' => 'wialongroups',
                    'value' => 'Группы Wialon',
                    'icon' => 'mdi mdi-animation',
                    '$css' => 'second-level',
                    'details' => 'группы транспортных средств в системе Wialon'
                );
            }

            if ($this->user->hasPermission('access', 'catalog/tracker')) {
                $catalog[] = array(
                    'id' => 'trackers',
                    'value' => 'Трекеры',
                    'icon' => 'mdi mdi-chip',
                    '$css' => 'second-level',
                    'details' => 'GPS трекеры'
                );
            }

            if ($this->user->hasPermission('access', 'catalog/vehicle')) {
                $catalog[] = array(
                    'id' => 'vehicles',
                    'value' => 'Машины',
                    'icon' => 'mdi mdi-truck',
                    '$css' => 'second-level',
                    'details' => 'транспортные средства'
                );
            }

            if ($this->user->hasPermission('access', 'catalog/gsm')) {
                $catalog[] = array(
                    'id' => 'gsms',
                    'value' => 'Операторы',
                    'icon' => 'mdi mdi-signal',
                    '$css' => 'second-level',
                    'details' => 'операторы GSM'
                );
            }

            if ($catalog) {
                $data['menus'][] = array(
                    'id' => 'catalog',
                    'value' => 'Каталог',
                    'icon' => 'mdi mdi-tag-multiple',
                    '$css' => 'orders',
                    'details' => 'справочники',
                    'data' => $catalog
                );
            }

            // Billing
            $billing = array();

            if ($this->user->hasPermission('access', 'billing/tarif')) {
                $billing[] = array(
                    'id' => 'tarifs',
                    'value' => 'Тарифные планы',
                    'icon' => 'mdi mdi-currency-usd',
                    '$css' => 'second-level',
                    'details' => 'настройки тарифных планов'
                );
            }

            if ($this->user->hasPermission('access', 'billing/discount')) {
                $billing[] = array(
                    'id' => 'discounts',
                    'value' => 'Скидки',
                    'icon' => 'mdi mdi-percent',
                    '$css' => 'second-level',
                    'details' => 'настройка скидок'
                );
            }

            if ($billing) {
                $data['menus'][] = array(
                    'id' => 'billings',
                    'value' => 'Биллинг',
                    'icon' => 'mdi mdi-calculator',
                    '$css' => 'orders',
                    'details' => 'настройки биллинговых операций',
                    'data' => $billing
                );
            }

            // Attributes
            // System
            $system = array();

            //Settings
            $settings = array();
            if ($this->user->hasPermission('access', 'setting/setting')) {
                $settings[] = array(
                    'id' => 'settings',
                    'value' => 'Общие',
                    'icon' => 'mdi mdi-cogs',
                    '$css' => 'third-level',
                    'details' => 'общие настройки'
                );
            }
            if ($this->user->hasPermission('access', 'setting/server')) {
                $settings[] = array(
                    'id' => 'servers',
                    'value' => 'Серверы',
                    'icon' => 'mdi mdi-database',
                    '$css' => 'third-level',
                    'details' => 'настройки серверов мониторинга'
                );
            }

            if ($this->user->hasPermission('access', 'setting/setting')) {
                $system[] = array(
                    'id' => 'system-settings',
                    'value' => $this->language->get('text_setting'),
                    'icon' => 'mdi mdi-settings',
                    '$css' => 'second-level',
                    'details' => 'настройки системы',
                    'data' => $settings
                );
            }

            // Users
            $user = array();

            if ($this->user->hasPermission('access', 'user/user_permission')) {
                $user[] = array(
                    'id' => 'user_groups',
                    'value' => $this->language->get('text_user_group'),
                    'icon' => 'mdi mdi-account-group',
                    '$css' => 'third-level',
                    'details' => 'права доступа групп пользователей'
                );
            }

            if ($this->user->hasPermission('access', 'user/user')) {
                $user[] = array(
                    'id' => 'users',
                    'value' => $this->language->get('text_user'),
                    'icon' => 'mdi mdi-account',
                    '$css' => 'third-level',
                    'details' => 'список пользователей'
                );
            }

            if ($this->user->hasPermission('access', 'user/api')) {
                $user[] = array(
                    'id' => 'user_api',
                    'value' => $this->language->get('text_api'),
                    'icon' => 'mdi mdi-swap-horizontal',
                    '$css' => 'third-level',
                    'details' => 'пользоватнли имеющие разрешения на API'
                );
            }

            if ($user) {
                $system[] = array(
                    'id' => 'users_settings',
                    'value' => $this->language->get('text_users'),
                    'icon' => 'mdi mdi-account-key',
                    '$css' => 'second-level',
                    'details' => 'настройки прав пользователей',
                    'data' => $user
                );
            }

            // Tools
            $tool = array();

          //  if ($this->user->hasPermission('access', 'tool/upload')) {
          //      $tool[] = array(
           //         'name' => $this->language->get('text_upload'),
          //          'href' => $this->url->link('tool/upload', 'token=' . $this->session->data['token'], true),
          //          'children' => array()
          //      );
          //  }

          //  if ($this->user->hasPermission('access', 'tool/backup')) {
          //      $tool[] = array(
          //          'name' => $this->language->get('text_backup'),
          //          'href' => $this->url->link('tool/backup', 'token=' . $this->session->data['token'], true),
          //          'children' => array()
           //     );
           // }

            if ($this->user->hasPermission('access', 'tool/log')) {
                $tool[] = array(
                    'id' => 'logs',
                    'value' => 'Журнал ошибок',
                    //'icon' => 'grimace',
                    'icon' => 'mdi mdi-bug-check-outline',
                    '$css' => 'third-level',
                    'details' => 'просмотр журнала ошибок'
                );
            }

            /* octeam */
            if ($this->user->hasPermission('access', 'octeam/toolset')) {
                $tool[] = array(
                    'id' => 'caches',
                    'value' => 'Кэш',
                    'icon' => 'mdi mdi-codepen',
                    '$css' => 'third-level',
                    'details' => 'очистка кэша системы'
                );
            }

            if ($tool) {
                $system[] = array(
                    'id' => 'tools',
                    'value' => 'Обслуживание',
                    'icon' => 'mdi mdi-wrench',
                    '$css' => 'second-level',
                    'details' => 'системные инструменты',
                    'data' => $tool
                );
            }

            if ($system) {
                $data['menus'][] = array(
                    'id' => 'system',
                    'value' => $this->language->get('text_system'),
                    'icon' => 'mdi mdi-monitor',
                    '$css' => 'second-level',
                    'details' => '',
                    'data' => $system
                );
            }

            // Report
            $report = array();

            if ($this->user->hasPermission('access', 'report/billing')) {
                $report[] = array(
                    'id' => 'report_billing',
                    'value' => 'Биллинг',
                    'icon' => 'mdi mdi-calculator-variant',
                    '$css' => 'second-level',
                    'details' => 'начисление оплаты',
                   // 'data' => $report_billing
                );
            }

            // Report Objects
            if ($this->user->hasPermission('access', 'report/objects')) {
                $report[] = array(
                    'id' => 'report_objects',
                    'value' => 'Состояние объектов',
                    'icon' => 'mdi mdi-car-connected',
                    '$css' => 'second-level',
                    'details' => 'проверка и анализ работы и неисправности объектов',
                   // 'data' => $report_billing
                );
            }

             // All Stats
            if ($this->user->hasPermission('access', 'report/total')) {
                $report[] = array(
                    'id' => 'report_stat',
                    'value' => 'Статистика',
                    'icon' => 'mdi mdi-chart-line',
                    '$css' => 'second-level',
                    'details' => 'Развернутая итоговая статистика',
                   // 'data' => $report_billing
                );
            }

            if ($this->user->hasPermission('access', 'report/suspicious')) {
                $report[] = array(
                    'id' => 'report_suspicious',
                    'value' => 'Подозрительные',
                    'icon' => 'mdi mdi-signal-off',
                    '$css' => 'second-level',
                    'details' => 'Объекты не работают подозрительно долго',
                   // 'data' => $report_billing
                );
            }

            if ($report) {
                $data['menus'][] = array(
                    'id' => 'reports',
                    'value' => $this->language->get('text_reports'),
                    'icon' => 'mdi mdi-chart-bar',
                    '$css' => 'second-level',
                    'details' => '',
                    'data' => $report
                );
            }



            //return $this->load->view('common/column_left', $data);
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($data['menus'], JSON_UNESCAPED_UNICODE));
        }
    }

}
