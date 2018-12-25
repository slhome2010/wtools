import {JetView} 	from "webix-jet";
import outplugins 	from "views/menus/export";
import toolplug 	from "views/menus/toolplug";
import paging 		from "views/modules/paging";
import eyeFilter 	from "views/modules/groupfilter";
import staFilter 	from "views/modules/statusfilter";
import onlFilter 	from "views/modules/onlinefilter";
import staTemplate 	from "views/templates/status";
import eyeTemplate 	from "views/templates/eye";
import delTemplate 	from "views/templates/deleted";
import onlTemplate 	from "views/templates/online";

export default class ItemView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$("suspicious-form").bind($$("report-suspicious"));
		webix.extend(view.queryView({ view:"datatable" }), webix.ProgressBar);
		webix.extend($$("report-suspicious"), webix.ProgressBar);
		$$("report-suspicious").showProgress({
			type:"top",
			delay:5500,
			hide:true
		});		
	}	
}

const grid = {
	id:"report-suspicious",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	checkboxRefresh:true,
	pager:"pagerA",
	"export":true,	
	columns:[
		{id:"item_id", header:"#", sort:"int", width:60},				
		{id:"itemname", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"ownername", header:["Владелец", {content:"selectFilter"} ], sort:"string", minWidth:120, fillspace: 2},		
		{id:"wialon_groupname", header:["Группа", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"date_last", header:"Дата", sort:"date", minWidth:120, format:webix.Date.dateToStr("%d.%m.%Y")},
		{id:"online", header:"Состояние", sort:"int", minWidth:120, css:{ "text-align":"center"},template:onlTemplate},
		{id:"total", header:"Дней", sort:"int", minWidth:30},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35,
			template:"<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},		
	],	
	scheme:{
		$init:function(obj){			
            if (obj.deleted == 1 ) 				
				obj.$css = "deleted";  
			
        }
	},
	url:"index.php?route=report/suspicious&token="+token,	
	onClick:{		
		"mdi-pencil":function(e,id){
			this.select(id);	
			$$('history-suspicious').clearAll();			
			$$('history-suspicious').load("index.php?route=catalog/item/getItemHistory&token="+token+"&item_id="+this.getItem(id).item_id);			
			$$('paging').hide();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('suspicious-form').show();			
		}
	},	
	ready:function(){
		webix.extend(this, webix.ProgressBar);
	}
};

var xml_format = webix.Date.strToDate("%Y-%m-%d");

const history_grid = {
	id:"history-suspicious",
	view:"datatable",
	select:"row",	
	
	columns:[
		{id:"item_history_id", header:"#", sort:"int", minWidth:120},
		{map:"(date)#date_changed#", header:"Дата", sort:"date", minWidth:120, format:webix.Date.dateToStr("%d.%m.%Y")},
		{id:"deleted", header:" ", sort:"int", width:40, css:{ "text-align":"center"}, template:delTemplate},				
		{id:"tracker_uid", header:["Трекер UID", {content:"selectFilter"} ], sort:"int", minWidth:120, fillspace: 1},
		{id:"trackername", header:["Трекер", {content:"selectFilter"} ], sort:"int", minWidth:120, fillspace: 1},
		{id:"sim1", header:["SIM-1", {content:"selectFilter"} ], sort:"int", minWidth:120, fillspace: 1},
		{id:"sim2", header:["SIM-2", {content:"selectFilter"} ], sort:"int", minWidth:120, fillspace: 1},						
		{id:"wialon_group_off", header:["Вид", {content:"eyeFilter", css:"webix_ss_filter"}], sort:"int", minWidth:80, css:{ "text-align":"center"},template:eyeTemplate},
		{id:"online", header:["Состояние", {content:"onlFilter", css:"webix_ss_filter"}], sort:"int", minWidth:120, css:{ "text-align":"center"},template:onlTemplate},			
	],
	scheme:{
		$init:function(obj){            
			obj.date_changed = xml_format(obj.start);			
        }
	},
	ready:function(){
		webix.extend(this, webix.ProgressBar);
		this.sort({by: "date_changed", dir: "desc"});
	}
};


const iform = {
	view:"form",
	id:"suspicious-form",
	multiview:{ keepViews:true },	
	elements:[			
		{ cols: [
			{ view:"text", id:"item_id", name:"item_id", label:"ID объекта", labelWidth:140, readonly:true },			
			{ view:"text", name:"itemname", label:"Название", labelWidth:140, labelAlign: "right", readonly:true },
		  ]
		},
		{ cols: [
			{ view:"text", name:"ownername",  label:"Владелец", labelWidth:140, readonly:true },
			{ view:"text", name:"wialon_groupname", label:"Группа", labelWidth:140, labelAlign: "right", readonly:true },			
		  ]
		},
		history_grid,	
        { 
			margin:10,
			cols:[
				{},
				{ view:"button", value:"Назад", width:120, click:function(){						
					$$("suspicious-views").back();
					$$('paging').show();
					$$('edit-form-icon').hide();
					$$('edit-tools').show();
				}},				
			]
		},
	]
};
  

const item_views = {
	view:"multiview", 
    id:"suspicious-views",
    cells:[	grid, iform,]
}

const layout = {
	id:"layout",
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ item_views, paging ] }
	]
};
 