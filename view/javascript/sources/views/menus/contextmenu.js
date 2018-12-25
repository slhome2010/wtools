const context = {
	view:"contextmenu",
	//id: "contextPopup",
	//width: 200,
	padding:0,
	data:[{value:"Add",task:"add"},{value:"Rename", task:"rename"},{value:"Delete", task:"delete"},{ $template:"Separator" },{value:"Info",task:"info"}],
	on:{
		onItemClick:function(id){
			var task =this.getItem(id).task;					
			if (backendController)	{				
				webix.ajax().post("index.php?route="+backendController+task+"&token="+token, selRows, function(response) {
					console.log(response);
				});				
			}
		}
	}
};

export default context;