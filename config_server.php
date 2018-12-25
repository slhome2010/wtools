<?php
// HTTP
$host = $_SERVER['HTTP_HOST'];
define ('HTTP_SERVER',  'http://'.$host.'/');
define ('HTTP_CATALOG', 'http://'.$host.'/');

// HTTPS
define ('HTTPS_SERVER',  'http://'.$host.'/');
define ('HTTPS_CATALOG', 'http://'.$host.'/');

// DIR
define('DIR_DOCROOT', '/var/www/html/service.curator.kz/');
define('DIR_APPLICATION', DIR_DOCROOT . '');
define('DIR_SYSTEM',	  DIR_DOCROOT . 'system/');
define('DIR_LANGUAGE',	  DIR_DOCROOT . 'language/');
define('DIR_TEMPLATE',	  DIR_DOCROOT . 'view/template/');
define('DIR_CONFIG',	  DIR_DOCROOT . 'system/config/');
define('DIR_IMAGE',	      DIR_DOCROOT . 'image/');
define('DIR_CACHE',		  DIR_DOCROOT . 'system/storage/cache/');
define('DIR_DOWNLOAD',	  DIR_DOCROOT . 'system/storage/download/');
define('DIR_LOGS', 		  DIR_DOCROOT . 'system/storage/logs/');
define('DIR_MODIFICATION',DIR_DOCROOT . 'system/storage/modification/');
define('DIR_UPLOAD',	  DIR_DOCROOT . 'system/storage/upload/');
define('DIR_CATALOG',	  DIR_DOCROOT . 'catalog/');

// DB
define('DB_DRIVER', 'mysqli');
define('DB_HOSTNAME', 'localhost');
define('DB_USERNAME', 'wtools');
define('DB_PASSWORD', 'wtools');
define('DB_DATABASE', 'wtools');
define('DB_PORT', '3306');
define('DB_PREFIX', 'oc_');