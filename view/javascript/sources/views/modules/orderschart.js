import {JetView} from "webix-jet";
import chartdata from "models/orders";

export default class OrdersChartView extends JetView{
	config(){
		return ui;
	}
	init(view){		
		var userinfo = this.app.getService("user").getUser();
		view.queryView({ view:"chart" }).parse(chartdata(userinfo.token));
	}
}

const ui = {
	"type": "clean",
	"rows":[
		{
			"template": "<span class='webix_icon mdi mdi-checkbox-multiple-marked-outline'></span>Обслуживание заявок за год", "css": "sub_title", "height": 30
		},
		{
			"view": "chart", "type": "bar",
			"legend":{
				"layout": "x",
				"align": "right",
				"values": [ {"text":"Открытые", "color": "#f19b60"},{"text": "Закрытые", "color": "#49cd81"} ]
			},
			"xAxis":{
				"template": "#month#"
			},
			"yAxis":{
				start:0,				
			},
			barWidth: 20,
			alpha:0.7,
			radius:0,
			"offset":0,
			"series":[
				{ "value":"#total_open#","color":"#f19b60"  ,"item":{"borderColor":"#fff","color":"#f19b60","radius":2},"line":{"color":"#f19b60","width":2},"tooltip":{"template":"#total_open#"}},
				{ "value":"#total_closed#","color":"#49cd81","item":{"borderColor":"#fff","color":"#49cd81","radius":2},"line":{"color":"#49cd81","width":2},"tooltip":{"template":"#total_closed#"}},								
			],
			//"series":[
			//	{
			//		"value": "#number#",
			//		color: "#9e89eb",

			//		"item":{
			//			"borderColor": "#fff",
			//			"color": "#49cd81",
			//			"radius": 3
			//		},
			//		"line":{
			//			"color":"#b07be5",
			//			"width":2
			//		}
			//	}
			//],
			"padding":{
				"top": 25
			},
			/* "data":[
				{"id": 1, "month": "Jun", "total_closed": 100, "total_open": 100,},
				{"id": 2, "month": "Jul", "total_closed": 150, "total_open": 200,},
				{"id": 3, "month": "Aug", "total_closed": 160, "total_open": 220,},
				{"id": 4, "month": "Sep", "total_closed": 200, "total_open": 250,},
				{"id": 5, "month": "Oct", "total_closed": 100, "total_open": 80,},
			] */
		}
	]
};

//export default ui;