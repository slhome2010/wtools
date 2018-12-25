<?php

class ControllerCatalogVehicle extends Controller {

    private $error = array();
    private static $new_vehicle_id = 0;

    public function index() {
        //$this->load->language('catalog/vehicle');
        //$this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('catalog/vehicle');

        $this->getList();
    }

    public function add() {
        $this->load->model('catalog/vehicle');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->new_vehicle_id = $this->model_catalog_vehicle->addVehicle($this->request->post);
        }
        $this->getForm();
    }

    public function edit() {
        $this->load->model('catalog/vehicle');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->model_catalog_vehicle->editVehicle($this->request->post['vehicle_id'], $this->request->post);
        }
    }

    public function delete() {
        $this->load->model('catalog/vehicle');

        if (isset($this->request->post['vehicle_id'])) {
            //foreach ($this->request->post['selected'] as $vehicle_id) {
            $this->model_catalog_vehicle->deleteVehicle($this->request->post['vehicle_id']);
            //}
        }
    }

    public function getList() {
        $this->load->model('catalog/vehicle');
        if (isset($this->request->get['sort'])) {
            $sort = $this->request->get['sort'];
        } else {
            $sort = 'vehiclename';
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

        $data['vehicles'] = array();

        $filter_data = array(
            'sort' => $sort,
            'order' => $order,
            'start' => ($page - 1) * $this->config->get('config_limit_admin'),
            'limit' => 0
        );

        //$vehicle_total = $this->model_catalog_vehicle->getTotalManufacturers();

        $results = $this->model_catalog_vehicle->getVehicles($filter_data);

        foreach ($results as $result) {
            $data['vehicles'][] = array(
                'vehicle_id' => $result['vehicle_id'],
                'vehiclename' => $result['vehiclename'],
                'sort_order' => $result['sort_order'],
                'status' => $result['status'],
                'edit' => ''
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['vehicles'], JSON_UNESCAPED_UNICODE));
    }

    public function getForm() {
        //CKEditor

        $this->document->addScript('view/javascript/ckeditor/ckeditor.js');
        $this->document->addScript('view/javascript/ckeditor/ckeditor_init.js');

        $this->load->model('catalog/vehicle');
        $data['heading_title'] = $this->language->get('heading_title');


        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }


        if (isset($this->request->get['vehicle_id']) && ($this->request->get['vehicle_id'] != 'undefined')) {
            $vehicle_info = $this->model_catalog_vehicle->getVehicle($this->request->get['vehicle_id']);
            $data['vehicle_id'] = $this->request->get['vehicle_id'];
        } else {
            $vehicle_info = $this->model_catalog_vehicle->getVehicle($this->new_vehicle_id);
            $data['vehicle_id'] = $this->new_vehicle_id;
        }

        if (isset($this->request->post['webix_operation'])) {
            $data['webix_operation'] = $this->request->post['webix_operation'];
        }

        if (isset($this->request->post['vehiclename'])) {
            $data['vehiclename'] = $this->request->post['vehiclename'];
        } elseif (!empty($vehicle_info)) {
            $data['vehiclename'] = $vehicle_info['vehiclename'];
        } else {
            $data['vehiclename'] = '';
        }

        if (isset($this->request->post['sort_order'])) {
            $data['sort_order'] = $this->request->post['sort_order'];
        } elseif (!empty($vehicle_info)) {
            $data['sort_order'] = $vehicle_info['sort_order'];
        } else {
            $data['sort_order'] = '';
        }

        if (isset($this->request->post['status'])) {
            $data['status'] = $this->request->post['status'];
        } elseif (!empty($vehicle_info)) {
            $data['status'] = $vehicle_info['status'];
        } else {
            $data['status'] = 0;
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    public function validateForm() {
        if (!$this->user->hasPermission('modify', 'catalog/vehicle')) {
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
        if (!$this->user->hasPermission('modify', 'catalog/vehicle')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        $this->load->model('catalog/product');

        // foreach ($this->request->post['selected'] as $vehicle_id) {
        $product_total = $this->model_catalog_product->getTotalById("vehicle", $this->request->post['vehicle_id']);

        if ($product_total) {
            $this->error['warning'] = sprintf($this->language->get('error_product'), $product_total);
        }
        // }

         $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->error, JSON_UNESCAPED_UNICODE));
    }

}
