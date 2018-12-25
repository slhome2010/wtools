<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Wialon_activex
{
    private $groups = array();
    private $items = array();
    private $lasterror = '';
    
    public function __construct()
    {
        //$this->load->database();
    }
    
    public function connect($login, $pass, $wialon_url)
    {
        //echo 'connect login '.$login.', pass '.$pass.', url '.$wialon_url;
        if( $curl = curl_init() ) {
            curl_setopt($curl, CURLOPT_URL, $wialon_url.':8025');
            curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
            curl_setopt($curl, CURLOPT_USERAGENT, "WialonActiveX 1.7.17");
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_COOKIEFILE, "cookie.txt");
            curl_setopt($curl, CURLOPT_ENCODING,"");
            curl_setopt($curl, CURLOPT_POSTFIELDS, "a=login&u=".$login."&p=".$pass);

            $out = curl_exec($curl);
            //echo 'out'.$out;
            //echo print_r($out, true);
            $out = mb_convert_encoding($out, 'utf-8', mb_detect_encoding($out));
            $out = json_decode($out);
            
            //echo 'out';
            //echo print_r($out, true);

            if (empty($out)) {
                //$this->error('Неверный ответ от сервера');
                $this->lasterror = 'Пустой ответ от сервера';
                return false;
            }

            if (isset($out->code) and $out->code == 'ERROR') {
                //$this->error($out->txt);
                $this->lasterror = $out->txt;
                return false;
            }

            
            /*
            $wialon_items = $out->items;
            foreach ($wialon_items as $key => $val) {
		$this->itemsPro[$key] = new StdClass;
                $this->itemsPro[$key]->wialon_item_name = $val->nm;		//Название блока
                $this->itemsPro[$key]->wialon_item_id = $val->id;			//id блока в wialon			
                $this->itemsPro[$key]->wialon_item_uid = $val->uid;		//номер блока
                $this->itemsPro[$key]->wialon_item_hw = $val->hw;			//тип блока
                $this->itemsPro[$key]->wialon_item_phone = $val->ph;		//номер симки
                if (!empty($val->pos->t)) {
                    $this->itemsPro[$key]->wialon_item_last_time = $val->pos->t;	//время последнего сообщения от объекта
                }
                else {
                    $this->itemsPro[$key]->wialon_item_last_time = 0;
                }
            }
            */
            $this->groups = array();
            $wialon_items = $out->groups;
            //echo 'ActiveX groups<br><pre>';
            //echo print_r($wialon_items, true);
            //echo '</pre><br>';
            foreach ($wialon_items as $key => $val)
            {
                //$this->groups[$key]['groupName'] = $val->nm;
                //$this->groups[$key]['groupID'] = $val->id;
                    $this->groups[$key] = new StdClass;
                    $this->groups[$key]->groupName = $val->nm;				//имя группы
                    $this->groups[$key]->groupID = $val->id;				//id группы в wialon
                    $this->groups[$key]->unitIDs = $val->u;					//Массив идешников блоков, которые принадлежат данной группе
            }
            
            $this->items = array();
            $wialon_items = $out->items;
            
            //echo 'ActiveX items<br><pre>';
            //echo print_r($wialon_items, true);
            //echo '</pre><br>';
            foreach ($wialon_items as $key => $val) {
		$this->items[$key] = new StdClass;
                $this->items[$key]->itemName = $val->nm;		//Название блока
                $this->items[$key]->itemID = $val->id;			//id блока в wialon			
                $this->items[$key]->itemUID = $val->uid;		//номер блока
                $this->items[$key]->itemHw = $val->hw;			//тип блока
                $this->items[$key]->itemPhone1 = $val->ph;		//номер симки 1
                $this->items[$key]->itemPhone2 = '';		//номер симки
                if (!empty($val->pos->t)) {
                    $this->items[$key]->itemLastTime = $val->pos->t;	//время последнего сообщения от объекта
                }
                else {
                    $this->items[$key]->itemLastTime = 0;
                }
            }
            //$this->blocks = $out;
            
            //echo print_r($this->groupsPro, true);
            $this->lasterror = '';
            return true;
        }
        $this->lasterror = 'Ошибка инициализации curl';
        return false;
    }
    
    public function getGroups()
    {
        if (empty($this->groups))
            return false;
            
        return $this->groups;
    }
    
    public function getItems()
    {
        if (empty($this->items)) 
            return false;
        
        return $this->items;
    }
    
    public function getLastError()
    {
        return $this->lasterror;
    }
}





