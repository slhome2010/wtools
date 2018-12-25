const ui = {
	view: "submenu",
	id: "profilePopup",
	width: 200,
	padding:0,
	data: [
		{id: 1, icon: "mdi mdi-user", value: "My Profile"},
		{id: 2, icon: "mdi mdi-cog", value: "My Account"},
		{id: 3, icon: "mdi mdi-calendar", value: "My Calendar"},
		{id: 5, icon: "mdi mdi-tasks", value: "My Tasks"},
		{ $template:"Separator" },
		{id: 4, icon: "mdi mdi-sign-out", value: "Выход"}
	],
	type:{
		template: function(obj){
			if(obj.type)
				return "<div class='separator'></div>";
			return "<span class='webix_icon mdi mdi-alerts fa-"+obj.icon+"'></span><span>"+obj.value+"</span>";
		}
	},
	on:{
		onMenuItemClick:function(id){
		
		  switch (id) {
			case "1": console.log(id); break;
			case "2": console.log(id); break;
			case "3": console.log(id); break;
			case "4":				
				//webix.ajax("index.php?route=common/logout");
				const user = this.$scope.app.getService("user");				
				user.logout();
				this.$scope.app.refresh();
				//this.$scope.app.show("/app/login");				
				break; 			
		  }     
		}
	},
};

export default ui;