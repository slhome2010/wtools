const ui = {
	view:"form",
	id:"user-group-form",
	elements:[
			{ view:"text", id:"user_group_id", name:"user_group_id", label:"ID группы", labelWidth:70, readonly:true },
			{ view:"text", id:"name", name:"name", label:"Название группы", placeholder:"Введите название", labelWidth:70 },
			{ view:"datatable", name:"permisson", id:"grida",
				columns:[
					{ id:"permission_id", header:"Модуль или задача", fillspace:true },
				//	{ id:"access", header:["Разрешен просмотр",{ content:"masterCheckbox" }], checkValue:'on', uncheckValue:'off', template:"{common.checkbox()}", adjustColumn:"header"},
					//{ id:"access", header:"Разрешен просмотр", css:"rank", width:50 },
				//	{ id:"modify", header:"Разрешена модификация", css:"rank", width:50 },
				//	{ id:"hiden", header:"Скрыть модуль", css:"rank", width:50 },								
				],
				//autoheight:true,			  
				scroll:"xy",
				select:"row",
				maxHeight:300,
				//  autowidth:true,
				type:{template:"{common.space()}"},

			   url:"index.php?route=user/user_permission/getForm&token="+token+"&user_group_id="+"1"
			},

			{
				margin:10,
				cols:[
					{},
					{ view:"button", value:"Отменить", width:120, click:function(){
						$$("user-group-list").back();
					}},
					{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
						$$("user-group-form").save();
						$$("user-group-list").back();
					}}
				]
			}

	]
};

export default ui;