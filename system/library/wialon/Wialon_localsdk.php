<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Wialon_localsdk
{
    private $groups = array();
    private $items = array();
    private $sid='';
    private $lasterror = '';
    
    public function __construct()
    {
        //$this->load->database();
    }
    
    public function connect($token, $local_url)
    {
        if( $curl = curl_init() ) {

            $params = array();
            $params['token'] = $token;
            $postfield = 'svc=token/login&params='.json_encode($params);

            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/x-www-form-urlencoded'));
            curl_setopt($curl, CURLOPT_URL, $local_url.'/wialon/ajax.html');
            curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $postfield);
            $out = curl_exec($curl);

            $out = json_decode($out);
            
            //echo '<pre>';
            //echo print_r($out, true);
            //echo '</pre>';

            if (isset($out->error)) {
                    //$this->error('Ошибка аутентификации. Код '.$out->error);
                $this->lasterror = 'Ошибка аутентификации. Код '.$out->error;
                return false;
            }

            $this->sid = $out->eid;

            unset($params);
            unset($postfield);

            $spec['itemsType'] = 'avl_unit_group';
            $spec['propName'] = 'sys_name';
            $spec['propValueMask'] = '*';
            $spec['sortType'] = 'sys_name';

            $params['spec'] = $spec;
            $params['force'] = 0;
            $params['flags'] = 1;
            $params['from'] = 0;
            $params['to'] = 0;

            $postfield = 'svc=core/search_items&params='.json_encode($params).'&sid='.$this->sid;

            curl_setopt($curl, CURLOPT_POSTFIELDS, $postfield);

            $out = curl_exec($curl);

            $out = json_decode($out);
            
            if (!isset($out->items)) {
                $this->lasterror = 'Массив items пустой';
                return false;
            }
                

            $sdk_items = $out->items;
            //echo 'SDK groups<br><pre>';
            //echo print_r($sdk_items, true);
            //echo '</pre><br>';

            foreach ($sdk_items as $key => $val)
            {
                    $this->groups[$key] = new StdClass;
                    $this->groups[$key]->groupName = $val->nm;				//имя группы
                    $this->groups[$key]->groupID = $val->id;				//id группы в wialon
                    $this->groups[$key]->unitIDs = $val->u;					//Массив идешников блоков, которые принадлежат данной группе			
            }

            //echo '<br>Группы: <pre>';
            //print_r($this->groups);
            //echo '</pre>';

            unset($params);
            unset($postfield);
            unset($spec);

            $spec['itemsType'] = 'avl_unit';
            $spec['propName'] = 'sys_name';
            $spec['propValueMask'] = '*';
            $spec['sortType'] = 'sys_name';

            $params['spec'] = $spec;
            $params['force'] = 1;
            $params['flags'] = 1 |  0x100 |  0x400000;
            $params['from'] = 0;
            $params['to'] = 0;

            $postfield = 'svc=core/search_items&params='.json_encode($params).'&sid='.$this->sid;

            curl_setopt($curl, CURLOPT_POSTFIELDS, $postfield);

            $out = curl_exec($curl);

            $out = json_decode($out);
            
            $sdk_items = $out->items;
            
            //echo 'SDK items<br><pre>';
            //echo print_r($sdk_items, true);
            //echo '</pre><br>';
			
            foreach ($sdk_items as $key => $val) {
                $this->items[$key] = new StdClass;
                $this->items[$key]->itemName = $val->nm;		//Название блока
                $this->items[$key]->itemID = $val->id;			//id блока в wialon			
                $this->items[$key]->itemUID = $val->uid;		//номер блока
                $this->items[$key]->itemHw = $val->hw;			//тип блока
                $this->items[$key]->itemPhone1 = $val->ph;		//номер симки 1
                $this->items[$key]->itemPhone2 = $val->ph2;		//номер симки 2
                if (!empty($val->pos->t)) {
                    $this->items[$key]->itemLastTime = $val->pos->t;	//время последнего сообщения от объекта
                }
                else {
                    $this->items[$key]->itemLastTime = 0;
                }
            }
            
            $this->lasterror = '';
            return true;            
        }

            //echo '<br>Блоки: <pre>';
            //print_r($this->items);
            //echo '</pre>';
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

