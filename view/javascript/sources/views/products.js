import {JetView} from "webix-jet";

import {data} 	from "models/products";
import context from "views/menus/contextmenu";

export default class ProductsView extends JetView {
	config(){
		return layout;
	}
	init(view){
		view.queryView({ view:"datatable" }).parse(data);
		
		var c=this.ui(context);
		c.attachTo(this.$$("productsData").getNode());
		
	//	backendController = wconfig.products.backendController;
		$$("productsData").attachEvent("onBeforeContextMenu", function(id, e, node){
			selRows = $$("productsData").getSelectedItem(true);	
		});
	}
}

const grid = {
	id:"productsData",
	view:"datatable",
		select:"row",
		clipboard:"selection",
		onContext:{},
		//autowidth:true,
		multiselect:true, 
		editable:true, 
		editaction:"dblclick",
	columns:[
		{id:"product_id", header:"#", sort:"string", width:50},
		{id:"model", header:["Model", {content:"textFilter"} ], sort:"string", minWidth:80, fillspace: 1},
		{id:"name", header:["Name", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"category", header:["Category", {content:"selectFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"price", header:["Price"], sort:"int", minWidth:80, fillspace: 1, format:webix.i18n.priceFormat},
		{id:"quantity", header:["Quantity" ], sort:"int", minWidth:60, fillspace: 1},
		{id:"special", header:["Скидка" ], sort:"string", minWidth:60, fillspace: 1},
		{id:"statusName", header:["Status", {content:"selectFilter"} ], minWidth:75, sort:"string", fillspace: 1, template:"<span class='status status#status#'>#statusName#</span>"},

		{id:"edit", header:"&nbsp;", width:35, template:"<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>"},
		{id:"delete", header:"&nbsp;", width:35, template:function(obj){
																		  if (obj.status != "0")
																			return "<span  style=' cursor:pointer;' class='webix_icon fa-toggle-on'></span>";
																		  else
																			return "<span  style=' cursor:pointer;' class='webix_icon fa-toggle-off'></span>";
																		}
		}
	],
	pager:"pagerA",
	"export":true,
	save:{
			"insert":"index.php?route=catalog/product/add&token="+token,
			"update":"index.php?route=catalog/product/edit&token="+token,
			"delete":"index.php?route=catalog/product/delete&token="+token
	},
	onClick:{
		"fa-toggle-on":function(e,id){			
			const item = this.getItem(id);						
			item.status = "0";
			item.statusName = "Отключено";						
			webix.ajax().post("index.php?route=catalog/product/edit&token="+token, item);
			this.refresh(id);		
		},
		"fa-toggle-off":function(e,id){				
			const item = this.getItem(id);						
			item.status = "1";
			item.statusName = "Включено";						
			webix.ajax().post("index.php?route=catalog/product/edit&token="+token, item);
			this.refresh(id);		
		},
		"fa-pencil":function(e,id){
			this.refresh(id);			
			this.$scope.app.show("/app/product_edit");						
		}
	},	
	ready:function(){
		webix.extend(this, webix.ProgressBar);
	}
};

function logEvent(type, message, args){
    webix.message({ text:message, expire:2500 });
    console.log(type);
    console.log(args);
  };
  
const controls = [
	{view: "icon", type: "icon", borderless:false, icon:"file-excel-o", tooltip: "Export To Excel", click: function(){
		webix.toExcel(webix.$$("productsData"));}
	},
	{view: "icon", type: "icon", borderless:false, icon:"file-pdf-o", tooltip: "Export To PDF", click: function(){
		webix.toPDF(webix.$$("productsData"));}
	},
	{view: "icon", type: "icon", borderless:false, icon:"file-word-o", tooltip: "Export To PNG", click: function(){
		webix.toPNG(webix.$$("productsData"));}
	},
	{},
	{view: "icon", type: "icon", borderless:false, icon:"refresh", tooltip: "Освежить", click: function(){
		var grid = webix.$$("productsData");
		grid.clearAll();
		grid.showProgress();
		webix.delay(function(){
			grid.parse(data);
			grid.hideProgress();
		}, null, null, 300);
		
	}},	
	{view: "icon", type: "icon", borderless:false, icon:"plus", tooltip: "Add new", click: function(){
			var item = $$("productsData").add({});
			$$("productsData").showItem(item);
		}
	},
	{view: "icon", type: "icon", borderless:false, icon:"copy", tooltip: "Copy", click: function(){
			selRows = $$("productsData").getSelectedItem(true);
			selRows.forEach(function(item, idx, arr) {
                var new_item = $$("productsData").add({});
				webix.$$("productsData").updateItem(new_item, item);				
            });			
			$$("productsData").showItem($$("productsData").getLastId());
		}
	},
	{view: "icon", type: "iconButton", borderless:false, icon:"trash-o", tooltip: "Delete", click: function(){				
			webix.confirm({
				text:" Выделенные строки будут удалены. <br/> Вы уверены? ", ok:"Да", cancel:"Отменить",
				callback:(res) => {
					if(res){
						$$("productsData").remove($$("productsData").getSelectedId());					
					}
				}
			});
				
		}
	},	
	{ view: "switch", width: 140, borderless:false, onLabel: "Отменить", offLabel:"Выделить все", value: 0, 
		on:{
			'onItemClick': function(id){ 
				var val = this.getValue();							
				if(val=="1") {
					webix.$$("productsData").selectRange(webix.$$("productsData").getFirstId(),webix.$$("productsData").getLastId(), true);
					//selRows = $$("productsData").getSelectedItem(true);
					//console.log(selRows);
				} else {
					webix.$$("productsData").clearSelection();
								//selRows = [];
				}
			}
		}
	},	
	{ view:"richselect", id:"order_filter", value: "all", maxWidth: 300, minWidth: 250, vertical: true, options:[
		{id:"all", value:"Все"},
		{id:"1", value:"Включено"},
		{id:"2", value:"Отключено"},
		{id:"0", value:"Удалено"}
	],  label:"Статус", labelWidth: 60, on:{
		onChange:function(){
			var val = this.getValue();
			if(val=="all")
				webix.$$("productsData").filter("#status#","");
			else
				webix.$$("productsData").filter("#status#",val);
		}
	}
	}
];

const toolbar = {
	view: "toolbar",
	css: "highlighted_header header6",
	paddingX:5, paddingY:5, height:40,
	cols:[{
		view:"pager", id:"pagerA",
		template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
		autosize:true, 
		height: 35, group:5
	}]
};

const layout = {
	type: "space",
	rows:[
		{ height:40, cols: controls	},
		{ rows:[ grid, toolbar ] }
	]
};
