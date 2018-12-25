import {JetView} 	from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class UserView extends JetView {
	config(){
		return layout;		
	}
	init(view){			
		$$('user-form').bind($$('user-user'));	
		webix.dp.$$("user-user").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"user-user",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	columns:[
		{id:"user_id", header:"#", sort:"int", width:50},		
		{id:"thumb2", header:"", template:"<img class='photo' src='#thumb2#'/>", width:50 },
		{id:"username", header:["Логин", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"user_group_name", header:["Группа", {content:"selectFilter"} ], sort:"string", minWidth:120, fillspace: 2, //editor:"select", 
			//options:"index.php?route=user/user/getUserGroups&token="+token, 
		},
		{id:"date_added", header:["Дата регистрации", {content:"dateFilter"} ], sort:"int", minWidth:120, fillspace: 2},
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	pager:"pagerA",
	"export":true,
	url:"index.php?route=user/user/getList&token="+token,
	save:{
			"insert":"index.php?route=user/user/add&token="+token,
			"update":"index.php?route=user/user/edit&token="+token,
			"delete":"index.php?route=user/user/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){	
			this.select(id);				
			$$('user-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('user-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();		
		}
	},	
	ready:function(){
		webix.extend(this, webix.ProgressBar);
	}
};

webix.protoUI({
  name:"imageLabel",  
  setValue:function(value){
    this.setHTML("<a href='' id='thumb-image' data-toggle='image' class='img-thumbnail' data-original-title='' title=''><img  src='"+value+
	            "'></img></a><input  name='image' value='' id='input-image' hidden='true' />");
  }  
}, webix.ui.label);

const ui = {
	view:"form",
	id:"user-form",
	dataFeed: function (id) {
				let current_user_id = $$('user-user').getItem(id).user_id;				
				this.load("index.php?route=user/user/getForm&token="+token+"&user_id="+current_user_id);				
			  },	
	elements:[
	
			{ view:"imageLabel", name:"thumb", id:"thumb",  height: 110, },
			{ view:"text", name:"image", id:"image", hidden:true },	
			{ view:"text", name:"thumb2", id:"thumb2", hidden:true },	
			{ view:"text", id:"user_id", name:"user_id", label:"ID пользователя", labelWidth:170, readonly:true },
			{ view:"text", name:"username", label:"Логин", placeholder:"Введите логин", labelWidth:170, required:true, invalidMessage:"логин должен быть от 3 до 20 знаков" },
			{ view:"select", name:"user_group_id", label:"Группа", labelWidth:170, editor:"select", options:"index.php?route=user/user/getUserGroups&token="+token,
					required:true, invalidMessage:"поле не может быть пустым" },
			{ view:"text", name:"firstname", label:"Имя", placeholder:"Введите имя", labelWidth:170, required:true, invalidMessage:"поле должно содержать от 1 до 32 знаков" },			
			{ view:"text", name:"lastname", label:"Фамилия", placeholder:"Введите фамилию", labelWidth:170, required:true, invalidMessage:"поле должно содержать от 1 до 32 знаков" },
			{ view:"text", name:"email", type:'email', label:"E-mail", placeholder:"Введите e-mail", labelWidth:170, required:true, invalidMessage:"не похоже на адрес электронной почты" },
			{ view:"text", name:"password", type:'password', label:"Пароль", placeholder:"Введите пароль", labelWidth:170, invalidMessage:"необходимо ввести пароль от 4 до 20 знаков" },
			{ view:"text", name:"confirm", type:'password', label:"Подтверждение", placeholder:"Подтвердите пароль", labelWidth:170, invalidMessage:"пароли не совпадают" },
			{ view:"select", name:"status", label:"Статус", placeholder:"Установите статус", labelWidth:170, options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("user-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("user-form");						
						if(!form.validate()) 
							return false;	
											
						webix.$$("thumb2").setValue($('a#thumb-image.img-thumbnail').find('img').attr("src"));
						if ($('input#input-image').val()) 
							webix.$$("image").setValue($('input#input-image').val());
						
						webix.ajax().post("index.php?route=user/user/validateForm&token="+token, $$("user-form").getValues(), function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								form.save();
								$$("user-views").back();
								$$('paging').show();
								$$('edit-form-icon').hide();
								$$('edit-tools').show();
							}
						});
						
					}}
				]
			}
	],
	rules:{
          "username": function(value){ return value.length >= 3 && value.length <= 20},
		  "firstname": function(value){ return value.length >= 1 && value.length <= 32},
		  "lastname": function(value){ return value.length >= 1 && value.length <= 32},
		  "email": function(value){ return webix.rules.isEmail(value)},
		  "password": function(value){ if (value) return value.length >= 4 && value.length <= 20; else return true},
		  "confirm": function(value){ return value == this.getValues().password;},		
    }
};
  

const user_views = {
	view:"multiview", 
    id:"user-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ user_views, paging ] }
	]
};
 