const controls = [	
	{view: "icon", id:"refresh",  type: "icon", borderless:false, icon:"mdi mdi-refresh", tooltip: "Освежить", click: function(){
		//var grid = webix.$$("catalog-owner");
		var wxgrid = this.getParentView().getParentView().queryView({ view:"datatable" });
		wxgrid.clearAll();
		wxgrid.showProgress();
		webix.delay(function(){
			wxgrid.load(wxgrid.config.url);
			wxgrid.hideProgress();
		}, null, null, 300);
		
	}},	
	{view: "icon", id:"add",  type: "icon", borderless:false, icon:"mdi mdi-plus", tooltip: "Добавить", click: function(){
		var wxgrid = this.getParentView().getParentView().queryView({ view:"datatable" });
		var wxform = this.getParentView().getParentView().queryView({ view:"form" });
		var route = wxgrid.config.id.replace('-','/')+"/validateAdd&token="+token;
		webix.ajax().post("index.php?route=" + route, {"grid_id":wxgrid.config.id}, function(text, xml, xhr){							
				if (!!JSON.parse(text).warning) {
					webix.message({
						text:JSON.parse(text).warning,
						type:"error", 
						expire: 5000,									
					}); //show server side response					
					return false;
				} else {
					wxform.clear();
					var item = wxgrid.add(wxform.getValues());
					wxgrid.showItem(item);
				}
			});			
		}
	},
	{view: "icon", id:"copy",  type: "icon", borderless:false, icon:"mdi mdi-content-copy", tooltip: "Копировать", disabled:true, click: function(){
			var wxgrid = this.getParentView().getParentView().queryView({ view:"datatable" });
			var selRows = wxgrid.getSelectedItem(true);
			selRows.forEach(function(item, idx, arr) {
                wxgrid.add({name:item.name});								
            });			
			wxgrid.showItem(wxgrid.getLastId());
		}
	},
	{view: "icon", id:"delete", type: "icon", borderless:false, icon:"mdi mdi-trash-can-outline", tooltip: "Удалить", click: function(){
			var wxgrid = this.getParentView().getParentView().queryView({ view:"datatable" });
			var wxform = this.getParentView().getParentView().queryView({ view:"form" });
			var route = wxgrid.config.id.replace('-','/')+"/validateDelete&token="+token;
			webix.confirm({
				text:" Выделенные строки будут удалены. <br/> Вы уверены? ", ok:"Да", cancel:"Отменить",
				callback:(res) => {
					if(res){
						var request_val = wxform.getValues();
						request_val.grid_id = wxgrid.config.id;
						webix.ajax().post("index.php?route=" + route, request_val, function(text){							
							if (!!JSON.parse(text).warning) {
								webix.message({
									text:JSON.parse(text).warning,
									type:"error", 
									expire: 5000,									
								}); //show server side response
								return false;
							} else {
								wxgrid.remove(wxgrid.getSelectedId());
							}
						});	
					}
				}
			});
				
		}
	},	
	{ view: "switch", id:"selectall",  width: 140, borderless:false, onLabel: "Отменить", offLabel:"Выделить все", value: 0, 
		on:{
			'onItemClick': function(id){
				var wxgrid = this.getParentView().getParentView().queryView({ view:"datatable" });	
				var val = this.getValue();							
				if(val=="1") {
					wxgrid.selectRange(wxgrid.getFirstId(),wxgrid.getLastId(), true);					
				} else {
					wxgrid.clearSelection();
				}
			}
		}
	},
];

export default controls;