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
                'Title' => $ticket->Title,
                'Owner' => $ticket->Owner,
                'CustomerID' => $ticket->CustomerID,
                'Queue' => $ticket->Queue,
                'Age' => $this->secondsToHumanReadable($ticket->Age),
                'StateType' => $ticket->StateType,
                'State' => $ticket->State,
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
        $i = 0;
        foreach (array('y' => 'г', 'm' => 'м', 'd' => 'дн', 'h' => 'ч', 'i' => 'мин') as $time => $timename) {
            if ($diff->$time !== 0 && $i <2) {
                $ret .= $diff->$time . '' . $timename;
                //if ($diff->$time !== 1 && $diff->$time !== -1) {
                //    $ret .= 's';
               // }
                $ret .= ' ';
                $i++;
            }
        }
        return substr($ret, 0, - 1);
    }

}
