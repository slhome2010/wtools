<?php echo $header; ?>

<style>
    #areaA{
        margin: 0px;
    }
</style>

<div id="areaA"></div>

<script type="text/javascript" charset="utf-8">
    var error_warning = "<?php echo $error_warning; ?>";
    var success = "<?php echo $success; ?>";
    var username =  "<?php echo $username; ?>";
    var password =  "<?php echo $password; ?>";
    var action =  "<?php echo $action; ?>";
    var redirect =  "<?php echo $redirect; ?>";
   // var token = '<?php echo $token; ?>';
    var token;
    var userinfo = JSON.parse('<?php echo $userinfo; ?>');
    var logo =  "<?php echo $logo; ?>";
</script>
<script src="view/javascript/bundle.js" type="text/javascript"></script>