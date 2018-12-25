var header = {
	view: "template",
	src: "index.php?route=report/total/getTotalLast&token="+token,	
	"css": "sub_title", "height": 50,	
};

var grid = {
	id:"report-total-last",
	view:"datatable",
	header:false,
	"export":true,	
	columns:[
		{id:"date_created", minWidth:80, format:webix.Date.dateToStr("%d.%m.%Y")},						
		{id:"itemname", minWidth:120, fillspace: 2},		
		{id:"ownername", minWidth:120, fillspace: 2},		
	],		
	url:"index.php?route=report/total/getLast&token="+token,	
};

const layout = {
	type: "clean",	
	rows:[
		header,
		grid
	]
};

export default layout;