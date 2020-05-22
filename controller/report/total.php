<?php

class ControllerReportTotal extends Controller {

    public function index() {
        $refresh = isset($this->request->get['refresh']) ? filter_var($this->request->get['refresh'], FILTER_VALIDATE_BOOLEAN) : false;
        // statistics
        $this->load->model('report/total');
        if (!isset($this->session->data['total_objects']) || $refresh) {
            $this->session->data['total_objects'] = $this->model_report_total->getTotalObjects();
        }
        if (!isset($this->session->data['total_deleted']) || $refresh) {
            $this->session->data['total_deleted'] = $this->model_report_total->getTotalObjectsDeleted();
        }
        if (!isset($this->session->data['total_objects_off']) || $refresh) {
            $this->session->data['total_objects_off'] = $this->model_report_total->getTotalObjectsOff();
        }
        if (!isset($this->session->data['total_objects_on']) || $refresh) {
            $this->session->data['total_objects_on'] = $this->session->data['total_objects'] - $this->session->data['total_objects_off'] - $this->session->data['total_deleted'];
        }

        $i = 0;
        $data['banners'] = [
            ['id' => $i++, 'text' => "Объектов всего", 'value' => $this->session->data['total_objects'], 'icon' => "car", 'css' => "", 'route' => "#!/app/report_stat"],
            ['id' => $i++, 'text' => "Подключенных", 'value' => $this->session->data['total_objects_on'], 'icon' => "eye", 'css' => "wialon-group-on", 'route' => "#!/app/report_stat"],
            ['id' => $i++, 'text' => "Отключенных", 'value' => $this->session->data['total_objects_off'], 'icon' => "eye-off", 'css' => "wialon-group-off", 'route' => "#!/app/report_stat"],
            ['id' => $i++, 'text' => "Удаленных", 'value' => $this->session->data['total_deleted'], 'icon' => "window-close", 'css' => "deleted", 'route' => "#!/app/dashboard"],
        ];

        $this->load->model('setting/server');
        $servers = $this->model_setting_server->getServers();

        foreach ($servers as $server) {
            $used = $this->model_report_total->getTotalObjectsByServer($server['server_id']);
            if ($used) {
                $data['banners'][] = ['id' => $i++, 'text' => $server['servername'] . " (" . $used . "/" . $server['total'] . ")" . ' загрузка',
                    'value' => round($used / $server['total'] * 100, 1) . ' %', 'icon' => "database-check", 'css' => "server" . $server['server_id'], 'route' => "#!/app/report_stat"];
            }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['banners'], JSON_UNESCAPED_UNICODE));
    }

    public function getDataForTotalChart() {
        $json = array();
        $this->load->model('report/total');

        $startDate = new DateTime('last day of this month');
        $startDate->modify('-1 year');
        $endDate = new DateTime();
        // $interval = new \DateInterval('P1M');
        $interval = DateInterval::createFromDateString('last day of next month');
        $period = new DatePeriod($startDate, $interval, $endDate);

        $months = [];
        foreach ($period as $date) {
         $months[] = $date->format('Y-m-d');
        }
        $months[] = $endDate->format('Y-m-d');
        //$months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        $id = 1;
        foreach ($months as $month) {
           // $filter['date_start'] = (new DateTime('last day of ' . $month))->format("Y-m-d");
            $filter['date_start'] = $month;
            $totals = $this->model_report_total->getTotalObjectsHistory($filter);
            $json[] = array(
                'id' => (string) $id++,
                'month' => date('My',strtotime($month)),
                'total_objects' => $totals['total_objects'],
                'total_online' => $totals['total_online'],
                'total_offline' => $totals['total_offline'],
                'total_off' => $totals['total_off'],
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }

    public function getBestsellers() {
        $json = array();
        $this->load->model('report/total');


        $filter['date_start'] = (new DateTime('first day of this month'))->format("Y-m-d");
        $filter['date_end'] = (new DateTime('last day of this month'))->format("Y-m-d");
       // $filter['date_start'] = (new DateTime('first day of Jul'))->format("Y-m-d");
       // $filter['date_end'] = (new DateTime('last day of Jul'))->format("Y-m-d");
        $totals1 = $this->model_report_total->getTotalOnByOwners();

        for ($x = 0; $x < 3; $x++) {
            $filter['owner_id'] = $totals1[$x]['owner_id'];
            $totals2 = $this->model_report_total->getAvgByOwners($filter);
            $json[] = array(
                'id' => (string) $x + 1,
                'ownername' => $totals1[$x]['ownername'],
                'total_objects' => $this->model_report_total->getTotalByOwner($totals1[$x]['owner_id'])['total_objects'],
                'total_on' => $totals1[$x]['total_on'],
                'total_online' => round($totals2['total_online']),
                'total_offline' => round($totals2['total_offline']),
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }

    public function getLast() {
        // $json = array();
        $this->load->model('catalog/item');

        $filter['date_start'] = (new DateTime('first day of this month'))->format("Y-m-d");
        $filter['date_end'] = (new DateTime('last day of this month'))->format("Y-m-d");
       // $filter['date_start'] = (new DateTime('first day of Jul'))->format("Y-m-d");
       // $filter['date_end'] = (new DateTime('last day of Jul'))->format("Y-m-d");
        $json = $this->model_catalog_item->getItems($filter);

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }

    public function getTotalLast() {
        // $json = array();
        $this->load->model('report/total');

        $filter['date_start'] = (new DateTime('first day of this month'))->format("Y-m-d");
        $filter['date_end'] = (new DateTime('last day of this month'))->format("Y-m-d");
       // $filter['date_start'] = (new DateTime('first day of Jul'))->format("Y-m-d");
       // $filter['date_end'] = (new DateTime('last day of Jul'))->format("Y-m-d");
        $total_last = $this->model_report_total->getTotalObjectsByDate($filter);

        $html = "<span class='webix_icon mdi mdi-new-box'></span>Новые объекты (" . $total_last . ")";
        $this->response->addHeader('Content-Type: text/html; charset=utf-8');
        $this->response->setOutput($html);
    }

    public function getTotalOfSelected() {
        //$json = array();
        $this->load->model('report/total');

        if (isset($this->request->get['selected'])) {
            $selected = $this->request->get['selected'];
        } else {
            $selected = '1';
        }

        $json = $this->model_report_total->getTotalObjectsBySelect($selected);

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }
}
