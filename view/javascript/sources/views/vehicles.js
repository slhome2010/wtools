import {JetView} 	from "webix-jet";
import outplugins 	from "views/menus/export";
import toolbar 		from "views/menus/toolbar";
import toolplug 	from "views/menus/toolplug";
import paging 		from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class vehicleView extends JetView {
	config(){
		return layout;		
	}
	init(view){			
		$$('vehicle-form').bind($$('catalog-vehicle'));	
		webix.dp.$$("catalog-vehicle").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"catalog-vehicle",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	//pager:"pagerA",	
	"export":true,	 
	columns:[
		{id:"vehicle_id", header:"#", sort:"int", width:50},		
		{id:"vehiclename", header:["Модель", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"sort_order", header:{text:"Порядок сортировки", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},	
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],	
	url:	"index.php?route=catalog/vehicle/getList&token="+token,
	save:{
			"insert":"index.php?route=catalog/vehicle/add&token="+token,
			"update":"index.php?route=catalog/vehicle/edit&token="+token,
			"delete":"index.php?route=catalog/vehicle/delete&token="+token
	},
	pager:{
		autosize:true, 
		group:5,
	   // level:1,
		template:function(data, common){
		  return common.first(data, common)	+
			common.prev(data, common)	+ 
			common.pages(data, common)	+
			common.next(data, common)	+
			common.last(data, common)
		}
	},	
	onClick:{		
		"mdi-pencil":function(e,id){
			this.select(id);	
			$$('vehicle-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('vehicle-form').show();
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
	id:"vehicle-form",
	//multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_vehicle_id = $$('catalog-vehicle').getItem(id).vehicle_id;				
				this.load("index.php?route=catalog/vehicle/getForm&token="+token+"&vehicle_id="+current_vehicle_id);				
			  },	
	elements:[
	
			{ view:"text", id:"vehicle_id", name:"vehicle_id", label:"ID трекера", labelWidth:170, readonly:true },			
			{ view:"text", name:"vehiclename", label:"Модель", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 32 знаков" },
			
			{cols:[
				{ view:"text", name:"sort_order", label:"Порядок сортировки",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("vehicle-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form_for_save = $$("vehicle-form");						
						if(!form_for_save.validate()) 
							return false;						
						
						webix.ajax().post("index.php?route=catalog/wialongroup/validateForm&token="+token, form_for_save.getValues(), function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								//this.getFormView().save()
								form_for_save.save();
								$$("vehicle-views").back();
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
          "vehiclename": function(value){ return value.length >= 3 && value.length <= 32},		  	
    }
};
  

const vehicle_views = {
	view:"multiview",
	keepViews:true,
    id:"vehicle-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ vehicle_views, paging ] }
	]
};
 