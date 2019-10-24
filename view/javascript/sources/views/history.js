import { JetView } from "webix-jet";
import outplugins from "views/menus/export";
import daterange from "views/menus/datebar";
import paging from "views/modules/paging";
import eyeFilter from "views/modules/groupfilter";
import staFilter from "views/modules/statusfilter";
import onlFilter from "views/modules/onlinefilter";
import staTemplate from "views/templates/status";
import eyeTemplate from "views/templates/eye";
import delTemplate from "views/templates/deleted";
import onlTemplate from "views/templates/online";

export default class ItemView extends JetView {
    config() {
        return layout;
    }
    init(view) {
        webix.extend(view.queryView({ view: "datatable" }), webix.ProgressBar);
    }
}

const hgrid = {
    id: "history-list",
    view: "datatable",
    select: "row",
    pager: "pagerA",
    "export": true,

    columns: [
        { id: "item_id", header: "Id", sort: "server", minWidth: 120 },
        { map: "(date)#date_changed#", header: "Дата", sort: "server", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y") },
        { id: "deleted", header: "<span class='webix_icon mdi mdi-window-close deleted'></span>", width: 40, css: { "text-align": "center" }, template: delTemplate },
        { id: "ownername", header: ["Владелец", { content: "serverSelectFilter", options: "index.php?route=history/history/getOwners&token=" + token }], sort: "server", minWidth: 120, fillspace: 2 },
        {
            id: "wialon_groupname", header: ["Группа", {
                content: "serverSelectFilter", options: {
                    data: "index.php?route=history/history/getGroups&token=" + token,
                    on: {
                        onShow() {
                            let owner = $$("ownername").getValue();
                            if (owner) {
                                this.getList().clearAll();
                                this.getList().load("index.php?route=history/history/getGroups&token=" + token + "&owner=" + owner);
                            }
                        }
                    }
                }
            }], sort: "server", minWidth: 120, fillspace: 2
        },
        { id: "itemname", header: ["Объект", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 2 },
        { id: "tracker_uid", header: ["Трекер UID", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 1 },
        { id: "trackername", header: ["Трекер", { content: "serverSelectFilter", options: "index.php?route=history/history/getTrackers&token=" + token }], sort: "server", minWidth: 120, fillspace: 1 },
        { id: "sim1", header: ["SIM-1", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 1 },
        { id: "sim2", header: ["SIM-2", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 1 },
        { id: "wialon_group_off", header: ["Вид", { content: "eyeFilter", css: "webix_ss_filter" }], sort: "server", minWidth: 80, css: { "text-align": "center" }, template: eyeTemplate },
        { id: "online", header: ["Состояние", { content: "onlFilter", css: "webix_ss_filter" }], sort: "server", minWidth: 120, css: { "text-align": "center" }, template: onlTemplate },
        { id: "price", header: ["Тариф", { content: "selectFilter", options: "index.php?route=history/history/getTarifs&token=" + token }], sort: "server", minWidth: 60, fillspace: 1 },
        { id: "history_discount_id", header: ["Скидка", { content: "selectFilter", options: "index.php?route=history/history/getDiscounts&token=" + token }], sort: "server", minWidth: 60, fillspace: 1 },
    ],
    url: "index.php?route=history/history&token=" + token,
    ready: function () {
        webix.extend(this, webix.ProgressBar);
        // Client sorting can't be used with dynamic loading
        // this.sort({by: "date_changed", dir: "desc"}); 
    }
};

const layout = {
    id: "layout",
    type: "space",
    rows: [
        { height: 40, id: "edit-tools", cols: outplugins.concat(daterange) },
        { rows: [hgrid, paging] }
    ]
};