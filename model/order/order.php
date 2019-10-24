<?php
define('BASEURL', 'http://curator.kz/support/nph-genericinterface.pl/Webservice/tickets');

class ModelOrderOrder extends Model
{

    public function getSessionId()
    {
        $curl = curl_init();

        if (!$curl) {
            echo 'Error';
            return;
        }

        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept:application/json', 'Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_URL, BASEURL . '/session');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);

        $body = json_encode(
            [
                "UserLogin" => "chief", //Имя пользователя
                "Password"  => "S@l2712610", //Пароль
            ]
        );

        curl_setopt($curl, CURLOPT_POSTFIELDS, $body);

        $result = curl_exec($curl);

        $result = json_decode($result);

        if (!$result) {
            echo 'Error decode json';
            return;
        }

        if (isset($result->Error)) {
            echo 'Error ' . $result->Error->ErrorMessage;
            return;
        }

        if (!isset($result->SessionID)) {
            echo 'Error SessionID';
            return;
        }

        return $result->SessionID;
    }

    public function getTicketId($sessid, $statetype = ['new', 'open', 'closed'])
    {
        $curl = curl_init();

        if (!$curl) {
            echo 'Error';
            return;
        }

        $now = new DateTime();         
        $now->modify( '-14 month' );

        $param = json_encode(
            [
                'SessionID' => $sessid,
                'StateType' => $statetype,
               // 'TicketCreateTimeNewerMinutes' => $timeRange, //Заявки за последние 3 дня
                'TicketCreateTimeNewerDate' => $now->format('Y') . '-01-01 00:00:01', 
                'SortBy'  => 'Age',
                'Limit'   => '10000',
            ]
        );

        curl_setopt($curl, CURLOPT_URL, BASEURL . '/ticket');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($curl, CURLOPT_URL, $BaseURL.'/ticket?'. http_build_query($param));
        //curl_setopt($curl, CURLOPT_POST, false);

        $result = curl_exec($curl);

        $result = json_decode($result);

        if (!$result) {
            echo 'Error decode json';
            return;
        }

        if (isset($result->Error)) {
            echo 'Error ' . $result->Error->ErrorMessage;
            return;
        }

        return $result->TicketID;
    }

    public function getTicketList($sessid, $ticketID){
        $curl = curl_init();

        $param = json_encode(
            [
                'SessionID' => $sessid,
                'TicketID' => implode(',', $ticketID),
                'AllArticles' => 1, //Отображать все сообщения
            ]
        );


        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_URL, BASEURL.'/ticketlist');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);

        $result = json_decode($result);

        if (!$result) {
            echo 'Error decode json';
            return;
        }

        if (isset($result->Error)) {
            echo 'Error '.$result->Error->ErrorMessage;
            return;
        }

        return $result;
    }

    public function getTicketTotal($sessid, $month)
    {
        $curl = curl_init();

        if (!$curl) {
            echo 'Error';
            return;
        }

        $now = new DateTime();
        $number = cal_days_in_month(CAL_GREGORIAN, (int)$month, (int)$now->format('Y'));

        $param = json_encode(
            [
                'SessionID' => $sessid,
                'StateType' => ['new', 'open', 'closed'],                
                'TicketCreateTimeNewerDate' => $now->format('Y') . '-' . (string)$month . '-01 00:00:01', 
                'TicketCreateTimeOlderDate' => $now->format('Y') . '-' . (string)$month . '-' . $number . ' 23:59:59',
                'SortBy'  => 'Age',
            ]
        );

        curl_setopt($curl, CURLOPT_URL, BASEURL . '/ticket');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($curl, CURLOPT_URL, $BaseURL.'/ticket?'. http_build_query($param));
        //curl_setopt($curl, CURLOPT_POST, false);

        $result = curl_exec($curl);

        $result = json_decode($result);

        if (!$result) {
            echo 'Error decode json';
            return;
        }

        if (isset($result->Error)) {
            echo 'Error ' . $result->Error->ErrorMessage;
            return;
        }

        if (isset($result->TicketID)) {
            return $result->TicketID;
        }


        return [];
    }

    public function getTicketClosed($sessid, $month)
    {
        $curl = curl_init();

        if (!$curl) {
            echo 'Error';
            return;
        }

        $now = new DateTime();
        $number = cal_days_in_month(CAL_GREGORIAN, (int)$month, (int)$now->format('Y'));

        $param = json_encode(
            [
                'SessionID' => $sessid,
                'StateType' => ['closed'],                
                'TicketLastChangeTimeNewerDate' => $now->format('Y') . '-' . (string)$month . '-01 00:00:01', 
                'TicketLastChangeTimeOlderDate' => $now->format('Y') . '-' . (string)$month . '-' . $number . ' 23:59:59',
                'SortBy'  => 'Age',
            ]
        );

        curl_setopt($curl, CURLOPT_URL, BASEURL . '/ticket');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($curl, CURLOPT_URL, $BaseURL.'/ticket?'. http_build_query($param));
        //curl_setopt($curl, CURLOPT_POST, false);

        $result = curl_exec($curl);

        $result = json_decode($result);

        if (!$result) {
            echo 'Error decode json';
            return;
        }

        if (isset($result->Error)) {
            echo 'Error ' . $result->Error->ErrorMessage;
            return;
        }

        if (isset($result->TicketID)) {
            return $result->TicketID;
        }


        return [];
    }

}
