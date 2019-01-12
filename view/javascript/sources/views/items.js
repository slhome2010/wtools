import {JetView} 	from "webix-jet";
import outplugins 	from "views/menus/export";
import toolplug 	from "views/menus/toolplug";
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
        $$('item-form').bind($$('catalog-item'));
        webix.dp.$$("catalog-item").config.updateFromResponse = true;
    }
}

const grid = {
    id: "catalog-item",
    view: "datatable",
    select: "row",
    clipboard: "selection",
    multiselect: true,
    editable: true,
    editaction: "dblclick",
    checkboxRefresh: true,
    pager: "pagerA",
    "export": true,
    columns: [
        {id: "item_id", header: "#", sort: "int", width: 60},
        {id: "deleted", header: " ", sort: "int", width: 40, css: {"text-align": "center"}, template: delTemplate},
        {id: "itemname", header: ["Название", {content: "textFilter"}], sort: "string", minWidth: 120, fillspace: 2, editor: "text"},
        {id: "tracker_uid", header: ["Трекер UID", {content: "textFilter"}], sort: "int", minWidth: 140, fillspace: 1},
        {id: "ownername", header: ["Владелец", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "wialon_groupname", header: ["Группа", {content: "textFilter"}], sort: "string", minWidth: 120, fillspace: 2, editor: "text"},
        {id: "wialon_group_off", header: ["Вид", {content: "eyeFilter", css: "webix_ss_filter"}], sort: "int", width: 80, css: {"text-align": "center"}, template: eyeTemplate},
        {id: "servername", header: ["Сервер", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 1},
        {id: "status", header: ["Статус", {content: "staFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 100, fillspace: 1, editor: "inline-checkbox", template: staTemplate},
        {id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
            template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
        },
    ],
    scheme: {
        $init: function (obj) {
            if (obj.deleted == 1)
                obj.$css = "deleted";

        }
    },
    url: "index.php?route=catalog/item/getList&token=" + token,
    save: {
        "insert": "index.php?route=catalog/item/add&token=" + token,
        "update": "index.php?route=catalog/item/edit&token=" + token,
        "delete": "index.php?route=catalog/item/delete&token=" + token
    },
    onClick: {
        "mdi-pencil": function (e, id) {
            this.select(id);
            $$('history-list').clearAll();
            $$('history-list').load("index.php?route=catalog/item/getItemHistory&token=" + token + "&item_id=" + this.getItem(id).item_id);
            $$('paging').hide();
            $$('edit-tools').hide();
            $$('edit-form-icon').show();
            $$('item-form').show();
        }
    },
    ready: function () {
        webix.extend(this, webix.ProgressBar);
    }
};

var xml_format = webix.Date.strToDate("%Y-%m-%d");

const history_grid = {
    id: "history-list",
    view: "datatable",
    select: "row",

    columns: [
        {id: "item_history_id", header: "#", sort: "int", minWidth: 120},
        {map: "(date)#date_changed#", header: "Дата", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y")},
        {id: "deleted", header: " ", sort: "int", width: 40, css: {"text-align": "center"}, template: delTemplate},
        {id: "itemname", header: ["Название", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "tracker_uid", header: ["Трекер UID", {content: "selectFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "trackername", header: ["Трекер", {content: "selectFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "sim1", header: ["SIM-1", {content: "selectFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "sim2", header: ["SIM-2", {content: "selectFilter"}], sort: "int", minWidth: 120, fillspace: 1},
        {id: "wialon_groupname", header: ["Группа", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2},
        {id: "wialon_group_off", header: ["Вид", {content: "eyeFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 80, css: {"text-align": "center"}, template: eyeTemplate},
        {id: "online", header: ["Состояние", {content: "onlFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 120, css: {"text-align": "center"}, template: onlTemplate},
        {id: "history_tarif_id", header: ["Тариф", {content: "selectFilter"}], sort: "int", minWidth: 60, fillspace: 1},
        {id: "history_discount_id", header: ["Скидка", {content: "selectFilter"}], sort: "int", minWidth: 60, fillspace: 1},
    ],
    scheme: {
        $init: function (obj) {
            if (obj.deleted == 1)
                obj.$css = "deleted";
            obj.date_changed = xml_format(obj.start);
        }
    },
//	url:"index.php?route=catalog/item/getItemHistory&token="+token+"&item_id="+$$('item-form').getValues().item_id,
    ready: function () {
        webix.extend(this, webix.ProgressBar);
        this.sort({by: "date_changed", dir: "desc"});
    }
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const billing_grid = {
    id: "billing-list",
    view: "datatable",
    footer: true,
    stringResult: true,
    columns: [
        {id: "event_name", header: "Событие", sort: "int", minWidth: 120, fillspace: true},
        {id: "date_start", header: "Начало", sort: "int", minWidth: 120, footer: {text: "Итого:", colspan: 4}, fillspace: true},
        {id: "date_end", header: "Конец", sort: "int", minWidth: 120, fillspace: true},
        {id: "tarif", header: "Тариф", sort: "int", minWidth: 120, fillspace: true},
        {id: "discount", header: "Скидка", sort: "int", minWidth: 120, fillspace: true},
        {id: "count", header: "Дней", sort: "int", minWidth: 120, footer: {content: "summColumn"}},
        {id: "sum", header: "Сумма", sort: "int", minWidth: 120, footer: {content: "summColumn"}},
    ],
    ready: function () {
        webix.extend(this, webix.ProgressBar);
    }
};

const date_popup = webix.ui({
    view: "window",
    modal: true,
    position: "center",
    head: "Какой датой внести изменения?",
    body: {
        view: "form",
        elements: [
            {view: "datepicker", name: "set_date_changed", value: new Date(), format: "%d.%m.%Y", },
            {view: "button", label: "Подтверждение", type: "form", click: function () {
                    var date_changed = this.getParentView().getValues().set_date_changed;
                    $$("item-form").setValues({date_changed: date_changed, }, true);
                    $$("item-form").save();
                    this.getTopParentView().hide();
                }}
        ]
    }
});

const iform = {
    view: "form",
    id: "item-form",
    multiview: {keepViews: true},
    dataFeed: function (id) {
        let current_item_id = $$('catalog-item').getItem(id).item_id;
        this.load("index.php?route=catalog/item/getForm&token=" + token + "&item_id=" + current_item_id);
    },
    elements: [
        {
            view: "tabview",
            tabbar: {options: ["Общие", "Железо", "Биллинг", "История"]}, animate: false,
            cells: [
                {id: "Общие", rows: [
                        {cols: [
                                {view: "text", id: "item_id", name: "item_id", label: "ID объекта", labelWidth: 140, readonly: true},
                                {view: "text", id: "date_created", name: "date_created", label: "Дата создания", labelWidth: 140, labelAlign: "right", readonly: true},
                            ]},
                        {view: "text", name: "itemname", label: "Название", labelWidth: 140, readonly: true},
                        {cols: [
                                {view: "text", name: "wialon_id", label: "Wialon ID", labelWidth: 140, readonly: true},
                                {view: "text", name: "servername", label: "Сервер", labelWidth: 140, labelAlign: "right", readonly: true},
                            ]},
                        {view: "template", template: "Принадлежность", type: "section"},
                        {cols: [
                                {view: "text", name: "wialon_groupname", label: "Группа", labelWidth: 140, readonly: true},
                                {view: "radio", name: "wialon_group_off", label: "Видимость", labelWidth: 140, labelAlign: "right", disabled: true,
                                    options: [
                                        {id: 0, value: "<span class='webix_icon mdi mdi-eye wialon-group-on'></span>"},
                                        {id: 1, value: "<span class='webix_icon mdi mdi-eye-off wialon-group-off'></span>"},
                                    ],
                                },
                            ]},
                        {view: "text", name: "ownername", label: "Владелец", labelWidth: 140, readonly: true},
                        {view: "template", template: "Данные", type: "section"},
                        {cols: [
                                {view: "text", id: "date_last", name: "date_last", label: "Последнее сообщение", labelWidth: 170, readonly: true},
                                {view: "text", id: "date_modified", name: "date_modified", label: "Дата модификации", labelWidth: 170, labelAlign: "right", readonly: true},
                            ]},
                        {cols: [
                                {view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170},
                                {view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{id: 0, value: "Отключено"}, {id: 1, value: "Включено"}], },
                            ]},
                        {}
                    ]},
                {id: "Железо", rows: [
                        {view: "template", template: "Трекер", type: "section"},
                        {cols: [
                                {view: "text", name: "tracker_uid", label: "Трекер UID", labelWidth: 140, gravity: 3, readonly: true},
                                {view: "text", name: "trackername", label: "Тип трекера", labelWidth: 120, labelAlign: "right", gravity: 2, readonly: true},
                                {view: "text", name: "tracker_hw", label: "HW", labelWidth: 60, width: 160, labelAlign: "right", gravity: 1, readonly: true},
                            ]},
                        {view: "text", name: "password", label: "Пароль", labelWidth: 140, readonly: true},
                        {cols: [
                                {view: "text", name: "sim1", label: "Сим-карта 1", labelWidth: 140, readonly: true},
                                {view: "text", name: "sim2", label: "Сим-карта 2", labelWidth: 120, labelAlign: "right", readonly: true},
                            ]},
                        {view: "template", template: "Датчики", type: "section"},
                        {}
                    ]},
                {id: "Биллинг", rows: [
                        {view: "template", template: "Объект", type: "section"},
                        {cols: [
                                {view: "select", name: "tarif_id", label: "Тариф объекта", labelWidth: 140, options: "index.php?route=catalog/item/getTarifs&token=" + token},
                                {view: "select", name: "discount_id", label: "Скидка объекта", labelWidth: 140, labelAlign: "right", options: "index.php?route=catalog/item/getDiscounts&token=" + token},
                            ]},
                        {view: "template", template: "Группа", type: "section"},
                        {cols: [
                                {view: "select", name: "tarif_group_id", label: "Тариф группы", labelWidth: 140, options: "index.php?route=catalog/wialongroup/getTarifs&token=" + token, disabled: true, },
                                {view: "select", name: "discount_group_id", label: "Скидка группы", labelWidth: 140, labelAlign: "right", options: "index.php?route=catalog/wialongroup/getDiscounts&token=" + token, disabled: true, },
                            ]},
                        {view: "template", template: "Расчет за период", type: "section"},
                        {cols: [
                                {view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y"},
                                {view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y"},
                                //{ view:"datepicker", name:"date_changed", hidden: true }, test notepad git
                                {view: "button", value: "Расчитать", width: 120, click: function () {
                                        let values = $$('item-form').getValues();
                                        let tarif_id = Number(values.tarif_id) || Number(values.tarif_group_id);
                                        let discount_id = Number(values.discount_id) || Number(values.discount_group_id);
                                        let date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
                                        let date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
                                        $$('billing-list').clearAll();
                                        $$('billing-list').load("index.php?route=billing/billing/getItemBilling&token=" + token + "&item_id=" + values.item_id + "&date_start=" + date_start + "&date_end=" + date_end
                                                + "&tarif_id=" + tarif_id + "&discount_id=" + discount_id);
                                    }},
                            ]},
                        billing_grid,
                    ]},
                {id: "История", rows: [
                        history_grid,
                    ]}
            ]
        },
        {
            margin: 10,
            cols: [
                {},
                {view: "button", value: "Отменить", width: 120, click: function () {
                        $$("item-views").back();
                        $$('paging').show();
                        $$('edit-form-icon').hide();
                        $$('edit-tools').show();
                    }},
                {view: "button", value: "Сохранить", type: "form", width: 120, click: function () {
                        let iform = $$("item-form");
                        if (iform.isDirty()) {
                            if (!iform.validate())
                                return false;

                            webix.ajax().post("index.php?route=catalog/item/validateForm&token=" + token, $$("item-form").getValues(), function (text, data, XmlHttpRequest) {
                                if (text && text != "[]") {
                                    webix.message({
                                        text: JSON.parse(text).warning,
                                        type: "error",
                                        expire: 5000,
                                    }); //show server side response
                                    return false;
                                } else {
                                    date_popup.show();
                                    //	iform.save();
                                }

                            });
                        }
                        $$("item-views").back();
                        $$('paging').show();
                        $$('edit-form-icon').hide();
                        $$('edit-tools').show();
                    }}
            ]
        },
    ],
    //rules:{
    //	"date_end": function(value){ return value >= $$("date_start").getValue()},
    //	"date_start": function(value){ return value <= $$("date_end").getValue()},
    //}
};

const item_views = {
    view: "multiview",
    id: "item-views",
    cells: [grid, iform, ]
}

const layout = {
    id: "layout",
    type: "space",
    rows: [
        {height: 40, id: "edit-tools", cols: outplugins},
        {height: 40, id: "edit-form-icon", cols: toolplug, hidden: true},
        {rows: [item_views, paging]}
    ]
};