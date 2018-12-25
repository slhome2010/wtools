<?php

require_once(DIR_SYSTEM . 'library/attributico/array_column.php');

class ModelCatalogAttributico extends Model {

    public function getAttributes($data = array()) {
        if (isset($data['language_id'])) {
            $language_id = (int) $data['language_id'];
        } else {
            $language_id = (int) $this->config->get('config_language_id');
        }

        $sql = "SELECT *, (SELECT agd.name FROM " . DB_PREFIX . "attribute_group_description agd WHERE agd.attribute_group_id = a.attribute_group_id AND agd.language_id = '" . $language_id . "') AS attribute_group "
                . "FROM " . DB_PREFIX . "attribute a LEFT JOIN " . DB_PREFIX . "attribute_description ad ON (a.attribute_id = ad.attribute_id) WHERE ad.language_id = '" . $language_id . "'";

        if (!empty($data['filter_name'])) {
            $sql .= " AND ad.name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
        }

        if (!empty($data['filter_attribute_group_id'])) {
            $sql .= " AND a.attribute_group_id = '" . $this->db->escape($data['filter_attribute_group_id']) . "'";
        }

        $sort_data = array(
            'ad.name',
            'attribute_group',
            'a.sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY attribute_group, ad.name";
        }

        if (isset($data['order']) && ($data['order'] == 'DESC')) {
            $sql .= " DESC";
        } else {
            $sql .= " ASC";
        }

        $query = $this->db->query($sql);
        return $query->rows;
    }

    public function getAttributeDescriptions($attribute_id) {
        $attribute_data = array();

        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $attribute_id . "'");

        foreach ($query->rows as $result) {
            $attribute_data[$result['language_id']] = array('name' => $result['name'], 'duty' => $result['duty']);
        }

        return $attribute_data;
    }

    public function getAttributeGroups($data = array()) {

        if (isset($data['language_id'])) {
            $language_id = (int) $data['language_id'];
        } else {
            $language_id = (int) $this->config->get('config_language_id');
        }

        $sql = "SELECT * FROM " . DB_PREFIX . "attribute_group ag LEFT JOIN " . DB_PREFIX . "attribute_group_description agd ON (ag.attribute_group_id = agd.attribute_group_id) WHERE agd.language_id = '" . $language_id . "'";

        $sort_data = array(
            'agd.name',
            'ag.sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY agd.name";
        }

        if (isset($data['order']) && ($data['order'] == 'DESC')) {
            $sql .= " DESC";
        } else {
            $sql .= " ASC";
        }

        $query = $this->db->query($sql);

        return $query->rows;
    }

    public function getAttributeGroup($attribute_id, $language_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute a LEFT JOIN " . DB_PREFIX . "attribute_group_description agd "
                . "ON (agd.attribute_group_id = a.attribute_group_id AND agd.language_id = '" . (int) $language_id . "') WHERE a.attribute_id = '" . (int) $attribute_id . "'");

        return $query->row;
    }

    public function getAttributeValues($attribute_id) {
        $attribute_values_data = array();
        $query = $this->db->query("SELECT DISTINCT(text), language_id FROM " . DB_PREFIX . "product_attribute WHERE attribute_id='" . (int) $attribute_id . "' ORDER BY text");
        //	$query = $this->db->query("SELECT DISTINCT(text), language_id FROM " . DB_PREFIX . "product_attribute WHERE attribute_id=" . (int) $attribute_id . " ORDER BY CAST(text AS DECIMAL)");
        foreach ($query->rows as $result) {
            $attribute_values_data[$result['language_id']][] = array('text' => $result['text']);
        }
        return $attribute_values_data;
    }

    public function getAttributeInfo($attribute_id) {
        $attribute_data = array();
        $query = $this->db->query("SELECT *, (SELECT name FROM " . DB_PREFIX . "attribute_group_description agd WHERE a.`attribute_group_id` = agd.`attribute_group_id`
                                                AND `agd`.`language_id` = `ad`.`language_id`) AS group_name
                                   FROM " . DB_PREFIX . "attribute a LEFT JOIN " . DB_PREFIX . "attribute_description ad ON (a.attribute_id = ad.attribute_id)
                                   WHERE a.`attribute_id` = '" . (int) $attribute_id . "'");

        foreach ($query->rows as $result) {
            $attribute_data[$result['language_id']] = array('attribute_id' => $result['attribute_id'], 'name' => $result['name'], 'group_name' => $result['group_name'], 'attribute_group_id' => $result['attribute_group_id']);
        }

        return $attribute_data;
    }

    public function getAllCategories() {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "category c LEFT JOIN " . DB_PREFIX . "category_description cd ON (c.category_id = cd.category_id) LEFT JOIN " . DB_PREFIX . "category_to_store c2s ON (c.category_id = c2s.category_id) WHERE cd.language_id = '" . (int) $this->config->get('config_language_id') . "' AND c2s.store_id = '" . (int) $this->config->get('config_store_id') . "'  ORDER BY c.parent_id, c.sort_order, cd.name");

        $category_data = array();
        foreach ($query->rows as $row) {
            $category_data[$row['parent_id']][$row['category_id']] = $row;
        }

        return $category_data;
    }

    public function addCategoryAttributes($category_id, $data) {
        // in foreach
        if (isset($data['category_attribute'])) {
            foreach ($data['category_attribute'] as $attribute_id) {
                $this->db->query("INSERT INTO " . DB_PREFIX . "category_attribute SET category_id = '" . (int) $category_id . "', attribute_id = '" . (int) $attribute_id . "' "
                        . "ON DUPLICATE KEY UPDATE category_id = '" . (int) $category_id . "', attribute_id = '" . (int) $attribute_id . "'");
            }
        }
        return $category_id;
    }

    public function deleteAttributesFromCategory($category_id, $data) {
        // in foreach
        if (isset($data['category_attribute'])) {
            foreach ($data['category_attribute'] as $attribute_id) {
                $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE category_id = '" . (int) $category_id . "' AND attribute_id = '" . (int) $attribute_id . "'");
            }
        }
    }

    public function getCategoryAttributes($data = array()) {

        if (isset($data['language_id'])) {
            $language_id = (int) $data['language_id'];
        } else {
            $language_id = (int) $this->config->get('config_language_id');
        }

        $sql = "SELECT ca.category_id, ca.attribute_id, a.attribute_group_id, ad.name AS attribute_description, ad.duty ,ag.sort_order AS sort_attribute_group
          FROM " . DB_PREFIX . "category_attribute ca
          LEFT JOIN " . DB_PREFIX . "attribute a ON (a.attribute_id = ca.attribute_id)
          LEFT JOIN " . DB_PREFIX . "attribute_description ad ON (ad.attribute_id = a.attribute_id AND ad.language_id = '" . (int) $language_id . "')
          LEFT JOIN " . DB_PREFIX . "attribute_group ag ON (ag.attribute_group_id = a.attribute_group_id)
          WHERE ca.category_id = '" . (int) $data['category_id'] . "'";

        $sort_data = array(
            'ad.name',
            'sort_attribute_group',
            'a.sort_order',
            'ca.attribute_id'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY sort_attribute_group, a.sort_order";
        }

        if (isset($data['order']) && ($data['order'] == 'DESC')) {
            $sql .= " DESC";
        } else {
            $sql .= " ASC";
        }

        $query = $this->db->query($sql);

        return $query->rows;
    }

    public function getCategoryAttributesId($category_id) {
        $data = array();
        $query = $this->db->query("SELECT attribute_id FROM " . DB_PREFIX . "category_attribute WHERE category_id = '" . (int) $category_id . "'");
        foreach ($query->rows as $attribute) {
            $data['category_attribute'][] = $attribute['attribute_id'];
        }
        return $data;
    }

    public function getCategoryDescriptions($category_id) {
        $category_description_data = array();

        $query = $this->db->query("SELECT language_id, name FROM " . DB_PREFIX . "category_description WHERE category_id = '" . (int) $category_id . "'");

        foreach ($query->rows as $result) {
            $category_description_data[$result['language_id']] = array(
                'name' => $result['name'],
            );
        }

        return $category_description_data;
    }

    private function getProductsByText($attribute_id, $language_id, $text) {

        $product = $this->db->query("SELECT product_id FROM " . DB_PREFIX . "product_attribute WHERE attribute_id='" . (int) $attribute_id . "' AND language_id='" . (int) $language_id . "' AND text='" . $text . "'");

        return $product->rows;
    }

    private function getProductsByAttributeId($attribute_id, $language_id) {

        $product = $this->db->query("SELECT product_id, text FROM " . DB_PREFIX . "product_attribute WHERE attribute_id='" . (int) $attribute_id . "' AND language_id='" . (int) $language_id . "'");

        return $product->rows;
    }

    public function getProductsByAttribute($attribute_id, $language_id) {
        $debug_mode = isset($this->session->data['a_debug_mode']) && $this->session->data['a_debug_mode'];
        $debug_sql = $debug_mode ? "LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)" : "";
        $debug_column = $debug_mode ? ", p2c.category_id" : "";
        $query = $this->db->query("SELECT p.product_id, p.`model`, `pd`.`name` as product_name,`ad`.`name` as attribute_name, p2a.* " . $debug_column . " FROM " . DB_PREFIX . "product p
                          LEFT JOIN " . DB_PREFIX . "product_description pd ON (p.product_id = pd.product_id)
                          LEFT JOIN " . DB_PREFIX . "product_attribute p2a ON (p.product_id = p2a.product_id AND `p2a`.`language_id` = '" . (int) $language_id . "')
                          " . $debug_sql . "
                          LEFT JOIN " . DB_PREFIX . "attribute_description ad ON (ad.attribute_id = p2a.`attribute_id` AND `ad`.`language_id` = '" . (int) $language_id . "')
                          WHERE pd.language_id  = '" . (int) $language_id . "' AND p2a.attribute_id = '" . (int) $attribute_id . "' ORDER BY pd.name ASC");
        return $query->rows;
    }

    public function editAttributeTemplates($attribute_id, $data) {

        $products = $this->getProductsByText($attribute_id, $data['language_id'], $data['oldtext']);

        $this->cache->delete('attributico');

        foreach ($products as $product) {
            $this->db->query("UPDATE " . DB_PREFIX . "product_attribute SET text = '" . $this->db->escape($data['newtext']) . "' WHERE attribute_id = '" . (int) $attribute_id . "' AND language_id = '" . (int) $data['language_id'] . "' AND product_id = '" . (int) $product['product_id'] . "'");
        }
    }

    public function editAttributeValues($attribute_id, $data) {

        $products = $this->getProductsByAttributeId($attribute_id, $data['language_id']);

        $this->cache->delete('attributico');

        foreach ($products as $product) {
            $newtext = str_replace(htmlspecialchars_decode($data['oldtext']), htmlspecialchars_decode($data['newtext']), $product['text']);
            // $newtext = preg_replace('#\b(' . $data['oldtext'] . ')\b#u', $data['newtext'], $product['text']);
            $this->db->query("UPDATE " . DB_PREFIX . "product_attribute SET text = '" . $this->db->escape($newtext) . "' WHERE attribute_id = '" . (int) $attribute_id . "' AND language_id = '" . (int) $data['language_id'] . "' AND product_id = '" . (int) $product['product_id'] . "'");
        }
    }

    public function editAttributeGroup($attribute_group_id, $data) {

        $this->cache->delete('attributico');

        foreach ($data['attribute_group_description'] as $language_id => $value) {
            $this->db->query("UPDATE " . DB_PREFIX . "attribute_group_description SET name = '" . $this->db->escape($value['name']) . "' WHERE attribute_group_id = '" . (int) $attribute_group_id . "' AND language_id = '" . (int) $language_id . "'");
        }
    }

    public function addAttribute($data) {
        // in foreach
        $maxorder = $this->db->query("SELECT MAX(`sort_order`) AS maxorder FROM " . DB_PREFIX . "attribute");
        $this->db->query("INSERT INTO " . DB_PREFIX . "attribute SET attribute_group_id = '" . (int) $data['attribute_group_id'] . "', sort_order = '" . ((int) $maxorder->row['maxorder'] + 1) . "'");

        $attribute_id = $this->db->getLastId();

        foreach ($data['attribute_description'] as $language_id => $value) {
            $this->db->query("INSERT INTO " . DB_PREFIX . "attribute_description SET attribute_id = '" . (int) $attribute_id . "', language_id = '" . (int) $language_id . "', name = '" . $this->db->escape($value['name']) . "'");
        }

        return $attribute_id;
    }

    public function editAttribute($attribute_id, $data) {

        $this->cache->delete('attributico');

        foreach ($data['attribute_description'] as $language_id => $value) {
            $this->db->query("UPDATE " . DB_PREFIX . "attribute_description SET name = '" . $this->db->escape($value['name']) . "' WHERE attribute_id = '" . (int) $attribute_id . "' AND language_id = '" . (int) $language_id . "'");
        }
    }

    public function editDuty($attribute_id, $data) {

        $this->cache->delete('attributico');

        foreach ($data['attribute_description'] as $language_id => $value) {
            $this->db->query("UPDATE " . DB_PREFIX . "attribute_description SET duty = '" . $this->db->escape($value['duty']) . "' WHERE attribute_id = '" . (int) $attribute_id . "' AND language_id = '" . (int) $language_id . "'");
        }
    }

    private function deleteAttribute($attribute_id) {
        // in foreach
        $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute WHERE attribute_id = '" . (int) $attribute_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $attribute_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute WHERE attribute_id = '" . (int) $attribute_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $attribute_id . "'");
    }

    public function deleteAttributes($data) {
        $this->cache->delete('attributico');

        if (isset($data['attribute'])) {
            foreach ($data['attribute'] as $attribute_id) {
                $this->deleteAttribute($attribute_id);
            }
        }
    }

    public function addAttributeGroup($data) {
        // in foreach
        $maxorder = $this->db->query("SELECT MAX(`sort_order`) AS maxorder FROM " . DB_PREFIX . "attribute_group");
        $this->db->query("INSERT INTO " . DB_PREFIX . "attribute_group SET sort_order = '" . ((int) $maxorder->row['maxorder'] + 1) . "'");

        $attribute_group_id = $this->db->getLastId();

        foreach ($data['attribute_group_description'] as $language_id => $value) {
            $this->db->query("INSERT INTO " . DB_PREFIX . "attribute_group_description SET attribute_group_id = '" . (int) $attribute_group_id . "', language_id = '" . (int) $language_id . "', name = '" . $this->db->escape($value['name']) . "'");
        }

        return $attribute_group_id;
    }

    public function deleteAttributeGroup($attribute_group_id) {
        // in foreach
        $query = $this->db->query("SELECT attribute_id FROM " . DB_PREFIX . "attribute WHERE attribute_group_id = '" . (int) $attribute_group_id . "'");

        foreach ($query->rows as $result) {
            $this->deleteAttribute($result['attribute_id']);
        }

        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_group WHERE attribute_group_id = '" . (int) $attribute_group_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_group_description WHERE attribute_group_id = '" . (int) $attribute_group_id . "'");
    }

    public function deleteAttributeGroups($data) {
        $this->cache->delete('attributico');

        if (isset($data['group'])) {
            foreach ($data['group'] as $attribute_group_id) {
                $this->deleteAttributeGroup($attribute_group_id);
            }
        }
    }

    public function replaceAttributeGroup($attribute_id, $attribute_group_id) {
        // in foreach
        $this->db->query("UPDATE " . DB_PREFIX . "attribute SET attribute_group_id = '" . (int) $attribute_group_id . "' WHERE attribute_id = '" . (int) $attribute_id . "'");
    }

    public function whoisOnDuty($attribute_id, $language) {

        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $attribute_id . "' AND language_id = '" . (int) $language['language_id'] . "'");

        return !empty($query->row) ? $query->row['duty'] : '';
    }

    public function getProductsByCategoryId($category_id) {

        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "product p LEFT JOIN " . DB_PREFIX . "product_description pd ON (p.product_id = pd.product_id) LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id) WHERE pd.language_id = '" . (int) $this->config->get('config_language_id') . "' AND p2c.category_id = '" . (int) $category_id . "' ORDER BY pd.name ASC");

        return $query->rows;
    }

    public function addCategoryAttributesToProducts($products, $data, $languages) {
        // in foreach
        set_time_limit(600);
        $method = $this->config->get('attributico_product_text');
        $count_affected = 0;
        foreach ($products as $product) {
            $text = $method == '2' ? "'" : "', text = '' ";
            if (isset($data['category_attribute'])) {
                foreach ($data['category_attribute'] as $attribute_id) {
                    foreach ($languages as $language) {
                        if ($method == '3' || $method == '4') {
                            $duty = $this->whoisOnDuty($attribute_id, $language);
                            $text = $duty ? "', text = '" . $duty . "' " : "'";
                        }
                        if ($method == '4') {
                            $query = $this->db->query("SELECT text FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $product['product_id'] . "' AND attribute_id = '" . (int) $attribute_id . "'  AND language_id = '" . (int) $language['language_id'] . "'");
                            if (!empty($query->row['text'])) {
                                $text = "'";
                            }
                        }
                        $this->db->query("INSERT INTO " . DB_PREFIX . "product_attribute SET product_id = '" . (int) $product['product_id'] . "', attribute_id = '" . (int) $attribute_id . "', language_id = '" . (int) $language['language_id'] . $text
                                . "ON DUPLICATE KEY UPDATE  product_id = '" . (int) $product['product_id'] . "', attribute_id = '" . (int) $attribute_id . "', language_id = '" . (int) $language['language_id'] . $text);

                        $count_affected += $this->db->countAffected();
                    }
                }
            }
        }
        return $count_affected;
    }

    public function deleteCategoryAttributesFromProducts($products, $data) {
        // in foreach
        foreach ($products as $product) {
            if (isset($data['category_attribute'])) {
                foreach ($data['category_attribute'] as $attribute_id) {
                    $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $product['product_id'] . "' AND attribute_id = '" . (int) $attribute_id . "'");
                }
            }
        }
    }

    public function sortAttributeGroup($data) {
        $this->cache->delete('attributico');

        if ($data['direct'] == 'after') {
            $sql = " -" . strval(count($data['subject_id'])) . " WHERE i.sort_order <= x.sort_order";
            $sql1 = " x.sort_order+1";
            $dir = " ASC";
        } else {
            $sql = " +" . strval(count($data['subject_id'])) . " WHERE i.sort_order >= x.sort_order";
            $sql1 = " x.sort_order-1";
            $dir = " DESC";
        }

        $subjects = $this->db->query("SELECT z.* FROM " . DB_PREFIX . "attribute_group z  WHERE z.attribute_group_id IN (" . implode(",", $data['subject_id']) . ") ORDER BY z.sort_order" . $dir);

        // раздвижка
        $this->db->query("UPDATE " . DB_PREFIX . "attribute_group i
                          INNER JOIN (SELECT j.sort_order FROM " . DB_PREFIX . "attribute_group j WHERE j.attribute_group_id = '" . (int) $data['target_id'] . "') x
                          SET i.sort_order = i.sort_order" . $sql);

        // вставка
        foreach ($subjects->rows as $subject_id) {
            $this->db->query("UPDATE " . DB_PREFIX . "attribute_group i
                              INNER JOIN (SELECT j.sort_order FROM " . DB_PREFIX . "attribute_group j WHERE j.attribute_group_id = '" . (int) $data['target_id'] . "') x,
                              (SELECT MAX(k.sort_order) AS maxorder FROM " . DB_PREFIX . "attribute_group k) xx
                              SET i.sort_order = IF(x.sort_order < `xx`.maxorder, " . $sql1 . ", `xx`.maxorder + 1) WHERE i.`attribute_group_id` = '" . (int) $subject_id['attribute_group_id'] . "'");
            $data['target_id'] = $subject_id['attribute_group_id'];
        }
        // прическа
        $this->db->query("SET @num :=0");
        $this->db->query("UPDATE " . DB_PREFIX . "attribute_group i,
                          (SELECT j.*, @num :=@num+1 as nrec FROM " . DB_PREFIX . "attribute_group j ORDER BY j.sort_order) xxx
                          SET i.sort_order = xxx.nrec WHERE i.attribute_group_id = xxx.attribute_group_id");

        return;
    }

    public function sortAttribute($data) {
        $this->cache->delete('attributico');

        if ($data['direct'] == 'after') {
            $sql = " -" . strval(count($data['subject_id'])) . " WHERE i.sort_order <= x.sort_order";
            $sql1 = " x.sort_order+1";
            $dir = " ASC";
        } else {
            $sql = " +" . strval(count($data['subject_id'])) . " WHERE i.sort_order >= x.sort_order";
            $sql1 = " x.sort_order-1";
            $dir = " DESC";
        }

        $subjects = $this->db->query("SELECT z.* FROM " . DB_PREFIX . "attribute z  WHERE z.attribute_id IN (" . implode(",", $data['subject_id']) . ") ORDER BY z.sort_order" . $dir);

        // раздвижка
        $this->db->query("UPDATE " . DB_PREFIX . "attribute i
                          INNER JOIN (SELECT j.sort_order FROM " . DB_PREFIX . "attribute j WHERE j.attribute_id = '" . (int) $data['target_id'] . "') x
                          SET i.sort_order = i.sort_order" . $sql);

        // вставка
        foreach ($subjects->rows as $subject_id) {
            $this->db->query("UPDATE " . DB_PREFIX . "attribute i
                              INNER JOIN (SELECT j.sort_order FROM " . DB_PREFIX . "attribute j WHERE j.attribute_id = '" . (int) $data['target_id'] . "') x,
                              (SELECT MAX(k.sort_order) AS maxorder FROM " . DB_PREFIX . "attribute k) xx
                              SET i.sort_order = IF(x.sort_order < `xx`.maxorder, " . $sql1 . ", `xx`.maxorder + 1) WHERE i.`attribute_id` = '" . (int) $subject_id['attribute_id'] . "'");
            $data['target_id'] = $subject_id['attribute_id'];
        }
        // прическа
        $this->db->query("SET @num :=0");
        $this->db->query("UPDATE " . DB_PREFIX . "attribute i,
                          (SELECT j.*, @num :=@num+1 as nrec FROM " . DB_PREFIX . "attribute j ORDER BY j.sort_order) xxx
                          SET i.sort_order = xxx.nrec WHERE i.attribute_id = xxx.attribute_id");
        return;
    }

}
