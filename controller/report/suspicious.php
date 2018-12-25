<?php

class ControllerReportSuspicious extends Controller {

    public function index() {
       // $refresh = isset($this->request->get['refresh']) ? filter_var($this->request->get['refresh'], FILTER_VALIDATE_BOOLEAN) : false;
        // statistics
        $this->load->model('report/suspicious');

        if ($this->config->get('config_suspicious_range')) {
            $filter['dangerous_range'] = $this->config->get('config_suspicious_range');
        } else {
            $filter['dangerous_range'] = '7';
        }

        if ($this->config->get('config_suspicious_date')) {
            $filter['date_end'] = (new DateTime($this->config->get('config_suspicious_date')))->format('Y-m-d');
            $filter['date_start'] = (new DateTime($this->config->get('config_suspicious_date') . ' - '. $filter['dangerous_range'] . ' days'))->format('Y-m-d');
        } else {
            $filter['date_end'] = (new DateTime())->format('Y-m-d');
            $filter['date_start'] = (new DateTime('- '. $filter['dangerous_range'] . ' days'))->format('Y-m-d');
        }

        $json = $this->model_report_suspicious->getSuspicious($filter);

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }

}
