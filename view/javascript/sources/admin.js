import "./assets/theme.siberia.less";
import {JetApp, plugins} from "webix-jet";

import session from "models/session";

webix.i18n.setLocale("ru-RU");
webix.Date.startOnMonday = true;
	
webix.ready(function(){
	if(!webix.env.touch && webix.ui.scrollSize && webix.CustomScroll)
		webix.CustomScroll.init();

	var app = new JetApp({
		id:			"wtools-admin",
		name:		"Wtools",
		version:	"1.0",
		start:		"/app/dashboard",
		debug: true
	});
	
	//error handlers
	app.attachEvent("app:error:resolve", function(name, err){
		window.console.error(err);
		webix.delay(() => this.show("/app/dashboard"));
	});
	app.attachEvent("app:error:initview", function(view, error){
		window.console.error(error);
	});
	app.attachEvent("app:error:server", function(error){
		webix.alert({
			width: 450,
			title:"Data saving error",
			text: "Please try to repeat the action <br> if error still occurs, please try to reload the page."
		});
	});
		
	// login
	app.attachEvent("app:user:logout",function(){
		app.show("/app/login");  //load "views/login.js"
	});
	app.use(plugins.User, { model: session, ping: 25 * 60 * 1000 });
	
	app.render();
});

//track js errors
if (PRODUCTION){
	window.Raven
		.config(
			"https://59d0634de9704b61ba83823ec3bf4787@sentry.webix.io/12",
			{ release: VERSION }
		)
		.install();
}