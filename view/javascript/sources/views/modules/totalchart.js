import {JetView} from "webix-jet";
import chartdata from "models/totalchart";

export default class ItemsChartView extends JetView{
	config(){
		return layout;
	}
	init(view){		
		var userinfo = this.app.getService("user").getUser();
		view.queryView({ view:"chart" }).parse(chartdata(userinfo.token));
	}
}

const layout = {
	"type": "clean",
	"rows":[
		{
			"template": "<span class='webix_icon mdi mdi-car'></span>Динамика развития за год", "css": "sub_title", "height": 30
		},
		{
			"view": "chart", "type":"line",
			"legend":{
				"layout": "x",
				"align": "right",
				"values": [	{"text": "Отключено", "color": "#a693eb"},{"text": "Не работало", "color": "#c71585"},
							{"text": "Работало", "color": "#ff00ff"},{"text":"Подключено", "color": "#63b4ea"},{"text":"Всего объектов", "color": "#0473B6"}]
			},
			"offset":0,
			alpha:0.8,

			"xAxis":{
				"template": "#month#"
			},
			"radius":0,
			"yAxis":{
			
			},			
			"series":[
				{ "value":"#total_off#","color":"#a693eb","item":{"borderColor":"#fff","color":"#a693eb","radius":4},"line":{"color":"#a693eb","width":1},"tooltip":{"template":"#total_off#"}},		
				{ "value":"#total_offline#","color":"#c71585","item":{"borderColor":"#fff","color":"#c71585","radius":4},"line":{"color":"#c71585","width":1},"tooltip":{"template":"#total_offline#"}},
				{ "value":"#total_online#","color":"#ff00ff","item":{"borderColor":"#fff","color":"#ff00ff","radius":4},"line":{"color":"#ff00ff","width":1},"tooltip":{"template":"#total_online#"}},
				{ "value":"#total_on#","color":"#63b4ea","item":{"borderColor":"#fff","color":"#63b4ea","radius":4},"line":{"color":"#63b4ea","width":1},"tooltip":{"template":"#total_on#"}},
				{ "value":"#total_objects#","color":"#0473B6","item":{"borderColor":"#fff","color":"#0473B6","radius":4},"line":{"color":"#0473B6","width":1},"tooltip":{"template":"#total_objects#"}},
			],
			"padding":{
				"top": 25
			}
		}
	],	
};