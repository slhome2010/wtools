import {JetView} from "webix-jet";

import search 	from "views/menus/search";
import mail 	from "views/menus/mail";
import message	from "views/menus/message";
import profile	from "views/menus/profile";
import menu		from "views/menus/sidebar";
//import "views/webix/icon";
//import "views/webix/menutree";

export default class AppView extends JetView {
	config(){
		return layout;
	}
	init(){		
		this.ui(search);
		this.ui(mail);
		this.ui(message);
		this.ui(profile);
		var userinfo = this.app.getService("user").getUser();
		//var userinfo = JSON.parse(this.app.getService("user").getUser());		
		this.$$("person_template").setValues({id:userinfo.user_id, name:userinfo.username, thumb:userinfo.thumb});
		token = userinfo.token; //console.log(token);
	}
}

		
//Top toolbar
var mainToolbar = {
	view: "toolbar",	
	elements:[
		{view: "label", label: "<a href='#!/app/dashboard'><img class='logo' src='"+logo+"' /></a>", width: 200, height: 46},

		{ height:46, id: "person_template", css: "header_person", borderless:true, width: 180, data: {id:userinfo.user_id, name:userinfo.username, thumb:userinfo.thumb},
			template: function(obj){				
				var html = 	"<div style='height:100%;width:100%;' onclick='webix.$$(\"profilePopup\").show(this)'>";
				html += "<img class='photo' src='"+obj.thumb+"' /><span class='name'>"+obj.name+"</span>";
				html += "<span class='webix_icon mdi mdi-chevron-down'></span></div>";				
				return html;
			}
		},		
		{ height:46, id: "support", css: "header_person", borderless:true, width: 45, 
			template: function(obj){				
				var html = 	"<div>";
				html += "<a href='http://curator.kz/support/index.pl' target='_blank'><img class='photo mini bordered' src='image/wtools/support.png' alt='Техподдержка curator.kz' title='Техподдержка curator.kz'/></a>";
				html += "</div>";				
				return html;
			}
		},
		{ height:46, id: "site1", css: "header_person", borderless:true, width: 45, 
			template: function(obj){				
				var html = 	"<div>";
				html += "<a href='http://curator.kz' target='_blank'><img class='photo mini bordered' src='image/wtools/logoc1.png' alt='Сайт curator.kz' title='Сайт curator.kz'/></a>";
				html += "</div>";				
				return html;
			}
		},		
		{ height:46, id: "site2", css: "header_person", borderless:true, width: 45, 
			template: function(obj){				
				var html = 	"<div>";
				html += "<a href='http://gps1.curator.kz' target='_blank'><img class='photo mini bordered' src='image/wtools/wialon_local.png' alt='Новый сервер' title='Новый сервер'/></a>";
				html += "</div>";				
				return html;
			}
		},
		{ height:46, id: "site3", css: "header_person", borderless:true, width: 45, 
			template: function(obj){				
				var html = 	"<div>";
				html += "<a href='http://gps.curator.kz' target='_blank'><img class='photo mini bordered' src='image/wtools/wialon_pro.png' alt='Старый сервер' title='Старый сервер'/></a>";
				html += "</div>";				
				return html;
			}
		},
		{},
		{view: "icon", icon: "wxi-search",  width: 45, popup: "searchPopup"},
		{view: "icon", icon: "mdi mdi-bell", badge:3, width: 45, popup: "mailPopup"},		
		{view: "icon", icon: "mdi mdi-comment", badge:5, width: 45, popup: "messagePopup"}
	]
};

var body = {
	rows:[
		{ height: 42, id: "title", css: "title", template: "<div class='header'>#title#</div><div class='details'>( #details# )</div>", data: {text: "",title: ""}},
		{
			view: "scrollview", scroll:"native-y",
			body:{ cols:[{ $subview:true}] }
		}
	]
};

var layout = {
	rows:[
		mainToolbar,
		{
			cols:[
				menu,
				body
			]
		}
	]
};