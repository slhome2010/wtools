<?php
    $BaseURL = 'https://www.curator.kz/support/nph-genericinterface.pl/Webservice/tickets';
    
    $curl = curl_init();
    
    if (!$curl) {
        echo 'Error';
        return;
    }
    
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept:application/json', 'Content-Type:application/json'));
    curl_setopt($curl, CURLOPT_URL, $BaseURL.'/session');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
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
        echo 'Error '.$result->Error->ErrorMessage;
        return;
    }
    
    if (!isset($result->SessionID)) {
        echo 'Error SessionID';
        return;
    }
    
    $sessid = $result->SessionID;
    
    echo 'SessioID '.$sessid.'<br>';
    
    $param = json_encode(
            [
                'SessionID' => $sessid,
                'StateType' => ['new', 'open'],
                'TicketCreateTimeNewerMinutes' => 4320, //Заявки за последние 3 дня
            ]
    );
  
    curl_setopt($curl, CURLOPT_URL, $BaseURL.'/ticket');
    curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
    //curl_setopt($curl, CURLOPT_URL, $BaseURL.'/ticket?'. http_build_query($param));
    //curl_setopt($curl, CURLOPT_POST, false);
    
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
    
    echo '<pre>';
    echo print_r($result, true);
    echo '</pre><br>';
    
    unset($param);
    
    $param = json_encode(
        [
            'SessionID' => $sessid,
            'TicketID' => implode(',', $result->TicketID),
            'AllArticles' => 1, //Отображать все сообщения
        ]
    );
    
    
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_URL, $BaseURL.'/ticketlist');
    curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
    
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
    
    echo '<pre>';
    echo print_r($result, true);
    echo '</pre><br>';
    
?>