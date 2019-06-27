import {JetView} 	from "webix-jet";
import toolbar		from "views/menus/export";

export default class ReportBillingView extends JetView {
    config() {
        return layout;
    }
    init(view) {
        webix.extend(view.queryView({view: "treetable"}), webix.ProgressBar);
        webix.extend($$("owner-tree"), webix.ProgressBar);
        $$("owner-tree").showProgress({
            type: "top",
            delay: 1500,
            hide: true
        });
    }
}

const report_treetable_group = {
    id: "report-treetable-group",
    view: "treetable",
    "export": true,
    columns: [
        {id: "item_id", header: "#", sort: "int", width: 60,
            template: function (obj, common) {
                if (obj.$group)
                    return common.treetable(obj, common) + obj.value + '  (' + obj.count + ' объектов)' + ' Сумма: ' + obj.total;
                return obj.item_id;
            }
        },
        {id: "deleted", header: " ", sort: "int", width: 40, css: {"text-align": "center"},
            template: function (obj, common, value) {
                if (value != 0)
                    return "<span class='webix_icon fa-times deleted'></span>";
                else
                    return "";
            }
        },
        {id: "itemname", header: ["Название"], minWidth: 120, fillspace: 2, },
        {id: "tracker_uid", header: ["Трекер UID"], minWidth: 140, fillspace: 1},
        {id: "ownername", header: ["Владелец"], minWidth: 120, fillspace: 2, hidden: true, },
        {id: "wialon_groupname", header: ["Группа"], sort: "string", minWidth: 120, fillspace: 2},
        {id: "wialon_group_off", header: ["Вид"], width: 65, css: {"text-align": "center"},
            template: function (obj, common, value) {
                if (value == 1)
                    return "<span class='webix_icon fa-eye-slash wialon-group-off'></span>";
                else
                    return "<span class='webix_icon fa-eye wialon-group-on'></span>";
            }
        },
        {id: "billing", header: "Сумма", sort: "int", minWidth: 120},
    ],
    scheme: {
        $init: function (obj) {
            if (obj.deleted == 1)
                obj.$css = "deleted";
        },
        $group: {
            by: "ownername",
            map: {
                title: ["ownername"],
                count: ["item_id", "count"],
                total: ["billing", "sum"],
            },
            //row:function(obj){
            //	return "Группа "+obj.item_id+", Начислено: "+webix.i18n.numberFormat(obj.item_id);
            //},
            row: "item_id",
            footer: {
                total: ["billing", "sum"],
                row: function (obj) {
                    return "<span style='float:right;'>Итого: " + webix.i18n.numberFormat(obj.total) + "</span>";
                }
            },
        },
        $sort: {by: "ownername", as: "string", dir: "desc"}
    },
};

const report_treetable_tree = {
    id: "report-treetable-tree",
    view: "treetable",
    "export": true,
    footer: true,
    stringResult: true,
    columns: [
        {id: "event_name", header: "Событие", sort: "int", minWidth: 450, fillspace: true,
            template: function (obj, common) {
                if (obj.$level == 2)
                    //return common.treetable(obj, common)+"<span>"+obj.value + '  ('+ obj.$count +' гр.)'+"</span>";
                    return common.treetable(obj, common) + "<span>" + obj.value + "</span>";
                if (obj.$level == 3)
                    return common.treetable(obj, common) + "<span>" + "<i>" + obj.value + '  (' + obj.$count + ' объектов)' + "</i>" + "</span>";
                if (obj.$level <= 4)
                    return common.treetable(obj, common) + "<span>" + obj.value + "</span>";
                else
                    return obj.event_name;
            }
        },
        {id: "date_start", header: "Начало", sort: "int", minWidth: 120, footer: {text: "Итого:", colspan: 4}, fillspace: true},
        {id: "date_end", header: "Конец", sort: "int", minWidth: 120, fillspace: true},
        {id: "tarif", header: "Тариф", sort: "int", minWidth: 120, fillspace: true},
        {id: "discount", header: "Скидка", sort: "int", minWidth: 120, fillspace: true},
        {id: "count", header: "Дней", sort: "int", minWidth: 120, footer: {content: "summColumn"}},
        {id: "sum", header: "Сумма", sort: "int", minWidth: 120, footer: {content: "summColumn"}},
    ],
    scheme: {
    },
};

var myjson = webix.DataDriver.myjson = webix.copy(webix.DataDriver.json);
myjson.child = function (obj) {
    var _id = obj.id.split('.');
    if (obj.$level == 1)
        return obj.data;
    if (obj.$level == 2) {
        obj.value = obj.value + " (id=" + obj.id + ")";
        return obj.data;
    }
    if (obj.$level == 3) {
        obj.value = "Группа " + obj.value + " (id=" + _id[1] + ")";
        return obj.data;
    }
    if (obj.$level == 4) {
        obj.value = obj.value + " (id=" + _id[2] + ")";
        return obj.data;
    }
};

const owner_tree = {
    view: "tree",
    id: "owner-tree",
    template: "{common.icon()} {common.checkbox()} {common.folder()} #value# ",
    threeState: true,
    datatype: "myjson",
    url: "index.php?route=report/billing/getOwnersTree&token=" + token,
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const checking_form = {
    view: "form",
    id: "checking-form",
    elements: [
        {cols: [
                {view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y"},
                {view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y"},
                {view: "button", value: "Расчитать", width: 120, click: function () {
                        let values = $$('checking-form').getValues();
                        let date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
                        let date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
                        let billing_treetable = $$('billing-report').queryView({view: "treetable"});
                        billing_treetable.clearAll();
                        $$('billing-report').show();
                        billing_treetable.showProgress({
                            type: "top",
                            delay: 20000,
                            hide: true
                        });
                        let checked = $$("owner-tree").getChecked();
                        //billing_treetable.load("index.php?route=report/billing/getOwnersBillingTree&token="+token+"&date_start="+date_start+"&date_end="+date_end+"&checked="+checked);
                        var query = webix.ajax().post("index.php?route=report/billing/getOwnersBillingTree&token=" + token, {date_start: date_start, date_end: date_end, checked: checked});
                        billing_treetable.load(function () {
                            return query;
                        });
                    }},
            ]},
        owner_tree,
    ],
}

const controls = [
    {view: "button", value: "Назад", width: 120, click: function () {
            $$("checking-form").show();
        }},
];

const billing_report = {
    view: "form",
    id: "billing-report",
    elements: [
        {height: 40, id: "edit-tools", cols: toolbar.concat(controls)},
        report_treetable_tree,
    ]
};

const billing_report_views = {
    view: "multiview",
    id: "billing-report-views",
    cells: [checking_form, billing_report]
}

const layout = {
    type: "space",
    rows: [billing_report_views, ]
};
