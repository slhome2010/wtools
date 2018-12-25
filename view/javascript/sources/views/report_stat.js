import {JetView} from "webix-jet";
import toolbar		from "views/menus/export";
import lastobjects 	from "views/modules/lastobjects";

export default class ReportStatView extends JetView {
	config(){
		this.minItemWidth = 243;
		const initCount = Math.floor(document.documentElement.clientWidth / this.minItemWidth);		
		
		return {
			gravity:4,
			type: "space",			
			rows:[	
				{	
					cols : [ 
						{ height:40, id:"edit-tools", cols: toolbar },
						{view: "icon", id:"refresh",  type: "icon", borderless:false, icon:"mdi mdi-refresh", tooltip: "Освежить", click: function(){
							var dataview = this.getParentView().getParentView().queryView({ view:"dataview" });
							dataview.clearAll();
							dataview.showProgress({type:"top",});	
							webix.delay(function(){
								dataview.load("index.php?route=report/total&token="+token+"&refresh=true");	
								dataview.hideProgress();
							}, null, null, 300);
							
						}},						
					],
				},
				{
					view:"dataview",
					localId:"dataview",
					scroll:false,	
					xCount:(initCount > 4) ? 3 : ((initCount >= 0 && initCount <= 2) ? 1 : initCount-2),
					minWidth:255,
					select:true,
					//css: "flex_tmp item",
					type:{
						width:"auto", 
						height:104,
						type:"tiles",
						template:(obj,common) => {
							return common.icon(obj)
								+ "<div class='col-xs-8 details'>"								
								+ "<div class='text'>" + obj.text + "</div>"
								+ common.total(obj)
								+"</div>"
								;
						},
						icon:obj => {
							if (obj.icon)
								return "<div class='col-xs-4 webix_icon mdi mdi-"+obj.icon+" "+obj.css+"'></div>";
							else
								return "<span class='userpic'>" + obj.text.charAt(0) + "</span>";
						},
						
						total:obj => `<div class="value">${obj.value}</div>`
					},					
				},
				
				{
					view:"richselect",
					id:"total-select", 
					label:"Статистика по ", 
					labelWidth: 120,
					value:1, 
					yCount:"3", 
					options:[ 
						{id:1, value:"Трекерам"}, // the initially selected item
						{id:2, value:"Тарифам"}, 
						{id:3, value:"Владельцам"}
					],
					on: {
						"onChange": function(newv, oldv){
							$$("report-total-select").clearAll();
							$$("report-total-select").load("index.php?route=report/total/getTotalOfSelected&token="+token+"&selected="+newv);
						},
					}		
				},
				{ 
					cols: [
						{							
							id:"report-total-select",
							view:"datatable",
							header:false,
							"export":true,	
							columns:[												
								{id:"name", minWidth:120, fillspace: 2},		
								{id:"total_objects", minWidth:120, fillspace: 2},		
							],		
								//url:"index.php?route=report/total/getLast&token="+token,
						},
						{ 
							view: "chart",
							id: "total-pie",
							type:"pie3D",
							value:"#total_objects#",
							//color:"#color#",
							label:"#name#",
							//pieInnerText:"#sales#",
							shadow:0,
							//data:month_dataset
						},
					]					
				},
				
			]
		};
	}
	init(view){
		const dataview = this.$$("dataview");
		const selectind = this.$$("report-total-select");
		webix.extend(view.queryView({ view:"dataview" }), webix.ProgressBar);
		dataview.load("index.php?route=report/total&token="+token);	
		selectind.load("index.php?route=report/total/getTotalOfSelected&token="+token+"&selected=1");
		
		this._winresize = webix.event(window, "resize", () => this.resizeDataview(this.minItemWidth));

		this._tooltip = webix.ui({
			view:"tooltip",
			template:"#value#"
		});

		dataview.attachEvent("onAfterRender",() => this.relocaleTooltips());
		dataview.attachEvent("onAfterSelect",() => this.relocaleTooltips());
		
		$$("total-pie").data.sync(selectind, function(){ 
			this.filter(function(data) { 
				return data.total_objects > 20; 
			}); 
		});
	}
	resizeDataview(minItemWidth){
		const elements = Math.floor(this.$$("dataview").$width / minItemWidth);
		const count = (elements > 3) ? 3 : ((elements == 0) ? 1 : elements);
		this.$$("dataview").define("xCount", count);
		this.$$("dataview").adjust();
		this.$$("dataview").resize();
	}
	relocaleTooltips(){
		const dataview = this.$$("dataview");
		let tasks = dataview.$view.querySelectorAll(".tasks");
		for (let i = 0; i < tasks.length; i++){
			webix.event(tasks[i],"mouseover",(e) => {
				this._tooltip.show({ value:"Tasks completed" }, webix.html.pos(e));
			});
			webix.event(tasks[i],"mouseout",() => this._tooltip.hide());
		}
	}
	destroy(){
		webix.eventRemove(this._winresize);
	}
}
