<?php

class ControllerOrderOrder extends Controller {

    public function getTicketList() {
        $this->load->model('order/order');

        $sessionID = $this->model_order_order->getSessionId();
        $ticketID = $this->model_order_order->getTicketId($sessionID);
        $ticketList = $this->model_order_order->getTicketList($sessionID, $ticketID);
        $orders = array();

        foreach ($ticketList->Ticket as $ticket) {
            $orders[] = array(
                'TicketID' => $ticket->TicketID,
                'TicketNumber' => $ticket->TicketNumber,
                'Created' => $ticket->Created,
                'Changed' => $ticket->Changed,
                'Title' => $ticket->Title,
                'Owner' => $ticket->Owner,
                'CustomerID' => $ticket->CustomerID,
                'Queue' => $ticket->Queue,
                'Age' => $this->secondsToHumanReadable($ticket->Age),
                '_Age' => $ticket->Age,
                'StateType' => $ticket->StateType,
                'State' => $ticket->State,
                'Request' => isset($ticket->Article[0]) ? $ticket->Article[0]->Body : 'Текст отсутствует.',
                'Response' => isset($ticket->Article[2]) ? $ticket->Article[2]->Body : 'Ответа пока нет.',
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($orders));
    }

    private function secondsToHumanReadable($seconds) {
        //if you dont need php5 support, just remove the is_int check and make the input argument type int.
        if (!\is_int($seconds)) {
            throw new \InvalidArgumentException('Argument 1 passed to secondsToHumanReadable() must be of the type int, ' . \gettype($seconds) . ' given');
        }
        $dtF = new \DateTime('@0');
        $dtT = new \DateTime("@$seconds");
        $ret = '';
        if ($seconds === 0) {
            // special case
            return '0 seconds';
        }
        $diff = $dtF->diff($dtT);

        /* $i = 0;
          foreach (array('y' => 'г', 'm' => 'мес', 'd' => 'дн', 'h' => 'ч', 'i' => 'мин', 's' => 'сек') as $time => $timename) {
          if ($diff->$time !== 0 && $i <2) {
          $ret .= $diff->$time . '' . $timename;
          $ret .= ' ';
          $i++;
          }
          }

          return substr($ret, 0, - 1); */

        $times = explode(' ', $diff->format('%a %h %m %s'));
        $i = 0;
        foreach (array('дн', 'ч', 'мин', 'сек') as $time => $timename) {
            if ($times[$time] !== '0' && $i < 2) {
                $ret .= $times[$time] . '' . $timename;
                $ret .= ' ';
                $i++;
            }
        }

        return substr($ret, 0, - 1);
    }

    public function getDataForChart() {
        $json = array();

        $this->load->model('order/order');
        $sessionID = $this->model_order_order->getSessionId();
       /*  $ticketTotal = $this->model_order_order->getTicketId($sessionID);        
        $ticketListTotal = $this->model_order_order->getTicketList($sessionID, $ticketTotal);
        $ticketClosed = $this->model_order_order->getTicketId($sessionID, ['closed']);
        $ticketListClosed = $this->model_order_order->getTicketList($sessionID, $ticketClosed); */

        $months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $id = 1;
        
        foreach ($months as $month=>$monthname) {
           // $filter['date_start'] = (new DateTime('last day of ' . $month))->format("Y-m-d");
           // $totals = $this->model_report_total->getTotalObjectsHistory($filter);
            $json[] = array(
                'id' => (string) $id++,
                'month' => $monthname,
                'total_open' => count($this->model_order_order->getTicketTotal($sessionID, $month+1)),
                'total_closed' => count($this->model_order_order->getTicketClosed($sessionID, $month+1))  
            );
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json, JSON_UNESCAPED_UNICODE));
    }


}
