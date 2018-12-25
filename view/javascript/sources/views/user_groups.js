import {JetView} from "webix-jet";
import outplugins from "views/menus/export";
import toolbar from "views/menus/toolbar";
import toolplug from "views/menus/toolplug";
import paging from "views/modules/paging";

export default class UserGroupView extends JetView {
	config(){
		return layout;		
	}
	init(view){					
		$$('user-group-form').bind($$('user-user_permission'));	
		webix.dp.$$("user-user_permission").config.updateFromResponse = true;	
	}	
}

const grid = {
	id:"user-user_permission",
	view:"datatable",
	select:"row",
	clipboard:"selection",	
	multiselect:true, 
	editable:true, 
	editaction:"dblclick",
	columns:[
		{id:"user_group_id", header:"#", sort:"int", width:50},		
		{id:"name", header:["Название группы", {content:"textFilter"} ], sort:"string", minWidth:120, fillspace: 2, editor:"text"},
		{id:"edit", header:"&nbsp;", width:35, template:"<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"},
	],
	pager:"pagerA",
	"export":true,
	url:"index.php?route=user/user_permission/getList&token="+token,
	save:{
			"insert":"index.php?route=user/user_permission/add&token="+token,
			"update":"index.php?route=user/user_permission/edit&token="+token,
			"delete":"index.php?route=user/user_permission/delete&token="+token
	},
	onClick:{		
		"mdi-pencil":function(e,id){	
			this.select(id);
			$$('grida').clearAll();			
			$$('grida').load("index.php?route=user/user_permission/getPermissions&token="+token+"&user_group_id="+this.getItem(id).user_group_id);	
			$$('user-group-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();			
			$$('paging').hide();		
		}
	},
	on:{		
		"onAfterAdd":function(obj, index){	
			var lastid = this.getLastId();
			this.select(lastid);			
			$$('user-group-form').show();
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
	id:"user-group-form",
	dataFeed: function (id) {
				let current_group_id = $$('user-user_permission').getItem(id).user_group_id;
				this.load("index.php?route=user/user_permission/getForm&token="+token+"&user_group_id="+current_group_id);
			  },	
	elements:[
			{ view:"text", id:"user_group_id", name:"user_group_id", label:"ID группы", labelWidth:170, readonly:true },
			{ view:"text", name:"name", label:"Название группы", placeholder:"Введите название", labelWidth:170, required:true, invalidMessage:"поле не может быть пустым" },			
			{ view:"datatable", name:"grida", id:"grida",
				columns:[
					{ id:"permission", header:"Модуль или задача", fillspace:true },
					{ id:"access", header:["Просмотр",{ content:"masterCheckbox" }], checkValue:'on', uncheckValue:'off', template:"{common.checkbox()}"},
					{ id:"modify", header:["Модификация",{ content:"masterCheckbox" }], checkValue:'on', uncheckValue:'off', template:"{common.checkbox()}"},
					{ id:"hiden", header:["Скрыть",{ content:"masterCheckbox" }], checkValue:'on', uncheckValue:'off', template:"{common.checkbox()}"},								
				],						  
				scroll:"xy",
				select:"row",
				maxHeight:400,				
				type:{template:"{common.space()}"},
			},

			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){
						$$("user-group-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						let form = $$("user-group-form");
						if(!form.validate()) 
							return false;
						let request_post = form.getValues();
						request_post.permissions = $$("grida").serialize();					
						form.save(request_post);
						$$("user-group-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}}
				]
			}
	],
	rules:{
          "name": webix.rules.isNotEmpty,          
    }
};
  
const user_group = {
	view:"multiview", 
    id:"user-group-views",
    cells:[	grid, ui ]
}
const layout = {
	type: "space",
	rows:[
		{ height:40, id:"edit-tools", cols: outplugins.concat(toolbar) },
		{ height:40, id:"edit-form-icon", cols: toolplug, hidden:true },
		{ rows:[ user_group, paging ] }
	]
};
 