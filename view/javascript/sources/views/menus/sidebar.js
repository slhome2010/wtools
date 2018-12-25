import {JetView, plugins} from "webix-jet";
import menudata from "models/column_left";

const layout = {
	 rows:[
          { 
            css: "menu", 
            padding: 2, 
            view: "form",
            cols:[
              { view: "button", type: "icon", icon: "mdi mdi-menu", inputWidth: 37, align: "left", css: "title", 
               click: function(){
                 webix.$$("app:menu").toggle();
               }
              }
            ]
          },
          { 
			css: "menu",
			width: 210,	
            view: "sidebar", 
			id: "app:menu",			
			on:{
				onBeforeSelect:function(id){
					if(this.getItem(id).$count){
						return false;
					}
				},
				onAfterSelect:function(id){
					var item = this.getItem(id);
					webix.$$("title").parse({title: item.value, details: item.details});
					this.$scope.app.show("/app/"+item.id);				
				},
				onAfterLoad:function(){
					var firstid = this.getFirstId();
					this.select(firstid);				
				}, 
			}
          }
        ]
};

export default class MenuView extends JetView{
	init(){
		var userinfo = this.app.getService("user").getUser();		
		//console.log(token);
		webix.$$("app:menu").parse(menudata(userinfo.token));		
	}	
	config(){
		return layout;
	}
}
