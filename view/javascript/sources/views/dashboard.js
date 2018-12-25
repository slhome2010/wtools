import {JetView} 	from "webix-jet";
import dashline 	from "views/modules/dashline";
import totalchart 	from "views/modules/totalchart";
import orders 		from "views/modules/orders";
import bestsrllers 	from "views/modules/bestsellers";
import lastobjects 	from "views/modules/lastobjects";

const layout = {
	type: "clean",
	rows:[
		dashline,
		{
			type: "space",
			rows:[
				{
					height: 240,
					type: "wide",
					cols: [
						totalchart,
						orders
					]
				},
				{
					type: "wide",
					cols: [
						lastobjects, 
						bestsrllers  

					]
				},				
			]

		}
	]
};

export default layout;