import {JetView} from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class trackerView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$('tracker-form').bind($$('catalog-tracker'));	
		webix.dp.$$("catalog-tracker").config.updateFromResponse = true; 	
	}	
}
	
const grid = {
	id:"catalog-tracker",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	columns:[
		{id:"tracker_id", header:"#", sort:"int", width:50},		
		{id:"trackername", header:["Модель", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"sort_order", header:{text:"Порядок сортировки", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},	
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	pager:"pagerA",
	"export":true,
	url:"index.php?route=catalog/tracker/getList&token="+token,	
	save:{
			"insert":"index.php?route=catalog/tracker/add&token="+token,
			"update":"index.php?route=catalog/tracker/edit&token="+token,
			"delete":"index.php?route=catalog/tracker/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){
			this.select(id);	
			$$('hw').clearAll();			
			$$('hw').load("index.php?route=catalog/tracker/getHw&token="+token+"&tracker_id="+this.getItem(id).tracker_id);
			//$$('tracker-form').setValues({hw:new webix.DataCollection({url:"index.php?route=catalog/tracker/getHw&token="+token+"&tracker_id="+this.getItem(id).tracker_id})});			
			$$('tracker-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();	
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('tracker-form').show();
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
	name:"formtable",
	setValue:function(value){ 
      this.clearAll(); 
      this.parse(value)
    },
	getValue:function(){ return this.serialize(); }
}, webix.ui.datatable);

var grid_hw = { view:"formtable", name:"hw", id:"hw",
	columns:[
		{ id:"server_id", header:"#", sort:"int", width:40,},
		{ id:"servername", header:"Сервер", sort:"int", minWidth:120, fillspace:true, }, //editor:"select", options:"index.php?route=catalog/tracker/getServers&token="+token },
		{ id:"tracker_hw", header:["Трекер HW" ], sort:"int", minWidth:120, fillspace: 2, editor:"text"},					
	],	
	scroll:"xy",
	select:"row",
	maxHeight:400,	
	editable:true,
	type:{template:"{common.space()}"},
}

const ui = {
	view:"form",
	id:"tracker-form",
	multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_tracker_id = $$('catalog-tracker').getItem(id).tracker_id;				
				this.load("index.php?route=catalog/tracker/getForm&token="+token+"&tracker_id="+current_tracker_id);				
			  },	
	elements:[
	
			{ view:"text", id:"tracker_id", name:"tracker_id", label:"ID трекера", labelWidth:170, readonly:true },			
			{ view:"text", name:"trackername", label:"Модель", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 32 знаков" },
			
			{cols:[
				{ view:"text", name:"sort_order", label:"Порядок сортировки",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{ view:"forminput", label:"Соответствие HW", labelWidth:170, body:grid_hw },			
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("tracker-views").back();						
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("tracker-form");						
						if(!form.validate()) 
							return false;
						$$("hw").editStop();
						let request_post = form.getValues();
						//request_post.hw = $$("grid_hw").serialize();			
						webix.ajax().post("index.php?route=catalog/tracker/validateForm&token="+token, request_post, function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								form.save(request_post);
								$$("tracker-views").back();
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
          "trackername": function(value){ return value.length >= 3 && value.length <= 32},		  	
    }
};
  

const tracker_views = {
	view:"multiview", 
    id:"tracker-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ tracker_views, paging ] }
	]
};
 