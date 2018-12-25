<div class='flex_tmp'>
    <?php foreach ($banners as $banner) { ?>
        <div class="item <?php echo $banner['css']; ?>">
            <div class="webix_icon mdi mdi-<?php echo $banner['icon']; ?>"></div>
		<div class="details">
                   <div class="value"> <?php echo $banner['value']; ?> </div>
                   <div class="text"> <?php echo $banner['text']; ?> </div>
                </div>
		<div class='footer'> <a href=<?php echo $banner['route']; ?>>Подробнее<span class='webix_icon mdi mdi-send'></span></a></div>
	</div>
     <?php } ?>
</div>

