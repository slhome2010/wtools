<?php

require_once(DIR_SYSTEM . 'library/wtools/history.php');

class ControllerHistoryHistory extends Controller
{

    private $error = array();
    private static $new_item_id = 0;

    public function index()
    {
        $this->load->model('history/history');

        $this->getList();
    }   

    public function getList()
    {
        $this->load->model('history/history');

        $date_start = (new DateTime())->format('Y-m-d');
        $date_end = (new DateTime())->format('Y-m-d');
       
        $filter_data = array(            
            'date_start' => isset($this->request->get['date_start']) ? (new DateTime($this->request->get['date_start']))->format("Y-m-d") : $date_start,
            'date_end'   => isset($this->request->get['date_end']) ? (new DateTime($this->request->get['date_end']))->format("Y-m-d") : $date_end, 
            'start'      => isset($this->request->get['start']) ? $this->request->get['start'] : 0,
            'limit'      => isset($this->request->get['limit']) ? $this->request->get['limit'] : 2000,
            'ownername'  => isset($this->request->get['filter']['ownername']) ? $this->request->get['filter']["ownername"] : '',  
            'wialon_groupname'  => isset($this->request->get['filter']['wialon_groupname']) ? $this->request->get['filter']["wialon_groupname"] : '',  
            'trackername'=> isset($this->request->get['filter']['trackername']) ? $this->request->get['filter']["trackername"] : '',
            'itemname'   => isset($this->request->get['filter']['itemname']) ? $this->request->get['filter']["itemname"] : '',
            'tracker_uid'=> isset($this->request->get['filter']['tracker_uid']) ? $this->request->get['filter']["tracker_uid"] : '',
            'sim1'       => isset($this->request->get['filter']['sim1']) ? $this->request->get['filter']["sim1"] : '', 
            'sim2'       => isset($this->request->get['filter']['sim2']) ? $this->request->get['filter']["sim2"] : '', 
            'wialon_group_off' => isset($this->request->get['filter']['wialon_group_off']) ? $this->request->get['filter']["wialon_group_off"] : '',
            'online'     => isset($this->request->get['filter']['online']) ? $this->request->get['filter']["online"] : '',
            'tarif'      => isset($this->request->get['filter']['price']) ? $this->request->get['filter']["price"] : '',
            'discount'   => isset($this->request->get['filter']['history_discount_id']) ? $this->request->get['filter']["history_discount_id"] : '',  
            'sort'       => isset($this->request->get['sort']) ? $this->request->get['sort'] : [],    
        );

        $total = $this->model_history_history->getTotalHistory($filter_data);
        $results = $this->model_history_history->getHistory($filter_data);

        foreach ($results as $result) {           
            $result['deleted'] = $result['deleted'] && ($result['date_changed'] >= $result['date_modified']) ? $result['deleted'] : 0;               
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode(['pos' => $filter_data['start'], 'total_count' => $total, 'data' => $results], JSON_UNESCAPED_UNICODE));
    }
    
    public function getServers()
    {
        $this->load->model('setting/server');
        $arrayselect = [];
        $data['servers'] = $this->model_setting_server->getServers();
        $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['servers'] as $server) {
            $arrayselect[] = array('id' => $server['server_id'], 'value' => $server['servername']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getDiscounts()
    {
        $this->load->model('billing/discount');
        $arrayselect = [];
        $data['discounts'] = $this->model_billing_discount->getDiscounts();
        $arrayselect[] = array('id' => '0', 'value' => '');
        foreach ($data['discounts'] as $discount) {
            $arrayselect[] = array('id' => $discount['discount_id'], 'value' => $discount['discountname']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getTarifs()
    {
        $this->load->model('billing/tarif');
        $arrayselect = [];
        $data['tarifs'] = $this->model_billing_tarif->getTarifs();
        $arrayselect[] = array('id' => '0', 'value' => '');
       // $arrayselect[] = array('id' => '0', 'value' => '- Не выбрано -');
        foreach ($data['tarifs'] as $tarif) {
            $arrayselect[] = array('id' => $tarif['tarif_id'], 'value' => $tarif['tarifname']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getOwners()
    {
        $this->load->model('catalog/owner');
        $arrayselect = [];
        $owners = $this->model_catalog_owner->getOwners();
        $arrayselect[] = array('id' => '0', 'value' => '');
        foreach ($owners as $owner) {
           // $arrayselect[] =  $owner['ownername'];
           $arrayselect[] = array('id' => $owner['owner_id'], 'value' => $owner['ownername']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getGroups()
    {
        $this->load->model('catalog/wialongroup');
        $arrayselect = [];
        $results = $this->model_catalog_wialongroup->getWialongroups();
        $arrayselect[] = array('id' => '0', 'value' => '');
        foreach ($results as $result) {           
            $arrayselect[] = array('id' => $result['wialon_group_id'], 'value' => $result['wialon_groupname']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

    public function getTrackers()
    {
        $this->load->model('catalog/tracker');
        $arrayselect = [];
        $results = $this->model_catalog_tracker->getTrackers();
        $arrayselect[] = array('id' => '0', 'value' => '');
        foreach ($results as $result) {            
            $arrayselect[] = array('id' => $result['tracker_id'], 'value' => $result['trackername']);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($arrayselect));
    }

}
