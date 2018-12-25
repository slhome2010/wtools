import {JetView} from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";
import staFilter 	from "views/modules/statusfilter";
import staTemplate 	from "views/templates/status";

export default class discountView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		$$('discount-form').bind($$('billing-discount'));
		webix.dp.$$("billing-discount").config.updateFromResponse = true;	
	}	
}
	
const grid = {
	id:"billing-discount",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	checkboxRefresh:true,
	columns:[
		{id:"discount_id", header:"#", sort:"int", width:50},		
		{id:"discountname", header:["Название", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"price", header:["Значение", {content:"textFilter"} ], sort:"int", minWidth:80, fillspace: 1, editor:"text",},
		{id:"percent", header:["Тип"], sort:"int", minWidth:120, fillspace: 1,			
			template:function(obj, common, value){				
				if (value !=0)
					return "<span> % </span>";
				else
					return "<span> KZT </span>";}
		},		
		{id:"priority", header:{text:"Приоритет", height:60, css:"multiline"}, sort:"int", minWidth:80, fillspace: 1, editor:"text",},		
		{id:"status", header:["Статус", {content:"staFilter", css:"webix_ss_filter"}], sort:"int", minWidth:100, fillspace:2,editor:"inline-checkbox", template:staTemplate},		
		{id:"edit", header:"<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width:35, 
			template:"<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
		},
	],
	pager:"pagerA",
	"export":true,
	url:	"index.php?route=billing/discount/getList&token="+token,
	save:{
			"insert":"index.php?route=billing/discount/add&token="+token,
			"update":"index.php?route=billing/discount/edit&token="+token,
			"delete":"index.php?route=billing/discount/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){	
			this.select(id);	
			$$('discount-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('discount-form').show();
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
	id:"discount-form",
	multiview:{ keepViews:true },
	dataFeed: function (id) {
				let current_discount_id = $$('billing-discount').getItem(id).discount_id;				
				this.load("index.php?route=billing/discount/getForm&token="+token+"&discount_id="+current_discount_id);				
			  },	
	elements:[
	
			{ view:"text", id:"discount_id", name:"discount_id", label:"ID скидки", labelWidth:170, readonly:true },
			{cols:[				
				{ view:"datepicker", id:"date_start", name:"date_start", label:"Начало действия", labelWidth:170, value:new Date(), format:"%d.%m.%Y", invalidMessage:"дата должна быть раньше даты окончания" },
				{ view:"datepicker", id:"date_end", name:"date_end", label:"Окончание действия", labelWidth:170, labelAlign: "right", value:new Date(), format:"%d.%m.%Y", invalidMessage:"дата должна быть позже даты начала" },
			]},
			{ view:"text", name:"discountname", label:"Название", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"название должно быть от 3 до 32 знаков" },
			{ view:"text", name:"price", label:"Значение", placeholder:"Установите значение", labelWidth:170, required:true, invalidMessage:"значение поля должно быть числом"},
			//{ view:"radio", name:"percent", options:["Процент", "Фиксированная сумма"]},
			{ view:"radio", name:"percent", label:"Принцип рассчета", labelWidth:170, options:[ { id:1, value:"Процент" }, { id:0, value:"Фиксированная сумма" }]},              
			{ view: "textarea", name: "description", label: "Дополнительные сведения", labelWidth:170, gravity:1,maxHeight:150},	
			{cols:[
				{ view:"text", name:"priority", label:"Приоритет",  labelWidth:170 },
				{ view:"select", name:"status", label:"Статус", labelWidth:170, labelAlign: "right", options:[{id:0, value:"Отключено"}, {id:1, value:"Включено"}], },
			]},
			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){						
						$$("discount-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("discount-form");						
						if(!form.validate()) 
							return false;						
						
						webix.ajax().post("index.php?route=billing/discount/validateForm&token="+token, $$("discount-form").getValues(), function(text, data, XmlHttpRequest){							
							if (text && text!="[]") {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								form.save();
								$$("discount-views").back();
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
        "discountname": function(value){ return value.length >= 3 && value.length <= 32},		  
		"price": webix.rules.isNumber ,
		"date_end": function(value){ return value >= $$("date_start").getValue()},
		"date_start": function(value){ return value <= $$("date_end").getValue()},
    }
};
  
const discount_views = {
	view:"multiview", 
    id:"discount-views",
    cells:[	grid, ui,]
}

const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ discount_views, paging ] }
	]
};
 