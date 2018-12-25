<!DOCTYPE html>
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $title; ?></title>
<base href="<?php echo $base; ?>" />
<?php if ($description) { ?>
<meta name="description" content="<?php echo $description; ?>" />
<?php } ?>
<?php if ($keywords) { ?>
<meta name="keywords" content="<?php echo $keywords; ?>" />
<?php } ?>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
<script type="text/javascript" src="view/javascript/jquery/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="view/javascript/bootstrap/js/bootstrap.min.js"></script>
<link href="view/stylesheet/bootstrap.css" type="text/css" rel="stylesheet" />
<link href="view/javascript/font-awesome/css/font-awesome.min.css" type="text/css" rel="stylesheet" />
<script src="view/javascript/codebase/webix.js" type="text/javascript" charset="utf-8"></script>
<script src="view/javascript/codebase/i18n/ru.js" type="text/javascript" charset="utf-8"></script>
<link href="view/javascript/codebase/webix.css" type="text/css" rel="stylesheet" media="screen" charset="utf-8"/>
<link href="https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css" type="text/css" rel="stylesheet" media="screen" charset="utf-8"/>
<link href="view/stylesheet/admin.css" rel="stylesheet" type="text/css" media="screen" charset="utf-8"/>
<link href="view/stylesheet/stylesheet.css" type="text/css" rel="stylesheet" media="screen" charset="utf-8"/>

<script src="view/javascript/common.js" type="text/javascript"></script>
<script window.CKEDITOR_BASEPATH = "view/javascript/codebase/ckeditor/"></script>
<script src="view/javascript/codebase/ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="view/javascript/codebase/ckeditor/ckeditor_init.js" type="text/javascript"></script>
<?php foreach ($styles as $style) { ?>
<link type="text/css" href="<?php echo $style['href']; ?>" rel="<?php echo $style['rel']; ?>" media="<?php echo $style['media']; ?>" />
<?php } ?>
<?php foreach ($links as $link) { ?>
<link href="<?php echo $link['href']; ?>" rel="<?php echo $link['rel']; ?>" />
<?php } ?>

<?php foreach ($scripts as $script) { ?>
<script type="text/javascript" src="<?php echo $script; ?>"></script>
<?php } ?>
</head>
<body>
