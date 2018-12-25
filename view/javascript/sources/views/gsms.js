import {JetView} from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class gsmView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$('gsm-form').bind($$('catalog-gsm'));	
		webix.dp.$$("catalog-gsm").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"catalog-gsm",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	columns:[
		{id:"gsm_id", header:"#", sort:"int", width:50},		
		{id:"gsmname", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"sort_order", header:{text:"Порядок сортировки", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},	
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	pager:"pagerA",
	"export":true,
	url:	"index.php?route=catalog/gsm/getList&token="+token,
	save:{
			"insert":"index.php?route=catalog/gsm/add&token="+token,
			"update":"index.php?route=catalog/gsm/edit&token="+token,
			"delete":"index.php?route=catalog/gsm/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){
			this.select(id);	
			$$('gsm-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('gsm-form').show();
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
	id:"gsm-form",
	multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_gsm_id = $$('catalog-gsm').getItem(id).gsm_id;				
				this.load("index.php?route=catalog/gsm/getForm&token="+token+"&gsm_id="+current_gsm_id);				
			  },	
	elements:[
	
			{ view:"text", id:"gsm_id", name:"gsm_id", label:"ID оператора", labelWidth:170, readonly:true },			
			{ view:"text", name:"gsmname", label:"Название", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 32 знаков" },
			
			{cols:[
				{ view:"text", name:"sort_order", label:"Порядок сортировки",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("gsm-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("gsm-form");						
						if(!form.validate()) 
							return false;						
						
						webix.ajax().post("index.php?route=catalog/gsm/validateForm&token="+token, $$("gsm-form").getValues(), function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show gsm side response
								return false;
							} else {
								form.save();
								$$("gsm-views").back();
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
          "gsmname": function(value){ return value.length >= 3 && value.length <= 32},		  	
    }
};

const gsm_views = {
	view:"multiview", 
    id:"gsm-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ gsm_views, paging ] }
	]
};
 