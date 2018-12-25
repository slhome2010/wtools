import {JetView} from "webix-jet";

export default class settingView extends JetView {
	config(){
		return layout;		
	}
	init(view){	
		view.queryView({ view:"form" }).load("index.php?route=setting/setting&token="+token);	
	}	
}

var position_options = [
  {id:1, value:"left"},
  {id:2, value:"right"},
  {id:3, value:"top"},
  {id:4, value:"bottom"}
];
	
const propertysheet = {
	view:"form",
	id:"settings",
	//width: 500,
	//position:"center",
	complexData:true,
	multiview:{ keepViews:true },
	dataFeed: function (id) {					
		this.load("index.php?route=setting/setting&token="+token);		
	},	
    elements:[
		{
			view:"tabview",
			tabbar:{ options:["Общие","Заявки"]}, animate:false,
			cells:[
				{ id:"Общие", rows:[
					{ template:"Локализация", type:"section"},
					{ view:"select", name:"config_admin_language", label:"Язык", labelWidth:140, options:"index.php?route=setting/setting/getLanguages&token="+token,},       
					{ template:"Исторический период", type:"section" },
					{ label:"Период (мес)", labelWidth:180, view:"text", name:"config_history_period"},
					{ label:"Дата начала истории", labelWidth:180, view:"datepicker", name:"config_history_date_start", format:"%d.%m.%Y"},		
					{ label:"Считать автоматически", labelWidth:180, view:"checkbox", name:"config_history_autoperiod"},
					{ template:"Статистика", type:"section" },
					{ label:"Подозрительность (дней)", labelWidth:230, view:"text", name:"config_suspicious_range"},
					{ label:"Дата отсчета подозрительности", labelWidth:230, view:"datepicker", name:"config_suspicious_date", placeholder:"Установите если не от текущей даты", format:"%d.%m.%Y"},					
					{ template:"Дизайн", type:"section" },
					{ label:"Тема", labelWidth:140, view:"richselect", options:position_options, name:"config_theme"},	
				]},
				{ id:"Заявки", rows:[
					{ template:"Статусы", type:"section" },
					{ view:"select", name:"config_order_status_id", label:"Статус заявки по умолчанию", labelWidth:220, options:"index.php?route=setting/setting/getOrderStatuses&token="+token,},
					{ view:"select", name:"config_processing_status", label:"Статус выполняемой заявки", labelWidth:220, options:"index.php?route=setting/setting/getOrderStatuses&token="+token,},
					{ view:"select", name:"config_complete_status", label:"Статус завершенной заявки", labelWidth:220, options:"index.php?route=setting/setting/getOrderStatuses&token="+token,},
					{ view:"select", name:"config_unsuccess_status", label:"Статус невыполненной заявки", labelWidth:220, options:"index.php?route=setting/setting/getOrderStatuses&token="+token,},
				]},
			]
        },
		{ margin:10, 
			cols:[
			{},
			{ view:"button", value:"Сохранить", type:"form", width:120, click:function(){
				//let sform = $$("item-form");
				let sform = this.getFormView();
				if(sform.isDirty()){	
					if(!sform.validate()) 
						return false;						
						
					webix.ajax().post("index.php?route=setting/setting/validate&token="+token, sform.getValues(), function(errtext, data, XmlHttpRequest){							
						if (errtext && errtext!="[]") {
							webix.message({
								text:JSON.parse(errtext).warning,
								type:"error", 
								expire: 5000,									
							}); //show server side response
							return false;
						} else {		
							webix.ajax().post("index.php?route=setting/setting/edit&token="+token, sform.getValues());	
							webix.message({
								text:"Настройки сохранены.",
								type:"success", 
								expire: 5000,									
							}); 							
						}							
					});
				}			
			}
			}
			]
		}
    ]
};

const layout = {
	type: "space",
	rows:[
		propertysheet,		
    ]
};
 