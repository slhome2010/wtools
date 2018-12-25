import {JetView} from "webix-jet";
//import {data} 	from "models/owners";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class OwnerView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$('owner-form').bind($$('catalog-owner'));	
		webix.dp.$$("catalog-owner").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"catalog-owner",
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
		{id:"owner_id", header:"#", sort:"int", width:50},		
		{id:"ownername", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},		
		{id:"sort_order", header:{text:"Порядок сортировки", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:1,editor:"inline-checkbox", template:staTemplate},
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35,
			template:"<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},		
	],	
	url:"index.php?route=catalog/owner/getList&token="+token,
	save:{
			"insert":"index.php?route=catalog/owner/add&token="+token,
			"update":"index.php?route=catalog/owner/edit&token="+token,
			"delete":"index.php?route=catalog/owner/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){
			this.select(id);			
			$$('owner-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);
			$$('owner-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();		
		}
	},		
	ready:function(){
		webix.extend(this, webix.ProgressBar);
	}
};

const grouplist = { 
	view:"dbllist", 
	list:{ height:180, scroll:true, css:"double-list",  },	
	labelBottomLeft:"Допустимые группы",
	labelBottomRight:"Имеющиеся группы",	
};
					  
const ui = {
	view:"form",
	id:"owner-form",
	//multiview:{ keepViews:true },
	dataFeed: function (id) {		
				let current_owner_id = $$('catalog-owner').getItem(id).owner_id;
				let dbllist = this.queryView({ view:"dbllist" });
				this.clear();
				dbllist.$$("left").clearAll();
				var promise = this.load("index.php?route=catalog/owner/getForm&token="+token+"&owner_id="+current_owner_id);
					
				var promise2 = dbllist.load("index.php?route=catalog/owner/getWialonGroups&token="+token+"&owner_id="+current_owner_id);
				
				var promise3 = webix.ajax().get("index.php?route=catalog/owner/getOwnerGroups",{ token:token, owner_id:current_owner_id }, 
					{
						error:function(text, data, XmlHttpRequest){
							alert("error");
						},
						success:function(text, data, XmlHttpRequest){						
							dbllist.setValue( data.json() );
						}
					}
				);
				promise.then(promise2).then(promise3);				
			  },	
	elements:[
	
			{cols:[
				{ view:"text", id:"owner_id", name:"owner_id", label:"ID владельца", labelWidth:170, readonly:true },
				{ view:"text", id:"date_added", name:"date_added", label:"Дата регистрации", labelWidth:170, labelAlign: "right", readonly:true },
			]},
			{cols:[
				{ view:"text", name:"ownername", label:"Название", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 128 знаков" },			
				{ view:"text", name:"bin", label:"БИН/ИИН",  labelWidth:170, labelAlign: "right", invalidMessage:"должно быть 12 знаков" },
			]},
			{cols:[
				{ view:"text", name:"address",  label:"Фактический адрес", placeholder:"Введите адрес", labelWidth:170,  },
				{ view:"text", name:"contactname", label:"Контактное лицо", placeholder:"Введите контактное лицо", labelWidth:170, labelAlign: "right",},			
			]},
			{cols:[
				{ view:"text", name:"telephone", label:"Телефон", placeholder:"Введите телефон", labelWidth:170,  invalidMessage:"поле должно содержать от 1 до 32 знаков" },
				{ view:"text", name:"email", type:'email', label:"E-mail", placeholder:"Введите e-mail", labelWidth:170, labelAlign: "right", invalidMessage:"не похоже на адрес электронной почты" },
			]},
			{ view:"forminput", name:"wialon_groups", body:grouplist, labelWidth:170, label:"Группы владельца", },	
			{ view: "textarea", name: "description", label: "Дополнительные сведения", labelWidth:170, gravity:1,minHeight:60,maxHeight:150},			
			{cols:[
				{ view:"text", name:"sort_order", label:"Порядок сортировки",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("owner-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form_for_save = $$("owner-form");						
						if(!form_for_save.validate()) 
							return false;						
						
						webix.ajax().post("index.php?route=catalog/owner/validateForm&token="+token, form_for_save.getValues(), function(text, data, XmlHttpRequest){							
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
								$$("owner-views").back();
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
          "ownername": function(value){ return value.length >= 3 && value.length <= 128},		  
		  "email": function(value){ return webix.rules.isEmail(value) || value.length == 0},
		  "bin": function(value){ return value.length == 12 || value.length == 0},	
    }
};

const owner_views = {
	view:"multiview", 
    id:"owner-views",
    cells:[	grid, ui,]
}

const layout = {
	id:"layout",
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ owner_views, paging ] }
	]
};
 