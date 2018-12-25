import {JetView} 	from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class TarifView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$('tarif-form').bind($$('billing-tarif'));	
		webix.dp.$$("billing-tarif").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"billing-tarif",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	columns:[
		{id:"tarif_id", header:"#", sort:"int", width:50},		
		{id:"tarifname", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"price", header:["Ставка", {content:"textFilter"} ], sort:"int", minWidth:80, fillspace: 1, editor:"text",},
		{id:"sort_order", header:{text:"Порядок сортировки", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},
		{id:"roaming", header:["Роуминг"], sort:"int", minWidth:120, fillspace: 1, template:"{common.checkbox()}"},
		{id:"gprs", header:["Трафик"], sort:"int", minWidth:120, fillspace: 1, template:"{common.checkbox()}"},
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	pager:"pagerA",
	"export":true,
	url:	"index.php?route=billing/tarif/getList&token="+token,
	save:{
			"insert":"index.php?route=billing/tarif/add&token="+token,
			"update":"index.php?route=billing/tarif/edit&token="+token,
			"delete":"index.php?route=billing/tarif/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){	
			this.select(id);	
			$$('tarif-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{			
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('tarif-form').show();
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
	id:"tarif-form",
	multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_tarif_id = $$('billing-tarif').getItem(id).tarif_id;				
				this.load("index.php?route=billing/tarif/getForm&token="+token+"&tarif_id="+current_tarif_id);				
			  },	
	elements:[
	
			{cols:[
				{ view:"text", id:"tarif_id", name:"tarif_id", label:"ID тарифа", labelWidth:170, readonly:true },
				{ view:"text", id:"date_added", name:"date_added", label:"Введен", labelWidth:150, labelAlign: "right", readonly:true },
				{ view:"text", id:"date_modified", name:"date_modified", label:"Изменен", labelWidth:150, labelAlign: "right", readonly:true },
			]},
			{ view:"text", name:"tarifname", label:"Название", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 32 знаков" },
			{ view:"text", name:"price", label:"Ставка", placeholder:"Установите расчетную ставку", labelWidth:170, required:true, invalidMessage:"значение поля должно быть числом"},
			{cols:[
				{ view:"checkbox", name:"roaming", label:"Включая роуминг",  labelWidth:170 },
				{ view:"checkbox", name:"gprs", label:"Включая GPRS-трафик", labelWidth:170, labelAlign: "right", },
			]},
			{ view: "textarea", name: "description", label: "Дополнительные сведения", labelWidth:170, gravity:1,maxHeight:150},	
			{cols:[
				{ view:"text", name:"sort_order", label:"Порядок сортировки",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("tarif-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("tarif-form");						
						if(!form.validate()) 
							return false;						
						
						webix.ajax().post("index.php?route=billing/tarif/validateForm&token="+token, $$("tarif-form").getValues(), function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								form.save();
								$$("tarif-views").back();
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
          "tarifname": function(value){ return value.length >= 3 && value.length <= 32},		  
		  "price": webix.rules.isNumber ,	
    }
};
  
const tarif_views = {
	view:"multiview", 
    id:"tarif-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ tarif_views, paging ] }
	]
};
 