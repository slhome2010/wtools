var header = {
	"template": "<span class='webix_icon mdi mdi-trophy'></span>Лучшие клиенты", "css": "sub_title", "height": 50
};

var list = {
	"view": "list",
	css: "chat_list",	
	maxHeight: 270,
	minHeight: 230,
	"type": {
		"height": "auto",
		"template": function(obj){
			var text = 	"<table><tr class='total-list'><td><span class='webix_icon mdi mdi-car total-objects'></span></td><td width='40%'>Всего объектов </td><td width='10%'>" +obj.total_objects+"</td>"+
						"<td> </td><td><span class='webix_icon mdi mdi-car total-objects-on'></span></td><td width='40%'>Подключено </td><td width='10%'>" +obj.total_on+"</td></tr>" +						
						"<tr class='total-list'><td><span class='webix_icon mdi mdi-car tracker-online-f'></span></td><td width='40%'>Работало </td><td width='10%'>" +obj.total_online+
						"<td> </td><td><span class='webix_icon mdi mdi-car tracker-offline-f'></span></td><td width='40%'>Не работало </td><td width='10%'>" +obj.total_offline+"</td></tr></table>";						
			var html = 	"<img class='photo' src='image/wtools/photos/"+obj.id+".png' />";
			html += "<div class='text'><div class='name'>"+obj.ownername+"</div>";
			html += text+"</div>";
			return html;
		}
	},	
	url: "index.php?route=report/total/getBestsellers&token="+token,
};


const layout = {
	type: "clean",	
	rows:[
		header,
		list
	]
};

export default layout;