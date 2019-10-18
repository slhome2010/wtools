import {JetView} 	from "webix-jet";
import outplugins 	from "views/menus/export";
import daterange 	from "views/menus/datebar";
import paging 		from "views/modules/paging";
import eyeFilter 	from "views/modules/groupfilter";
import staFilter 	from "views/modules/statusfilter";
import onlFilter 	from "views/modules/onlinefilter";
import staTemplate 	from "views/templates/status";
import eyeTemplate 	from "views/templates/eye";
import delTemplate 	from "views/templates/deleted";
import onlTemplate 	from "views/templates/online";

export default class ItemView extends JetView {
    config() {
        return layout;
    }
    init(view) {
        webix.extend(view.queryView({view: "datatable"}), webix.ProgressBar);
        $$('history-form').bind($$('history-list'));
      //  webix.dp.$$("history-list").config.updateFromResponse = true;
    }
}

var xml_format = webix.Date.strToDate("%Y-%m-%d");

const hgrid = {
    id: "history-list",
    view: "datatable",
    select: "row",    
    pager: "pagerA",   
    "export": true,

    columns: [
        {id: "item_id", header: "Id", sort: "int", minWidth: 120},
        {map: "(date)#date_changed#", header: "Дата", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y")},
        //{map: "(date)#date_modified#", header: "Дата m", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y")},
        {id: "deleted", header: "<span class='webix_icon mdi mdi-window-close deleted'></span>", width: 40, css: {"text-align": "center"}, template: delTemplate},
        {id: "ownername", header: ["Владелец", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "wialon_groupname", header: ["Группа", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},        
        {id: "itemname", header: ["Объект", {content: "textFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "tracker_uid", header: ["Трекер UID", {content: "textFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "trackername", header: ["Трекер", {content: "selectFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "sim1", header: ["SIM-1", {content: "textFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "sim2", header: ["SIM-2", {content: "textFilter"}], sort: "int", minWidth: 120, fillspace: 1},        
        {id: "wialon_group_off", header: ["Вид", {content: "eyeFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 80, css: {"text-align": "center"}, template: eyeTemplate},
        {id: "online", header: ["Состояние", {content: "onlFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 120, css: {"text-align": "center"}, template: onlTemplate},
        {id: "history_tarif_id", header: ["Тариф", {content: "selectFilter"}], sort: "int", minWidth: 60, fillspace: 1},
        {id: "history_discount_id", header: ["Скидка", {content: "selectFilter"}], sort: "int", minWidth: 60, fillspace: 1},
    ],
    scheme: {
        // init не срабатывает в данной ситуации (возможно из-за внешней принудительной загрузки или из-за map)
        $init: function (obj) {
            if (obj.deleted == 1)
                obj.$css = "deleted";
            obj.date_changed = xml_format(obj.date_start);
        }
    },
	url:"index.php?route=history/history&token="+token,
    ready: function () {
        webix.extend(this, webix.ProgressBar);
       // this.sort({by: "date_changed", dir: "desc"});
    }
};



const hform = {
    view: "form",
    id: "history-form",
    multiview: {keepViews: true},
    dataFeed: function (id) {
        let current_item_id = $$('history').getItem(id).item_id;
        this.load("index.php?route=catalog/item/getForm&token=" + token + "&item_id=" + current_item_id);
    },
    elements: [
        {         
        
           
        },
    ],
    //rules:{
    //	"date_end": function(value){ return value >= $$("date_start").getValue()},
    //	"date_start": function(value){ return value <= $$("date_end").getValue()},
    //}
};

const views = {
    view: "multiview",
    id: "history-views",
    cells: [hgrid, hform, ]
};

const layout = {
    id: "layout",
    type: "space",
    rows: [
        {height:40, id:"edit-tools", cols: outplugins.concat(daterange) },
        //{height: 40, id: "edit-form-icon", cols: toolplug, hidden: true},
        {rows: [views, paging]}
    ]
};