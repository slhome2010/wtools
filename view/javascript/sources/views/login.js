import {JetView} from "webix-jet";

export default class LoginView extends JetView{
	config(){
		return ui;
	}
	init(view){
		view.$view.querySelector("input").focus();
	}

	do_login(){
		const user = this.app.getService("user");
		const form = this.getRoot().queryView({ view:"form" });

		if (form.validate()){
			const data = form.getValues();
			user.login(data.username, data.password).catch(function(){
				webix.html.removeCss(form.$view, "invalid_login");
				form.elements.password.focus();
				webix.delay(function(){
					webix.html.addCss(form.$view, "invalid_login");
				});//.then(result => {console.log(user.getUser())}, error => {console.log(user.getUser())});				
			});
			//if (user.getUser() !== null) { console.log(user.getUser().token);} else {console.log("Empty token");}
			//token = user.getUser().token;
		}
	}
}

const login_form = {
	view:"form",
	id: "loginform",
	width:400, borderless:false, margin:10,
	rows:[
		//{ view: "label", name: "error_warning", label: error_warning, hidden: error_warning?false:true, css: "webix_alert-error"},
		{ type:"header", template:"<span class='webix_icon mdi mdi-lock'></span>Введите логин и пароль" },
		{ view:"text", name:"username", label:"Логин", labelPosition:"top", invalidMessage: "Логин не должен быть пустым" },
		{ view:"text", type:"password", name:"password", label:"Пароль", labelPosition:"top", invalidMessage: "Пароль не должен быть пустым" },
		{ view: "button", label: "Войти", type: "iconButton", icon: "mdi mdi-key", click:function(){
			this.$scope.do_login();
		}, hotkey:"enter" }
	],
	rules:{
		username:webix.rules.isNotEmpty,
		password:webix.rules.isNotEmpty
	}
};

const ui = { rows: [ {}, { cols:[ {}, login_form, {}]}, {} ] };