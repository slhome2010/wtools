/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export default function(obj, common, value){
	if (value == 'closed')
		return "<span class='webix_table_checkbox order-status order-closed'> Закрыта </span>";
	else
		return "<span class='webix_table_checkbox order-status order-open'> Открыта </span>";
}

