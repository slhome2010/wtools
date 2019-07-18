import {JetView} 	from "webix-jet";
import outplugins 	from "views/menus/export";
import toolplug 	from "views/menus/toolplug";
import paging 		from "views/modules/paging";
import staFilter 	from "views/modules/order_statesfilter";
import staTemplate 	from "views/templates/order_states";

export default class OrderView extends JetView {
    config() {
        return layout;
    }
    init(view) {
        //$$('order-form').bind($$('catalog-order'));
        // webix.dp.$$("orders").config.updateFromResponse = true;
    }
}

const grid = {
    id: "orders",
    view: "datatable",
    select: "row",
    clipboard: "selection",
    editable: false,
    checkboxRefresh: true,
    pager: "pagerA",
    "export": true,
    columns: [
        {id: "TicketID", header: "#", sort: "int", width: 50},
        {id: "TicketNumber", header: "Заявка", sort: "int", minWidth: 120, fillspace: 2},
        {id: "Title", header: ["Название", {content: "textFilter"}], sort: "string", minWidth: 120, fillspace: 2},
       // {id: "Owner", header: ["Владелец", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "CustomerID", header: ["Заказчик", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "Queue", header: ["Очередь", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "Age", header: ["Возраст", {content: "textFilter"}], sort: "int", minWidth: 100, fillspace: 2},
        {id: "StateType", header: ["Статус", {content: "staFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 100, fillspace: 1, editor: "inline-checkbox", template: staTemplate},
       // {id: "State", header: "State", sort: "int", minWidth: 120, fillspace: 2},
    ],
    scheme: {
        $init: function (obj) {
            if (obj.deleted == 1)
                obj.$css = "deleted";

        }
    },
    url: "index.php?route=order/order/getTicketList&token=" + token,
    ready: function () {
        webix.extend(this, webix.ProgressBar);
    }
};

const order_views = {
    view: "multiview",
    id: "order-views",
    cells: [grid, ]
};

const layout = {
    id: "layout",
    type: "space",
    rows: [
        {height: 40, id: "edit-tools", cols: outplugins},
        {height: 40, id: "edit-form-icon", cols: toolplug, hidden: true},
        {rows: [order_views, paging]}
    ]
};