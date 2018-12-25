<?php

require_once(DIR_SYSTEM . 'library/wtools/tree.php');
require_once(DIR_SYSTEM . 'library/wtools/history.php');
require_once(DIR_SYSTEM . 'library/wtools/billing.php');

class ControllerBillingBilling extends Controller {

    public function getItemBilling() {
        $this->load->model('catalog/item');
        $this->load->model('billing/tarif');

        $data['billings'] = array();

        if (isset($this->request->get['date_start']) && $this->request->get['date_start'] != 'null' && isset($this->request->get['date_end']) && $this->request->get['date_end'] != 'null') {

            if (isset($this->request->get['item_id']) && ($this->request->get['item_id'] != 'undefined')) {
                $item_history = new History($this->request->get['item_id'], $this->request->get['date_start'], $this->request->get['date_end'], $this->db);
                $history_intervals = $item_history->history_intervals;
            }
            if ($history_intervals) {
                $data['billings'] = $this->BillingFor($history_intervals);
            }
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($data['billings'], JSON_UNESCAPED_UNICODE));
    }

    private function BillingFor($history_intervals) {

        $data['billings'] = array();
        foreach ($history_intervals as $history_interval) {
            $tarif = !$history_interval['event_status'] ? $this->model_billing_tarif->getTarif($history_interval['tarif_id']):0;

            $discount = new Discount($history_interval['discount_id'], $history_interval['date_start'], $history_interval['date_end'], $this->db);
            $discount_intervals = $discount->discount_intervals;

            foreach ($discount_intervals as $interval) {
                $billing_for_discount_interval = new Billing($interval, $tarif, $history_interval['event_name']);
                $data['billings'][] = $billing_for_discount_interval->billing_data;
            }
        }

        return $data['billings'];
    }

}
