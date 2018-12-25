import {JetView} from "webix-jet";
import toolbar		from "views/menus/export";

export default class ReportObjectsView extends JetView {
	config(){
		return layout;		
	}
	init(view){			
		webix.extend(view.queryView({ view:"treetable" }), webix.ProgressBar);		
	}	
}

const report_treetable_group = {
	id:"report-treetable-group",
	view:"treetable",	
	"export":true,	
    footer:true,
	tooltip:function(obj, common){                
                if (obj.$group === true) return '';
                
                if (obj.$css === 'tracker-online') {
                    return 'Объект "'+obj.itemName+'" работал';
                } else if (obj.$css === 'tracker-offline') {
                    return 'Объект "'+obj.itemName+'" не работал';
                } else if (obj.$css === 'tracker-disconnect') {
                    return 'Объект "'+obj.itemName+'" отключен';
                }
            },	
    columns:[        
        {id:"index", header:"", width:80, footer:{text:"<b>Итого:</b>", colspan:2}},
        {id:"itemName", header:[ "Название",{content:"textFilter"}], sort:"string", minWidth:120, fillspace: 3,  
            template:function(obj, common){
                if (obj.$group) return common.treetable(obj, common) + obj.itemName;
                return obj.itemName;
            }
		},        
        {id:"total", header:"Всего", sort:"int", footer:{content:"totalTolal"}},
        {id:"on", header:"Работал", sort:"int", footer:{content:"onTotal"}},
        {id:"off", header:"Не работал", sort:"int", footer:{content:"offTotal"}},
        {id:"disconnect", header:"Отключен", sort:"int", footer:{content:"disconnectTotal"}},
        {id:"servername", header:["Сервер",{content:"selectFilter"}], sort:"string", minWidth:120, fillspace: 1, }
    ],
    scheme:{
        $group:{
            by:"organizationName",
            map:{
                total:["total", "worktotal"],
                on:["on", "workon"],
                off:["off", "workoff"],
                disconnect:["disconnect", "workdisconnect"],
                itemName:["organizationName"]
            }
        },
        $sort:{ by:"itemName", as:"string"},
        $change:function(item){
            if (item.$group === true)
                return;
            
            var minworkdays = 0;
            if (item.total > 2)
                minworkdays = 2;
            
            if (item.on > minworkdays) 
                item.$css = "tracker-online";
            else if (item.off > 0 || item.disconnect === 0)
                item.$css = "tracker-offline";
            else
                item.$css = "tracker-disconnect";
        }
    },    
    on:{
        onBeforeLoad:function(){
          this.hideOverlay();
          webix.extend(this, webix.ProgressBar);
          this.showProgress({type:"icon",
                             delay:20,
                             hide:false});
        },
        onAfterLoad:function(){
          this.hideProgress();
          if (!this.count())
              this.showOverlay("Нет данных");
        },
        "data->onStoreUpdated":function(){
        //    var temp = this.data;
          var i = 0;
          var orgindex = 0;
          this.data.each(function(obj){
              if (obj.$group ===  true) { 
                  i = 0;
                  orgindex = orgindex + 1;
                  obj.index = '<strong>'+orgindex+'</strong>';
                  
              } else {
                  i = i + 1;
                  obj.index = orgindex+'.'+i;
                  
              }
              //var a = obj;
              
        //      obj.index = i+1;
            })
        }
    },        
};

webix.ui.datafilter.onTotal = webix.extend({
    refresh:function(master, node, value){ 
              var result = 0;
              master.data.each(function(obj){
                if (obj.$group === true)
                  result += obj.on;
              });

                          node.firstChild.innerHTML = '<b>'+result+'</b>';
    }
  }, webix.ui.datafilter.summColumn);
  
webix.ui.datafilter.offTotal = webix.extend({
    refresh:function(master, node, value){ 
              var result = 0;
              master.data.each(function(obj){
                if (obj.$group === true)
                  result += obj.off;
              });

                          node.firstChild.innerHTML = '<b>'+result+'</b>';
    }
  }, webix.ui.datafilter.summColumn);
  
webix.ui.datafilter.disconnectTotal = webix.extend({
    refresh:function(master, node, value){ 
              var result = 0;
              master.data.each(function(obj){
                if (obj.$group === true)
                  result += obj.disconnect;
              });

                          node.firstChild.innerHTML = '<b>'+result+'</b>';
    }
  }, webix.ui.datafilter.summColumn);
  
webix.ui.datafilter.totalTolal = webix.extend({
    refresh:function(master, node, value){ 
              var result = 0;
              master.data.each(function(obj){
                if (obj.$group === true)
                  result += obj.total;
              });

                          node.firstChild.innerHTML = '<b>'+result+'</b>';
    }
  }, webix.ui.datafilter.summColumn);
        
webix.GroupMethods.workon = function(prop, data){
            if (!data.length) return 0;
            var counton = 0;
            var countoff = 0;
            var countdisconnect = 0;
            var maxtotal = 0;
            var minworkdays = 2;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i]['total'] > maxtotal)
                    maxtotal = data[i]['total'];
            }
            
            if (maxtotal > 2)
                minworkdays = 2;
            else
                minworkdays = 0;
            
            for (var i = data.length - 1; i >= 0; i--) {
                var on = data[i]['on'];
                var off = data[i]['off'];
                var disconnect = data[i]['disconnect'];
                              
                if (on > minworkdays) counton++;
                else if (off > 0 || disconnect === 0) countoff++;
                else countdisconnect++;
                
            }
            return counton;
        };
        
        webix.GroupMethods.workoff = function(prop, data){
            if (!data.length) return 0;
            var counton = 0;
            var countoff = 0;
            var countdisconnect = 0;
            var maxtotal = 0;
            var minworkdays = 2;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i]['total'] > maxtotal)
                    maxtotal = data[i]['total'];
            }
            
            if (maxtotal > 2)
                minworkdays = 2;
            else
                minworkdays = 0;
            
            for (var i = data.length - 1; i >= 0; i--) {
                var on = data[i]['on'];
                var off = data[i]['off'];
                var disconnect = data[i]['disconnect'];
                
                if (on > minworkdays) counton++;
                else if (off > 0 || disconnect === 0) countoff++;
                else countdisconnect++;
                
            }
            return countoff;
        };
        
        webix.GroupMethods.workdisconnect = function(prop, data){
            if (!data.length) return 0;
            var counton = 0;
            var countoff = 0;
            var countdisconnect = 0;
            var maxtotal = 0;
            var minworkdays = 2;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i]['total'] > maxtotal)
                    maxtotal = data[i]['total'];
            }
            
            if (maxtotal > 2)
                minworkdays = 2;
            else
                minworkdays = 0;
            
            for (var i = data.length - 1; i >= 0; i--) {
                var on = data[i]['on'];
                var off = data[i]['off'];
                var disconnect = data[i]['disconnect'];
                
                if (on > minworkdays) counton++;
                else if (off > 0 || disconnect === 0) countoff++;
                else countdisconnect++;
                
            }
            return countdisconnect;
        };
        
        webix.GroupMethods.worktotal = function(prop, data){
            if (!data.length) return 0;
            var counton = 0;
            var countoff = 0;
            var countdisconnect = 0;
            var maxtotal = 0;
            var minworkdays = 2;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i]['total'] > maxtotal)
                    maxtotal = data[i]['total'];
            }
            
            if (maxtotal > 2)
                minworkdays = 2;
            else
                minworkdays = 0;
            
            for (var i = data.length - 1; i >= 0; i--) {
                var on = data[i]['on'];
                var off = data[i]['off'];
                var disconnect = data[i]['disconnect'];
                
                if (on > minworkdays) counton++;
                else if (off > 0 || disconnect === 0) countoff++;
                else countdisconnect++;
                
            }
            return countdisconnect + countoff + counton;
        };

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const checking_form = {
	view:"form",
	id:"checking-form",
	elements:[
		{ cols:[
			{ view:"datepicker", name:"date_start", label:"Начало", labelWidth:80, value:new Date(), format:"%d.%m.%Y" },
			{ view:"datepicker", name:"date_end", label:"Конец", labelWidth:80, labelAlign:"right", value:new Date(), format:"%d.%m.%Y" },
			{ view:"button", value:"Сформировать", width:120, click:function(){
				let values = $$('checking-form').getValues();							
				let date_start = months[values.date_start.getMonth()]+' '+values.date_start.getDate()+'th, '+ values.date_start.getFullYear();
				let date_end = months[values.date_end.getMonth()]+' '+values.date_end.getDate()+'th, '+ values.date_end.getFullYear();
				let treetable = $$('object-report').queryView({ view:"treetable" });
				treetable.clearAll();				
				treetable.showProgress({
					type:"top",
					delay:20000,
					hide:true
				});	
				treetable.load("index.php?route=report/objects&token="+token+"&date_start="+date_start+"&date_end="+date_end);
			}},
		]},		
		{	cols:[
                {view:"button", value:"Развернуть все", click:function(){ $$('report-treetable-group').openAll(); }},
                {view:"button", value:"Свернуть все", click:function(){ $$('report-treetable-group').closeAll();  }},
					{},
				{view:"label", label: "Работал", inputWidth:100, align:"center", css:"tracker-online" },
				{view:"label", label: "Не работал", inputWidth:100, align:"center", css:"tracker-offline" },
				{view:"label", label: "Отключен", inputWidth:100, align:"center", css:"tracker-disconnect" },
        ]},
	],
}

const controls = [];

const layout = {
	type: "space",
	id:"object-report",
	rows:[
		{ height:40, id:"tools-bar", cols: toolbar.concat(controls) },
		{ rows:[ checking_form, report_treetable_group ] }
	]
};
 