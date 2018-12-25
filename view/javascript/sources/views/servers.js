import {JetView} from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class serverView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$('server-form').bind($$('setting-server'));	
		webix.dp.$$("setting-server").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"setting-server",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	columns:[
		{id:"server_id", header:"#", sort:"int", width:50},		
		{id:"servername", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"link", header:["Домен", {content:"textFilter"} ], sort:"int", minWidth:80, fillspace: 2, editor:"text",},		
		{id:"soft", header:["Софт"], sort:"int", minWidth:120, fillspace: 2},
		{id:"sort_order", header:{text:"Порядок сортировки", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},	
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	pager:"pagerA",
	"export":true,
	url:"index.php?route=setting/server/getList&token="+token,
	save:{
			"insert":"index.php?route=setting/server/add&token="+token,
			"update":"index.php?route=setting/server/edit&token="+token,
			"delete":"index.php?route=setting/server/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){	
			this.select(id);	
			$$('server-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('server-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();		
		}
	},			
	ready:function(){
		webix.extend(this, webix.ProgressBar);
	}
};

const ui = {
	view:"form",
	id:"server-form",
	multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_server_id = $$('setting-server').getItem(id).server_id;				
				this.load("index.php?route=setting/server/getForm&token="+token+"&server_id="+current_server_id);				
			  },	
	elements:[
	
			{ view:"text", id:"server_id", name:"server_id", label:"ID сервера", labelWidth:170, readonly:true },			
			{ view:"text", name:"servername", label:"Название", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 32 знаков" },
			{ view:"text", name:"link", label:"Домен", placeholder:"Адрес домена", labelWidth:170, required:true, invalidMessage:"значение поля не должно быть пустым"},
			{ view:"text", name:"ip", label:"IP адрес", placeholder:"Введите ip адрес", labelWidth:170, },
			{ view:"select", name:"soft", label:"Программное обеспечение", labelWidth:170, options:["Wialon Pro","Wialon Local"]},
			{ view:"text", name:"login", label:"Логин", placeholder:"Введите логин для сервера", labelWidth:170, },
			{ view:"text", name:"total", label:"Емкость", labelWidth:170, },
			{ view:"text", name:"password", label:"Пароль/токен", placeholder:"Введите пароль для сервера", labelWidth:170, },	
			{cols:[
				{ view:"text", name:"sort_order", label:"Порядок сортировки",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("server-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("server-form");						
						if(!form.validate()) 
							return false;						
						
						webix.ajax().post("index.php?route=setting/server/validateForm&token="+token, $$("server-form").getValues(), function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								form.save();
								$$("server-views").back();
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
          "servername": function(value){ return value.length >= 3 && value.length <= 32},		  
		  "link": webix.rules.isNotEmpty,	
    }
};
  
const server_views = {
	view:"multiview", 
    id:"server-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ server_views, paging ] }
	]
};
 