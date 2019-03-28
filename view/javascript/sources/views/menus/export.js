const controls = [
	{view: "icon", type: "icon", borderless:false, icon:"mdi mdi-file-excel", tooltip: "Export To Excel", click: function(){
		//var layout = $$("layout");
		let layout = this.getParentView().getParentView();
		let table = layout.queryView({ view:"datatable" });
		let treetable = layout.queryView({ view:"treetable" });
		let excellview = table !== null ? table : treetable;
				
		webix.toExcel(excellview);}
	},
	{view: "icon", type: "icon", borderless:false, icon:"mdi mdi-file-pdf", tooltip: "Export To PDF", click: function(){
		//var layout = this.getParentView().getParentView();		
		//webix.toPDF(layout.queryView({ view:"datatable" }));
		}
	},
	{view: "icon", type: "icon", borderless:false, icon:"mdi mdi-file-image", tooltip: "Export To PNG", click: function(){
		var layout = this.getParentView().getParentView();		
		webix.toPNG(layout.queryView({ view:"datatable" }));}
	},
	{view: "icon", type: "icon", borderless:false, icon:"mdi mdi-printer", tooltip: "Print", click: function(){
		//webix.toPNG(webix.grid);
		}
	},
	{},
];

export default controls;