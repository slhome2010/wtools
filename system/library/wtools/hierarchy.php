<?php
/**
 * PHP5 (ООП)
 * Постоение дерева (меню неограниченной вложености)
 * @author дизайн студия ox2.ru
 */
class TreeOX2 {

    private $_db = null;
    private $_category_arr = array();

    public function __construct() {
        //Подключаемся к базе данных, и записываем подключение в переменную _db
        $this->_db = new PDO("mysql:dbname=ox2.ru-test-base;host=localhost", "root", "");
        //В переменную $_category_arr записываем все категории (см. ниже)
        $this->_category_arr = $this->_getCategory();
    }

    /**
     * Метод читает из таблицы category все сточки, и
     * возвращает двумерный массив, в котором первый ключ - id - родителя
     * категории (parent_id)
     * @return Array
     */
    private function _getCategory() {
        $query = $this->_db->prepare("SELECT * FROM `category`"); //Готовим запрос
        $query->execute(); //Выполняем запрос
        //Читаем все строчки и записываем в переменную $result
        $result = $query->fetchAll(PDO::FETCH_OBJ);
        //Перелапачиваем массим (делаем из одномерного массива - двумерный, в котором
        //первый ключ - parent_id)
        $return = array();
        foreach ($result as $value) { //Обходим массив
            $return[$value->parent_id][] = $value;
        }
        return $return;
    }

    /**
     * Вывод дерева
     * @param Integer $parent_id - id-родителя
     * @param Integer $level - уровень вложености
     */
    public function outTree($parent_id, $level) {
        if (isset($this->_category_arr[$parent_id])) { //Если категория с таким parent_id существует
            foreach ($this->_category_arr[$parent_id] as $value) { //Обходим ее
                /**
                 * Выводим категорию
                 *  $level * 25 - отступ, $level - хранит текущий уровень вложености (0,1,2..)
                 */
                echo "<div style='margin-left:" . ($level * 25) . "px;'>" . $value->name . "</div>";
                $level++; //Увеличиваем уровень вложености
                //Рекурсивно вызываем этот же метод, но с новым $parent_id и $level
                $this->outTree($value->id, $level);
                $level--; //Уменьшаем уровень вложености
            }
        }
    }

}

$tree = new TreeOX2();
$tree->outTree(0, 0); //Выводим дерево


