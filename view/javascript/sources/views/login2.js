 
	const login = {
        maxWidth: 320,

        type: "space",
        rows: [
            {
                view: "toolbar",
                css: "highlighted_header header1",
                paddingX: 5,
                paddingY: 5,
                height: 40,
                cols: [
                    {
                        "template": "<span class='webix_icon fa-lock'></span>Введите логин и пароль", "css": "sub_title2", borderless: true
                    }
                ]
            },
            {
                view: "form",
                id: "loginForm",
                elementsConfig: {
                    labelWidth: 90
                },
                elements: [
                    {view: "text", label: "Логин", placeholder: "Логин", name: "username", value: username, invalidMessage: "Логин не должен быть пустым"},
                    {view: "text", label: "Пароль", placeholder: "Пароль", name: "password", type: 'password', value: password, invalidMessage: "Пароль не должен быть пустым"},
                    {view: "text", name: "redirect", value: redirect, hidden: true},
                    {
                        margin: 10,
                        paddingX: 2,
                        borderless: true,
                        cols: [
                            {},
                            {view: "button", label: "Войти", type: "iconButton", icon: "key", align: "right", width: 100,
                                click: function () {
                                    if (webix.$$("loginForm").validate())
                                        console.log(action);
                                    webix.send(action, webix.$$("loginForm").getValues());
                                }
                            }
                        ]
                    }
                ],
                rules: {
                    name1: webix.rules.isNotEmpty
                }

            }
        ]
    };

    if (error_warning)
        webix.alert({type: "alert-error", text: error_warning});
    if (success)
        webix.alert({type: "alert-warning", text: success});

    webix.ui({
        container: "areaA",
        id: "mylayout",
        margin: 30,
        type: "clean",
        rows: [{}, {}, {}, {}, {}, {}, {}, {cols: [{}, login, {}]}]
                //rows:[login]
    })
	
