export default webix.ui.datafilter.onlFilter = { 
    getInputNode:function(node){ return node.firstChild?node.firstChild.firstChild : { value: null}; },
    getValue:function(node){ return this.getInputNode(node).value;  },	
    setValue:function(node, value){ this.getInputNode(node).value = value.toString();  },
    refresh: function(master, node, column){  
      master.registerFilter(node, column, this);
      column.compare = column.compare || function(value, filter){
        if (filter === "")
          return true;
        else if (filter === "1")
          return value == 1;
        else if (filter === "0")
          return value == 0;
      };      
      node.onchange = function(){    
        master.filterByAll();
      };
      node.onclick = webix.html.preventEvent;
    },
    render:function(a, b){
      return  "<select id="+b.columnId+">" +
        "<option value=''></option>" +        
        "<option value='1' class='tracker-online'>Online</option>" +
		"<option value='0' class='tracker-offline'>Offline</option>" +
        "</select>";
    }
  };