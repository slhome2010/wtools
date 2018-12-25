export default function(obj, common, value){				
	if (value !=0)
		return "<span class='webix_table_checkbox status status1'> Включено </span>";
	else
		return "<span class='webix_table_checkbox status status0'> Отключено </span>";
}