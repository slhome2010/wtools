import {JetView} 	from "webix-jet";
//import {data} 	from "models/wialongroups";
import outplugins	from "views/menus/export";
import toolbar 		from "views/menus/toolbar";
import toolplug 	from "views/menus/toolplug";
import paging 		from "views/modules/paging";
import eyeFilter 	from "views/modules/groupfilter";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";
import eyeTemplate 	from "views/templates/eye";

export default class WialongroupView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		//view.queryView({ view:"datatable" }).parse(data);
		$$('add').disable();
		$$('delete').disable();
		$$('wialon_group-form').bind($$('catalog-wialongroup'));	
		webix.dp.$$("catalog-wialongroup").config.updateFromResponse = true;		
	}	
}
	
const grid = {
	id:"catalog-wialongroup",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	pager:"pagerA",
	"export":true,
	columns:[
		{id:"wialon_group_id", header:"#", sort:"int", width:50},		
		{id:"wialon_groupname", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"wialon_id", header:{text:"Wialon ID группы", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1},
		{id:"servername", header:["Сервер", {content:"selectFilter"} ], sort:"int", minWidth:120, fillspace: 1},		
		{id:"wialon_group_off", header:["Вид группы", {content:"eyeFilter", css:"webix_ss_filter"}], sort:"int", width:110, css:{ "text-align":"center"},template:eyeTemplate},
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:1,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	url:	"index.php?route=catalog/wialongroup/getList&token="+token,
	save:{
			"insert":"index.php?route=catalog/wialongroup/add&token="+token,
			"update":"index.php?route=catalog/wialongroup/edit&token="+token,
			"delete":"index.php?route=catalog/wialongroup/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){
			this.select(id);			
			$$('wialon_group-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();			
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('wialon_group-form').show();
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
	id:"wialon_group-form",
	multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_wialon_group_id = $$('catalog-wialongroup').getItem(id).wialon_group_id;				
				this.load("index.php?route=catalog/wialongroup/getForm&token="+token+"&wialon_group_id="+current_wialon_group_id);				
			  },	
	elements:[			
			{ view:"text", id:"wialon_group_id", name:"wialon_group_id", label:"ID группы", labelWidth:170, readonly:true },			
			{ view:"text", name:"wialon_groupname", label:"Название", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 128 знаков" },			
						
			{cols:[
				{ view:"text", name:"wialon_id", label:"Wialon ID", labelWidth:170,  readonly:true },
				{ view:"text", name:"servername",  label:"Сервер", labelWidth:170, labelAlign: "right", readonly:true },
			]},
			{ view:"select", name:"owner_id", label:"Владелец группы", labelWidth:170, options:"index.php?route=catalog/wialongroup/getOwners&token="+token},
			{ view:"select", name:"tarif_id", label:"Тариф группы", labelWidth:170, options:"index.php?route=catalog/wialongroup/getTarifs&token="+token},
			{ view:"select", name:"discount_id", label:"Скидка для группы", labelWidth:170, options:"index.php?route=catalog/wialongroup/getDiscounts&token="+token},
			{cols:[
				{ view:"select", name:"wialon_group_off", label:"Скрытая", labelWidth:170, options:[{id:0, value:"Нет"}, {id:1, value:"Да"}],  readonly:true },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},			
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("wialon_group-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let savind_form = $$("wialon_group-form");
						if(savind_form.isDirty()){	
							if(!savind_form.validate()) 
								return false;						
							
							webix.ajax().post("index.php?route=catalog/wialongroup/validateForm&token="+token, savind_form.getValues(), function(text, data, XmlHttpRequest){							
								if (text && text!="[]") {
									webix.message({
										text:JSON.parse(text).warning,
										type:"error", 
										expire: 5000,									
									}); //show server side response
									return false;
								} else {
									date_popup.show();
									//savind_form.save();									
								}
							});
						}
						$$("wialon_group-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}}
				]
			}
	],
	on: {
		"onChange": function(newv, oldv){
			var changed = this.getDirtyValues();
			if (changed.discount_id)
				this.setValues({ old_discount_id : oldv,},true);
			if (changed.tarif_id)
				this.setValues({ old_tarif_id : oldv,},true);			
		},
	},		
	rules:{
          "wialon_groupname": function(value){ return value.length >= 3 && value.length <= 128},		  	
    }
};

const date_popup = webix.ui({
	view:"window",	
	modal:true,
	position:"center", 
	head:"Какой датой внести изменения?",	
	body:{
     view: "form",     
     elements:[       
       {view:"datepicker", name:"set_date_changed", value:new Date(), format:"%d.%m.%Y" , },       
       {view: "button", label: "Подтверждение", type:"form", click: function(){		   
			var date_changed = this.getParentView().getValues().set_date_changed;			
			$$("wialon_group-form").setValues({ date_changed: date_changed,},true);
			$$("wialon_group-form").save();			
			this.getTopParentView().hide();
       }}
     ]
  }
});
  
const wialon_group_views = {
	view:"multiview", 
    id:"wialon_group-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ wialon_group_views, paging ] }
	]
};
 