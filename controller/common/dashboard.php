<?php

class ControllerCommonDashboard extends Controller {

    public function index() {
        $this->load->language('common/dashboard');

      
        // statistics
        $this->load->model('report/total');
        if (!isset($this->session->data['total_objects'])) {
            $this->session->data['total_objects'] = $this->model_report_total->getTotalObjects();
        }
        if (!isset($this->session->data['total_deleted'])) {
            $this->session->data['total_deleted'] = $this->model_report_total->getTotalObjectsDeleted();
        }
        if (!isset($this->session->data['total_objects_on'])) {
            $this->session->data['total_objects_on'] = $this->session->data['total_objects'] - $this->model_report_total->getTotalObjectsOff() - $this->session->data['total_deleted'];
        }

        $data['banners'] = [
            ['id' => 1, 'text' => "Объектов", 'value' => $this->session->data['total_objects'], 'icon' => "car", 'css' => "total-objects", 'route' => "#!/app/report_stat"],
            ['id' => 2, 'text' => "Подключенных", 'value' => $this->session->data['total_objects_on'], 'icon' => "eye", 'css' => "users", 'route' => "#!/app/report_stat"],
            ['id' => 4, 'text' => "Новых заявок", 'value' => "0", 'icon' => "square-edit-outline", 'css' => "feedbacks", 'route' => "#!/app/dashboard"],
            ['id' => 3, 'text' => "Исполненных", 'value' => "0", 'icon' => "checkbox-marked-outline", 'css' => "profit", 'route' => "#!/app/dashboard"],
        ];

        $this->response->setOutput($this->load->view('common/dashboard', $data));
    }

}
