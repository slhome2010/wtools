/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sources/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-polyglot/build/polyglot.js":
/*!******************************************************!*\
  !*** ./node_modules/node-polyglot/build/polyglot.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     (c) 2012 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//


(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return factory(root);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (root) {
  'use strict';

  // ### Polyglot class constructor

  function Polyglot(options) {
    options = options || {};
    this.phrases = {};
    this.extend(options.phrases || {});
    this.currentLocale = options.locale || 'en';
    this.allowMissing = !!options.allowMissing;
    this.warn = options.warn || warn;
  }

  // ### Version
  Polyglot.VERSION = '0.4.3';

  // ### polyglot.locale([locale])
  //
  // Get or set locale. Internally, Polyglot only uses locale for pluralization.
  Polyglot.prototype.locale = function (newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
  };

  // ### polyglot.extend(phrases)
  //
  // Use `extend` to tell Polyglot how to translate a given key.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The key can be any string.  Feel free to call `extend` multiple times;
  // it will override any phrases with the same key, but leave existing phrases
  // untouched.
  //
  // It is also possible to pass nested phrase objects, which get flattened
  // into an object with the nested keys concatenated using dot notation.
  //
  //     polyglot.extend({
  //       "nav": {
  //         "hello": "Hello",
  //         "hello_name": "Hello, %{name}",
  //         "sidebar": {
  //           "welcome": "Welcome"
  //         }
  //       }
  //     });
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}',
  //     //   'nav.sidebar.welcome': 'Welcome'
  //     // }
  //
  // `extend` accepts an optional second argument, `prefix`, which can be used
  // to prefix every key in the phrases object with some string, using dot
  // notation.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     }, "nav");
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}'
  //     // }
  //
  // This feature is used internally to support nested phrase objects.
  Polyglot.prototype.extend = function (morePhrases, prefix) {
    var phrase;

    for (var key in morePhrases) {
      if (morePhrases.hasOwnProperty(key)) {
        phrase = morePhrases[key];
        if (prefix) key = prefix + '.' + key;
        if ((typeof phrase === 'undefined' ? 'undefined' : _typeof(phrase)) === 'object') {
          this.extend(phrase, key);
        } else {
          this.phrases[key] = phrase;
        }
      }
    }
  };

  // ### polyglot.clear()
  //
  // Clears all phrases. Useful for special cases, such as freeing
  // up memory if you have lots of phrases but no longer need to
  // perform any translation. Also used internally by `replace`.
  Polyglot.prototype.clear = function () {
    this.phrases = {};
  };

  // ### polyglot.replace(phrases)
  //
  // Completely replace the existing phrases with a new set of phrases.
  // Normally, just use `extend` to add more phrases, but under certain
  // circumstances, you may want to make sure no old phrases are lying around.
  Polyglot.prototype.replace = function (newPhrases) {
    this.clear();
    this.extend(newPhrases);
  };

  // ### polyglot.t(key, options)
  //
  // The most-used method. Provide a key, and `t` will return the
  // phrase.
  //
  //     polyglot.t("hello");
  //     => "Hello"
  //
  // The phrase value is provided first by a call to `polyglot.extend()` or
  // `polyglot.replace()`.
  //
  // Pass in an object as the second argument to perform interpolation.
  //
  //     polyglot.t("hello_name", {name: "Spike"});
  //     => "Hello, Spike"
  //
  // If you like, you can provide a default value in case the phrase is missing.
  // Use the special option key "_" to specify a default.
  //
  //     polyglot.t("i_like_to_write_in_language", {
  //       _: "I like to write in %{language}.",
  //       language: "JavaScript"
  //     });
  //     => "I like to write in JavaScript."
  //
  Polyglot.prototype.t = function (key, options) {
    var phrase, result;
    options = options == null ? {} : options;
    // allow number as a pluralization shortcut
    if (typeof options === 'number') {
      options = { smart_count: options };
    }
    if (typeof this.phrases[key] === 'string') {
      phrase = this.phrases[key];
    } else if (typeof options._ === 'string') {
      phrase = options._;
    } else if (this.allowMissing) {
      phrase = key;
    } else {
      this.warn('Missing translation for key: "' + key + '"');
      result = key;
    }
    if (typeof phrase === 'string') {
      options = clone(options);
      result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
      result = interpolate(result, options);
    }
    return result;
  };

  // ### polyglot.has(key)
  //
  // Check if polyglot has a translation for given key
  Polyglot.prototype.has = function (key) {
    return key in this.phrases;
  };

  // #### Pluralization methods
  // The string that separates the different phrase possibilities.
  var delimeter = '||||';

  // Mapping from pluralization group plural logic.
  var pluralTypes = {
    chinese: function chinese(n) {
      return 0;
    },
    german: function german(n) {
      return n !== 1 ? 1 : 0;
    },
    french: function french(n) {
      return n > 1 ? 1 : 0;
    },
    russian: function russian(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    czech: function czech(n) {
      return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    },
    polish: function polish(n) {
      return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function icelandic(n) {
      return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
    }
  };

  // Mapping from pluralization group to individual locales.
  var pluralTypeToLanguages = {
    chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
    german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['hr', 'ru'],
    czech: ['cs'],
    polish: ['pl'],
    icelandic: ['is']
  };

  function langToTypeMap(mapping) {
    var type,
        langs,
        l,
        ret = {};
    for (type in mapping) {
      if (mapping.hasOwnProperty(type)) {
        langs = mapping[type];
        for (l in langs) {
          ret[langs[l]] = type;
        }
      }
    }
    return ret;
  }

  // Trim a string.
  function trim(str) {
    var trimRe = /^\s+|\s+$/g;
    return str.replace(trimRe, '');
  }

  // Based on a phrase text that contains `n` plural forms separated
  // by `delimeter`, a `locale`, and a `count`, choose the correct
  // plural form, or none if `count` is `null`.
  function choosePluralForm(text, locale, count) {
    var ret, texts, chosenText;
    if (count != null && text) {
      texts = text.split(delimeter);
      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
      ret = trim(chosenText);
    } else {
      ret = text;
    }
    return ret;
  }

  function pluralTypeName(locale) {
    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType.en;
  }

  function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
  }

  // ### interpolate
  //
  // Does the dirty work. Creates a `RegExp` object for each
  // interpolation placeholder.
  function interpolate(phrase, options) {
    for (var arg in options) {
      if (arg !== '_' && options.hasOwnProperty(arg)) {
        // We create a new `RegExp` each time instead of using a more-efficient
        // string replace so that the same argument can be replaced multiple times
        // in the same phrase.
        phrase = phrase.replace(new RegExp('%\\{' + arg + '\\}', 'g'), options[arg]);
      }
    }
    return phrase;
  }

  // ### warn
  //
  // Provides a warning in the console if a phrase key is missing.
  function warn(message) {
    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
  }

  // ### clone
  //
  // Clone an object.
  function clone(source) {
    var ret = {};
    for (var prop in source) {
      ret[prop] = source[prop];
    }
    return ret;
  }

  return Polyglot;
});

/***/ }),

/***/ "./node_modules/webix-jet/dist/JetApp.js":
/*!***********************************************!*\
  !*** ./node_modules/webix-jet/dist/JetApp.js ***!
  \***********************************************/
/*! exports provided: JetApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JetApp", function() { return JetApp; });
/* harmony import */ var _JetBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JetBase */ "./node_modules/webix-jet/dist/JetBase.js");
/* harmony import */ var _JetView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JetView */ "./node_modules/webix-jet/dist/JetView.js");
/* harmony import */ var _JetViewLegacy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JetViewLegacy */ "./node_modules/webix-jet/dist/JetViewLegacy.js");
/* harmony import */ var _JetViewRaw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JetViewRaw */ "./node_modules/webix-jet/dist/JetViewRaw.js");
/* harmony import */ var _routers_HashRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routers/HashRouter */ "./node_modules/webix-jet/dist/routers/HashRouter.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers */ "./node_modules/webix-jet/dist/helpers.js");
/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./patch */ "./node_modules/webix-jet/dist/patch.js");
/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_patch__WEBPACK_IMPORTED_MODULE_6__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();







var JetApp = function (_super) {
    __extends(JetApp, _super);
    function JetApp(config) {
        var _this = _super.call(this) || this;
        _this.webix = config.webix || webix;
        // init config
        _this.config = _this.webix.extend({
            name: "App",
            version: "1.0",
            start: "/home"
        }, config, true);
        _this._name = _this.config.name;
        _this._services = {};
        webix.extend(_this, webix.EventSystem);
        return _this;
    }
    JetApp.prototype.getService = function (name) {
        var obj = this._services[name];
        if (typeof obj === "function") {
            obj = this._services[name] = obj(this);
        }
        return obj;
    };
    JetApp.prototype.setService = function (name, handler) {
        this._services[name] = handler;
    };
    // copy object and collect extra handlers
    JetApp.prototype.copyConfig = function (obj, target, config) {
        // raw ui config
        if (obj.$ui) {
            obj = { $subview: new _JetViewLegacy__WEBPACK_IMPORTED_MODULE_2__["JetViewLegacy"](this, "", obj) };
        } else if (obj instanceof JetApp) {
            obj = { $subview: obj };
        }
        // subview placeholder
        if (obj.$subview) {
            return this.addSubView(obj, target, config);
        }
        // process sub-properties
        target = target || (obj instanceof Array ? [] : {});
        for (var method in obj) {
            var point = obj[method];
            // view class
            if (typeof point === "function" && point.prototype && point.prototype.config) {
                point = { $subview: point };
            }
            if (point && (typeof point === "undefined" ? "undefined" : _typeof(point)) === "object" && !(point instanceof webix.DataCollection)) {
                if (point instanceof Date) {
                    target[method] = new Date(point);
                } else {
                    target[method] = this.copyConfig(point, point instanceof Array ? [] : {}, config);
                }
            } else {
                target[method] = point;
            }
        }
        return target;
    };
    JetApp.prototype.getRouter = function () {
        return this.$router;
    };
    JetApp.prototype.clickHandler = function (e) {
        if (e) {
            var target = e.target || e.srcElement;
            if (target && target.getAttribute) {
                var trigger = target.getAttribute("trigger");
                if (trigger) {
                    this.trigger(trigger);
                }
                var route = target.getAttribute("route");
                if (route) {
                    this.show(route);
                }
            }
        }
    };
    JetApp.prototype.refresh = function () {
        var temp = this._container;
        this._view.destructor();
        this._view = this._container = null;
        this.render(temp, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["parse"])(this.getRouter().get()), this._parent);
    };
    JetApp.prototype.loadView = function (url) {
        var _this = this;
        var views = this.config.views;
        var result = null;
        if (url === "") {
            return Promise.resolve(this._loadError("", new Error("Webix Jet: Empty url segment")));
        }
        try {
            if (views) {
                if (typeof views === "function") {
                    // custom loading strategy
                    result = views(url);
                } else {
                    // predefined hash
                    result = views[url];
                }
                if (typeof result === "string") {
                    url = result;
                    result = null;
                }
            }
            if (!result) {
                url = url.replace(/\./g, "/");
                var view = __webpack_require__("./sources/views sync recursive ^\\.\\/.*$")("./" + url);
                if (view.__esModule) {
                    view = view.default;
                }
                result = view;
            }
        } catch (e) {
            result = this._loadError(url, e);
        }
        // custom handler can return view or its promise
        if (!result.then) {
            result = Promise.resolve(result);
        }
        // set error handler
        result = result.catch(function (err) {
            return _this._loadError(url, err);
        });
        return result;
    };
    JetApp.prototype.createFromURL = function (url, now) {
        var _this = this;
        var chunk = url[0];
        var name = chunk.page;
        var view;
        if (now && now.getName() === name) {
            view = Promise.resolve(now);
        } else {
            view = this.loadView(chunk.page).then(function (ui) {
                return _this.createView(ui, name);
            });
        }
        return view;
    };
    JetApp.prototype.createView = function (ui, name) {
        var obj;
        if (typeof ui === "function") {
            if (ui.prototype && ui.prototype.show) {
                // UI class
                return new ui(this, name);
            } else {
                // UI factory functions
                ui = ui();
            }
        }
        if (ui instanceof JetApp || ui instanceof _JetView__WEBPACK_IMPORTED_MODULE_1__["JetView"]) {
            obj = ui;
        } else {
            // UI object
            if (ui.$ui) {
                obj = new _JetViewLegacy__WEBPACK_IMPORTED_MODULE_2__["JetViewLegacy"](this, name, ui);
            } else {
                obj = new _JetViewRaw__WEBPACK_IMPORTED_MODULE_3__["JetViewRaw"](this, name, ui);
            }
        }
        return obj;
    };
    // show view path
    JetApp.prototype.show = function (name) {
        if (this.$router.get() !== name) {
            this._render(name);
        } else {
            return Promise.resolve(true);
        }
    };
    JetApp.prototype.canNavigate = function (url, view) {
        var obj = {
            url: Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["parse"])(url),
            redirect: url,
            confirm: Promise.resolve(true)
        };
        var res = this.callEvent("app:guard", [url, view || this._view, obj]);
        if (!res) {
            return Promise.reject("");
        }
        return obj.confirm.then(function () {
            return obj.redirect;
        });
    };
    JetApp.prototype.destructor = function () {
        this._view.destructor();
    };
    // event helpers
    JetApp.prototype.trigger = function (name) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.apply(name, rest);
    };
    JetApp.prototype.apply = function (name, data) {
        this.callEvent(name, data);
    };
    JetApp.prototype.action = function (name) {
        return this.webix.bind(function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            this.apply(name, rest);
        }, this);
    };
    JetApp.prototype.on = function (name, handler) {
        this.attachEvent(name, handler);
    };
    JetApp.prototype.use = function (plugin, config) {
        plugin(this, null, config);
    };
    JetApp.prototype.error = function (name, er) {
        this.callEvent(name, er);
        this.callEvent("app:error", er);
        /* tslint:disable */
        if (this.config.debug) {
            for (var i = 0; i < er.length; i++) {
                console.error(er[i]);
                if (er[i] instanceof Error) {
                    var text = er[i].message;
                    if (text.indexOf("Module build failed") === 0) {
                        text = text.replace(/\x1b\[[0-9;]*m/g, "");
                        document.body.innerHTML = "<pre style='font-size:16px; background-color: #ec6873; color: #000; padding:10px;'>" + text + "</pre>";
                    } else {
                        text += "<br><br>Check console for more details";
                        webix.message({ type: "error", text: text, expire: -1 });
                    }
                }
            }
            debugger;
        }
        /* tslint:enable */
    };
    // renders top view
    JetApp.prototype._render = function (url) {
        var _this = this;
        var firstInit = !this.$router;
        if (firstInit) {
            webix.attachEvent("onClick", function (e) {
                return _this.clickHandler(e);
            });
            url = this._first_start(url);
        }
        var strUrl = typeof url === "string" ? url : Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["url2str"])(url);
        return this.canNavigate(strUrl).then(function (newurl) {
            _this.$router.set(newurl, { silent: true });
            return _this._render_stage(newurl);
        }).catch(function () {
            return false;
        });
    };
    JetApp.prototype._render_stage = function (url) {
        var _this = this;
        var parsed = typeof url === "string" ? Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["parse"])(url) : url;
        // block resizing while rendering parts of UI
        return webix.ui.freeze(function () {
            return _this.createFromURL(parsed, _this._view).then(function (view) {
                // save reference for old and new views
                var oldview = _this._view;
                _this._view = view;
                // render url state for the root
                return view.render(_this._container, parsed, _this._parent).then(function (root) {
                    // destroy and detack old view
                    if (oldview && oldview !== _this._view) {
                        oldview.destructor();
                    }
                    if (_this._view.getRoot().getParentView()) {
                        _this._container = root;
                    }
                    _this._root = root;
                    _this.callEvent("app:route", [parsed]);
                    return view;
                });
            }).catch(function (er) {
                _this.error("app:error:render", [er]);
            });
        });
    };
    JetApp.prototype._urlChange = function (_$url) {
        alert("Not implemented");
        return Promise.resolve(true);
    };
    JetApp.prototype._first_start = function (url) {
        var _this = this;
        var cb = function cb(a) {
            return setTimeout(function () {
                _this._render(a);
            }, 1);
        };
        this.$router = new (this.config.router || _routers_HashRouter__WEBPACK_IMPORTED_MODULE_4__["HashRouter"])(cb, this.config);
        // start animation for top-level app
        if (this._container === document.body && this.config.animation !== false) {
            var node_1 = this._container;
            webix.html.addCss(node_1, "webixappstart");
            setTimeout(function () {
                webix.html.removeCss(node_1, "webixappstart");
                webix.html.addCss(node_1, "webixapp");
            }, 10);
        }
        if (!url || url.length === 1) {
            url = this.$router.get() || this.config.start;
            this.$router.set(url, { silent: true });
        }
        return url;
    };
    // error during view resolving
    JetApp.prototype._loadError = function (url, err) {
        this.error("app:error:resolve", [err, url]);
        return { template: " " };
    };
    JetApp.prototype.addSubView = function (obj, target, config) {
        var url = obj.$subview !== true ? obj.$subview : null;
        var name = obj.name || (url ? this.webix.uid() : "default");
        target.id = obj.id || "s" + this.webix.uid();
        var view = config[name] = { id: target.id, url: url };
        if (view.url instanceof _JetView__WEBPACK_IMPORTED_MODULE_1__["JetView"]) {
            view.view = view.url;
        }
        return target;
    };
    return JetApp;
}(_JetBase__WEBPACK_IMPORTED_MODULE_0__["JetBase"]);


/***/ }),

/***/ "./node_modules/webix-jet/dist/JetBase.js":
/*!************************************************!*\
  !*** ./node_modules/webix-jet/dist/JetBase.js ***!
  \************************************************/
/*! exports provided: JetBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JetBase", function() { return JetBase; });
var JetBase = function () {
    function JetBase() {
        this._id = webix.uid();
        this._events = [];
        this._subs = {};
        this._data = {};
    }
    JetBase.prototype.getRoot = function () {
        return this._root;
    };
    JetBase.prototype.destructor = function () {
        var events = this._events;
        for (var i = events.length - 1; i >= 0; i--) {
            events[i].obj.detachEvent(events[i].id);
        }
        // destroy sub views
        for (var key in this._subs) {
            var subView = this._subs[key].view;
            // it possible that subview was not loaded with any content yet
            // so check on null
            if (subView) {
                subView.destructor();
            }
        }
        this._events = this._container = this.app = this._parent = null;
    };
    JetBase.prototype.setParam = function (id, value, url) {
        if (this._data[id] !== value) {
            this._data[id] = value;
            if (this.app.callEvent("app:paramchange", [this, id, value, url])) {
                if (url) {
                    // changing in the url
                    this.show((_a = {}, _a[id] = value, _a));
                }
            }
        }
        var _a;
    };
    JetBase.prototype.getParam = function (id, parent) {
        var value = this._data[id];
        if (typeof value !== "undefined" || !parent) {
            return value;
        }
        var view = this.getParentView();
        if (view) {
            return view.getParam(id, parent);
        }
    };
    JetBase.prototype.getUrl = function () {
        return this._url;
    };
    JetBase.prototype.render = function (root, url, parent) {
        var _this = this;
        this._parent = parent;
        if (url) {
            this._index = url[0].index;
        }
        this._init_url_data(url);
        root = root || document.body;
        var _container = typeof root === "string" ? webix.toNode(root) : root;
        if (this._container !== _container) {
            this._container = _container;
            return this._render(url).then(function () {
                return _this.getRoot();
            });
        } else {
            return this._urlChange(url).then(function () {
                return _this.getRoot();
            });
        }
    };
    JetBase.prototype.getIndex = function () {
        return this._index;
    };
    JetBase.prototype.getId = function () {
        return this._id;
    };
    JetBase.prototype.getParentView = function () {
        return this._parent;
    };
    JetBase.prototype.$$ = function (id) {
        if (typeof id === "string") {
            return this.getRoot().queryView(function (obj) {
                return obj.config.id === id || obj.config.localId === id;
            }, "self");
        } else {
            return id;
        }
    };
    JetBase.prototype.on = function (obj, name, code) {
        var id = obj.attachEvent(name, code);
        this._events.push({ obj: obj, id: id });
        return id;
    };
    JetBase.prototype.contains = function (view) {
        for (var key in this._subs) {
            var kid = this._subs[key].view;
            if (kid === view || kid.contains(view)) {
                return true;
            }
        }
        return false;
    };
    JetBase.prototype.getSubView = function (name) {
        var sub = this.getSubViewInfo(name);
        if (sub) {
            return sub.subview.view;
        }
    };
    JetBase.prototype.getSubViewInfo = function (name) {
        var sub = this._subs[name || "default"];
        if (sub) {
            return { subview: sub, parent: this };
        }
        // when called from a child view, searches for nearest parent with subview
        if (this._parent) {
            return this._parent.getSubViewInfo(name);
        }
        return null;
    };
    JetBase.prototype.getName = function () {
        return this._name;
    };
    JetBase.prototype._init_url_data = function (url) {
        if (url && url[0]) {
            this._data = {};
            webix.extend(this._data, url[0].params, true);
        }
        this._url = url;
    };
    return JetBase;
}();


/***/ }),

/***/ "./node_modules/webix-jet/dist/JetView.js":
/*!************************************************!*\
  !*** ./node_modules/webix-jet/dist/JetView.js ***!
  \************************************************/
/*! exports provided: JetView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JetView", function() { return JetView; });
/* harmony import */ var _JetBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JetBase */ "./node_modules/webix-jet/dist/JetBase.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./node_modules/webix-jet/dist/helpers.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();


var JetView = function (_super) {
    __extends(JetView, _super);
    function JetView(app, name) {
        var _this = _super.call(this) || this;
        _this.app = app;
        _this._name = name;
        _this._children = [];
        return _this;
    }
    JetView.prototype.ui = function (ui, config) {
        config = config || {};
        var container = config.container || ui.container;
        var jetview = this.app.createView(ui);
        this._children.push(jetview);
        jetview.render(container, null, this);
        if ((typeof ui === "undefined" ? "undefined" : _typeof(ui)) !== "object" || ui instanceof _JetBase__WEBPACK_IMPORTED_MODULE_0__["JetBase"]) {
            // raw webix UI
            return jetview;
        } else {
            return jetview.getRoot();
        }
    };
    JetView.prototype.show = function (path, config) {
        var _this = this;
        config = config || {};
        // detect the related view
        if (typeof path === "string") {
            // root path
            if (path.substr(0, 1) === "/") {
                return this.app.show(path);
            }
            // parent path, call parent view
            if (path.indexOf("../") === 0) {
                var parent_1 = this.getParentView();
                if (parent_1) {
                    parent_1.show("./" + path.substr(3), config);
                } else {
                    this.app.show("/" + path.substr(3));
                }
                return;
            }
            // local path, do nothing
            if (path.indexOf("./") === 0) {
                path = path.substr(2);
            }
            var sub = this.getSubViewInfo(config.target);
            if (!sub) {
                return this.app.show("/" + path);
            }
            if (sub.parent !== this) {
                return sub.parent.show(path, config);
            }
        }
        var currentUrl = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["parse"])(this.app.getRouter().get());
        // convert parameters to url
        if ((typeof path === "undefined" ? "undefined" : _typeof(path)) === "object") {
            if (webix.isArray(path)) {
                currentUrl[this._index + path[0]].page = path[1];
                path = "";
            } else {
                var temp = [];
                for (var key in path) {
                    temp.push(encodeURIComponent(key) + "=" + encodeURIComponent(path[key]));
                }
                path = "?" + temp.join("&");
            }
        }
        // process url
        if (typeof path === "string") {
            // parameters only
            if (path.substr(0, 1) === "?") {
                var next = path.indexOf("/");
                var params = path;
                if (next > -1) {
                    params = path.substr(0, next);
                }
                var chunk = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["parse"])(params);
                webix.extend(currentUrl[this._index - 1].params, chunk[0].params, true);
                path = next > -1 ? path.substr(next + 1) : "";
            }
            var newChunk = path === "" ? currentUrl.slice(this._index) : Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["parse"])(path);
            var url_1 = null;
            if (this._index) {
                url_1 = currentUrl.slice(0, this._index).concat(newChunk);
                for (var i = 0; i < url_1.length; i++) {
                    url_1[i].index = i + 1;
                }
                var urlstr_1 = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["url2str"])(url_1);
                return this.app.canNavigate(urlstr_1, this).then(function (redirect) {
                    if (urlstr_1 !== redirect) {
                        // url was blocked and redirected
                        return _this.app.show(redirect);
                    } else {
                        return _this._finishShow(url_1, redirect);
                    }
                }).catch(function () {
                    return false;
                });
            } else {
                return this._finishShow(newChunk, "");
            }
        }
    };
    JetView.prototype.init = function (_$view, _$url) {
        // stub
    };
    JetView.prototype.ready = function (_$view, _$url) {
        // stub
    };
    JetView.prototype.config = function () {
        this.app.webix.message("View:Config is not implemented");
    };
    JetView.prototype.urlChange = function (_$view, _$url) {
        // stub
    };
    JetView.prototype.destroy = function () {
        // stub
    };
    JetView.prototype.destructor = function () {
        this.destroy();
        // destroy child views
        var uis = this._children;
        for (var i = uis.length - 1; i >= 0; i--) {
            if (uis[i] && uis[i].destructor) {
                uis[i].destructor();
            }
        }
        // reset vars for better GC processing
        this.app = this._children = null;
        // destroy actual UI
        this._root.destructor();
        _super.prototype.destructor.call(this);
    };
    JetView.prototype.use = function (plugin, config) {
        plugin(this.app, this, config);
    };
    JetView.prototype._render = function (url) {
        var _this = this;
        var config = this.config();
        if (config.then) {
            return config.then(function (cfg) {
                return _this._render_final(cfg, url);
            });
        } else {
            return this._render_final(config, url);
        }
    };
    JetView.prototype._render_final = function (config, url) {
        var _this = this;
        var prev = this._container;
        if (prev && prev.$destructed) {
            return Promise.reject("Container destroyed");
        }
        var response;
        // using wrapper object, so ui can be changed from app:render event
        var result = { ui: {} };
        this.app.copyConfig(config, result.ui, this._subs);
        this.app.callEvent("app:render", [this, url, result]);
        result.ui.$scope = this;
        try {
            // special handling for adding inside of multiview - preserve old id
            if (prev && prev.getParentView) {
                var parent_2 = prev.getParentView();
                if (parent_2 && parent_2.name === "multiview" && !result.ui.id) {
                    result.ui.id = prev.config.id;
                }
            }
            this._root = this.app.webix.ui(result.ui, this._container);
            if (this._root.getParentView()) {
                this._container = this._root;
            }
            this._init(this._root, url);
            response = this._urlChange(url).then(function () {
                return _this.ready(_this._root, url);
            });
        } catch (e) {
            response = Promise.reject(e);
        }
        return response.catch(function (err) {
            return _this._initError(_this, err);
        });
    };
    JetView.prototype._init = function (view, url) {
        return this.init(view, url);
    };
    JetView.prototype._urlChange = function (url) {
        var _this = this;
        this.app.callEvent("app:urlchange", [this, url, this._index]);
        var waits = [];
        for (var key in this._subs) {
            var frame = this._subs[key];
            if (frame.url) {
                // we have fixed subview url
                if (typeof frame.url === "string") {
                    var parsed = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["parse"])(frame.url);
                    parsed.map(function (a) {
                        a.index = 0;
                    });
                    waits.push(this._createSubView(frame, parsed));
                } else {
                    var view = frame.view;
                    if (typeof frame.url === "function" && !(view instanceof frame.url)) {
                        view = new frame.url(this.app, "");
                    }
                    if (!view) {
                        view = frame.url;
                    }
                    waits.push(this._renderSubView(frame, view, url));
                }
            } else if (key === "default" && url && url.length > 1) {
                // we have an url and subview for it
                var suburl = url.slice(1);
                waits.push(this._createSubView(frame, suburl));
            }
        }
        return Promise.all(waits).then(function () {
            _this.urlChange(_this._root, url);
        });
    };
    JetView.prototype._initError = function (view, err) {
        this.app.error("app:error:initview", [err, view]);
        return true;
    };
    JetView.prototype._createSubView = function (sub, suburl) {
        var _this = this;
        return this.app.createFromURL(suburl, sub.view).then(function (view) {
            return _this._renderSubView(sub, view, suburl);
        });
    };
    JetView.prototype._renderSubView = function (sub, view, suburl) {
        var cell = this.app.webix.$$(sub.id);
        return view.render(cell, suburl, this).then(function (ui) {
            // destroy old view
            if (sub.view && sub.view !== view) {
                sub.view.destructor();
            }
            // save info about a new view
            sub.view = view;
            sub.id = ui.config.id;
            return ui;
        });
    };
    JetView.prototype._finishShow = function (url, path) {
        var next;
        if (this._index) {
            next = this._renderPartial(url.slice(this._index - 1));
            this.app.getRouter().set(path, { silent: true });
            this.app.callEvent("app:route", [url]);
        } else {
            url.map(function (a) {
                return a.index = 0;
            });
            next = this._renderPartial([null].concat(url));
        }
        return next;
    };
    JetView.prototype._renderPartial = function (url) {
        this._init_url_data(url);
        return this._urlChange(url);
    };
    return JetView;
}(_JetBase__WEBPACK_IMPORTED_MODULE_0__["JetBase"]);


/***/ }),

/***/ "./node_modules/webix-jet/dist/JetViewLegacy.js":
/*!******************************************************!*\
  !*** ./node_modules/webix-jet/dist/JetViewLegacy.js ***!
  \******************************************************/
/*! exports provided: JetViewLegacy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JetViewLegacy", function() { return JetViewLegacy; });
/* harmony import */ var _JetView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JetView */ "./node_modules/webix-jet/dist/JetView.js");
var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

// wrapper for raw objects and Jet 1.x structs
var JetViewLegacy = function (_super) {
    __extends(JetViewLegacy, _super);
    function JetViewLegacy(app, name, ui) {
        var _this = _super.call(this, app, name) || this;
        _this._ui = ui;
        _this._windows = [];
        return _this;
    }
    JetViewLegacy.prototype.getRoot = function () {
        if (this.app.config.jet1xMode) {
            var parent_1 = this.getParentView();
            if (parent_1) {
                return parent_1.getRoot();
            }
        }
        return this._root;
    };
    JetViewLegacy.prototype.config = function () {
        return this._ui.$ui || this._ui;
    };
    JetViewLegacy.prototype.destructor = function () {
        var destroy = this._ui.$ondestroy;
        if (destroy) {
            destroy();
        }
        for (var _i = 0, _a = this._windows; _i < _a.length; _i++) {
            var window_1 = _a[_i];
            window_1.destructor();
        }
        _super.prototype.destructor.call(this);
    };
    JetViewLegacy.prototype.show = function (path, config) {
        if (path.indexOf("/") === 0 || path.indexOf("./") === 0) {
            return _super.prototype.show.call(this, path, config);
        }
        _super.prototype.show.call(this, "../" + path, config);
    };
    JetViewLegacy.prototype.init = function () {
        if (this.app.config.legacyEarlyInit) {
            this._realInitHandler();
        }
    };
    JetViewLegacy.prototype.ready = function () {
        if (!this.app.config.legacyEarlyInit) {
            this._realInitHandler();
        }
    };
    JetViewLegacy.prototype._realInitHandler = function () {
        var init = this._ui.$oninit;
        if (init) {
            var root = this.getRoot();
            init(root, root.$scope);
        }
        var events = this._ui.$onevent;
        if (events) {
            for (var key in events) {
                this.on(this.app, key, events[key]);
            }
        }
        var windows = this._ui.$windows;
        if (windows) {
            for (var _i = 0, windows_1 = windows; _i < windows_1.length; _i++) {
                var conf = windows_1[_i];
                if (conf.$ui) {
                    var view = new JetViewLegacy(this.app, this.getName(), conf);
                    view.render(document.body);
                    this._windows.push(view);
                } else {
                    this.ui(conf);
                }
            }
        }
    };
    JetViewLegacy.prototype._urlChange = function (url) {
        var _this = this;
        return _super.prototype._urlChange.call(this, url).then(function () {
            var onurlchange = _this._ui.$onurlchange;
            if (onurlchange) {
                var root = _this.getRoot();
                onurlchange(url[0].params, url.slice(1), root.$scope);
            }
        });
    };
    return JetViewLegacy;
}(_JetView__WEBPACK_IMPORTED_MODULE_0__["JetView"]);


/***/ }),

/***/ "./node_modules/webix-jet/dist/JetViewRaw.js":
/*!***************************************************!*\
  !*** ./node_modules/webix-jet/dist/JetViewRaw.js ***!
  \***************************************************/
/*! exports provided: JetViewRaw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JetViewRaw", function() { return JetViewRaw; });
/* harmony import */ var _JetView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JetView */ "./node_modules/webix-jet/dist/JetView.js");
var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

// wrapper for raw objects and Jet 1.x structs
var JetViewRaw = function (_super) {
    __extends(JetViewRaw, _super);
    function JetViewRaw(app, name, ui) {
        var _this = _super.call(this, app, name) || this;
        _this._ui = ui;
        return _this;
    }
    JetViewRaw.prototype.config = function () {
        return this._ui;
    };
    return JetViewRaw;
}(_JetView__WEBPACK_IMPORTED_MODULE_0__["JetView"]);


/***/ }),

/***/ "./node_modules/webix-jet/dist/helpers.js":
/*!************************************************!*\
  !*** ./node_modules/webix-jet/dist/helpers.js ***!
  \************************************************/
/*! exports provided: diff, parse, url2str */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diff", function() { return diff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "url2str", function() { return url2str; });
function diff(oUrl, nUrl) {
    var i = 0;
    for (i; i < nUrl.length; i++) {
        var left = oUrl[i];
        var right = nUrl[i];
        if (!left) {
            break;
        }
        if (left.page !== right.page) {
            break;
        }
        for (var key in left.params) {
            if (left.params[key] !== right.params[key]) {
                break;
            }
        }
    }
    return i;
}
function parse(url) {
    // remove starting /
    if (url[0] === "/") {
        url = url.substr(1);
    }
    // split url by "/"
    var parts = url.split("/");
    var chunks = [];
    // for each page in url
    for (var i = 0; i < parts.length; i++) {
        var test_1 = parts[i];
        var result = {};
        // detect params
        // support old 			some:a=b:c=d
        // and new notation		some?a=b&c=d
        var pos = test_1.indexOf(":");
        if (pos === -1) {
            pos = test_1.indexOf("?");
        }
        if (pos !== -1) {
            var params = test_1.substr(pos + 1).split(/[\:\?\&]/g);
            // create hash of named params
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var param = params_1[_i];
                var dchunk = param.split("=");
                result[dchunk[0]] = decodeURIComponent(dchunk[1]);
            }
        }
        // store parsed values
        chunks[i] = {
            page: pos > -1 ? test_1.substr(0, pos) : test_1,
            params: result, index: i + 1
        };
    }
    // return array of page objects
    return chunks;
}
function url2str(stack) {
    var url = [];
    for (var _i = 0, stack_1 = stack; _i < stack_1.length; _i++) {
        var chunk = stack_1[_i];
        url.push("/" + chunk.page);
        var params = obj2str(chunk.params);
        if (params) {
            url.push("?" + params);
        }
    }
    return url.join("");
}
function obj2str(obj) {
    var str = [];
    for (var key in obj) {
        if (str.length) {
            str.push("&");
        }
        str.push(key + "=" + encodeURIComponent(obj[key]));
    }
    return str.join("");
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/index.js":
/*!**********************************************!*\
  !*** ./node_modules/webix-jet/dist/index.js ***!
  \**********************************************/
/*! exports provided: JetApp, JetView, HashRouter, StoreRouter, UrlRouter, EmptyRouter, plugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugins", function() { return plugins; });
/* harmony import */ var _JetApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JetApp */ "./node_modules/webix-jet/dist/JetApp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JetApp", function() { return _JetApp__WEBPACK_IMPORTED_MODULE_0__["JetApp"]; });

/* harmony import */ var _JetView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JetView */ "./node_modules/webix-jet/dist/JetView.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JetView", function() { return _JetView__WEBPACK_IMPORTED_MODULE_1__["JetView"]; });

/* harmony import */ var _routers_HashRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routers/HashRouter */ "./node_modules/webix-jet/dist/routers/HashRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return _routers_HashRouter__WEBPACK_IMPORTED_MODULE_2__["HashRouter"]; });

/* harmony import */ var _routers_StoreRouter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routers/StoreRouter */ "./node_modules/webix-jet/dist/routers/StoreRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StoreRouter", function() { return _routers_StoreRouter__WEBPACK_IMPORTED_MODULE_3__["StoreRouter"]; });

/* harmony import */ var _routers_UrlRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routers/UrlRouter */ "./node_modules/webix-jet/dist/routers/UrlRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UrlRouter", function() { return _routers_UrlRouter__WEBPACK_IMPORTED_MODULE_4__["UrlRouter"]; });

/* harmony import */ var _routers_EmptyRouter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routers/EmptyRouter */ "./node_modules/webix-jet/dist/routers/EmptyRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptyRouter", function() { return _routers_EmptyRouter__WEBPACK_IMPORTED_MODULE_5__["EmptyRouter"]; });

/* harmony import */ var _plugins_Guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugins/Guard */ "./node_modules/webix-jet/dist/plugins/Guard.js");
/* harmony import */ var _plugins_Locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plugins/Locale */ "./node_modules/webix-jet/dist/plugins/Locale.js");
/* harmony import */ var _plugins_Menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plugins/Menu */ "./node_modules/webix-jet/dist/plugins/Menu.js");
/* harmony import */ var _plugins_Status__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plugins/Status */ "./node_modules/webix-jet/dist/plugins/Status.js");
/* harmony import */ var _plugins_Theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plugins/Theme */ "./node_modules/webix-jet/dist/plugins/Theme.js");
/* harmony import */ var _plugins_UrlParam__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plugins/UrlParam */ "./node_modules/webix-jet/dist/plugins/UrlParam.js");
/* harmony import */ var _plugins_User__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./plugins/User */ "./node_modules/webix-jet/dist/plugins/User.js");













var plugins = {
    UnloadGuard: _plugins_Guard__WEBPACK_IMPORTED_MODULE_6__["UnloadGuard"], Locale: _plugins_Locale__WEBPACK_IMPORTED_MODULE_7__["Locale"], Menu: _plugins_Menu__WEBPACK_IMPORTED_MODULE_8__["Menu"], Theme: _plugins_Theme__WEBPACK_IMPORTED_MODULE_10__["Theme"], User: _plugins_User__WEBPACK_IMPORTED_MODULE_12__["User"], Status: _plugins_Status__WEBPACK_IMPORTED_MODULE_9__["Status"], UrlParam: _plugins_UrlParam__WEBPACK_IMPORTED_MODULE_11__["UrlParam"]
};
if (!window.Promise) {
    window.Promise = webix.promise;
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/patch.js":
/*!**********************************************!*\
  !*** ./node_modules/webix-jet/dist/patch.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var w = webix;
var version = webix.version.split(".");
// will be fixed in webix 5.2
if (version[0] * 10 + version[1] * 1 < 52) {
    w.ui.freeze = function (handler) {
        // disabled because webix jet 5.0 can't handle resize of scrollview correctly
        // w.ui.$freeze = true;
        var res = handler();
        if (res && res.then) {
            res.then(function (some) {
                w.ui.$freeze = false;
                w.ui.resize();
                return some;
            });
        } else {
            w.ui.$freeze = false;
            w.ui.resize();
        }
        return res;
    };
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/Guard.js":
/*!******************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/Guard.js ***!
  \******************************************************/
/*! exports provided: UnloadGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnloadGuard", function() { return UnloadGuard; });
function UnloadGuard(app, view, config) {
    view.on(app, "app:guard", function (_$url, point, promise) {
        if (point === view || point.contains(view)) {
            var res_1 = config();
            if (res_1 === false) {
                promise.confirm = Promise.reject(res_1);
            } else {
                promise.confirm = promise.confirm.then(function () {
                    return res_1;
                });
            }
        }
    });
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/Locale.js":
/*!*******************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/Locale.js ***!
  \*******************************************************/
/*! exports provided: Locale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Locale", function() { return Locale; });
/* harmony import */ var node_polyglot_build_polyglot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-polyglot/build/polyglot */ "./node_modules/node-polyglot/build/polyglot.js");
/* harmony import */ var node_polyglot_build_polyglot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_polyglot_build_polyglot__WEBPACK_IMPORTED_MODULE_0__);

function Locale(app, view, config) {
    config = config || {};
    var storage = config.storage;
    var lang = storage ? storage.get("lang") || "en" : config.lang || "en";
    var service = {
        _: null,
        polyglot: null,
        getLang: function getLang() {
            return lang;
        },
        setLang: function setLang(name, silent) {
            var path = (config.path ? config.path + "/" : "") + name;
            var data = __webpack_require__("./sources/locales sync recursive ^\\.\\/.*$")("./" + path);
            if (data.__esModule) {
                data = data.default;
            }
            var poly = service.polyglot = new node_polyglot_build_polyglot__WEBPACK_IMPORTED_MODULE_0___default.a({ phrases: data });
            poly.locale(name);
            service._ = webix.bind(poly.t, poly);
            lang = name;
            if (storage) {
                storage.put("lang", lang);
            }
            if (!silent) {
                app.refresh();
            }
        }
    };
    app.setService("locale", service);
    service.setLang(lang, true);
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/Menu.js":
/*!*****************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/Menu.js ***!
  \*****************************************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
function show(view, config, value) {
    if (config.urls) {
        value = config.urls[value] || value;
    }
    view.show("./" + value);
}
function Menu(app, view, config) {
    var ui = view.$$(config.id || config);
    var silent = false;
    ui.attachEvent("onchange", function () {
        if (!silent) {
            show(view, config, this.getValue());
        }
    });
    ui.attachEvent("onafterselect", function () {
        if (!silent) {
            var id = null;
            if (ui.setValue) {
                id = this.getValue();
            } else if (ui.getSelectedId) {
                id = ui.getSelectedId();
            }
            show(view, config, id);
        }
    });
    view.on(app, "app:route", function (url) {
        var segment = url[view.getIndex()];
        if (segment) {
            silent = true;
            var page = segment.page;
            if (ui.setValue && ui.getValue() !== page) {
                ui.setValue(page);
            } else if (ui.select && ui.exists(page) && ui.getSelectedId() !== page) {
                ui.select(page);
            }
            silent = false;
        }
    });
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/Status.js":
/*!*******************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/Status.js ***!
  \*******************************************************/
/*! exports provided: Status */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return Status; });
var baseicons = {
    "good": "check",
    "error": "warning",
    "saving": "refresh fa-spin"
};
var basetext = {
    "good": "Ok",
    "error": "Error",
    "saving": "Connecting..."
};
function Status(app, view, config) {
    var status = "good";
    var count = 0;
    var iserror = false;
    var expireDelay = config.expire;
    if (!expireDelay && expireDelay !== false) expireDelay = 2000;
    var texts = config.texts || basetext;
    var icons = config.icons || baseicons;
    if (typeof config === "string") config = { target: config };
    function refresh(content) {
        var area = view.$$(config.target);
        if (area) {
            if (!content) content = "<div class='status_" + status + "'><span class='webix_icon fa-" + icons[status] + "'></span> " + texts[status] + "</div>";
            area.setHTML(content);
        }
    }
    function success() {
        count--;
        setStatus("good");
    }
    function fail(err) {
        count--;
        setStatus("error", err);
    }
    function start(promise) {
        count++;
        setStatus("saving");
        if (promise && promise.then) {
            promise.then(success, fail);
        }
    }
    function getStatus() {
        return status;
    }
    function hideStatus() {
        if (count == 0) {
            refresh(" ");
        }
    }
    function setStatus(mode, err) {
        if (count < 0) {
            count = 0;
        }
        if (mode === "saving") {
            status = "saving";
            refresh();
        } else {
            iserror = mode === "error";
            if (count === 0) {
                status = iserror ? "error" : "good";
                if (iserror) {
                    app.error("app:error:server", [err.responseText || err]);
                } else {
                    if (expireDelay) setTimeout(hideStatus, expireDelay);
                }
                refresh();
            }
        }
    }
    function track(data) {
        var dp = webix.dp(data);
        if (dp) {
            view.on(dp, "onAfterDataSend", start);
            view.on(dp, "onAfterSaveError", function (id, obj, response) {
                return fail(response);
            });
            view.on(dp, "onAfterSave", success);
        }
    }
    app.setService("status", {
        getStatus: getStatus,
        setStatus: setStatus,
        track: track
    });
    if (config.remote) {
        view.on(webix, "onRemoteCall", start);
    }
    if (config.ajax) {
        view.on(webix, "onBeforeAjax", function (mode, url, data, request, headers, files, promise) {
            start(promise);
        });
    }
    if (config.data) {
        track(config.data);
    }
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/Theme.js":
/*!******************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/Theme.js ***!
  \******************************************************/
/*! exports provided: Theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });
function Theme(app, view, config) {
    config = config || {};
    var storage = config.storage;
    var theme = storage ? storage.get("theme") || "flat-default" : config.theme || "flat-default";
    var service = {
        getTheme: function getTheme() {
            return theme;
        },
        setTheme: function setTheme(name, silent) {
            var parts = name.split("-");
            var links = document.getElementsByTagName("link");
            for (var i = 0; i < links.length; i++) {
                var lname = links[i].getAttribute("title");
                if (lname) {
                    if (lname === name || lname === parts[0]) {
                        links[i].disabled = false;
                    } else {
                        links[i].disabled = true;
                    }
                }
            }
            webix.skin.set(parts[0]);
            //remove old css
            webix.html.removeCss(document.body, "theme-" + theme);
            //add new css
            webix.html.addCss(document.body, "theme-" + name);
            theme = name;
            if (storage) {
                storage.put("theme", name);
            }
            if (!silent) {
                app.refresh();
            }
        }
    };
    app.setService("theme", service);
    service.setTheme(theme, true);
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/UrlParam.js":
/*!*********************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/UrlParam.js ***!
  \*********************************************************/
/*! exports provided: UrlParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlParam", function() { return UrlParam; });
function copyParams(view, url, route) {
    for (var i = 0; i < route.length; i++) {
        view.setParam(route[i], url[i + 1] ? url[i + 1].page : "");
    }
}
function UrlParam(app, view, config) {
    var route = config.route || config;
    view.on(app, "app:urlchange", function (subview, url) {
        if (view === subview) {
            copyParams(view, url, route);
            url.splice(1, route.length);
        }
    });
    view.on(app, "app:paramchange", function (subview, name, value, url) {
        if (view === subview && url) {
            for (var i = 0; i < route.length; i++) {
                if (route[i] === name) {
                    //changing in the url
                    view.show([i, value]);
                    return false;
                }
            }
        }
    });
    copyParams(view, view.getUrl(), route);
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/plugins/User.js":
/*!*****************************************************!*\
  !*** ./node_modules/webix-jet/dist/plugins/User.js ***!
  \*****************************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
function User(app, view, config) {
    config = config || {};
    var login = config.login || "/login";
    var logout = config.logout || "/logout";
    var afterLogin = config.afterLogin || app.config.start;
    var afterLogout = config.afterLogout || "/login";
    var ping = config.ping || 5 * 60 * 1000;
    var model = config.model;
    var user = config.user;
    var service = {
        getUser: function getUser() {
            return user;
        },
        getStatus: function getStatus(server) {
            if (!server) {
                return user !== null;
            }
            return model.status().catch(function () {
                return null;
            }).then(function (data) {
                user = data;
            });
        },
        login: function login(name, pass) {
            return model.login(name, pass).then(function (data) {
                user = data;
                if (!data) {
                    throw "Access denied";
                }
                app.show(afterLogin);
            });
        },
        logout: function logout() {
            user = null;
            return model.logout();
        }
    };
    function canNavigate(url, obj) {
        if (url === logout) {
            service.logout();
            obj.redirect = afterLogout;
        } else if (url !== login && !service.getStatus()) {
            obj.redirect = login;
        }
    }
    app.setService("user", service);
    app.attachEvent("app:guard", function (url, _$root, obj) {
        if (typeof user === "undefined") {
            obj.confirm = service.getStatus(true).then(function (some) {
                return canNavigate(url, obj);
            });
        }
        return canNavigate(url, obj);
    });
    if (ping) {
        setInterval(function () {
            return service.getStatus(true);
        }, ping);
    }
}

/***/ }),

/***/ "./node_modules/webix-jet/dist/routers/EmptyRouter.js":
/*!************************************************************!*\
  !*** ./node_modules/webix-jet/dist/routers/EmptyRouter.js ***!
  \************************************************************/
/*! exports provided: EmptyRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyRouter", function() { return EmptyRouter; });
var EmptyRouter = function () {
    function EmptyRouter(cb, _$config) {
        this.path = "";
        this.cb = cb;
    }
    EmptyRouter.prototype.set = function (path, config) {
        var _this = this;
        this.path = path;
        if (!config || !config.silent) {
            setTimeout(function () {
                return _this.cb(path);
            }, 1);
        }
    };
    EmptyRouter.prototype.get = function () {
        return this.path;
    };
    return EmptyRouter;
}();


/***/ }),

/***/ "./node_modules/webix-jet/dist/routers/HashRouter.js":
/*!***********************************************************!*\
  !*** ./node_modules/webix-jet/dist/routers/HashRouter.js ***!
  \***********************************************************/
/*! exports provided: HashRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return HashRouter; });
/* harmony import */ var webix_routie_lib_routie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-routie/lib/routie */ "./node_modules/webix-routie/lib/routie.js");
/* harmony import */ var webix_routie_lib_routie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webix_routie_lib_routie__WEBPACK_IMPORTED_MODULE_0__);

var HashRouter = function () {
    function HashRouter(cb, config) {
        var _this = this;
        this.config = config || {};
        this._prefix = this.config.routerPrefix;
        // use "#!" for backward compatibility
        if (typeof this._prefix === "undefined") {
            this._prefix = "!";
        }
        var rcb = function rcb(_$a) {};
        webix_routie_lib_routie__WEBPACK_IMPORTED_MODULE_0___default()(this._prefix + "*", function (url) {
            _this._lastUrl = "";
            return rcb(_this.get());
        });
        rcb = cb;
    }
    HashRouter.prototype.set = function (path, config) {
        if (this.config.routes) {
            var compare = path.split("?", 2);
            for (var key in this.config.routes) {
                if (this.config.routes[key] === compare[0]) {
                    path = key + (compare.length > 1 ? "?" + compare[1] : "");
                    break;
                }
            }
        }
        this._lastUrl = path;
        webix_routie_lib_routie__WEBPACK_IMPORTED_MODULE_0___default.a.navigate(this._prefix + path, config);
    };
    HashRouter.prototype.get = function () {
        var path = this._lastUrl || (window.location.hash || "").replace("#" + this._prefix, "");
        if (this.config.routes) {
            var compare = path.split("?", 2);
            var key = this.config.routes[compare[0]];
            if (key) {
                path = key + (compare.length > 1 ? "?" + compare[1] : "");
            }
        }
        return path;
    };
    return HashRouter;
}();


/***/ }),

/***/ "./node_modules/webix-jet/dist/routers/StoreRouter.js":
/*!************************************************************!*\
  !*** ./node_modules/webix-jet/dist/routers/StoreRouter.js ***!
  \************************************************************/
/*! exports provided: StoreRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreRouter", function() { return StoreRouter; });
var StoreRouter = function () {
    function StoreRouter(cb, config) {
        this.name = config.storeName || config.id + ":route";
        this.cb = cb;
    }
    StoreRouter.prototype.set = function (path, config) {
        var _this = this;
        webix.storage.session.put(this.name, path);
        if (!config || !config.silent) {
            setTimeout(function () {
                return _this.cb(path);
            }, 1);
        }
    };
    StoreRouter.prototype.get = function () {
        return webix.storage.session.get(this.name);
    };
    return StoreRouter;
}();


/***/ }),

/***/ "./node_modules/webix-jet/dist/routers/UrlRouter.js":
/*!**********************************************************!*\
  !*** ./node_modules/webix-jet/dist/routers/UrlRouter.js ***!
  \**********************************************************/
/*! exports provided: UrlRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlRouter", function() { return UrlRouter; });
var UrlRouter = function () {
    function UrlRouter(cb, config) {
        var _this = this;
        this.cb = cb;
        window.onpopstate = function () {
            return _this.cb(_this.get());
        };
        this.prefix = config.routerPrefix || "";
    }
    UrlRouter.prototype.set = function (path, config) {
        var _this = this;
        if (this.get() != path) {
            window.history.pushState(null, null, this.prefix + path);
        }
        if (!config || !config.silent) {
            setTimeout(function () {
                return _this.cb(path);
            }, 1);
        }
    };
    UrlRouter.prototype.get = function () {
        var path = window.location.pathname.replace(this.prefix, "");
        return path !== "/" ? path : "";
    };
    return UrlRouter;
}();


/***/ }),

/***/ "./node_modules/webix-routie/lib/routie.js":
/*!*************************************************!*\
  !*** ./node_modules/webix-routie/lib/routie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * webix-routie - router for Webix-Jet
 * v0.4.0
 * MIT License
 *
 * based on routie - a tiny hash router
 * http://projects.jga.me/routie
 * copyright Greg Allen 2016
 * MIT License
*/

var Routie = function Routie(w, isModule) {

  var routes = [];
  var map = {};
  var reference = 'routie';
  var oldReference = w[reference];
  var oldUrl;

  var Route = function Route(path, name) {
    this.name = name;
    this.path = path;
    this.keys = [];
    this.fns = [];
    this.params = {};
    this.regex = pathToRegexp(this.path, this.keys, false, false);
  };

  Route.prototype.addHandler = function (fn) {
    this.fns.push(fn);
  };

  Route.prototype.removeHandler = function (fn) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      var f = this.fns[i];
      if (fn == f) {
        this.fns.splice(i, 1);
        return;
      }
    }
  };

  Route.prototype.run = function (params) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      if (this.fns[i].apply(this, params) === false) return false;
    }
    return true;
  };

  Route.prototype.match = function (path, params) {
    var m = this.regex.exec(path);

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = this.keys[i - 1];

      var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];

      if (key) {
        this.params[key.name] = val;
      }
      params.push(val);
    }

    return true;
  };

  Route.prototype.toURL = function (params) {
    var path = this.path;
    for (var param in params) {
      path = path.replace('/:' + param, '/' + params[param]);
    }
    path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
    if (path.indexOf(':') != -1) {
      throw new Error('missing parameters for url: ' + path);
    }
    return path;
  };

  var pathToRegexp = function pathToRegexp(path, keys, sensitive, strict) {
    if (path instanceof RegExp) return path;
    if (path instanceof Array) path = '(' + path.join('|') + ')';
    path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
      keys.push({ name: key, optional: !!optional });
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || format && '([^/.]+?)' || '([^/]+?)') + ')' + (optional || '');
    }).replace(/([/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
  };

  var addHandler = function addHandler(path, fn) {
    var s = path.split(' ');
    var name = s.length == 2 ? s[0] : null;
    path = s.length == 2 ? s[1] : s[0];

    if (!map[path]) {
      map[path] = new Route(path, name);
      routes.push(map[path]);
    }
    map[path].addHandler(fn);
  };

  var routie = function routie(path, fn) {
    if (typeof fn == 'function') {
      addHandler(path, fn);
      routie.reload();
    } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) == 'object') {
      for (var p in path) {
        addHandler(p, path[p]);
      }
      routie.reload();
    } else if (typeof fn === 'undefined') {
      routie.navigate(path);
    }
  };

  routie.lookup = function (name, obj) {
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (route.name == name) {
        return route.toURL(obj);
      }
    }
  };

  routie.remove = function (path, fn) {
    var route = map[path];
    if (!route) return;
    route.removeHandler(fn);
  };

  routie.removeAll = function () {
    map = {};
    routes = [];
    oldUrl = '';
  };

  routie.navigate = function (path, options) {
    options = options || {};
    var silent = options.silent || false;

    if (silent) {
      removeListener();
    }
    setTimeout(function () {
      window.location.hash = path;

      if (silent) {
        setTimeout(function () {
          addListener();
        }, 1);
      }
    }, 1);
  };

  routie.noConflict = function () {
    w[reference] = oldReference;
    return routie;
  };

  var getHash = function getHash() {
    return window.location.hash.substring(1);
  };

  var checkRoute = function checkRoute(hash, route) {
    var params = [];
    if (route.match(hash, params)) {
      return route.run(params) !== false ? 1 : 0;
    }
    return -1;
  };

  var hashChanged = routie.reload = function () {
    var hash = getHash();
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      var state = checkRoute(hash, route);
      if (state === 1) {
        //route processed
        oldUrl = hash;
        break;
      } else if (state === 0) {
        //route rejected
        routie.navigate(oldUrl, { silent: true });
        break;
      }
    }
  };

  var addListener = function addListener() {
    if (w.addEventListener) {
      w.addEventListener('hashchange', hashChanged, false);
    } else {
      w.attachEvent('onhashchange', hashChanged);
    }
  };

  var removeListener = function removeListener() {
    if (w.removeEventListener) {
      w.removeEventListener('hashchange', hashChanged);
    } else {
      w.detachEvent('onhashchange', hashChanged);
    }
  };
  addListener();
  oldUrl = getHash();

  if (isModule) {
    return routie;
  } else {
    w[reference] = routie;
  }
};

if (false) {} else {
  module.exports = Routie(window, true);
  module.exports.default = module.exports;
}

/***/ }),

/***/ "./sources/admin.js":
/*!**************************!*\
  !*** ./sources/admin.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_theme_siberia_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/theme.siberia.less */ "./sources/assets/theme.siberia.less");
/* harmony import */ var _assets_theme_siberia_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_theme_siberia_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/session */ "./sources/models/session.js");





webix.i18n.setLocale("ru-RU");
webix.Date.startOnMonday = true;

webix.ready(function () {
	if (!webix.env.touch && webix.ui.scrollSize && webix.CustomScroll) webix.CustomScroll.init();

	var app = new webix_jet__WEBPACK_IMPORTED_MODULE_1__["JetApp"]({
		id: "wtools-admin",
		name: "Wtools",
		version: "1.0",
		start: "/app/dashboard",
		debug: true
	});

	//error handlers
	app.attachEvent("app:error:resolve", function (name, err) {
		var _this = this;

		window.console.error(err);
		webix.delay(function () {
			return _this.show("/app/dashboard");
		});
	});
	app.attachEvent("app:error:initview", function (view, error) {
		window.console.error(error);
	});
	app.attachEvent("app:error:server", function (error) {
		webix.alert({
			width: 450,
			title: "Data saving error",
			text: "Please try to repeat the action <br> if error still occurs, please try to reload the page."
		});
	});

	// login
	app.attachEvent("app:user:logout", function () {
		app.show("/app/login"); //load "views/login.js"
	});
	app.use(webix_jet__WEBPACK_IMPORTED_MODULE_1__["plugins"].User, { model: models_session__WEBPACK_IMPORTED_MODULE_2__["default"], ping: 25 * 60 * 1000 });

	app.render();
});

//track js errors
if (false) {}

/***/ }),

/***/ "./sources/assets/theme.siberia.less":
/*!*******************************************!*\
  !*** ./sources/assets/theme.siberia.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./sources/locales sync recursive ^\\.\\/.*$":
/*!***************************************!*\
  !*** ./sources/locales sync ^\.\/.*$ ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ru": "./sources/locales/ru.js",
	"./ru.js": "./sources/locales/ru.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sources/locales sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./sources/locales/ru.js":
/*!*******************************!*\
  !*** ./sources/locales/ru.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

webix.i18n.locales["ru-RU"] = {
	groupDelimiter: " ",
	groupSize: 3,
	decimalDelimiter: ",",
	decimalSize: 2,

	dateFormat: "%d.%m.%Y",
	timeFormat: "%H:%i",
	longDateFormat: "%d %F %Y",
	fullDateFormat: "%d.%m.%Y %H:%i",

	price: "{obj} руб.",
	priceSettings: null, //use number defaults

	calendar: {
		monthFull: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"],
		monthShort: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"],
		dayFull: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		dayShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		hours: "Часы",
		minutes: "Минуты",
		done: "Гoтовo",
		clear: "Очистить",
		today: "Сегодня"
	},

	dataExport: {
		page: "Страница",
		of: "из"
	},
	PDFviewer: {
		of: "из",
		automaticZoom: "Автоматический зум",
		actualSize: "Настоящий размер",
		pageFit: "Размер страницы",
		pageWidth: "Ширина страницы",
		pageHeight: "Высота страницы"
	},
	aria: {
		calendar: "Календарь",
		increaseValue: "Увеличить значение",
		decreaseValue: "Уменьшить значение",
		navMonth: ["Предыдущий месяц", "Следующий месяц"],
		navYear: ["Предыдущий год", "Следующий год"],
		navDecade: ["Предыдущие десять лет", "Следующие десять лет"],
		dateFormat: "%d %F %Y",
		monthFormat: "%F %Y",
		yearFormat: "%Y",
		hourFormat: "Часы: %H",
		minuteFormat: "Минуты: %i",
		removeItem: "Удалить элемент",
		pages: ["Первая страница", "Предыдущая страница", "Следующая страница", "Последняя страница"],
		page: "Страница",
		headermenu: "Меню шапки таблицы",
		openGroup: "Развернуть группу столбцов",
		closeGroup: "Свернуть группу столбцов",
		closeTab: "Закрыть вкладку",
		showTabs: "Показать больше вкладок",
		resetTreeMap: "Вернуться к первоначальному представлению",
		navTreeMap: "Перейти на уровень выше",
		nextTab: "Следующая вкладка",
		prevTab: "Предыдущая вкладка",
		multitextSection: "Добавить элемент",
		multitextextraSection: "Удалить элемент",
		showChart: "Показать чарт",
		hideChart: "Спрятать чарт",
		resizeChart: "Изменить размер чарта"
	},
	richtext: {
		underline: "Подчеркивание",
		bold: "Жирный",
		italic: "Курсив"
	},
	combo: {
		select: "Выбрать",
		selectAll: "Выбрать все",
		unselectAll: "Сброс выбора"
	}
};

/***/ }),

/***/ "./sources/models/column_left.js":
/*!***************************************!*\
  !*** ./sources/models/column_left.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return menudata; });
function menudata(token) {
    return webix.ajax("index.php?route=common/column_left&token=" + token);
}

/***/ }),

/***/ "./sources/models/data_arrays.js":
/*!***************************************!*\
  !*** ./sources/models/data_arrays.js ***!
  \***************************************/
/*! exports provided: rating, treetable, colspans, progress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rating", function() { return rating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "treetable", function() { return treetable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colspans", function() { return colspans; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progress", function() { return progress; });
var rating = [{ "id": 1, "code": "NWTB-1", "name": "Webix Chai", rating: 5, rank: 1 }, { "id": 2, "code": "NWTCO-3", "name": "Webix Syrup", rating: 1, rank: 2 }, { "id": 3, "code": "NWTCO-4", "name": "Webix Cajun Seasoning", rating: 2, rank: 3 }, { "id": 4, "code": "NWTO-5", "name": "Webix Olive Oil", rating: 3, rank: 4 }, { "id": 5, "code": "NWTJP-6", "name": "Webix Boysenberry Spread", rating: 1, rank: 5 }];

var treetable = [{
	id: 1, name: "USA", open: 1, data: [{ "id": 11, "code": "NWTB-1", "name": "Webix Chai", sales: 200000 }, { "id": 12, "code": "NWTCO-3", "name": "Webix Syrup", sales: 180000 }, { "id": 13, "code": "NWTCO-4", "name": "Webix Cajun Seasoning", sales: 150000 }]
}, {
	id: 2, name: "Europe", data: [{ "id": 21, "code": "NWTB-1", "name": "Webix Chai", sales: 230000 }, { "id": 22, "code": "NWTCO-3", "name": "Webix Syrup", sales: 210000 }, { "id": 23, "code": "NWTO-5", "name": "Webix Olive Oil", sales: 180000 }]
}, {
	id: 3, name: "Asia", open: 1, data: [{ "id": 31, "code": "NWTCO-4", "name": "Webix Cajun Seasoning", sales: 310000 }, { "id": 32, "code": "NWTO-5", "name": "Webix Olive Oil", sales: 250000 }, { "id": 33, "code": "NWTJP-6", "name": "Webix Boysenberry Spread", sales: 210000 }]
}];

var colspans = {
	data: [{ "id": 11, "code": "NWTB-1", "name": "Webix Chai", sales: 200000, region: "USA" }, { "id": 12, "code": "NWTCO-3", "name": "Webix Syrup", sales: 180000, region: "USA" }, { "id": 13, "code": "NWTCO-4", "name": "Webix Cajun Seasoning", sales: 150000, region: "USA" }, { id: "sub1", $css: "highlight_row", region: "Top Sales", sales: 200000 }, { "id": 21, "code": "NWTB-1", "name": "Webix Chai", sales: 230000, region: "Europe" }, { "id": 22, "code": "NWTO-5", "name": "Webix Olive Oil", sales: 180000, region: "Europe" }, { id: "sub2", $css: "highlight_row", region: "Top Sales", sales: 230000 }],
	spans: [[11, "region", 1, 3], [21, "region", 1, 3], ["sub1", "region", 3, 1, null, "highlight_row"], ["sub2", "region", 3, 1, "", "highlight_row"]]
};

var progress = [{ id: "1", name: "Prepare finance report", progress: 0.55, type: "inner" }, { id: "2", name: "Solex project strategy  meeting", progress: 0.20 }, { id: "3", name: "WestEurope partners call", progress: 0.7 }, { id: "4", name: "Market research analysis", progress: 0.3, type: "inner" }, { id: "5", name: "Prepare presentation", progress: 0.6, type: "company" }];

/***/ }),

/***/ "./sources/models/events.js":
/*!**********************************!*\
  !*** ./sources/models/events.js ***!
  \**********************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
var weekStart = webix.Date.weekStart(new Date());
var monthStart = webix.Date.monthStart(new Date());
var day = webix.Date.dayStart(new Date());
var day2 = webix.Date.add(webix.Date.copy(day), 1, "month", true);

var monthStart2 = webix.Date.add(webix.Date.copy(monthStart), 1, "month", true);
var weekStart2 = webix.Date.add(webix.Date.copy(weekStart), 1, "month", true);
var weekStart1 = webix.Date.add(webix.Date.copy(weekStart), -1, "month", true);

var data = [{
	id: 1,
	start_date: webix.Date.copy(weekStart),
	end_date: webix.Date.add(webix.Date.copy(weekStart), 3, "day", true),
	text: "Conference",
	calendar: "company"
}, {
	id: 2,
	start_date: webix.Date.copy(monthStart),
	end_date: webix.Date.add(webix.Date.copy(monthStart), 2, "day", true),
	text: "Partners meeting",
	calendar: "company"
}, {
	id: 3,
	start_date: webix.Date.add(webix.Date.copy(monthStart), 15, "day", true),
	end_date: webix.Date.add(webix.Date.copy(monthStart), 17, "day", true),
	text: "Webix project",
	calendar: "company"
}, {
	id: 4,
	start_date: webix.Date.add(webix.Date.copy(monthStart), 18, "day", true),
	end_date: webix.Date.add(webix.Date.copy(monthStart), 22, "day", true),
	text: "Conference"
}, {
	id: 5,
	start_date: webix.Date.add(day, 9, "hour", true),
	end_date: webix.Date.add(day, 11, "hour", true),
	text: "Meeting",
	calendar: "company"
}, {
	id: 6,
	start_date: webix.Date.add(weekStart, 18, "hour", true),
	end_date: webix.Date.add(weekStart, 23, "hour", true),
	text: "Birthday party"
}, {
	id: 7,
	start_date: webix.Date.add(webix.Date.copy(monthStart), -2, "day", true),
	end_date: webix.Date.add(webix.Date.copy(monthStart), 3, "day", true),
	text: "Football championship"
}, {
	id: 8,
	start_date: webix.Date.add(weekStart1, 19, "hour", true),
	end_date: webix.Date.add(weekStart1, 23, "hour", true),
	text: "Birthday party"
}, {
	id: 9,
	start_date: webix.Date.add(day2, 9, "hour", true),
	end_date: webix.Date.add(day2, 11, "hour", true),
	text: "Meeting",
	calendar: "company"
}, {
	id: 10,
	start_date: webix.Date.add(weekStart2, 20, "hour", true),
	end_date: webix.Date.add(weekStart2, 23, "hour", true),
	text: "Birthday party"
}, {
	id: 11,
	start_date: webix.Date.add(webix.Date.copy(monthStart2), 24, "day", true),
	end_date: webix.Date.add(webix.Date.copy(monthStart2), 28, "day", true),
	text: "Conference",
	calendar: "company"
}, {
	id: 12,
	start_date: webix.Date.add(webix.Date.copy(monthStart), 26, "day", true),
	end_date: webix.Date.add(webix.Date.copy(monthStart), 28, "day", true),
	text: "Football championship"
}];

/***/ }),

/***/ "./sources/models/files.js":
/*!*********************************!*\
  !*** ./sources/models/files.js ***!
  \*********************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
var data = [{ "value": "Files", "type": "folder", "size": 0, "date": 0, "id": "/", "open": true, "data": [{ "id": "01_basic", "value": "01_basic", "type": "folder", "size": 0, "date": 1505297352, "data": [{ "id": "01_basic/01_init.html", "value": "01_init.html", "type": "code", "size": 5697, "date": 1505297352 }, { "id": "01_basic/02_real_fs.html", "value": "02_real_fs.html", "type": "code", "size": 927, "date": 1505297352 }, { "id": "01_basic/03_uploading.html", "value": "03_uploading.html", "type": "code", "size": 1322, "date": 1505297352 }, { "id": "01_basic/04_operations.html", "value": "04_operations.html", "type": "code", "size": 1227, "date": 1505297352 }, { "id": "01_basic/05_readonly.html", "value": "05_readonly.html", "type": "code", "size": 927, "date": 1505297352 }, { "id": "01_basic/index.html", "value": "index.html", "type": "code", "size": 2139, "date": 1505297352 }]
	}, { "id": "02_events", "value": "02_events", "type": "folder", "size": 0, "date": 1505297352, "data": [{ "id": "02_events/01_selection.html", "value": "01_selection.html", "type": "code", "size": 1082, "date": 1505297352 }, { "id": "02_events/02_download.html", "value": "02_download.html", "type": "code", "size": 1280, "date": 1505297352 }, { "id": "02_events/03_drag.html", "value": "03_drag.html", "type": "code", "size": 1546, "date": 1505297352 }, { "id": "02_events/04_rename.html", "value": "04_rename.html", "type": "code", "size": 1366, "date": 1505297352 }, { "id": "02_events/05_copy.html", "value": "05_copy.html", "type": "code", "size": 1493, "date": 1505297352 }, { "id": "02_events/06_error.html", "value": "06_error.html", "type": "code", "size": 1566, "date": 1505297352 }, { "id": "02_events/index.html", "value": "index.html", "type": "code", "size": 2335, "date": 1505297352 }]
	}, { "id": "03_customization", "value": "03_customization", "type": "folder", "size": 0, "date": 1505297352, "data": [{ "id": "03_customization/01_views_configuration.html", "value": "01_views_configuration.html", "type": "code", "size": 1494, "date": 1505297352 }, { "id": "03_customization/02_new_column.html", "value": "02_new_column.html", "type": "code", "size": 1794, "date": 1505297352 }, { "id": "03_customization/03_adding_mode.html", "value": "03_adding_mode.html", "type": "code", "size": 1965, "date": 1505297352 }, { "id": "03_customization/04_hiding_buttons.html", "value": "04_hiding_buttons.html", "type": "code", "size": 1347, "date": 1505297352 }, { "id": "03_customization/05_preview.html", "value": "05_preview.html", "type": "code", "size": 1755, "date": 1505297352 }, { "id": "03_customization/06_icons_template.html", "value": "06_icons_template.html", "type": "code", "size": 1185, "date": 1505297352 }, { "id": "03_customization/07_localization.html", "value": "07_localization.html", "type": "code", "size": 2892, "date": 1505297352 }, { "id": "03_customization/08_styling.html", "value": "08_styling.html", "type": "code", "size": 1005, "date": 1505297352 }, { "id": "03_customization/09_menu_options.html", "value": "09_menu_options.html", "type": "code", "size": 1553, "date": 1505297352 }, { "id": "03_customization/index.html", "value": "index.html", "type": "code", "size": 2992, "date": 1505297352 }]
	}, { "id": "04_loading", "value": "04_loading", "type": "folder", "size": 0, "date": 1505297352, "data": [{ "id": "04_loading/01_dynamic_loading.html", "value": "01_dynamic_loading.html", "type": "code", "size": 1378, "date": 1505297352 }, { "id": "04_loading/02_files_dyn_loading.html", "value": "02_files_dyn_loading.html", "type": "code", "size": 1346, "date": 1505297352 }, { "id": "04_loading/03_dynamic_loading_nocache.html", "value": "03_dynamic_loading_nocache.html", "type": "code", "size": 1411, "date": 1505297352 }, { "id": "04_loading/index.html", "value": "index.html", "type": "code", "size": 1840, "date": 1505297352 }]
	}, { "id": "common", "value": "common", "type": "folder", "size": 0, "date": 1505297352, "data": [{ "id": "common/CommandFileSystem.php", "value": "CommandFileSystem.php", "type": "code", "size": 13207, "date": 1505297352 }, { "id": "common/FileSystem.php", "value": "FileSystem.php", "type": "code", "size": 1329, "date": 1505297352 }, { "id": "common/PHPFileSystem.php", "value": "PHPFileSystem.php", "type": "code", "size": 2256, "date": 1505297352 }, { "id": "common/config.php", "value": "config.php", "type": "code", "size": 96, "date": 1505297352 }, { "id": "common/data.php", "value": "data.php", "type": "code", "size": 1933, "date": 1505297352 }, { "id": "common/data_branch.php", "value": "data_branch.php", "type": "code", "size": 2318, "date": 1505297352 }, { "id": "common/data_dyn.php", "value": "data_dyn.php", "type": "code", "size": 2256, "date": 1505297352 }, { "id": "common/docs.css", "value": "docs.css", "type": "code", "size": 7668, "date": 1505297352 }, { "id": "common/style.css", "value": "style.css", "type": "code", "size": 746, "date": 1505297352 }]
	}, { "id": "index.html", "value": "index.html", "type": "code", "size": 1907, "date": 1505297352 }]
}];

/***/ }),

/***/ "./sources/models/orders.js":
/*!**********************************!*\
  !*** ./sources/models/orders.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return chartdata; });
function chartdata(token) {
    return webix.ajax("index.php?route=order/order/getDataForChart&token=" + token);
}

/***/ }),

/***/ "./sources/models/products.js":
/*!************************************!*\
  !*** ./sources/models/products.js ***!
  \************************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
var data = new webix.DataCollection({
    url: "index.php?route=catalog/product/getList&token=" + token
});

/***/ }),

/***/ "./sources/models/session.js":
/*!***********************************!*\
  !*** ./sources/models/session.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function status() {
	return webix.ajax().post("index.php?route=common/login&status&token=" + token).then(function (a) {
		return a.json();
	});
}

function login(username, password) {
	return webix.ajax().post("index.php?route=common/login&login&token=" + token, { username: username, password: password }).then(function (a) {
		return a.json();
	});
}

function logout() {
	return webix.ajax().post("index.php?route=common/login&logout&token=" + token);
	//.then(a => a.json());
}

/* harmony default export */ __webpack_exports__["default"] = ({
	status: status, login: login, logout: logout
});

/***/ }),

/***/ "./sources/models/topsales.js":
/*!************************************!*\
  !*** ./sources/models/topsales.js ***!
  \************************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
var data = [{ productId: 1, value: 15000, selection: "month", name: "Chai" }, { productId: 1, value: 35000, selection: "month3", name: "Chocolate" }, { productId: 1, value: 130000, selection: "year", name: "Chai" }, { productId: 2, value: 20000, selection: "month", name: "Olive Oil" }, { productId: 2, value: 50000, selection: "month3", name: "Olive Oil" }, { productId: 2, value: 140000, selection: "year", name: "Olive Oil" }, { productId: 3, value: 17000, selection: "month", name: "Coffee" }, { productId: 3, value: 40000, selection: "month3", name: "Coffee" }, { productId: 3, value: 120000, selection: "year", name: "Coffee" }, { productId: 4, value: 9000, selection: "month", name: "Syrup" }, { productId: 4, value: 45000, selection: "month3", name: "Marmalade" }, { productId: 4, value: 100500, selection: "year", name: "Syrup" }];

/***/ }),

/***/ "./sources/models/totalchart.js":
/*!**************************************!*\
  !*** ./sources/models/totalchart.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return chartdata; });
function chartdata(token) {
    return webix.ajax("index.php?route=report/total/getDataForTotalChart&token=" + token);
}

/***/ }),

/***/ "./sources/models/visitors.js":
/*!************************************!*\
  !*** ./sources/models/visitors.js ***!
  \************************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
var data = [{ "id": 1, "month": "Jun", "newv": 300, "rec": 600 }, { "id": 2, "month": "Jul", "newv": 100, "rec": 400 }, { "id": 3, "month": "Aug", "newv": 400, "rec": 700 }, { "id": 4, "month": "Sep", "newv": 600, "rec": 900 }, { "id": 5, "month": "Oct", "newv": 400, "rec": 400 }];

/***/ }),

/***/ "./sources/views sync recursive ^\\.\\/.*$":
/*!*************************************!*\
  !*** ./sources/views sync ^\.\/.*$ ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app": "./sources/views/app.js",
	"./app.js": "./sources/views/app.js",
	"./calendar": "./sources/views/calendar.js",
	"./calendar.js": "./sources/views/calendar.js",
	"./charts": "./sources/views/charts.js",
	"./charts.js": "./sources/views/charts.js",
	"./dashboard": "./sources/views/dashboard.js",
	"./dashboard.js": "./sources/views/dashboard.js",
	"./datatables": "./sources/views/datatables.js",
	"./datatables.js": "./sources/views/datatables.js",
	"./discounts": "./sources/views/discounts.js",
	"./discounts.js": "./sources/views/discounts.js",
	"./files": "./sources/views/files.js",
	"./files.js": "./sources/views/files.js",
	"./forms": "./sources/views/forms.js",
	"./forms.js": "./sources/views/forms.js",
	"./forms/loginform": "./sources/views/forms/loginform.js",
	"./forms/loginform.js": "./sources/views/forms/loginform.js",
	"./forms/order": "./sources/views/forms/order.js",
	"./forms/order.js": "./sources/views/forms/order.js",
	"./forms/user_group": "./sources/views/forms/user_group.js",
	"./forms/user_group.js": "./sources/views/forms/user_group.js",
	"./forms/user_group_win": "./sources/views/forms/user_group_win.js",
	"./forms/user_group_win.js": "./sources/views/forms/user_group_win.js",
	"./gsms": "./sources/views/gsms.js",
	"./gsms.js": "./sources/views/gsms.js",
	"./history": "./sources/views/history.js",
	"./history.js": "./sources/views/history.js",
	"./items": "./sources/views/items.js",
	"./items.js": "./sources/views/items.js",
	"./login": "./sources/views/login.js",
	"./login.js": "./sources/views/login.js",
	"./login2": "./sources/views/login2.js",
	"./login2.js": "./sources/views/login2.js",
	"./menus/contextmenu": "./sources/views/menus/contextmenu.js",
	"./menus/contextmenu.js": "./sources/views/menus/contextmenu.js",
	"./menus/datebar": "./sources/views/menus/datebar.js",
	"./menus/datebar.js": "./sources/views/menus/datebar.js",
	"./menus/export": "./sources/views/menus/export.js",
	"./menus/export.js": "./sources/views/menus/export.js",
	"./menus/formview": "./sources/views/menus/formview.js",
	"./menus/formview.js": "./sources/views/menus/formview.js",
	"./menus/mail": "./sources/views/menus/mail.js",
	"./menus/mail.js": "./sources/views/menus/mail.js",
	"./menus/message": "./sources/views/menus/message.js",
	"./menus/message.js": "./sources/views/menus/message.js",
	"./menus/profile": "./sources/views/menus/profile.js",
	"./menus/profile.js": "./sources/views/menus/profile.js",
	"./menus/search": "./sources/views/menus/search.js",
	"./menus/search.js": "./sources/views/menus/search.js",
	"./menus/sidebar": "./sources/views/menus/sidebar.js",
	"./menus/sidebar.js": "./sources/views/menus/sidebar.js",
	"./menus/toolbar": "./sources/views/menus/toolbar.js",
	"./menus/toolbar.js": "./sources/views/menus/toolbar.js",
	"./menus/toolplug": "./sources/views/menus/toolplug.js",
	"./menus/toolplug.js": "./sources/views/menus/toolplug.js",
	"./modules/bestsellers": "./sources/views/modules/bestsellers.js",
	"./modules/bestsellers.js": "./sources/views/modules/bestsellers.js",
	"./modules/chart_diff": "./sources/views/modules/chart_diff.js",
	"./modules/chart_diff.js": "./sources/views/modules/chart_diff.js",
	"./modules/dashline": "./sources/views/modules/dashline.js",
	"./modules/dashline.js": "./sources/views/modules/dashline.js",
	"./modules/data_pager": "./sources/views/modules/data_pager.js",
	"./modules/data_pager.js": "./sources/views/modules/data_pager.js",
	"./modules/data_progress": "./sources/views/modules/data_progress.js",
	"./modules/data_progress.js": "./sources/views/modules/data_progress.js",
	"./modules/data_rating": "./sources/views/modules/data_rating.js",
	"./modules/data_rating.js": "./sources/views/modules/data_rating.js",
	"./modules/data_spans": "./sources/views/modules/data_spans.js",
	"./modules/data_spans.js": "./sources/views/modules/data_spans.js",
	"./modules/data_treetable": "./sources/views/modules/data_treetable.js",
	"./modules/data_treetable.js": "./sources/views/modules/data_treetable.js",
	"./modules/diffchart": "./sources/views/modules/diffchart.js",
	"./modules/diffchart.js": "./sources/views/modules/diffchart.js",
	"./modules/editor": "./sources/views/modules/editor.js",
	"./modules/editor.js": "./sources/views/modules/editor.js",
	"./modules/form_event": "./sources/views/modules/form_event.js",
	"./modules/form_event.js": "./sources/views/modules/form_event.js",
	"./modules/form_project": "./sources/views/modules/form_project.js",
	"./modules/form_project.js": "./sources/views/modules/form_project.js",
	"./modules/form_style": "./sources/views/modules/form_style.js",
	"./modules/form_style.js": "./sources/views/modules/form_style.js",
	"./modules/form_user": "./sources/views/modules/form_user.js",
	"./modules/form_user.js": "./sources/views/modules/form_user.js",
	"./modules/groupfilter": "./sources/views/modules/groupfilter.js",
	"./modules/groupfilter.js": "./sources/views/modules/groupfilter.js",
	"./modules/lastobjects": "./sources/views/modules/lastobjects.js",
	"./modules/lastobjects.js": "./sources/views/modules/lastobjects.js",
	"./modules/map": "./sources/views/modules/map.js",
	"./modules/map.js": "./sources/views/modules/map.js",
	"./modules/messages": "./sources/views/modules/messages.js",
	"./modules/messages.js": "./sources/views/modules/messages.js",
	"./modules/onlinefilter": "./sources/views/modules/onlinefilter.js",
	"./modules/onlinefilter.js": "./sources/views/modules/onlinefilter.js",
	"./modules/order_statesfilter": "./sources/views/modules/order_statesfilter.js",
	"./modules/order_statesfilter.js": "./sources/views/modules/order_statesfilter.js",
	"./modules/orderschart": "./sources/views/modules/orderschart.js",
	"./modules/orderschart.js": "./sources/views/modules/orderschart.js",
	"./modules/paging": "./sources/views/modules/paging.js",
	"./modules/paging.js": "./sources/views/modules/paging.js",
	"./modules/product_meta": "./sources/views/modules/product_meta.js",
	"./modules/product_meta.js": "./sources/views/modules/product_meta.js",
	"./modules/product_search": "./sources/views/modules/product_search.js",
	"./modules/product_search.js": "./sources/views/modules/product_search.js",
	"./modules/product_upload": "./sources/views/modules/product_upload.js",
	"./modules/product_upload.js": "./sources/views/modules/product_upload.js",
	"./modules/revenue": "./sources/views/modules/revenue.js",
	"./modules/revenue.js": "./sources/views/modules/revenue.js",
	"./modules/scheduler": "./sources/views/modules/scheduler.js",
	"./modules/scheduler.js": "./sources/views/modules/scheduler.js",
	"./modules/statusfilter": "./sources/views/modules/statusfilter.js",
	"./modules/statusfilter.js": "./sources/views/modules/statusfilter.js",
	"./modules/tasks": "./sources/views/modules/tasks.js",
	"./modules/tasks.js": "./sources/views/modules/tasks.js",
	"./modules/taskschart": "./sources/views/modules/taskschart.js",
	"./modules/taskschart.js": "./sources/views/modules/taskschart.js",
	"./modules/topsales": "./sources/views/modules/topsales.js",
	"./modules/topsales.js": "./sources/views/modules/topsales.js",
	"./modules/totalchart": "./sources/views/modules/totalchart.js",
	"./modules/totalchart.js": "./sources/views/modules/totalchart.js",
	"./modules/visitors": "./sources/views/modules/visitors.js",
	"./modules/visitors.js": "./sources/views/modules/visitors.js",
	"./orders": "./sources/views/orders.js",
	"./orders.js": "./sources/views/orders.js",
	"./owners": "./sources/views/owners.js",
	"./owners.js": "./sources/views/owners.js",
	"./product_edit": "./sources/views/product_edit.js",
	"./product_edit.js": "./sources/views/product_edit.js",
	"./products": "./sources/views/products.js",
	"./products.js": "./sources/views/products.js",
	"./report_billing": "./sources/views/report_billing.js",
	"./report_billing.js": "./sources/views/report_billing.js",
	"./report_objects": "./sources/views/report_objects.js",
	"./report_objects.js": "./sources/views/report_objects.js",
	"./report_stat": "./sources/views/report_stat.js",
	"./report_stat.js": "./sources/views/report_stat.js",
	"./report_suspicious": "./sources/views/report_suspicious.js",
	"./report_suspicious.js": "./sources/views/report_suspicious.js",
	"./servers": "./sources/views/servers.js",
	"./servers.js": "./sources/views/servers.js",
	"./settings": "./sources/views/settings.js",
	"./settings.js": "./sources/views/settings.js",
	"./tarifs": "./sources/views/tarifs.js",
	"./tarifs.js": "./sources/views/tarifs.js",
	"./templates/deleted": "./sources/views/templates/deleted.js",
	"./templates/deleted.js": "./sources/views/templates/deleted.js",
	"./templates/eye": "./sources/views/templates/eye.js",
	"./templates/eye.js": "./sources/views/templates/eye.js",
	"./templates/online": "./sources/views/templates/online.js",
	"./templates/online.js": "./sources/views/templates/online.js",
	"./templates/order_states": "./sources/views/templates/order_states.js",
	"./templates/order_states.js": "./sources/views/templates/order_states.js",
	"./templates/status": "./sources/views/templates/status.js",
	"./templates/status.js": "./sources/views/templates/status.js",
	"./test": "./sources/views/test.js",
	"./test.js": "./sources/views/test.js",
	"./trackers": "./sources/views/trackers.js",
	"./trackers.js": "./sources/views/trackers.js",
	"./user_api": "./sources/views/user_api.js",
	"./user_api.js": "./sources/views/user_api.js",
	"./user_groups": "./sources/views/user_groups.js",
	"./user_groups.js": "./sources/views/user_groups.js",
	"./users": "./sources/views/users.js",
	"./users.js": "./sources/views/users.js",
	"./vehicles": "./sources/views/vehicles.js",
	"./vehicles.js": "./sources/views/vehicles.js",
	"./webix/ckeditor": "./sources/views/webix/ckeditor.js",
	"./webix/ckeditor.js": "./sources/views/webix/ckeditor.js",
	"./webix/icon": "./sources/views/webix/icon.js",
	"./webix/icon.js": "./sources/views/webix/icon.js",
	"./webix/menutree": "./sources/views/webix/menutree.js",
	"./webix/menutree.js": "./sources/views/webix/menutree.js",
	"./webix/scheduler": "./sources/views/webix/scheduler.js",
	"./webix/scheduler.js": "./sources/views/webix/scheduler.js",
	"./wialongroups": "./sources/views/wialongroups.js",
	"./wialongroups.js": "./sources/views/wialongroups.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sources/views sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./sources/views/app.js":
/*!******************************!*\
  !*** ./sources/views/app.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/search */ "./sources/views/menus/search.js");
/* harmony import */ var views_menus_mail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/mail */ "./sources/views/menus/mail.js");
/* harmony import */ var views_menus_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/message */ "./sources/views/menus/message.js");
/* harmony import */ var views_menus_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/menus/profile */ "./sources/views/menus/profile.js");
/* harmony import */ var views_menus_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/menus/sidebar */ "./sources/views/menus/sidebar.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








//import "views/webix/icon";
//import "views/webix/menutree";

var AppView = function (_JetView) {
	_inherits(AppView, _JetView);

	function AppView() {
		_classCallCheck(this, AppView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	AppView.prototype.config = function config() {
		return layout;
	};

	AppView.prototype.init = function init() {
		this.ui(views_menus_search__WEBPACK_IMPORTED_MODULE_1__["default"]);
		this.ui(views_menus_mail__WEBPACK_IMPORTED_MODULE_2__["default"]);
		this.ui(views_menus_message__WEBPACK_IMPORTED_MODULE_3__["default"]);
		this.ui(views_menus_profile__WEBPACK_IMPORTED_MODULE_4__["default"]);
		var userinfo = this.app.getService("user").getUser();
		//var userinfo = JSON.parse(this.app.getService("user").getUser());		
		this.$$("person_template").setValues({ id: userinfo.user_id, name: userinfo.username, thumb: userinfo.thumb });
		token = userinfo.token; //console.log(token);
	};

	return AppView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

//Top toolbar


/* harmony default export */ __webpack_exports__["default"] = (AppView);
var mainToolbar = {
	view: "toolbar",
	elements: [{ view: "label", label: "<a href='#!/app/dashboard'><img class='logo' src='" + logo + "' /></a>", width: 200, height: 46 }, { height: 46, id: "person_template", css: "header_person", borderless: true, width: 180, data: { id: userinfo.user_id, name: userinfo.username, thumb: userinfo.thumb },
		template: function template(obj) {
			var html = "<div style='height:100%;width:100%;' onclick='webix.$$(\"profilePopup\").show(this)'>";
			html += "<img class='photo' src='" + obj.thumb + "' /><span class='name'>" + obj.name + "</span>";
			html += "<span class='webix_icon mdi mdi-chevron-down'></span></div>";
			return html;
		}
	}, { height: 46, id: "support", css: "header_person", borderless: true, width: 45,
		template: function template(obj) {
			var html = "<div>";
			html += "<a href='http://curator.kz/support/index.pl' target='_blank'><img class='photo mini bordered' src='image/wtools/support.png' alt='Техподдержка curator.kz' title='Техподдержка curator.kz'/></a>";
			html += "</div>";
			return html;
		}
	}, { height: 46, id: "site1", css: "header_person", borderless: true, width: 45,
		template: function template(obj) {
			var html = "<div>";
			html += "<a href='http://curator.kz' target='_blank'><img class='photo mini bordered' src='image/wtools/logoc1.png' alt='Сайт curator.kz' title='Сайт curator.kz'/></a>";
			html += "</div>";
			return html;
		}
	}, { height: 46, id: "site2", css: "header_person", borderless: true, width: 45,
		template: function template(obj) {
			var html = "<div>";
			html += "<a href='http://gps1.curator.kz' target='_blank'><img class='photo mini bordered' src='image/wtools/wialon_local.png' alt='Новый сервер' title='Новый сервер'/></a>";
			html += "</div>";
			return html;
		}
	}, { height: 46, id: "site3", css: "header_person", borderless: true, width: 45,
		template: function template(obj) {
			var html = "<div>";
			html += "<a href='http://gps.curator.kz' target='_blank'><img class='photo mini bordered' src='image/wtools/wialon_pro.png' alt='Старый сервер' title='Старый сервер'/></a>";
			html += "</div>";
			return html;
		}
	}, {}, { view: "icon", icon: "wxi-search", width: 45, popup: "searchPopup" }, { view: "icon", icon: "mdi mdi-bell", badge: 3, width: 45, popup: "mailPopup" }, { view: "icon", icon: "mdi mdi-comment", badge: 5, width: 45, popup: "messagePopup" }]
};

var body = {
	rows: [{ height: 42, id: "title", css: "title", template: "<div class='header'>#title#</div><div class='details'>( #details# )</div>", data: { text: "", title: "" } }, {
		view: "scrollview", scroll: "native-y",
		body: { cols: [{ $subview: true }] }
	}]
};

var layout = {
	rows: [mainToolbar, {
		cols: [views_menus_sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], body]
	}]
};

/***/ }),

/***/ "./sources/views/calendar.js":
/*!***********************************!*\
  !*** ./sources/views/calendar.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var views_modules_scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/modules/scheduler */ "./sources/views/modules/scheduler.js");


// load external css
webix.require("//cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css");
// load external js
var ready = webix.require("//cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js").then(function () {
	// return UI after lib loading
	return {
		type: "space",
		cols: [views_modules_scheduler__WEBPACK_IMPORTED_MODULE_0__["default"]]
	};
});

/* harmony default export */ __webpack_exports__["default"] = (ready);

/***/ }),

/***/ "./sources/views/charts.js":
/*!*********************************!*\
  !*** ./sources/views/charts.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var views_modules_visitors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/modules/visitors */ "./sources/views/modules/visitors.js");
/* harmony import */ var views_modules_orderschart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/modules/orderschart */ "./sources/views/modules/orderschart.js");
/* harmony import */ var views_modules_chart_diff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/chart_diff */ "./sources/views/modules/chart_diff.js");
/* harmony import */ var views_modules_revenue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/revenue */ "./sources/views/modules/revenue.js");
/* harmony import */ var views_modules_taskschart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/taskschart */ "./sources/views/modules/taskschart.js");
/* harmony import */ var views_modules_diffchart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/diffchart */ "./sources/views/modules/diffchart.js");







var layout = {
	type: "clean",
	rows: [{
		type: "space",
		rows: [{
			type: "wide",
			minHeight: 250,
			cols: [{
				gravity: 4,
				type: "clean",
				rows: [{
					"template": "<span class='webix_icon fa-area-chart'></span>Different charts in one", "css": "sub_title", "height": 30
				}, views_modules_chart_diff__WEBPACK_IMPORTED_MODULE_2__["default"]]
			}, views_modules_diffchart__WEBPACK_IMPORTED_MODULE_5__["default"]]
		}, {

			type: "wide",
			cols: [{

				type: "clean",
				rows: [{
					"template": "<span class='webix_icon fa-line-chart'></span>Sales", "css": "sub_title", "height": 30
				}, views_modules_revenue__WEBPACK_IMPORTED_MODULE_3__["default"]]
			}, {
				"type": "clean",
				"rows": [{
					"template": "<span class='webix_icon fa-tasks'></span>Tasks", "css": "sub_title", "height": 30
				}, views_modules_taskschart__WEBPACK_IMPORTED_MODULE_4__["default"], { template: " " }]

			}]
		}, {
			height: 220,
			type: "wide",
			cols: [views_modules_orderschart__WEBPACK_IMPORTED_MODULE_1__["default"], views_modules_visitors__WEBPACK_IMPORTED_MODULE_0__["default"]]
		}]

	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/dashboard.js":
/*!************************************!*\
  !*** ./sources/views/dashboard.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_modules_dashline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/modules/dashline */ "./sources/views/modules/dashline.js");
/* harmony import */ var views_modules_totalchart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/totalchart */ "./sources/views/modules/totalchart.js");
/* harmony import */ var views_modules_orderschart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/orderschart */ "./sources/views/modules/orderschart.js");
/* harmony import */ var views_modules_bestsellers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/bestsellers */ "./sources/views/modules/bestsellers.js");
/* harmony import */ var views_modules_lastobjects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/lastobjects */ "./sources/views/modules/lastobjects.js");







var layout = {
	type: "clean",
	rows: [views_modules_dashline__WEBPACK_IMPORTED_MODULE_1__["default"], {
		type: "space",
		rows: [{
			height: 240,
			type: "wide",
			cols: [views_modules_totalchart__WEBPACK_IMPORTED_MODULE_2__["default"], views_modules_orderschart__WEBPACK_IMPORTED_MODULE_3__["default"]]
		}, {
			type: "wide",
			cols: [views_modules_lastobjects__WEBPACK_IMPORTED_MODULE_5__["default"], views_modules_bestsellers__WEBPACK_IMPORTED_MODULE_4__["default"]]
		}]

	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/datatables.js":
/*!*************************************!*\
  !*** ./sources/views/datatables.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var views_modules_data_rating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/modules/data_rating */ "./sources/views/modules/data_rating.js");
/* harmony import */ var views_modules_data_treetable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/modules/data_treetable */ "./sources/views/modules/data_treetable.js");
/* harmony import */ var views_modules_data_progress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/data_progress */ "./sources/views/modules/data_progress.js");
/* harmony import */ var views_modules_data_spans__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/data_spans */ "./sources/views/modules/data_spans.js");
/* harmony import */ var views_modules_data_pager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/data_pager */ "./sources/views/modules/data_pager.js");






var layout = {
	type: "space",
	rows: [{
		type: "wide",
		cols: [{
			type: "wide",
			rows: [views_modules_data_rating__WEBPACK_IMPORTED_MODULE_0__["default"], views_modules_data_treetable__WEBPACK_IMPORTED_MODULE_1__["default"]]
		}, {
			type: "wide",
			gravity: 0.8,
			rows: [views_modules_data_progress__WEBPACK_IMPORTED_MODULE_2__["default"], views_modules_data_spans__WEBPACK_IMPORTED_MODULE_3__["default"]]
		}]
	}, views_modules_data_pager__WEBPACK_IMPORTED_MODULE_4__["default"]]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/discounts.js":
/*!************************************!*\
  !*** ./sources/views/discounts.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var discountView = function (_JetView) {
	_inherits(discountView, _JetView);

	function discountView() {
		_classCallCheck(this, discountView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	discountView.prototype.config = function config() {
		return layout;
	};

	discountView.prototype.init = function init(view) {
		$$('discount-form').bind($$('billing-discount'));
		webix.dp.$$("billing-discount").config.updateFromResponse = true;
	};

	return discountView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (discountView);


var grid = {
	id: "billing-discount",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	columns: [{ id: "discount_id", header: "#", sort: "int", width: 50 }, { id: "discountname", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "price", header: ["Значение", { content: "textFilter" }], sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "percent", header: ["Тип"], sort: "int", minWidth: 120, fillspace: 1,
		template: function template(obj, common, value) {
			if (value != 0) return "<span> % </span>";else return "<span> KZT </span>";
		}
	}, { id: "priority", header: { text: "Приоритет", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	pager: "pagerA",
	"export": true,
	url: "index.php?route=billing/discount/getList&token=" + token,
	save: {
		"insert": "index.php?route=billing/discount/add&token=" + token,
		"update": "index.php?route=billing/discount/edit&token=" + token,
		"delete": "index.php?route=billing/discount/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('discount-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('discount-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var ui = {
	view: "form",
	id: "discount-form",
	multiview: { keepViews: true },
	dataFeed: function dataFeed(id) {
		var current_discount_id = $$('billing-discount').getItem(id).discount_id;
		this.load("index.php?route=billing/discount/getForm&token=" + token + "&discount_id=" + current_discount_id);
	},
	elements: [{ view: "text", id: "discount_id", name: "discount_id", label: "ID скидки", labelWidth: 170, readonly: true }, { cols: [{ view: "datepicker", id: "date_start", name: "date_start", label: "Начало действия", labelWidth: 170, value: new Date(), format: "%d.%m.%Y", invalidMessage: "дата должна быть раньше даты окончания" }, { view: "datepicker", id: "date_end", name: "date_end", label: "Окончание действия", labelWidth: 170, labelAlign: "right", value: new Date(), format: "%d.%m.%Y", invalidMessage: "дата должна быть позже даты начала" }] }, { view: "text", name: "discountname", label: "Название", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 32 знаков" }, { view: "text", name: "price", label: "Значение", placeholder: "Установите значение", labelWidth: 170, required: true, invalidMessage: "значение поля должно быть числом" },
	//{ view:"radio", name:"percent", options:["Процент", "Фиксированная сумма"]},
	{ view: "radio", name: "percent", label: "Принцип рассчета", labelWidth: 170, options: [{ id: 1, value: "Процент" }, { id: 0, value: "Фиксированная сумма" }] }, { view: "textarea", name: "description", label: "Дополнительные сведения", labelWidth: 170, gravity: 1, maxHeight: 150 }, { cols: [{ view: "text", name: "priority", label: "Приоритет", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("discount-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form = $$("discount-form");
				if (!form.validate()) return false;

				webix.ajax().post("index.php?route=billing/discount/validateForm&token=" + token, $$("discount-form").getValues(), function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						form.save();
						$$("discount-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"discountname": function discountname(value) {
			return value.length >= 3 && value.length <= 32;
		},
		"price": webix.rules.isNumber,
		"date_end": function date_end(value) {
			return value >= $$("date_start").getValue();
		},
		"date_start": function date_start(value) {
			return value <= $$("date_end").getValue();
		}
	}
};

var discount_views = {
	view: "multiview",
	id: "discount-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [discount_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/files.js":
/*!********************************!*\
  !*** ./sources/views/files.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var models_files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! models/files */ "./sources/models/files.js");
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




// load external css
webix.require("//cdn.webix.com/site/filemanager/filemanager.css");
// load external js
var ready = webix.require("//cdn.webix.com/site/filemanager/filemanager.js")
// return UI after lib loading
.then(function () {
	return FMView;
});

var FMView = function (_JetView) {
	_inherits(FMView, _JetView);

	function FMView() {
		_classCallCheck(this, FMView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	FMView.prototype.config = function config() {
		return {
			view: "filemanager",
			disabledHistory: true
		};
	};

	FMView.prototype.init = function init(view) {
		view.parse(webix.copy(models_files__WEBPACK_IMPORTED_MODULE_0__["data"]));
	};

	return FMView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_1__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ready);

/***/ }),

/***/ "./sources/views/forms.js":
/*!********************************!*\
  !*** ./sources/views/forms.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var views_modules_form_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/modules/form_user */ "./sources/views/modules/form_user.js");
/* harmony import */ var views_modules_form_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/modules/form_project */ "./sources/views/modules/form_project.js");
/* harmony import */ var views_modules_form_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/form_event */ "./sources/views/modules/form_event.js");
/* harmony import */ var views_modules_form_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/form_style */ "./sources/views/modules/form_style.js");





var layout = {
	type: "space",
	cols: [{ type: "wide",
		rows: [views_modules_form_user__WEBPACK_IMPORTED_MODULE_0__["default"], views_modules_form_event__WEBPACK_IMPORTED_MODULE_2__["default"]]
	}, { type: "wide",
		rows: [views_modules_form_style__WEBPACK_IMPORTED_MODULE_3__["default"], views_modules_form_project__WEBPACK_IMPORTED_MODULE_1__["default"]]
	}]

};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/forms/loginform.js":
/*!******************************************!*\
  !*** ./sources/views/forms/loginform.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var loginf = {
    maxWidth: 320,

    type: "space",
    rows: [{
        view: "toolbar",
        css: "highlighted_header header1",
        paddingX: 5,
        paddingY: 5,
        height: 40,
        cols: [{
            "template": "<span class='webix_icon fa-lock'></span>Введите логин и пароль", "css": "sub_title2", borderless: true
        }]
    }, {
        view: "form",
        id: "loginForm",
        elementsConfig: {
            labelWidth: 90
        },
        elements: [{ view: "text", label: "Логин", placeholder: "Логин", name: "username", value: username, invalidMessage: "Логин не должен быть пустым" }, { view: "text", label: "Пароль", placeholder: "Пароль", name: "password", type: 'password', value: password, invalidMessage: "Пароль не должен быть пустым" }, { view: "text", name: "redirect", value: redirect, hidden: true }, {
            margin: 10,
            paddingX: 2,
            borderless: true,
            cols: [{}, { view: "button", label: "Войти", type: "iconButton", icon: "key", align: "right", width: 100,
                click: function click() {
                    if (webix.$$("loginForm").validate()) console.log(action);
                    webix.send(action, webix.$$("loginForm").getValues());
                }
            }]
        }],
        rules: {
            name1: webix.rules.isNotEmpty
        }

    }]
};

/* harmony default export */ __webpack_exports__["default"] = (login);

/***/ }),

/***/ "./sources/views/forms/order.js":
/*!**************************************!*\
  !*** ./sources/views/forms/order.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "window", modal: true, id: "order-win",
	head: "Add new order",
	body: {
		paddingY: 20, paddingX: 30, elementsConfig: { labelWidth: 140 }, view: "form", id: "order-form", elements: [{ view: "combo", name: "customer", label: "Customer", id: "order-customer", options: [{ id: "1", value: "Virgen C. Holcombe" }, { id: "2", value: "Tory H. Ventura" }, { id: "3", value: "Jacquline A. Coats" }, { id: "4", value: "Jamila N. Mccallister" }, { id: "5", value: "Sabrina N. Hermann" }, { id: "6", value: "Bradly N. Mauro" }, { id: "7", value: "Ashleigh G. Denham" }, { id: "8", value: "Stephen H. Peachey" }, { id: "9", value: "Amado T. Cano" }, { id: "10", value: "Olimpia C. Whelan" }, { id: "11", value: "Regine H. Field" }, { id: "12", value: "Roxanna C. Cass" }, { id: "13", value: "Reba H. Casteel" }, { id: "14", value: "Jettie P. Whelan" }, { id: "15", value: "Sherry G. Richards" }, { id: "16", value: "Stephane A. Chandler" }, { id: "17", value: "Amee A. Marshall" }], width: 350 }, { view: "combo", name: "employee", label: "Salesperson", id: "order-sales", options: [{ id: "1", value: "Ray M. Parra" }, { id: "2", value: "Suellen G. Ritter" }, { id: "3", value: "Janelle P. Blunt" }, { id: "4", value: "Cristopher B. Acker" }, { id: "5", value: "Lane E. Dion" }, { id: "6", value: "Rossana M. Mcknight" }, { id: "7", value: "Becki P. Perryman" }, { id: "8", value: "Jolie P. Sparks" }, { id: "9", value: "Shirley M. Mattingly" }, { id: "10", value: "Rosario H. Mccracken" }, { id: "11", value: "Sudie M. Goldsmith" }, { id: "12", value: "Sherley D. Berryman" }, { id: "13", value: "Romaine B. Alley" }, { id: "14", value: "Giovanni B. Weston" }] }, { view: "combo", name: "product", label: "Product", id: "order-product", options: [{ id: 1, value: "Webix Chai" }, { id: 2, value: "Webix Syrup" }, { id: 3, value: "Webix Cajun Seasoning" }, { id: 4, value: "Webix Olive Oil" }, { id: 5, value: "Webix Boysenberry Spread" }, { id: 6, value: "Webix Dried Pears" }, { id: 7, value: "Webix Curry Sauce" }, { id: 8, value: "Webix Walnuts" }, { id: 9, value: "Webix Fruit Cocktail" }, { id: 10, value: "Webix Chocolate Biscuits Mix" }, { id: 11, value: "Webix Marmalade" }, { id: 12, value: "Webix Scones" }, { id: 13, value: "Webix Beer" }, { id: 14, value: "Webix Crab Meat" }, { id: 15, value: "Webix Clam Chowder" }, { id: 16, value: "Webix Coffee" }, { id: 17, value: "Webix Chocolate" }] }, { view: "combo", name: "shipment", label: "Shipping Company", id: "shipping_company", options: ["Shipping A", "Shipping B", "Shipping C", "Shipping D", "Shipping E", "Shipping F", "Shipping G"] }, { view: "datepicker", label: "Order Date", value: new Date(), format: "%d  %M %Y" }, {
			margin: 10,
			cols: [{}, { view: "button", label: "Add", type: "form", align: "center", width: 120, click: function click() {
					webix.$$("order-win").hide();
				} }, { view: "button", label: "Cancel", align: "center", width: 120, click: function click() {
					webix.$$("order-win").hide();
				} }]
		}]
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/forms/user_group.js":
/*!*******************************************!*\
  !*** ./sources/views/forms/user_group.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "form",
	id: "user-group-form",
	elements: [{ view: "text", id: "user_group_id", name: "user_group_id", label: "ID группы", labelWidth: 70, readonly: true }, { view: "text", id: "name", name: "name", label: "Название группы", placeholder: "Введите название", labelWidth: 70 }, { view: "datatable", name: "permisson", id: "grida",
		columns: [{ id: "permission_id", header: "Модуль или задача", fillspace: true }],
		//autoheight:true,			  
		scroll: "xy",
		select: "row",
		maxHeight: 300,
		//  autowidth:true,
		type: { template: "{common.space()}" },

		url: "index.php?route=user/user_permission/getForm&token=" + token + "&user_group_id=" + "1"
	}, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("user-group-list").back();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				$$("user-group-form").save();
				$$("user-group-list").back();
			} }]
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/forms/user_group_win.js":
/*!***********************************************!*\
  !*** ./sources/views/forms/user_group_win.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "window", modal: true, id: "group-win", width: 600, height: 600, resize: true,
	head: "Add new order",
	body: {
		paddingY: 20, paddingX: 30, elementsConfig: { labelWidth: 240 }, view: "form", id: "user-group-form", scroll: "xy", elements: [{ view: "text", id: "user_group_id", name: "user_group_id", label: "ID группы", labelWidth: 70, readonly: true }, { view: "text", id: "name", name: "name", label: "Название группы", placeholder: "Введите название", labelWidth: 70 }, { view: "datatable", name: "permisson", id: "grida",
			columns: [{ id: "permission_id", header: "Модуль или задача", fillspace: true }],
			// autoheight:true,			  
			scroll: "xy",
			select: "row",
			maxHeight: 300,
			//  autowidth:true,
			type: { template: "{common.space()}" },

			url: "index.php?route=user/user_permission/getForm&token=" + token + "&user_group_id=" + "1"
		}, {
			margin: 10,
			cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
					webix.$$("group-win").hide();
				} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
					$$("user-group-form").save();
					webix.$$("group-win").hide();
				} }]
		}]
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/gsms.js":
/*!*******************************!*\
  !*** ./sources/views/gsms.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var gsmView = function (_JetView) {
    _inherits(gsmView, _JetView);

    function gsmView() {
        _classCallCheck(this, gsmView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    gsmView.prototype.config = function config() {
        return layout;
    };

    gsmView.prototype.init = function init(view) {
        $$('gsm-form').bind($$('catalog-gsm'));
        webix.dp.$$("catalog-gsm").config.updateFromResponse = true;
    };

    return gsmView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (gsmView);


var grid = {
    id: "catalog-gsm",
    view: "datatable",
    select: "row",
    clipboard: "selection",
    multiselect: true,
    editable: true,
    editaction: "dblclick",
    checkboxRefresh: true,
    columns: [{ id: "gsm_id", header: "#", sort: "int", width: 50 }, { id: "gsmname", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "sort_order", header: { text: "Порядок сортировки", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, {
        id: "edit",
        header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>",
        width: 35,
        template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
    }],
    pager: "pagerA",
    "export": true,
    url: "index.php?route=catalog/gsm/getList&token=" + token,
    save: {
        "insert": "index.php?route=catalog/gsm/add&token=" + token,
        "update": "index.php?route=catalog/gsm/edit&token=" + token,
        "delete": "index.php?route=catalog/gsm/delete&token=" + token
    },
    onClick: {
        "mdi-pencil": function mdiPencil(e, id) {
            this.select(id);
            $$('gsm-form').show();
            $$('edit-tools').hide();
            $$('edit-form-icon').show();
            $$('paging').hide();
        }
    },
    on: {
        "onAfterAdd": function onAfterAdd(obj, index) {
            var lastid = this.getLastId();
            this.select(lastid);
            $$('gsm-form').show();
            $$('edit-tools').hide();
            $$('edit-form-icon').show();
            $$('paging').hide();
        }
    },
    ready: function ready() {
        webix.extend(this, webix.ProgressBar);
    }
};

var ui = {
    view: "form",
    id: "gsm-form",
    multiview: { keepViews: true },
    dataFeed: function dataFeed(id) {
        var current_gsm_id = $$('catalog-gsm').getItem(id).gsm_id;
        this.load("index.php?route=catalog/gsm/getForm&token=" + token + "&gsm_id=" + current_gsm_id);
    },
    elements: [{ view: "text", id: "gsm_id", name: "gsm_id", label: "ID оператора", labelWidth: 170, readonly: true }, { view: "text", name: "gsmname", label: "Название", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 32 знаков" }, {
        cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }]
    }, {
        margin: 10,
        cols: [{}, {
            view: "button",
            value: "Отменить",
            width: 120,
            click: function click() {
                $$("gsm-views").back();
                $$('paging').show();
                $$('edit-form-icon').hide();
                $$('edit-tools').show();
            }
        }, {
            view: "button",
            value: "Сохранить",
            type: "form",
            width: 120,
            click: function click() {
                var form = $$("gsm-form");
                if (!form.validate()) return false;

                webix.ajax().post("index.php?route=catalog/gsm/validateForm&token=" + token, $$("gsm-form").getValues(), function (text, data, XmlHttpRequest) {
                    if (text && text != "[]") {
                        webix.message({
                            text: JSON.parse(text).warning,
                            type: "error",
                            expire: 5000
                        }); //show gsm side response
                        return false;
                    } else {
                        form.save();
                        $$("gsm-views").back();
                        $$('paging').show();
                        $$('edit-form-icon').hide();
                        $$('edit-tools').show();
                    }
                });
            }
        }]
    }],
    rules: {
        "gsmname": function gsmname(value) {
            return value.length >= 3 && value.length <= 32;
        }
    }
};

var gsm_views = {
    view: "multiview",
    id: "gsm-views",
    cells: [grid, ui]
};

var layout = {
    type: "space",
    rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [gsm_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/history.js":
/*!**********************************!*\
  !*** ./sources/views/history.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_datebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/datebar */ "./sources/views/menus/datebar.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_groupfilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/groupfilter */ "./sources/views/modules/groupfilter.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_modules_onlinefilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/modules/onlinefilter */ "./sources/views/modules/onlinefilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
/* harmony import */ var views_templates_eye__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/templates/eye */ "./sources/views/templates/eye.js");
/* harmony import */ var views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! views/templates/deleted */ "./sources/views/templates/deleted.js");
/* harmony import */ var views_templates_online__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! views/templates/online */ "./sources/views/templates/online.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var ItemView = function (_JetView) {
    _inherits(ItemView, _JetView);

    function ItemView() {
        _classCallCheck(this, ItemView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ItemView.prototype.config = function config() {
        return layout;
    };

    ItemView.prototype.init = function init(view) {
        webix.extend(view.queryView({ view: "datatable" }), webix.ProgressBar);
    };

    return ItemView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ItemView);


var hgrid = {
    id: "history-list",
    view: "datatable",
    select: "row",
    pager: "pagerA",
    "export": true,

    columns: [{ id: "item_id", header: "Id", sort: "server", minWidth: 120 }, { map: "(date)#date_changed#", header: "Дата", sort: "server", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y") }, { id: "deleted", header: "<span class='webix_icon mdi mdi-window-close deleted'></span>", width: 40, css: { "text-align": "center" }, template: views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__["default"] }, { id: "ownername", header: ["Владелец", { content: "serverSelectFilter", options: "index.php?route=history/history/getOwners&token=" + token }], sort: "server", minWidth: 120, fillspace: 2 }, { id: "wialon_groupname", header: ["Группа", { content: "serverSelectFilter", options: "index.php?route=history/history/getGroups&token=" + token }], sort: "server", minWidth: 120, fillspace: 2 }, { id: "itemname", header: ["Объект", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 2 }, { id: "tracker_uid", header: ["Трекер UID", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 1 }, { id: "trackername", header: ["Трекер", { content: "serverSelectFilter", options: "index.php?route=history/history/getTrackers&token=" + token }], sort: "server", minWidth: 120, fillspace: 1 }, { id: "sim1", header: ["SIM-1", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 1 }, { id: "sim2", header: ["SIM-2", { content: "serverFilter" }], sort: "server", minWidth: 120, fillspace: 1 }, { id: "wialon_group_off", header: ["Вид", { content: "eyeFilter", css: "webix_ss_filter" }], sort: "server", minWidth: 80, css: { "text-align": "center" }, template: views_templates_eye__WEBPACK_IMPORTED_MODULE_8__["default"] }, { id: "online", header: ["Состояние", { content: "onlFilter", css: "webix_ss_filter" }], sort: "server", minWidth: 120, css: { "text-align": "center" }, template: views_templates_online__WEBPACK_IMPORTED_MODULE_10__["default"] }, { id: "price", header: ["Тариф", { content: "selectFilter", options: "index.php?route=history/history/getTarifs&token=" + token }], sort: "server", minWidth: 60, fillspace: 1 }, { id: "history_discount_id", header: ["Скидка", { content: "selectFilter", options: "index.php?route=history/history/getDiscounts&token=" + token }], sort: "server", minWidth: 60, fillspace: 1 }],
    url: "index.php?route=history/history&token=" + token,
    ready: function ready() {
        webix.extend(this, webix.ProgressBar);
        // Client sorting can't be used with dynamic loading
        // this.sort({by: "date_changed", dir: "desc"}); 
    }
};

var layout = {
    id: "layout",
    type: "space",
    rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_datebar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { rows: [hgrid, views_modules_paging__WEBPACK_IMPORTED_MODULE_3__["default"]] }]
};

/***/ }),

/***/ "./sources/views/items.js":
/*!********************************!*\
  !*** ./sources/views/items.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_groupfilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/groupfilter */ "./sources/views/modules/groupfilter.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_modules_onlinefilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/modules/onlinefilter */ "./sources/views/modules/onlinefilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
/* harmony import */ var views_templates_eye__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/templates/eye */ "./sources/views/templates/eye.js");
/* harmony import */ var views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! views/templates/deleted */ "./sources/views/templates/deleted.js");
/* harmony import */ var views_templates_online__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! views/templates/online */ "./sources/views/templates/online.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var ItemView = function (_JetView) {
    _inherits(ItemView, _JetView);

    function ItemView() {
        _classCallCheck(this, ItemView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ItemView.prototype.config = function config() {
        return layout;
    };

    ItemView.prototype.init = function init(view) {
        $$('item-form').bind($$('catalog-item'));
        webix.dp.$$("catalog-item").config.updateFromResponse = true;
    };

    return ItemView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ItemView);


var grid = {
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
    columns: [{ id: "item_id", header: "Id", sort: "int", width: 60 }, { id: "deleted", header: "<span class='webix_icon mdi mdi-window-close deleted'></span>", width: 40, css: { "text-align": "center" }, template: views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__["default"] }, { id: "itemname", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "tracker_uid", header: ["Трекер UID", { content: "textFilter" }], sort: "int", minWidth: 140, fillspace: 1 }, { id: "ownername", header: ["Владелец", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2 }, { id: "owner_id", hidden: true }, { id: "wialon_groupname", header: ["Группа", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "wialon_group_off", header: ["Вид", { content: "eyeFilter", css: "webix_ss_filter" }], sort: "int", width: 80, css: { "text-align": "center" }, template: views_templates_eye__WEBPACK_IMPORTED_MODULE_8__["default"] }, { id: "servername", header: ["Сервер", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 1 }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 1, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_7__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
        template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
    }],
    scheme: {
        $init: function $init(obj) {
            if (obj.deleted == 1) obj.$css = "deleted";
        }
    },
    url: "index.php?route=catalog/item/getList&token=" + token,
    save: {
        "insert": "index.php?route=catalog/item/add&token=" + token,
        "update": "index.php?route=catalog/item/edit&token=" + token,
        "delete": "index.php?route=catalog/item/delete&token=" + token
    },
    onClick: {
        "mdi-pencil": function mdiPencil(e, id) {
            this.select(id);
            $$('history-grid').clearAll();
            $$('history-grid').load("index.php?route=catalog/item/getItemHistory&token=" + token + "&item_id=" + this.getItem(id).item_id + "&owner_id=" + this.getItem(id).owner_id);
            $$('paging').hide();
            $$('edit-tools').hide();
            $$('edit-form-icon').show();
            $$('item-form').show();
        }
    },
    ready: function ready() {
        webix.extend(this, webix.ProgressBar);
    }
};

var xml_format = webix.Date.strToDate("%Y-%m-%d");

var history_grid = {
    id: "history-grid",
    view: "datatable",
    select: "row",

    columns: [{ id: "item_history_id", header: "#", sort: "int", minWidth: 120 }, { map: "(date)#date_changed#", header: "Дата", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y") },
    //{map: "(date)#date_modified#", header: "Дата m", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y")},
    { id: "deleted", header: " ", sort: "int", width: 40, css: { "text-align": "center" }, template: views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__["default"] }, { id: "itemname", header: ["Объект", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2 }, { id: "tracker_uid", header: ["Трекер UID", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "trackername", header: ["Трекер", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "sim1", header: ["SIM-1", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "sim2", header: ["SIM-2", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "wialon_groupname", header: ["Группа", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2 }, { id: "wialon_group_off", header: ["Вид", { content: "eyeFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 80, css: { "text-align": "center" }, template: views_templates_eye__WEBPACK_IMPORTED_MODULE_8__["default"] }, { id: "online", header: ["Состояние", { content: "onlFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 120, css: { "text-align": "center" }, template: views_templates_online__WEBPACK_IMPORTED_MODULE_10__["default"] }, { id: "history_tarif_id", header: ["Тариф", { content: "selectFilter" }], sort: "int", minWidth: 60, fillspace: 1 }, { id: "history_discount_id", header: ["Скидка", { content: "selectFilter" }], sort: "int", minWidth: 60, fillspace: 1 }],
    scheme: {
        // init не срабатывает в данной ситуации (возможно из-за внешней принудительной загрузки или из-за map)
        $init: function $init(obj) {
            if (obj.deleted == 1) obj.$css = "deleted";
            obj.date_changed = xml_format(obj.date_start);
        }
    },
    //	url:"index.php?route=catalog/item/getItemHistory&token="+token+"&item_id="+$$('item-form').getValues().item_id,
    ready: function ready() {
        webix.extend(this, webix.ProgressBar);
        this.sort({ by: "date_changed", dir: "desc" });
    }
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var billing_grid = {
    id: "billing-list",
    view: "datatable",
    footer: true,
    stringResult: true,
    columns: [{ id: "event_name", header: "Событие", sort: "int", minWidth: 120, fillspace: true }, { id: "date_start", header: "Начало", sort: "int", minWidth: 120, footer: { text: "Итого:", colspan: 4 }, fillspace: true }, { id: "date_end", header: "Конец", sort: "int", minWidth: 120, fillspace: true }, { id: "tarif", header: "Тариф", sort: "int", minWidth: 120, fillspace: true }, { id: "discount", header: "Скидка", sort: "int", minWidth: 120, fillspace: true }, { id: "count", header: "Дней", sort: "int", minWidth: 120, footer: { content: "summColumn" } }, { id: "sum", header: "Сумма", sort: "int", minWidth: 120, footer: { content: "summColumn" } }],
    ready: function ready() {
        webix.extend(this, webix.ProgressBar);
    }
};

var date_popup = webix.ui({
    view: "window",
    modal: true,
    position: "center",
    head: "Какой датой внести изменения?",
    body: {
        view: "form",
        elements: [{ view: "datepicker", name: "set_date_changed", value: new Date(), format: "%d.%m.%Y" }, { view: "button", label: "Подтверждение", type: "form", click: function click() {
                var date_changed = this.getParentView().getValues().set_date_changed;
                $$("item-form").setValues({ date_changed: date_changed }, true);
                $$("item-form").save();
                this.getTopParentView().hide();
            } }]
    }
});

var iform = {
    view: "form",
    id: "item-form",
    multiview: { keepViews: true },
    dataFeed: function dataFeed(id) {
        var current_item_id = $$('catalog-item').getItem(id).item_id;
        this.load("index.php?route=catalog/item/getForm&token=" + token + "&item_id=" + current_item_id);
    },
    elements: [{
        view: "tabview",
        tabbar: { options: ["Общие", "Железо", "Биллинг", "История"] }, animate: false,
        cells: [{ id: "Общие", rows: [{ cols: [{ view: "text", id: "item_id", name: "item_id", label: "ID объекта", labelWidth: 140, readonly: true }, { view: "text", id: "date_created", name: "date_created", label: "Дата создания", labelWidth: 140, labelAlign: "right", readonly: true }] }, { view: "text", name: "itemname", label: "Название", labelWidth: 140, readonly: true }, { cols: [{ view: "text", name: "wialon_id", label: "Wialon ID", labelWidth: 140, readonly: true }, { view: "text", name: "servername", label: "Сервер", labelWidth: 140, labelAlign: "right", readonly: true }] }, { view: "template", template: "Принадлежность", type: "section" }, { cols: [{ view: "text", name: "wialon_groupname", label: "Группа", labelWidth: 140, readonly: true }, { view: "radio", name: "wialon_group_off", label: "Видимость", labelWidth: 140, labelAlign: "right", disabled: true,
                    options: [{ id: 0, value: "<span class='webix_icon mdi mdi-eye wialon-group-on'></span>" }, { id: 1, value: "<span class='webix_icon mdi mdi-eye-off wialon-group-off'></span>" }]
                }] }, { view: "text", name: "ownername", label: "Владелец", labelWidth: 140, readonly: true }, { view: "text", name: "owner_id", hidden: true }, { view: "template", template: "Данные", type: "section" }, { cols: [{ view: "text", id: "date_last", name: "date_last", label: "Последнее сообщение", labelWidth: 170, readonly: true }, { view: "text", id: "date_modified", name: "date_modified", label: "Дата модификации", labelWidth: 170, labelAlign: "right", readonly: true }] }, { cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {}] }, { id: "Железо", rows: [{ view: "template", template: "Трекер", type: "section" }, { cols: [{ view: "text", name: "tracker_uid", label: "Трекер UID", labelWidth: 140, gravity: 3, readonly: true }, { view: "text", name: "trackername", label: "Тип трекера", labelWidth: 120, labelAlign: "right", gravity: 2, readonly: true }, { view: "text", name: "tracker_hw", label: "HW", labelWidth: 60, width: 160, labelAlign: "right", gravity: 1, readonly: true }] }, { view: "text", name: "password", label: "Пароль", labelWidth: 140, readonly: true }, { cols: [{ view: "text", name: "sim1", label: "Сим-карта 1", labelWidth: 140, readonly: true }, { view: "text", name: "sim2", label: "Сим-карта 2", labelWidth: 120, labelAlign: "right", readonly: true }] }, { view: "template", template: "Датчики", type: "section" }, {}] }, { id: "Биллинг", rows: [{ view: "template", template: "Объект", type: "section" }, { cols: [{ view: "select", name: "tarif_id", label: "Тариф объекта", labelWidth: 140, options: "index.php?route=catalog/item/getTarifs&token=" + token }, { view: "select", name: "discount_id", label: "Скидка объекта", labelWidth: 140, labelAlign: "right", options: "index.php?route=catalog/item/getDiscounts&token=" + token }] }, { view: "template", template: "Группа", type: "section" }, { cols: [{ view: "select", name: "tarif_group_id", label: "Тариф группы", labelWidth: 140, options: "index.php?route=catalog/wialongroup/getTarifs&token=" + token, disabled: true }, { view: "select", name: "discount_group_id", label: "Скидка группы", labelWidth: 140, labelAlign: "right", options: "index.php?route=catalog/wialongroup/getDiscounts&token=" + token, disabled: true }] }, { view: "template", template: "Расчет за период", type: "section" }, { cols: [{ view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y" }, { view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y" },
                //{ view:"datepicker", name:"date_changed", hidden: true }, test notepad git
                { view: "button", value: "Расчитать", width: 120, click: function click() {
                        var values = $$('item-form').getValues();
                        var tarif_id = Number(values.tarif_id) || Number(values.tarif_group_id);
                        var discount_id = Number(values.discount_id) || Number(values.discount_group_id);
                        var date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
                        var date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
                        $$('billing-list').clearAll();
                        debugger;
                        $$('billing-list').load("index.php?route=billing/billing/getItemBilling&token=" + token + "&item_id=" + values.item_id + "&owner_id=" + values.owner_id + "&date_start=" + date_start + "&date_end=" + date_end + "&tarif_id=" + tarif_id + "&discount_id=" + discount_id);
                    } }] }, billing_grid] }, { id: "История", rows: [history_grid] }]
    }, {
        margin: 10,
        cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
                $$("item-views").back();
                $$('paging').show();
                $$('edit-form-icon').hide();
                $$('edit-tools').show();
            } }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
                var iform = $$("item-form");
                if (iform.isDirty()) {
                    if (!iform.validate()) return false;

                    webix.ajax().post("index.php?route=catalog/item/validateForm&token=" + token, $$("item-form").getValues(), function (text, data, XmlHttpRequest) {
                        if (text && text != "[]") {
                            webix.message({
                                text: JSON.parse(text).warning,
                                type: "error",
                                expire: 5000
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
            } }]
    }]
    //rules:{
    //	"date_end": function(value){ return value >= $$("date_start").getValue()},
    //	"date_start": function(value){ return value <= $$("date_end").getValue()},
    //}
};

var item_views = {
    view: "multiview",
    id: "item-views",
    cells: [grid, iform]
};

var layout = {
    id: "layout",
    type: "space",
    rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"] }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_2__["default"], hidden: true }, { rows: [item_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_3__["default"]] }]
};

/***/ }),

/***/ "./sources/views/login.js":
/*!********************************!*\
  !*** ./sources/views/login.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var LoginView = function (_JetView) {
	_inherits(LoginView, _JetView);

	function LoginView() {
		_classCallCheck(this, LoginView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	LoginView.prototype.config = function config() {
		return ui;
	};

	LoginView.prototype.init = function init(view) {
		view.$view.querySelector("input").focus();
	};

	LoginView.prototype.do_login = function do_login() {
		var user = this.app.getService("user");
		var form = this.getRoot().queryView({ view: "form" });

		if (form.validate()) {
			var data = form.getValues();
			user.login(data.username, data.password).catch(function () {
				webix.html.removeCss(form.$view, "invalid_login");
				form.elements.password.focus();
				webix.delay(function () {
					webix.html.addCss(form.$view, "invalid_login");
				}); //.then(result => {console.log(user.getUser())}, error => {console.log(user.getUser())});				
			});
			//if (user.getUser() !== null) { console.log(user.getUser().token);} else {console.log("Empty token");}
			//token = user.getUser().token;
		}
	};

	return LoginView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (LoginView);


var login_form = {
	view: "form",
	id: "loginform",
	width: 400, borderless: false, margin: 10,
	rows: [
	//{ view: "label", name: "error_warning", label: error_warning, hidden: error_warning?false:true, css: "webix_alert-error"},
	{ type: "header", template: "<span class='webix_icon mdi mdi-lock'></span>Введите логин и пароль" }, { view: "text", name: "username", label: "Логин", labelPosition: "top", invalidMessage: "Логин не должен быть пустым" }, { view: "text", type: "password", name: "password", label: "Пароль", labelPosition: "top", invalidMessage: "Пароль не должен быть пустым" }, { view: "button", label: "Войти", type: "iconButton", icon: "mdi mdi-key", click: function click() {
			this.$scope.do_login();
		}, hotkey: "enter" }],
	rules: {
		username: webix.rules.isNotEmpty,
		password: webix.rules.isNotEmpty
	}
};

var ui = { rows: [{}, { cols: [{}, login_form, {}] }, {}] };

/***/ }),

/***/ "./sources/views/login2.js":
/*!*********************************!*\
  !*** ./sources/views/login2.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {


var login = {
    maxWidth: 320,

    type: "space",
    rows: [{
        view: "toolbar",
        css: "highlighted_header header1",
        paddingX: 5,
        paddingY: 5,
        height: 40,
        cols: [{
            "template": "<span class='webix_icon fa-lock'></span>Введите логин и пароль", "css": "sub_title2", borderless: true
        }]
    }, {
        view: "form",
        id: "loginForm",
        elementsConfig: {
            labelWidth: 90
        },
        elements: [{ view: "text", label: "Логин", placeholder: "Логин", name: "username", value: username, invalidMessage: "Логин не должен быть пустым" }, { view: "text", label: "Пароль", placeholder: "Пароль", name: "password", type: 'password', value: password, invalidMessage: "Пароль не должен быть пустым" }, { view: "text", name: "redirect", value: redirect, hidden: true }, {
            margin: 10,
            paddingX: 2,
            borderless: true,
            cols: [{}, { view: "button", label: "Войти", type: "iconButton", icon: "key", align: "right", width: 100,
                click: function click() {
                    if (webix.$$("loginForm").validate()) console.log(action);
                    webix.send(action, webix.$$("loginForm").getValues());
                }
            }]
        }],
        rules: {
            name1: webix.rules.isNotEmpty
        }

    }]
};

if (error_warning) webix.alert({ type: "alert-error", text: error_warning });
if (success) webix.alert({ type: "alert-warning", text: success });

webix.ui({
    container: "areaA",
    id: "mylayout",
    margin: 30,
    type: "clean",
    rows: [{}, {}, {}, {}, {}, {}, {}, { cols: [{}, login, {}] }]
    //rows:[login]
});

/***/ }),

/***/ "./sources/views/menus/contextmenu.js":
/*!********************************************!*\
  !*** ./sources/views/menus/contextmenu.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var context = {
	view: "contextmenu",
	//id: "contextPopup",
	//width: 200,
	padding: 0,
	data: [{ value: "Add", task: "add" }, { value: "Rename", task: "rename" }, { value: "Delete", task: "delete" }, { $template: "Separator" }, { value: "Info", task: "info" }],
	on: {
		onItemClick: function onItemClick(id) {
			var task = this.getItem(id).task;
			if (backendController) {
				webix.ajax().post("index.php?route=" + backendController + task + "&token=" + token, selRows, function (response) {
					console.log(response);
				});
			}
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (context);

/***/ }),

/***/ "./sources/views/menus/datebar.js":
/*!****************************************!*\
  !*** ./sources/views/menus/datebar.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daterange = {
    view: "form",
    id: "daterange",
    borderless: true,
    paddingY: 0,
    elements: [{
        cols: [{
            view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y",
            on: {
                "onChange": onChange2
            }
        }, {
            view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y",
            on: {
                "onChange": onChange2
            }
        }]
    }]
};

function onChange(newVal, oldVal) {
    var picker_form = this.getParentView().getParentView();
    var grid = picker_form.getParentView().getParentView().queryView({ view: "datatable" });
    var values = picker_form.getValues();

    if (values.date_start > values.date_end) {
        this.setValue(oldVal);
        return;
    }

    var dayMilliseconds = 24 * 60 * 60 * 1000;
    var validInterval = 60; // days
    var new_date = new Date(newVal);
    var diff1 = Math.abs(parseInt((new_date - new Date(values.date_start)) / dayMilliseconds)) - validInterval;
    var diff2 = Math.abs(parseInt((new_date - new Date(values.date_end)) / dayMilliseconds)) - validInterval;

    if (diff2 > 0) {
        // date_start has been changed
        new_date.setDate(new_date.getDate() + validInterval);
        picker_form.setValues({ date_end: new_date }, true);
    }
    if (diff1 > 0) {
        // date_end has been changed
        new_date.setDate(new_date.getDate() - validInterval);
        picker_form.setValues({ date_start: new_date }, true);
    }

    values = picker_form.getValues(); // take new values
    var date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
    var date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();

    grid.clearAll();
    grid.load(grid.config.url + "&date_start=" + date_start + "&date_end=" + date_end);
}

function onChange2(newVal, oldVal) {
    var picker_form = this.getParentView().getParentView();
    var grid = picker_form.getParentView().getParentView().queryView({ view: "datatable" });
    var values = picker_form.getValues();

    if (values.date_start > values.date_end) {
        this.setValue(oldVal);
        return;
    }

    var date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
    var date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();

    grid.clearAll();
    grid.load(grid.config.url + "&date_start=" + date_start + "&date_end=" + date_end);
    grid.filterByAll();
    //grid.sort();
}

/* harmony default export */ __webpack_exports__["default"] = (daterange);

/***/ }),

/***/ "./sources/views/menus/export.js":
/*!***************************************!*\
  !*** ./sources/views/menus/export.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var controls = [{ view: "icon", type: "icon", borderless: false, icon: "mdi mdi-file-excel", tooltip: "Export To Excel", click: function click() {
		//var layout = $$("layout");
		var layout = this.getParentView().getParentView();
		var table = layout.queryView({ view: "datatable" });
		var treetable = layout.queryView({ view: "treetable" });
		var excellview = table !== null ? table : treetable;

		webix.toExcel(excellview);
	}
}, { view: "icon", type: "icon", borderless: false, icon: "mdi mdi-file-pdf", tooltip: "Export To PDF", click: function click() {
		//var layout = this.getParentView().getParentView();		
		//webix.toPDF(layout.queryView({ view:"datatable" }));
	}
}, { view: "icon", type: "icon", borderless: false, icon: "mdi mdi-file-image", tooltip: "Export To PNG", click: function click() {
		var layout = this.getParentView().getParentView();
		webix.toPNG(layout.queryView({ view: "datatable" }));
	}
}, { view: "icon", type: "icon", borderless: false, icon: "mdi mdi-printer", tooltip: "Print", click: function click() {
		//webix.toPNG(webix.grid);
	}
}, {}];

/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./sources/views/menus/formview.js":
/*!*****************************************!*\
  !*** ./sources/views/menus/formview.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var controls = [{ view: "icon", type: "icon", borderless: false, icon: "mdi mdi-file-document-box", tooltip: "Просмотр карточки", click: function click() {
		//webix.toPNG(webix.grid);
	}
}, {}];

/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./sources/views/menus/mail.js":
/*!*************************************!*\
  !*** ./sources/views/menus/mail.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "popup",
	id: "mailPopup",
	width: 300,
	padding: 0,
	css: "list_popup",
	body: {
		type: "clean",
		borderless: true,
		rows: [{
			view: "list",
			autoheight: true,
			data: [{ id: 1, name: "Sofia Lee", text: "Lorem ipsum dolor sit amet.", personId: 2 }, { id: 2, name: "Jeremy O'Neal", text: "Morbi eget facilisis risus.", personId: 1 }, { id: 3, name: "Paul Jackson", text: "Cras lacinia bibendum arcu.", personId: 1 }],
			type: {
				height: 45,
				template: "<img class='photo' src='http://wtools/view/image/wtools/photos/#personId#.png' /><span class='text'>#text#</span><span class='name'>#name#</span>"

			}
		}, {
			css: "show_all", template: "Show all emails <span class='webix_icon fa-angle-double-right'></span>", height: 40
		}]
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/menus/message.js":
/*!****************************************!*\
  !*** ./sources/views/menus/message.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "popup",
	id: "messagePopup",
	width: 300,
	padding: 0,
	css: "list_popup",
	body: {
		type: "clean",
		borderless: true,
		rows: [{
			view: "list",
			autoheight: true,
			data: [{ id: 1, name: "Mario Douglas", text: "Lorem ipsum dolor sit amet", personId: 1 }, { id: 2, name: "Sofia Lee", text: "Praesent luctus nulla enim, pellentesque condimentum ", personId: 2 }, { id: 3, name: "Kim Alley", text: "Lorem ipsum dolor sit amet", personId: 2 }, { id: 4, name: "Jeremy O'Neal", text: "Morbi eget facilisis risus", personId: 1 }, { id: 5, name: "Paul Jackson", text: "Cras lacinia bibendum arcu", personId: 1 }],
			type: {
				height: 45,
				template: "	<img class='photo' src='http://wtools/view/image/wtools/photos/#personId#.png' /><span class='text'>#text#</span><span class='name'>#name#</span>"

			}
		}, {
			css: "show_all", template: "Show all messages <span class='webix_icon fa-angle-double-right'></span>", height: 40
		}]
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/menus/profile.js":
/*!****************************************!*\
  !*** ./sources/views/menus/profile.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "submenu",
	id: "profilePopup",
	width: 200,
	padding: 0,
	data: [{ id: 1, icon: "mdi mdi-user", value: "My Profile" }, { id: 2, icon: "mdi mdi-cog", value: "My Account" }, { id: 3, icon: "mdi mdi-calendar", value: "My Calendar" }, { id: 5, icon: "mdi mdi-tasks", value: "My Tasks" }, { $template: "Separator" }, { id: 4, icon: "mdi mdi-sign-out", value: "Выход" }],
	type: {
		template: function template(obj) {
			if (obj.type) return "<div class='separator'></div>";
			return "<span class='webix_icon mdi mdi-alerts fa-" + obj.icon + "'></span><span>" + obj.value + "</span>";
		}
	},
	on: {
		onMenuItemClick: function onMenuItemClick(id) {

			switch (id) {
				case "1":
					console.log(id);break;
				case "2":
					console.log(id);break;
				case "3":
					console.log(id);break;
				case "4":
					//webix.ajax("index.php?route=common/logout");
					var user = this.$scope.app.getService("user");
					user.logout();
					this.$scope.app.refresh();
					//this.$scope.app.show("/app/login");				
					break;
			}
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/menus/search.js":
/*!***************************************!*\
  !*** ./sources/views/menus/search.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "popup",
	id: "searchPopup",

	width: 300,
	body: {
		rows: [{
			view: "search"
		}, {
			borderless: true, css: "extended_search", template: "<span>Extended search</span>", height: 40
		}]
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/menus/sidebar.js":
/*!****************************************!*\
  !*** ./sources/views/menus/sidebar.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_column_left__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/column_left */ "./sources/models/column_left.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var layout = {
	rows: [{
		css: "menu",
		padding: 2,
		view: "form",
		cols: [{
			view: "button",
			type: "icon",
			icon: "mdi mdi-menu",
			inputWidth: 37,
			align: "left",
			css: "title",
			click: function click() {
				webix.$$("app:menu").toggle();
			}
		}]
	}, {
		css: "menu",
		width: 210,
		view: "sidebar",
		id: "app:menu",
		on: {
			onBeforeSelect: function onBeforeSelect(id) {
				if (this.getItem(id).$count) {
					return false;
				}
			},
			onAfterSelect: function onAfterSelect(id) {
				var menu_item = this.getItem(id);
				webix.$$("title").parse({
					title: menu_item.value,
					details: menu_item.details
				});
				this.$scope.app.show("/app/" + menu_item.id);
			},
			onAfterLoad: function onAfterLoad() {
				var firstid = this.getFirstId();
				this.select(firstid);
			}
		}
	}]
};

var MenuView = function (_JetView) {
	_inherits(MenuView, _JetView);

	function MenuView() {
		_classCallCheck(this, MenuView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	MenuView.prototype.init = function init() {
		var userinfo = this.app.getService("user").getUser();
		//console.log(token);
		webix.$$("app:menu").parse(Object(models_column_left__WEBPACK_IMPORTED_MODULE_1__["default"])(userinfo.token));
	};

	MenuView.prototype.config = function config() {
		return layout;
	};

	return MenuView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (MenuView);

/***/ }),

/***/ "./sources/views/menus/toolbar.js":
/*!****************************************!*\
  !*** ./sources/views/menus/toolbar.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var controls = [{ view: "icon", id: "refresh", type: "icon", borderless: false, icon: "mdi mdi-refresh", tooltip: "Освежить", click: function click() {
		//var grid = webix.$$("catalog-owner");
		var wxgrid = this.getParentView().getParentView().queryView({ view: "datatable" });
		wxgrid.clearAll();
		wxgrid.showProgress();
		webix.delay(function () {
			wxgrid.load(wxgrid.config.url);
			wxgrid.hideProgress();
		}, null, null, 300);
	} }, { view: "icon", id: "add", type: "icon", borderless: false, icon: "mdi mdi-plus", tooltip: "Добавить", click: function click() {
		var wxgrid = this.getParentView().getParentView().queryView({ view: "datatable" });
		var wxform = this.getParentView().getParentView().queryView({ view: "form" });
		var route = wxgrid.config.id.replace('-', '/') + "/validateAdd&token=" + token;
		webix.ajax().post("index.php?route=" + route, { "grid_id": wxgrid.config.id }, function (text, xml, xhr) {
			if (!!JSON.parse(text).warning) {
				webix.message({
					text: JSON.parse(text).warning,
					type: "error",
					expire: 5000
				}); //show server side response					
				return false;
			} else {
				wxform.clear();
				var item = wxgrid.add(wxform.getValues());
				wxgrid.showItem(item);
			}
		});
	}
}, { view: "icon", id: "copy", type: "icon", borderless: false, icon: "mdi mdi-content-copy", tooltip: "Копировать", disabled: true, click: function click() {
		var wxgrid = this.getParentView().getParentView().queryView({ view: "datatable" });
		var selRows = wxgrid.getSelectedItem(true);
		selRows.forEach(function (item, idx, arr) {
			wxgrid.add({ name: item.name });
		});
		wxgrid.showItem(wxgrid.getLastId());
	}
}, { view: "icon", id: "delete", type: "icon", borderless: false, icon: "mdi mdi-trash-can-outline", tooltip: "Удалить", click: function click() {
		var wxgrid = this.getParentView().getParentView().queryView({ view: "datatable" });
		var wxform = this.getParentView().getParentView().queryView({ view: "form" });
		var route = wxgrid.config.id.replace('-', '/') + "/validateDelete&token=" + token;
		webix.confirm({
			text: " Выделенные строки будут удалены. <br/> Вы уверены? ", ok: "Да", cancel: "Отменить",
			callback: function callback(res) {
				if (res) {
					var request_val = wxform.getValues();
					request_val.grid_id = wxgrid.config.id;
					webix.ajax().post("index.php?route=" + route, request_val, function (text) {
						if (!!JSON.parse(text).warning) {
							webix.message({
								text: JSON.parse(text).warning,
								type: "error",
								expire: 5000
							}); //show server side response
							return false;
						} else {
							wxgrid.remove(wxgrid.getSelectedId());
						}
					});
				}
			}
		});
	}
}, { view: "switch", id: "selectall", width: 140, borderless: false, onLabel: "Отменить", offLabel: "Выделить все", value: 0,
	on: {
		'onItemClick': function onItemClick(id) {
			var wxgrid = this.getParentView().getParentView().queryView({ view: "datatable" });
			var val = this.getValue();
			if (val == "1") {
				wxgrid.selectRange(wxgrid.getFirstId(), wxgrid.getLastId(), true);
			} else {
				wxgrid.clearSelection();
			}
		}
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./sources/views/menus/toolplug.js":
/*!*****************************************!*\
  !*** ./sources/views/menus/toolplug.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var controls = [{ view: "icon", type: "icon", borderless: false, icon: "mdi mdi-pencil", tooltip: "Заполнение формы", click: function click() {
		//webix.toPNG(webix.grid);
	}
}, {}];

/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./sources/views/modules/bestsellers.js":
/*!**********************************************!*\
  !*** ./sources/views/modules/bestsellers.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var header = {
	"template": "<span class='webix_icon mdi mdi-trophy'></span>Лучшие клиенты", "css": "sub_title", "height": 50
};

var list = {
	"view": "list",
	css: "chat_list",
	maxHeight: 270,
	minHeight: 230,
	"type": {
		"height": "auto",
		"template": function template(obj) {
			var text = "<table><tr class='total-list'><td><span class='webix_icon mdi mdi-car total-objects'></span></td><td width='40%'>Всего объектов </td><td width='10%'>" + obj.total_objects + "</td>" + "<td> </td><td><span class='webix_icon mdi mdi-car total-objects-on'></span></td><td width='40%'>Подключено </td><td width='10%'>" + obj.total_on + "</td></tr>" + "<tr class='total-list'><td><span class='webix_icon mdi mdi-car tracker-online-f'></span></td><td width='40%'>Работало </td><td width='10%'>" + obj.total_online + "<td> </td><td><span class='webix_icon mdi mdi-car tracker-offline-f'></span></td><td width='40%'>Не работало </td><td width='10%'>" + obj.total_offline + "</td></tr></table>";
			var html = "<img class='photo' src='image/wtools/photos/" + obj.id + ".png' />";
			html += "<div class='text'><div class='name'>" + obj.ownername + "</div>";
			html += text + "</div>";
			return html;
		}
	},
	url: "index.php?route=report/total/getBestsellers&token=" + token
};

var layout = {
	type: "clean",
	rows: [header, list]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/chart_diff.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/chart_diff.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dataset = [{ sales: 4.1, sales2: 8.0, year: "08" }, { sales: 4.3, sales2: 9.0, year: "09" }, { sales: 7.6, sales2: 11.0, year: "10" }, { sales: 7.8, sales2: 13.0, year: "11" }, { sales: 7.2, sales2: 10.0, year: "12" }, { sales: 5.3, sales2: 14.0, year: "13" }, { sales: 4.8, sales2: 12.0, year: "14" }];

var chart = {
	view: "chart",
	type: "bar",
	barWidth: 40,
	padding: {
		left: 30,
		bottom: 60
	},
	radius: 0,
	yAxis: {},
	xAxis: {
		lines: true,
		title: "Sales per year<br/>&nbsp;",
		template: "'#id#"
	},
	legend: {
		layout: "y",
		width: 100,
		align: "right",
		valign: "middle",
		values: [{ text: "Asia", color: "#61b5ee" }, { text: "Europe", color: "#e9df40" }, { text: "Average", toggle: true, markerType: "item" }]
	},
	scheme: {
		$group: {
			by: "year",
			map: {
				salesA: ["sales2", "any"],
				salesB: ["sales", "any"],
				salesAverage: ["sales", getAverage]
			}
		}
	},
	series: [{
		value: "#salesA#",
		color: "#61b5ee",

		gradient: "falling",
		alpha: 0.8
	}, {
		type: "area",
		alpha: 0.4,
		value: "#salesB#",
		color: "#e9df40"
	}, {
		type: "line",
		value: "#salesAverage#",
		item: {
			radius: 2,
			borderColor: "#27ae60"
		},
		line: {
			color: "#27ae60",
			width: 2
		}
	}],
	data: dataset
};
function getAverage(property, data) {
	var summ = 0;
	for (var i = 0; i < data.length; i++) {
		summ += parseFloat(data[i].sales) || 0;
		summ += parseFloat(data[i].sales2) || 0;
	}
	return data.length ? summ / (data.length * 2) : 0;
}

/* harmony default export */ __webpack_exports__["default"] = (chart);

/***/ }),

/***/ "./sources/views/modules/dashline.js":
/*!*******************************************!*\
  !*** ./sources/views/modules/dashline.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "template",
	id: "dashline",
	height: 150,
	css: "tiles",
	src: "index.php?route=common/dashboard&token=" + token
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/modules/data_pager.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/data_pager.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_orders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/orders */ "./sources/models/orders.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DataPagerView = function (_JetView) {
	_inherits(DataPagerView, _JetView);

	function DataPagerView() {
		_classCallCheck(this, DataPagerView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	DataPagerView.prototype.config = function config() {
		return layout;
	};

	DataPagerView.prototype.init = function init(view) {
		view.queryView({ view: "datatable" }).parse(models_orders__WEBPACK_IMPORTED_MODULE_1__["default"]);
	};

	return DataPagerView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (DataPagerView);


var titlePager = {
	view: "toolbar",
	css: "highlighted_header header5",
	paddingX: 5,
	paddingY: 5,
	height: 40,
	cols: [{
		"template": "<span class='webix_icon fa-file-text-o'></span>Pager", "css": "sub_title2", borderless: true
	}, { view: "button", type: "iconButton", icon: "external-link", label: "Export", width: 100 }, { view: "button", type: "iconButton", icon: "pencil-square-o", label: "Edit", width: 80 }]
};
var gridPager = {
	margin: 10,
	rows: [{
		id: "orderData",
		view: "datatable", select: true,
		columns: [{ id: "id", header: "#", width: 50 }, { id: "employee", header: ["Employee", { content: "selectFilter" }], sort: "string", minWidth: 150, fillspace: 1 }, { id: "customer", header: ["Customer", { content: "selectFilter" }], sort: "string", minWidth: 150, fillspace: 1 }, { id: "status", header: "Status", sort: "string", width: 90 }, { id: "fee", header: "Fee", width: 90, sort: "string", format: webix.i18n.priceFormat }, { id: "taxes", header: "Taxes", width: 90, sort: "string", format: webix.i18n.priceFormat }, { id: "total", header: "Total", width: 90, sort: "string", format: webix.i18n.priceFormat }, { id: "shipping_company", header: "Shipping Company", sort: "string" }, { id: "payment_method", header: "Payment method", width: 130, sort: "string" }, { id: "date", header: "Date", sort: "string", width: 100 }, { id: "trash", header: "&nbsp;", width: 35, template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>" }],
		export: true,
		on: {
			onAfterLoad: function onAfterLoad() {
				this.select(4);
			}
		},
		onClick: {
			webix_icon: function webix_icon(e, id) {
				webix.confirm({
					text: "Are you sure sdfds", ok: "Yes", cancel: "Cancel",
					callback: function callback(res) {
						if (res) {
							webix.$$("orderData").remove(id);
						}
					}
				});
			}
		},
		autoheight: true,
		pager: "pagerA"
	}, {
		view: "pager", id: "pagerA",
		size: 5,
		height: 35,
		group: 5

	}]
};

var layout = {
	type: "clean",
	rows: [titlePager, gridPager]
};

/***/ }),

/***/ "./sources/views/modules/data_progress.js":
/*!************************************************!*\
  !*** ./sources/views/modules/data_progress.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_data_arrays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/data_arrays */ "./sources/models/data_arrays.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DataProgressView = function (_JetView) {
	_inherits(DataProgressView, _JetView);

	function DataProgressView() {
		_classCallCheck(this, DataProgressView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	DataProgressView.prototype.config = function config() {
		return layout;
	};

	DataProgressView.prototype.init = function init(view) {
		view.queryView({ view: "datatable" }).parse(models_data_arrays__WEBPACK_IMPORTED_MODULE_1__["progress"]);
	};

	return DataProgressView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (DataProgressView);


var titleProgress = {
	view: "toolbar",
	css: "highlighted_header header4",
	paddingX: 5,
	paddingY: 5,
	height: 40,
	cols: [{
		"template": "<span class='webix_icon fa-adjust'></span>Progress", "css": "sub_title2", borderless: true
	}, { view: "button", type: "iconButton", icon: "sliders", label: "Update", width: 100 }]
};
var gridProgress = {
	view: "datatable",
	columns: [{ id: "id", header: "", width: 35, sort: "int" }, { id: "name", header: "Task", fillspace: 4, sort: "string" }, { id: "progress", header: "Progress", sort: "int", fillspace: 2.5, template: function template(obj) {
			var html = "<div class='progress_bar_element'>";
			var className = "progress_result " + (obj.type || "");
			html += "<div title='" + (parseInt(obj.progress * 100, 10) + "%") + "' class='" + className + "' style='width:" + (obj.progress * 100 + "%") + "'></div>";
			return html + "</div>";
		} }, { id: "num", header: "Num, %", sort: function sort(a, b) {

			a = a.progress;
			b = b.progress;
			return a > b ? 1 : a < b ? -1 : 0;
		}, fillspace: 1.5, template: function template(obj) {
			return parseInt(obj.progress * 100, 10) + "%";
		} }],
	autoheight: true
};

var layout = {
	type: "clean",
	rows: [titleProgress, gridProgress]
};

/***/ }),

/***/ "./sources/views/modules/data_rating.js":
/*!**********************************************!*\
  !*** ./sources/views/modules/data_rating.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_data_arrays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/data_arrays */ "./sources/models/data_arrays.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DataRatingView = function (_JetView) {
	_inherits(DataRatingView, _JetView);

	function DataRatingView() {
		_classCallCheck(this, DataRatingView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	DataRatingView.prototype.config = function config() {
		return layout;
	};

	DataRatingView.prototype.init = function init(view) {
		view.queryView({ view: "datatable" }).parse(models_data_arrays__WEBPACK_IMPORTED_MODULE_1__["rating"]);
	};

	return DataRatingView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (DataRatingView);


var titleRating = {

	view: "toolbar",
	css: "highlighted_header header1",
	paddingX: 5,
	paddingY: 5,
	height: 40,
	cols: [{
		"template": "<span class='webix_icon fa-star-o'></span>Rating", "css": "sub_title2", borderless: true
	}, { view: "button", type: "iconButton", icon: "refresh", width: 100, label: "Refresh" }]
};

var gridRating = {
	view: "datatable",
	columns: [{ id: "id", header: "", sort: "int", width: 35 }, { id: "name", header: "Procut", fillspace: 4, sort: "string" }, { id: "code", header: "Code", sort: "string", fillspace: 2 }, { id: "rating", header: "Rating", sort: "int", fillspace: 2, minWidth: 80,
		template: function template(obj) {
			var html = "<div class='rating_bar_element star" + obj.rating + "'>";

			for (var i = 1; i < 6; i++) {
				html += "<div title='" + i + "' class='rating_star star" + i + "' style='left:" + (i * 16 - 16) + "px'></div>";
			}return html + "</div>";
		}
	}],
	onClick: {
		rating_star: function rating_star(ev, id) {
			this.getItem(id.row)[id.column] = (ev.target || ev.srcElement).getAttribute("title");
			this.updateItem(id.row);
		}
	},
	autoheight: true,
	scheme: {
		$init: function $init(obj) {
			obj.index = this.count();
		}
	}
};

var layout = {
	type: "clean",
	rows: [titleRating, gridRating]
};

/***/ }),

/***/ "./sources/views/modules/data_spans.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/data_spans.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_data_arrays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/data_arrays */ "./sources/models/data_arrays.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DataSpansView = function (_JetView) {
	_inherits(DataSpansView, _JetView);

	function DataSpansView() {
		_classCallCheck(this, DataSpansView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	DataSpansView.prototype.config = function config() {
		return layout;
	};

	DataSpansView.prototype.init = function init(view) {
		view.queryView({ view: "datatable" }).parse(models_data_arrays__WEBPACK_IMPORTED_MODULE_1__["colspans"]);
	};

	return DataSpansView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (DataSpansView);


var titleGroup = {
	view: "toolbar",
	css: "highlighted_header header2",
	paddingX: 5,
	paddingY: 5,
	height: 40,
	cols: [{
		"template": "<span class='webix_icon fa-arrows-v'></span>Spans", "css": "sub_title2", borderless: true
	}, { view: "icon", icon: "refresh", width: 40 }]
};
var gridGroup = {
	view: "datatable",
	columns: [{ id: "region", header: "Region", fillspace: 1 }, { id: "name", header: "Product", fillspace: 2 }, { id: "code", header: "Code", fillspace: 1, tooltip: "", editor: "text" }, { id: "sales", header: "Sales", fillspace: 1 }],
	spans: true,
	autoheight: true,
	select: "cell"
};

var layout = {
	type: "clean",
	rows: [titleGroup, gridGroup]
};

/***/ }),

/***/ "./sources/views/modules/data_treetable.js":
/*!*************************************************!*\
  !*** ./sources/views/modules/data_treetable.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_data_arrays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/data_arrays */ "./sources/models/data_arrays.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DataTreeTableView = function (_JetView) {
	_inherits(DataTreeTableView, _JetView);

	function DataTreeTableView() {
		_classCallCheck(this, DataTreeTableView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	DataTreeTableView.prototype.config = function config() {
		return layout;
	};

	DataTreeTableView.prototype.init = function init(view) {
		view.queryView({ view: "treetable" }).parse(webix.copy(models_data_arrays__WEBPACK_IMPORTED_MODULE_1__["treetable"]));
	};

	return DataTreeTableView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (DataTreeTableView);


var titleTree = {
	view: "toolbar",
	css: "highlighted_header header3",
	paddingX: 5,
	paddingY: 5,
	height: 40,
	cols: [{
		"template": "<span class='webix_icon fa-folder-o'></span>Treetable", "css": "sub_title2", borderless: true
	}, { view: "button", type: "iconButton", icon: "external-link", label: "Export", width: 100 }]
};
var gridTree = {
	view: "treetable",
	columns: [{ id: "id", header: "", width: 35 }, { id: "name", header: "Product", fillspace: 4,
		template: "{common.treetable()} #name#" }, { id: "code", header: "Code", sort: "int", fillspace: 2 }, { id: "sales", header: "Sales", sort: "int", fillspace: 2 }],
	select: true,
	type: {
		icon: function icon(obj) {
			if (obj.$count) {
				if (obj.open) return "<span class='webix_icon fa-angle-down'></span>";else return "<div class='webix_icon fa-angle-right'></div>";
			} else return "<div class='webix_tree_none'></div>";
		},
		folder: function folder(obj) {
			if (obj.$count) {
				if (obj.open) return "<span class='webix_icon fa-folder-open-o'></span>";else return "<span class='webix_icon fa-folder-o'></span>";
			}
			return "<div class='webix_icon fa-file-o'></div>";
		}
	},
	onClick: {
		"fa-angle-down": function faAngleDown(e, id) {

			this.close(id);
		},
		"fa-angle-right": function faAngleRight(e, id) {
			this.open(id);
		}
	},
	on: {
		onAfterLoad: function onAfterLoad() {
			this.select(12);
		}
	}
};

var layout = {
	type: "clean",
	rows: [titleTree, gridTree]
};

/***/ }),

/***/ "./sources/views/modules/diffchart.js":
/*!********************************************!*\
  !*** ./sources/views/modules/diffchart.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var tasks = {
	gravity: 3,
	"type": "clean",
	"rows": [{
		"template": "<span class='webix_icon fa-pie-chart'></span>Pie chart", "css": "sub_title", "height": 30
	}, {
		"view": "chart",
		"type": "pie3D",
		color: "#color#",
		shadow: false,
		tooltip: {
			template: "#value#%"
		},
		minHeight: 200,
		padding: {
			left: 15,
			right: 15,
			bottom: 10,
			top: 10
		},
		legend: {
			layout: "y",
			width: 100,
			align: "right",
			valign: "middle",
			template: "#region#"
		},
		data: [{ color: "#61b5ee", region: "Asia", value: 35 }, { color: "#27ae60", region: "Europe", value: 30 }, { color: "#9e89eb", region: "USA", value: 25 }, { color: "#f19b60", region: "Australia", value: 10 }]
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (tasks);

/***/ }),

/***/ "./sources/views/modules/editor.js":
/*!*****************************************!*\
  !*** ./sources/views/modules/editor.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var views_webix_ckeditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/webix/ckeditor */ "./sources/views/webix/ckeditor.js");
/* harmony import */ var views_webix_ckeditor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(views_webix_ckeditor__WEBPACK_IMPORTED_MODULE_0__);


var form = {
	view: "form",
	id: "mainView",
	elementsConfig: {

		labelWidth: 130
	},
	scroll: true,
	elements: [{ view: "text", name: "code", label: "Code" }, { view: "text", name: "name", label: "Name" }, { view: "text", name: "price", label: "Price" }, { view: "richselect", name: "category", label: "Category", vertical: true, options: [{ id: 2, value: "Home furniture" }, { id: 3, value: "Office furniture" }, { id: 1, value: "Wood furniture" }] }, { view: "richselect", name: "status", value: "all", label: "Status", options: [{ id: "1", value: "Published" }, { id: "2", value: "Not published" }, { id: "0", value: "Deleted" }] }, { view: "checkbox", name: "in_stock", label: "In stock", value: 1 }, { view: "label", label: "Full description", height: 30 }, { id: "editor", view: "textarea", value: "", editor: { language: "en" }, minHeight: 200 }, {}]
};

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./sources/views/modules/form_event.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/form_event.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var layout = {
	type: "clean",
	rows: [{
		view: "toolbar",
		css: "highlighted_header header3",
		paddingX: 5,
		paddingY: 5,
		height: 40,
		cols: [{
			"template": "<span class='webix_icon fa-star-o'></span>Event", "css": "sub_title2", borderless: true
		}, {
			view: "button", label: "Close", width: 80
		}]
	}, {
		view: "form",
		elementsConfig: {
			labelWidth: 100
		},
		elements: [{ view: "text", label: "Event Name" }, { view: "datepicker", label: "Start Date", value: new Date(), timepicker: true, format: "%H:%i %D, %d %M" }, { view: "datepicker", label: "End Date", value: webix.Date.add(new Date(), 1, "hour"), format: "%H:%i %D, %d %M", timepicker: true }, { view: "checkbox", label: "All-day" }, { view: "richselect", label: "Calendar", value: "1", options: [{ id: 1, value: "My Calendar" }, { id: 2, value: "Webix project" }, { id: 3, value: "Other" }] }, { view: "textarea", label: "Details", height: 80 }, {
			margin: 10,
			paddingX: 2,
			borderless: true,
			cols: [{}, { view: "button", label: "Reset", align: "right" }, { view: "button", label: "Save", type: "form", align: "right" }]
		}]

	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/form_project.js":
/*!***********************************************!*\
  !*** ./sources/views/modules/form_project.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var layout = {

	"type": "clean",
	"rows": [{
		view: "toolbar",
		css: "highlighted_header header2",
		paddingX: 5,
		paddingY: 5,
		height: 40,
		cols: [{
			"template": "<span class='webix_icon fa-sliders'></span>Project", "css": "sub_title2", borderless: true
		}, {
			view: "richselect", value: "Webix", options: ["Webix", "Kanban", "Pivot"], width: 105
		}]

	}, {
		view: "form",
		id: "projectForm",
		elementsConfig: {
			labelWidth: 100
		},
		elements: [{ view: "slider", css: "slider3", label: "Task 1", value: "80", step: 1, name: "s1", title: webix.template("#value#%") }, { view: "slider", css: "slider2", label: "Task 2", value: "20", step: 1, name: "s2", title: webix.template("#value#%") }, { view: "slider", css: "slider1", label: "Task 3", value: "60", step: 1, name: "s3", title: webix.template("#value#%") }, {
			margin: 10,
			paddingX: 2,
			borderless: true,
			cols: [{}, { view: "button", label: "Next", type: "form", align: "right", width: 80 }]
		}]
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/form_style.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/form_style.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var layout = {
	type: "clean",
	rows: [{
		view: "toolbar",
		css: "highlighted_header header4",
		paddingX: 5,
		paddingY: 5,
		height: 40,
		cols: [{
			"template": "<span class='webix_icon fa-paint-brush'></span>Style", "css": "sub_title2", borderless: true
		}, { view: "segmented", options: ["Header", "Content", "Buttons"], width: 210 }]
	}, {
		view: "form",
		elementsConfig: {
			labelWidth: 100,
			labelPosition: "top"
		},
		elements: [{ view: "combo", label: "Font Family", value: "Arial", options: ["Arial", "Tahoma", "Verdana"] }, { view: "radio", name: "fontWeigth", label: "Font Weigth", value: "400", options: ["400", "500", "700"] }, { view: "colorpicker", label: "Background", value: "#a693eb" }, { view: "colorpicker", label: "Font Color", value: "#a4b4bf" }, { view: "text", label: "Font Size (px)", value: "14" }, {
			margin: 10,
			paddingX: 2,
			borderless: true,
			cols: [{}, { view: "button", type: "iconButton", icon: "angle-left", label: "Back", align: "right", width: 90 }, { view: "button", type: "form", label: "Done", align: "right", width: 90 }]
		}]

	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/form_user.js":
/*!********************************************!*\
  !*** ./sources/views/modules/form_user.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var layout = {

	type: "clean",
	rows: [{
		view: "toolbar",
		css: "highlighted_header header1",
		paddingX: 5,
		paddingY: 5,
		height: 40,
		cols: [{
			"template": "<span class='webix_icon fa-male'></span>User", "css": "sub_title2", borderless: true
		}, {
			view: "button", label: "Close", width: 80
		}]
	}, {
		view: "form",
		id: "userForm",
		elementsConfig: {
			labelWidth: 120
		},
		elements: [{ view: "text", label: "First Name", name: "name1" }, { view: "text", label: "Last Name", name: "name2" }, { view: "datepicker", label: "Date of Birth", name: "date" }, { view: "text", label: "Phone Number" }, {
			margin: 10,
			paddingX: 2,
			borderless: true,
			cols: [{}, { view: "button", label: "Reset", align: "right" }, { view: "button", label: "Save", type: "form", align: "right" }]
		}]

	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/groupfilter.js":
/*!**********************************************!*\
  !*** ./sources/views/modules/groupfilter.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (webix.ui.datafilter.eyeFilter = {
  getInputNode: function getInputNode(node) {
    return node.firstChild ? node.firstChild.firstChild : { value: null };
  },
  getValue: function getValue(node) {
    return this.getInputNode(node).value;
  },
  setValue: function setValue(node, value) {
    this.getInputNode(node).value = value.toString();
  },
  refresh: function refresh(master, node, column) {
    master.registerFilter(node, column, this);
    column.compare = column.compare || function (value, filter) {
      if (filter === "") return true;else if (filter === "1") return value == 1;else if (filter === "0") return value == 0;
    };
    node.onchange = function () {
      master.filterByAll();
    };
    node.onclick = webix.html.preventEvent;
  },
  render: function render(a, b) {
    return "<select id=" + b.columnId + ">" + "<option value=''></option>" + "<option value='0' class='wialon-group-on'>Подключена</option>" + "<option value='1' class='wialon-group-off'>Отключена</option>" + "</select>";
  }
});

/***/ }),

/***/ "./sources/views/modules/lastobjects.js":
/*!**********************************************!*\
  !*** ./sources/views/modules/lastobjects.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var header = {
	view: "template",
	src: "index.php?route=report/total/getTotalLast&token=" + token,
	"css": "sub_title", "height": 50
};

var grid = {
	id: "report-total-last",
	view: "datatable",
	header: false,
	"export": true,
	columns: [{ id: "date_created", minWidth: 80, format: webix.Date.dateToStr("%d.%m.%Y") }, { id: "itemname", minWidth: 120, fillspace: 2 }, { id: "ownername", minWidth: 120, fillspace: 2 }],
	url: "index.php?route=report/total/getLast&token=" + token
};

var layout = {
	type: "clean",
	rows: [header, grid]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/map.js":
/*!**************************************!*\
  !*** ./sources/views/modules/map.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var map = {
	rows: [{
		template: "<span class='webix_icon fa-map-marker'></span>Events Map", type: "header", "css": "sub_title", "height": 50
	}, {
		view: "google-map",
		id: "map",
		// provide your own Google API key
		// https://developers.google.com/maps/documentation/javascript/get-api-key
		key: "AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
		zoom: 3,
		center: [48.724, 8.215]
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (map);

/***/ }),

/***/ "./sources/views/modules/messages.js":
/*!*******************************************!*\
  !*** ./sources/views/modules/messages.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var header = {
	"template": "<span class='webix_icon fa-comments-o'></span>Messages", "css": "sub_title", "height": 50
};

var list = {
	"view": "list",
	css: "chat_list",
	maxHeight: 300,
	minHeight: 250,
	"type": {
		"height": "auto",
		"template": function template(obj) {
			var text = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. ";
			var html = "<img class='photo' src='assets/imgs/photos/" + obj.personId + ".png' />";
			html += "<div class='text'><div class='name'>" + obj.name + "<div class='time'>" + obj.time + "</div></div>";
			html += text + "</div>";
			return html;
		}
	},
	"data": [{ id: 1, personId: 1, time: "Just now", name: "Peter Johnson" }, { id: 2, personId: 2, time: "Just now", name: "Vera Liu" }, { id: 3, personId: 1, time: "11:40", name: "Peter Johnson" }, { id: 4, personId: 2, time: "11:30", name: "Vera Liu" }, { id: 5, personId: 1, time: "10:10", name: "Peter Johnson" }, { id: 6, personId: 2, time: "9:50", name: "Vera Liu" }]
};

var form = {
	view: "form",
	css: "show_all",
	paddingX: 10,
	paddingY: 2,

	cols: [{
		view: "text", placeholder: "Type a message here", height: 36
	}, {
		view: "icon", icon: "search", height: 36
	}]
};

var layout = {
	type: "clean",
	rows: [header, { rows: [list, form] }]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/onlinefilter.js":
/*!***********************************************!*\
  !*** ./sources/views/modules/onlinefilter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (webix.ui.datafilter.onlFilter = {
  getInputNode: function getInputNode(node) {
    return node.firstChild ? node.firstChild.firstChild : { value: null };
  },
  getValue: function getValue(node) {
    return this.getInputNode(node).value;
  },
  setValue: function setValue(node, value) {
    this.getInputNode(node).value = value.toString();
  },
  refresh: function refresh(master, node, column) {
    master.registerFilter(node, column, this);
    column.compare = column.compare || function (value, filter) {
      if (filter === "") return true;else if (filter === "1") return value == 1;else if (filter === "0") return value == 0;
    };
    node.onchange = function () {
      master.filterByAll();
    };
    node.onclick = webix.html.preventEvent;
  },
  render: function render(a, b) {
    return "<select id=" + b.columnId + ">" + "<option value=''></option>" + "<option value='1' class='tracker-online'>Online</option>" + "<option value='0' class='tracker-offline'>Offline</option>" + "</select>";
  }
});

/***/ }),

/***/ "./sources/views/modules/order_statesfilter.js":
/*!*****************************************************!*\
  !*** ./sources/views/modules/order_statesfilter.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* harmony default export */ __webpack_exports__["default"] = (webix.ui.datafilter.staFilter = {
    getInputNode: function getInputNode(node) {
        return node.firstChild ? node.firstChild.firstChild : { value: null };
    },
    getValue: function getValue(node) {
        return this.getInputNode(node).value;
    },
    setValue: function setValue(node, value) {
        this.getInputNode(node).value = value.toString();
    },
    refresh: function refresh(master, node, column) {
        master.registerFilter(node, column, this);
        column.compare = column.compare || function (value, filter) {
            if (filter === "") return true;else if (filter === "1") return value == 'open';else if (filter === "0") return value == 'closed';
        };
        node.onchange = function () {
            master.filterByAll();
        };
        node.onclick = webix.html.preventEvent;
    },
    render: function render(a, b) {
        return "<select id=" + b.columnId + ">" + "<option value=''></option>" + "<option value='1' class='order-status order-open'>Открыта</option>" + "<option value='0' class='order-status order-closed'>Закрыта</option>" + "</select>";
    }
});

/***/ }),

/***/ "./sources/views/modules/orderschart.js":
/*!**********************************************!*\
  !*** ./sources/views/modules/orderschart.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_orders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/orders */ "./sources/models/orders.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var OrdersChartView = function (_JetView) {
	_inherits(OrdersChartView, _JetView);

	function OrdersChartView() {
		_classCallCheck(this, OrdersChartView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	OrdersChartView.prototype.config = function config() {
		return ui;
	};

	OrdersChartView.prototype.init = function init(view) {
		var userinfo = this.app.getService("user").getUser();
		view.queryView({ view: "chart" }).parse(Object(models_orders__WEBPACK_IMPORTED_MODULE_1__["default"])(userinfo.token));
	};

	return OrdersChartView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (OrdersChartView);


var ui = {
	"type": "clean",
	"rows": [{
		"template": "<span class='webix_icon mdi mdi-checkbox-multiple-marked-outline'></span>Обслуживание заявок за год", "css": "sub_title", "height": 30
	}, {
		"view": "chart", "type": "bar",
		"legend": {
			"layout": "x",
			"align": "right",
			"values": [{ "text": "Открытые", "color": "#f19b60" }, { "text": "Закрытые", "color": "#49cd81" }]
		},
		"xAxis": {
			"template": "#month#"
		},
		"yAxis": {
			start: 0
		},
		barWidth: 20,
		alpha: 0.7,
		radius: 0,
		"offset": 0,
		"series": [{ "value": "#total_open#", "color": "#f19b60", "item": { "borderColor": "#fff", "color": "#f19b60", "radius": 2 }, "line": { "color": "#f19b60", "width": 2 }, "tooltip": { "template": "#total_open#" } }, { "value": "#total_closed#", "color": "#49cd81", "item": { "borderColor": "#fff", "color": "#49cd81", "radius": 2 }, "line": { "color": "#49cd81", "width": 2 }, "tooltip": { "template": "#total_closed#" } }],
		//"series":[
		//	{
		//		"value": "#number#",
		//		color: "#9e89eb",

		//		"item":{
		//			"borderColor": "#fff",
		//			"color": "#49cd81",
		//			"radius": 3
		//		},
		//		"line":{
		//			"color":"#b07be5",
		//			"width":2
		//		}
		//	}
		//],
		"padding": {
			"top": 25
		}
		/* "data":[
  	{"id": 1, "month": "Jun", "total_closed": 100, "total_open": 100,},
  	{"id": 2, "month": "Jul", "total_closed": 150, "total_open": 200,},
  	{"id": 3, "month": "Aug", "total_closed": 160, "total_open": 220,},
  	{"id": 4, "month": "Sep", "total_closed": 200, "total_open": 250,},
  	{"id": 5, "month": "Oct", "total_closed": 100, "total_open": 80,},
  ] */
	}]
};

//export default ui;

/***/ }),

/***/ "./sources/views/modules/paging.js":
/*!*****************************************!*\
  !*** ./sources/views/modules/paging.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var paging = {
	view: "toolbar",
	id: "paging",
	css: "highlighted_header header6",
	paddingX: 5, paddingY: 5, height: 40,
	cols: [{
		view: "pager", id: "pagerA",
		template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
		autosize: true,
		//size: 50,
		height: 35,
		group: 5
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (paging);

//https://snippet.webix.com/4teaka0o

/***/ }),

/***/ "./sources/views/modules/product_meta.js":
/*!***********************************************!*\
  !*** ./sources/views/modules/product_meta.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "form",
	id: "metaView",
	elementsConfig: {
		labelWidth: 130
	},
	elements: [{ view: "text", name: "meta_title", label: "Title" }, { view: "textarea", label: "Meta Keywords", gravity: 1, minHeight: 80 }, { view: "textarea", label: "Meta Description", gravity: 1.5, minHeight: 80 }, {}]
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/modules/product_search.js":
/*!*************************************************!*\
  !*** ./sources/views/modules/product_search.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/products */ "./sources/models/products.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SearchView = function (_JetView) {
	_inherits(SearchView, _JetView);

	function SearchView() {
		_classCallCheck(this, SearchView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	SearchView.prototype.config = function config() {
		return layout;
	};

	SearchView.prototype.init = function init(view) {
		view.queryView({ view: "list" }).parse(models_products__WEBPACK_IMPORTED_MODULE_1__["data"]);
	};

	return SearchView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (SearchView);


var layout = {
	rows: [{
		view: "form",

		paddingX: 5,
		paddingY: 5,
		margin: 2,
		rows: [{ view: "label", label: "Find product:" }, { view: "search" }]
	}, {
		view: "list",
		id: "list",
		select: true,
		template: "<div class='marker status#status#'></div>#code# / #name#"
	}]
};

/***/ }),

/***/ "./sources/views/modules/product_upload.js":
/*!*************************************************!*\
  !*** ./sources/views/modules/product_upload.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	id: "imagesView",
	padding: 10,
	margin: 10,
	rows: [{
		cols: [{}, {
			view: "button", type: "iconButton", icon: "plus-circle", label: "Add image record", width: 170
		}]
	}, {
		view: "datatable",
		editable: true,
		columns: [{ id: "photo", header: "Image", template: "<span class='product_image webix_icon fa-#icon#'></span>", fillspace: 1 }, { id: "title", editor: "text", header: "Title", fillspace: 1.7 }, { id: "usage", editor: "select", options: ["Main image", "Thumbnail"], header: "Usage", fillspace: 1.2 }, { id: "upload", header: "Upload", template: "<div title='Click to upload' class='product_image_action'><span class='webix_icon fa-download'></span>Upload</div>", fillspace: 1 }, { id: "delete", header: "Delete", template: "<div title='Click to delete' class='product_image_action'><span class='webix_icon fa-times'></span>Delete</div>", fillspace: 1 }],
		autoheight: true,
		rowHeight: 80,
		data: [{ id: 1, title: "Product image 1", usage: "Main image", icon: "camera" }, { id: 2, title: "Product image 2", usage: "Thumbnail", icon: "camera" }],
		on: {
			onAfterLoad: function onAfterLoad() {
				webix.ui({
					id: "uploadAPI",
					view: "uploader",
					upload: "server/upload.php",
					on: {
						onFileUploadError: function onFileUploadError() {
							webix.alert("Error during file upload");
						}
					},
					apiOnly: true
				});
			},
			onItemClick: function onItemClick(id) {
				if (id.column == "upload") webix.$$("uploadAPI").fileDialog({ rowid: id.row });
			},
			onDestruct: function onDestruct() {
				webix.$$("uploadAPI").destructor();
			}
		}
	}, {}]

};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/modules/revenue.js":
/*!******************************************!*\
  !*** ./sources/views/modules/revenue.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var chart = {
	view: "chart",
	type: "line",
	xAxis: {
		template: "#month#"
	},
	tooltip: {
		template: "#number#M $"
	},
	minHeight: 140,
	yAxis: {
		"start": 0,
		"end": 450,
		"step": 150
	},
	offset: false,
	series: [{
		"value": "#number#",

		"item": {
			"borderColor": "#fff",
			"color": "#61b5ee",
			"radius": 4
		},
		"line": {
			"color": "#61b5ee",
			"width": 1
		}
	}],
	padding: {
		"top": 25
	},
	data: [{ "id": 1, "month": "Jun", "number": 90 }, { "id": 2, "month": "Jul", "number": 220 }, { "id": 3, "month": "Aug", "number": 180 }, { "id": 4, "month": "Sep", "number": 405 }, { "id": 5, "month": "Oct", "number": 275 }]
};

var donut1 = {
	view: "chart",
	css: "donut_result",
	type: "donut",
	shadow: false,
	color: "#color#",
	pieInnerText: function pieInnerText(obj) {
		return obj.result ? "<div class='donut_result'>" + obj.value + "</div>" : "";
	},
	padding: {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10
	},
	data: [{ value: 30, color: "#61b5ee", result: 1 }, { value: 70, color: "#eee" }]
};

var donut2 = {
	view: "chart",
	type: "donut",
	shadow: false,
	css: "donut_result",
	color: "#color#",
	padding: {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10
	},
	pieInnerText: function pieInnerText(obj) {
		return obj.result ? "<div class='donut_result'>" + obj.value + "</div>" : "";
	},
	data: [{ value: 25, color: "#61b5ee", result: 1 }, { value: 75, color: "#eee" }]
};

var donut3 = {
	view: "chart",
	type: "donut",
	css: "donut_result",
	shadow: false,
	color: "#color#",
	pieInnerText: function pieInnerText(obj) {
		return obj.result ? "<div class='donut_result'>" + obj.value + "</div>" : "";
	},
	padding: {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10
	},
	data: [{ value: 45, color: "#61b5ee", result: 1 }, { value: 55, color: "#eee" }]
};

var layout = {
	type: "clean",
	rows: [chart, {
		height: 90,
		type: "clean",
		cols: [donut1, donut2, donut3]
	}, {
		height: 40,
		type: "clean",
		css: "donut_titles",
		cols: [{
			template: "Europe"
		}, {
			template: "Asia"
		}, {
			template: "Northern America"
		}]
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/modules/scheduler.js":
/*!********************************************!*\
  !*** ./sources/views/modules/scheduler.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/events */ "./sources/models/events.js");
/* harmony import */ var views_webix_scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/webix/scheduler */ "./sources/views/webix/scheduler.js");
/* harmony import */ var views_webix_scheduler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(views_webix_scheduler__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SchedulerView = function (_JetView) {
	_inherits(SchedulerView, _JetView);

	function SchedulerView() {
		_classCallCheck(this, SchedulerView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	SchedulerView.prototype.config = function config() {
		return layout;
	};

	return SchedulerView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (SchedulerView);


var layout = {
	minWidth: 500,
	gravity: 2,
	rows: [{
		type: "wide",
		cols: [{

			width: 240,

			rows: [{ view: "calendar", on: {
					onDateSelect: function onDateSelect(date) {
						scheduler.updateView(date, "week");
					}
				} }, {
				view: "form",
				rows: [{ view: "list", id: "calendarList", borderless: true, css: "calendar_list", autoheight: true, template: "<div><span class='calendar_icon #id#'></span>#name#</div>", data: [{ id: "my", name: "My Calendar", active: true }, { id: "company", name: "Webix Project", active: true }],
					on: {
						onItemClick: function onItemClick(calendarId) {
							var item = this.getItem(calendarId);
							item.active = !item.active;
							item.$css = item.active ? "" : "disabled";
							this.refresh(calendarId);
							scheduler.updateView();
						}
					}
				}, { view: "button", label: "Add new calendar", align: "left" }, {}]
			}]
		}, {
			view: "dhx-scheduler",
			date: new Date(),

			mode: "month",
			tabs: ["day", "week", "month"],
			init: function init() {
				//scheduler.config.month_day_min_height = 50;
				scheduler.config.xml_date = "%Y-%m-%d %H:%i";
				scheduler.config.first_hour = 7;
				scheduler.config.last_hour = 24;
				scheduler.config.multi_day = true;
				scheduler.templates.event_class = function (s, e, ev) {
					return ev.calendar ? "other" : "";
				};
				var d = scheduler.date.date_to_str;
				var week1 = d("%d");
				var week2 = d("%d %M %y");
				scheduler.filter_day = scheduler.filter_week = scheduler.filter_month = function (id, event) {
					var calendar = event.calendar;
					if (!calendar) return webix.$$("calendarList").getItem("my").active;else return webix.$$("calendarList").getItem(calendar).active;
				};
				scheduler.templates.week_scale_date = d("%D, %W/%j");
				scheduler.templates.week_date = function (d1, d2) {
					return week1(d1) + " &ndash; " + week2(scheduler.date.add(d2, -1, "day"));
				};
			},
			ready: function ready() {
				scheduler.parse(models_events__WEBPACK_IMPORTED_MODULE_1__["data"], "json");
			}
		}] }]
};

/***/ }),

/***/ "./sources/views/modules/statusfilter.js":
/*!***********************************************!*\
  !*** ./sources/views/modules/statusfilter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (webix.ui.datafilter.staFilter = {
  getInputNode: function getInputNode(node) {
    return node.firstChild ? node.firstChild.firstChild : { value: null };
  },
  getValue: function getValue(node) {
    return this.getInputNode(node).value;
  },
  setValue: function setValue(node, value) {
    this.getInputNode(node).value = value.toString();
  },
  refresh: function refresh(master, node, column) {
    master.registerFilter(node, column, this);
    column.compare = column.compare || function (value, filter) {
      if (filter === "") return true;else if (filter === "1") return value == 1;else if (filter === "0") return value == 0;
    };
    node.onchange = function () {
      master.filterByAll();
    };
    node.onclick = webix.html.preventEvent;
  },
  render: function render(a, b) {
    return "<select id=" + b.columnId + ">" + "<option value=''></option>" + "<option value='1' class='status status1'>Включено</option>" + "<option value='0' class='status status0'>Отключено</option>" + "</select>";
  }
});

/***/ }),

/***/ "./sources/views/modules/tasks.js":
/*!****************************************!*\
  !*** ./sources/views/modules/tasks.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var tasks = {
	rows: [{
		template: "<span class='webix_icon fa-tasks'></span>Pending Tasks", type: "header", "css": "sub_title", "height": 50
	}, {
		view: "list",
		css: "tasks_list",
		autoheight: true,
		type: {

			marker: function marker(obj) {
				return "<span class='webix_icon_btn fa-bell-o marker " + obj.type + "' style='max-width:32px;' ></span>";
			},
			check: webix.template("<span class=\"webix_icon_btn fa-{obj.$check?check-:}square-o list_icon\" style=\"max-width:32px;\"></span>"),
			template: function template(obj, type) {
				return "<div class='" + (obj.$check ? "done" : "") + "'>" + type.check(obj, type) + "<span class='list_text'>" + obj.text + "</span><span class='marker " + obj.type + "'>" + (obj.type || "") + "</span></div>";
			}
		},
		data: [{ id: "1", text: "Prepare finance report" }, { id: "2", text: "Solex project strategy  meeting", type: "projects" }, { id: "3", text: "WestEurope partners call" }, { id: "4", text: "Prepare presentation for summer conference", type: "company" }, { id: "5", text: "Market research analysis" }, { id: "6", text: "Check messages" }, { id: "7", text: "Discussing new theme for website", type: "company" }],
		on: {
			onItemClick: function onItemClick(id) {
				var item = this.getItem(id);
				item.$check = !item.$check;
				this.refresh(id);
			}
		}
	}, {
		css: "show_all bg", template: "Show all tasks <span class='webix_icon fa-angle-double-right'></span>", height: 40
	}]
};

/* harmony default export */ __webpack_exports__["default"] = (tasks);

/***/ }),

/***/ "./sources/views/modules/taskschart.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/taskschart.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ui = {
	view: "chart",
	type: "barH",

	value: "#progress#",
	minHeight: 230,
	color: "#color#",
	barWidth: 30,
	radius: 2,
	tooltip: {
		template: "#progress# %"
	},
	yAxis: {
		template: "#name#"
	},
	xAxis: {
		start: 0,
		end: 100,
		step: 10,
		template: function template(obj) {
			return obj % 20 ? "" : obj;
		}
	},
	padding: {
		left: 120
	},
	data: [{ id: "1", name: "Report", progress: 55, color: "#49cd81" }, { id: "2", name: "Strategy  meeting", progress: 20, color: "#a693eb" }, { id: "3", name: "Partners meeting", progress: 70, color: "#49cd81" }, { id: "4", name: "Research analysis", progress: 30, color: "#a693eb" }, { id: "5", name: "Presentation", progress: 60, color: "#f19b60" }],
	legend: {
		align: "center",
		layout: "x",
		valign: "bottom",
		template: "#region#",
		values: [{ text: "Company", color: "#49cd81" }, { text: "Inner tasks", color: "#f19b60" }, { text: "Projects", color: "#a693eb" }]
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ui);

/***/ }),

/***/ "./sources/views/modules/topsales.js":
/*!*******************************************!*\
  !*** ./sources/views/modules/topsales.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_topsales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/topsales */ "./sources/models/topsales.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var TopSalesView = function (_JetView) {
	_inherits(TopSalesView, _JetView);

	function TopSalesView() {
		_classCallCheck(this, TopSalesView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	TopSalesView.prototype.config = function config() {
		return layout;
	};

	TopSalesView.prototype.init = function init(view) {
		view.queryView({ view: "chart" }).parse(models_topsales__WEBPACK_IMPORTED_MODULE_1__["data"]);
	};

	return TopSalesView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (TopSalesView);


var chart = {
	view: "chart",
	borderless: true,
	type: "bar",
	height: 130,
	id: "productsBar",
	barWidth: 60,
	radius: 0,
	alpha: 0.9,
	color: function color(obj) {
		var color = "#a693eb";
		if (obj.productId == 2) color = "#63b4ea";else if (obj.productId == 3) {
			color = "#f19b60";
		} else if (obj.productId == 4) {
			color = "#49cd81";
		}

		return color;
	},
	yAxis: {
		template: function template(value) {
			return parseInt(value, 10);
		}
	},
	xAxis: {
		template: "#name#"
	},
	on: {
		onAfterLoad: function onAfterLoad() {
			webix.$$("topSelling").setValue("month");
		}
	},
	padding: {
		top: 0,
		left: 50,
		right: 10,
		bottom: 20
	}
};

var form = {
	type: "form",
	cols: [{
		view: "radio", id: "topSelling", label: "", labelWidth: 0, vertical: true, on: {
			onChange: function onChange() {
				webix.$$("productsBar").filter(function (obj) {
					return obj.selection == webix.$$("topSelling").getValue();
				});
			}
		},
		options: [{ id: "month", value: "Last month" }, { id: "month3", value: "Last 3 months" }]
	}]
};

var layout = {
	rows: [{
		view: "toolbar",
		paddingX: 5,
		paddingY: 5,
		height: 40, css: "highlighted_header header3", elements: [{ "template": "<span class='webix_icon fa-bar-chart'></span>Top selling products", borderless: true, "css": "sub_title2" }]

	}, form, chart]
};

/***/ }),

/***/ "./sources/views/modules/totalchart.js":
/*!*********************************************!*\
  !*** ./sources/views/modules/totalchart.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_totalchart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/totalchart */ "./sources/models/totalchart.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ItemsChartView = function (_JetView) {
	_inherits(ItemsChartView, _JetView);

	function ItemsChartView() {
		_classCallCheck(this, ItemsChartView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	ItemsChartView.prototype.config = function config() {
		return layout;
	};

	ItemsChartView.prototype.init = function init(view) {
		var userinfo = this.app.getService("user").getUser();
		view.queryView({ view: "chart" }).parse(Object(models_totalchart__WEBPACK_IMPORTED_MODULE_1__["default"])(userinfo.token));
	};

	return ItemsChartView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ItemsChartView);


var layout = {
	"type": "clean",
	"rows": [{
		"template": "<span class='webix_icon mdi mdi-car'></span>Динамика развития за год", "css": "sub_title", "height": 30
	}, {
		"view": "chart", "type": "line",
		"legend": {
			"layout": "x",
			"align": "right",
			"values": [{ "text": "Отключено", "color": "#a693eb" }, { "text": "Не работало", "color": "#c71585" }, { "text": "Работало", "color": "#ff00ff" }, { "text": "Всего подключено", "color": "#63b4ea" }]
		},
		"offset": 0,
		alpha: 0.8,

		"xAxis": {
			"template": "#month#"
		},
		"radius": 0,
		"yAxis": {},
		"series": [{ "value": "#total_off#", "color": "#a693eb", "item": { "borderColor": "#fff", "color": "#a693eb", "radius": 4 }, "line": { "color": "#a693eb", "width": 1 }, "tooltip": { "template": "#total_off#" } }, { "value": "#total_offline#", "color": "#c71585", "item": { "borderColor": "#fff", "color": "#c71585", "radius": 4 }, "line": { "color": "#c71585", "width": 1 }, "tooltip": { "template": "#total_offline#" } }, { "value": "#total_online#", "color": "#ff00ff", "item": { "borderColor": "#fff", "color": "#ff00ff", "radius": 4 }, "line": { "color": "#ff00ff", "width": 1 }, "tooltip": { "template": "#total_online#" } }, { "value": "#total_objects#", "color": "#63b4ea", "item": { "borderColor": "#fff", "color": "#63b4ea", "radius": 4 }, "line": { "color": "#63b4ea", "width": 1 }, "tooltip": { "template": "#total_objects#" } }],
		"padding": {
			"top": 25
		}
	}]
};

/***/ }),

/***/ "./sources/views/modules/visitors.js":
/*!*******************************************!*\
  !*** ./sources/views/modules/visitors.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_visitors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/visitors */ "./sources/models/visitors.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var VisitorsView = function (_JetView) {
	_inherits(VisitorsView, _JetView);

	function VisitorsView() {
		_classCallCheck(this, VisitorsView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	VisitorsView.prototype.config = function config() {
		return layout;
	};

	VisitorsView.prototype.init = function init(view) {
		view.queryView({ view: "chart" }).parse(models_visitors__WEBPACK_IMPORTED_MODULE_1__["data"]);
	};

	return VisitorsView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (VisitorsView);

var layout = {
	"type": "clean",
	"rows": [{
		"template": "<span class='webix_icon fa-sign-in'></span>Visitor statistics", "css": "sub_title", "height": 30
	}, {
		"view": "chart", "type": "stackedArea",
		"legend": {
			"layout": "x",

			"align": "right",
			"values": [{ "text": "New visitors", "color": "#61b5ee" }, { "text": "Recurrent", "color": "#a4b4bf" }]
		},
		"offset": 0,
		alpha: 0.8,

		"xAxis": {
			"template": "#month#"
		},
		"radius": 0,
		"yAxis": {
			"start": 0,
			"end": 2000,
			"step": 500
		},
		"series": [{ "value": "#rec#", "color": "#a4b4bf" }, { "value": "#newv#", "color": "#61b5ee" }],
		"padding": {
			"top": 25
		}
	}]
};

/***/ }),

/***/ "./sources/views/orders.js":
/*!*********************************!*\
  !*** ./sources/views/orders.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_formview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/formview */ "./sources/views/menus/formview.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_order_statesfilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/order_statesfilter */ "./sources/views/modules/order_statesfilter.js");
/* harmony import */ var views_templates_order_states__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/templates/order_states */ "./sources/views/templates/order_states.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var OrderView = function (_JetView) {
    _inherits(OrderView, _JetView);

    function OrderView() {
        _classCallCheck(this, OrderView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    OrderView.prototype.config = function config() {
        return layout;
    };

    OrderView.prototype.init = function init(view) {
        $$('order-form').bind($$('order-order'));
    };

    return OrderView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (OrderView);


function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " день " : d < 5 ? " дня " : " дней ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " час " : h < 5 ? " часа " : " часов ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " минута " : m < 5 ? " минуты " : "минут ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " секунда" : " секунд") : "";
    return dDisplay + hDisplay + mDisplay;
}

function sortByAge(a, b) {
    a = a._Age;
    b = b._Age;
    return a > b ? 1 : a < b ? -1 : 0;
}

webix.ui.datafilter.ageFilter = webix.extend({
    render: function render(master, column) {
        //console.log(column);
        column.css = "webix_ss_filter";
        var html = "<input " + (column.placeholder ? 'placeholder="' + column.placeholder + '" ' : "") + (column.tooltip ? 'title="' + column.tooltip + '" ' : "") + "type='text'>";
        return html;
    }
}, webix.ui.datafilter.textFilter);

function agePrepare(filterValue, filterObject) {

    return filterValue;
}

function ageCompare(columnValue, filterValue) {
    // дополним, чтоб все было в днях
    var value = columnValue.indexOf('дн') === -1 ? '0дн ' + columnValue.toString().toLowerCase() : columnValue.toString().toLowerCase();
    // оставим для сравнения только дни
    value = value.slice(0, value.indexOf('дн'));
    var filter = filterValue.toString().toLowerCase();
    var compareMethod = filter.match(/[\=\<\>]/);

    if (compareMethod !== null) {
        filter = filter.substr(filter.indexOf(compareMethod[0]) + 1);
        // filter = filter.match(/[0-9]/);
        //console.log(value, compareMethod[0], filter);
        switch (compareMethod[0]) {
            case '=':
                return (value + 'дн').indexOf(filter + 'дн') === 0;
            case '>':
                return Number(value) > Number(filter);
            case '<':
                return Number(value) < Number(filter);
            default:
                return value.indexOf(filter) !== -1;
        }
    } else return value.indexOf(filter) !== -1;
}

var grid = {
    id: "order-order",
    view: "datatable",
    select: "row",
    clipboard: "selection",
    editable: false,
    checkboxRefresh: true,
    pager: "pagerA",
    "export": true,
    tooltip: true,
    columns: [{ id: "TicketID", header: "#", sort: "int", width: 50, tooltip: false }, { id: "TicketNumber", header: ["Заявка", { content: "textFilter" }], sort: "int", minWidth: 120, fillspace: 2, tooltip: false }, { id: "Queue", header: ["Очередь", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2, tooltip: false }, { id: "CustomerID", header: ["Заказчик", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2, tooltip: false }, { id: "Title", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, tooltip: false },
    // Возраст приходит готовый с сервера, для сортировки используется возраст в секундах _Age
    { id: "Age", header: ["Возраст", { content: "ageFilter", prepare: agePrepare, compare: ageCompare, tooltip: "Используйте < > = перед количеством дней" }],
        sort: sortByAge, minWidth: 100, fillspace: 2, tooltip: false },
    // При необходимости можно вычислять возраст непосредственно в скрипте в разделе $init
    //{id: "_age", header: ["Возраст", {content: "textFilter"}], sort: sortByAge, minWidth: 100, fillspace: 2 },
    { id: "StateType", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 1,
        editor: "inline-checkbox", template: views_templates_order_states__WEBPACK_IMPORTED_MODULE_5__["default"], tooltip: false }, { id: "edit", header: "<span class='webix_icon mdi mdi-file-document-box'></span>", width: 35, tooltip: 'Просмотр заявки',
        template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-file-document-box'></span>"
    }],
    scheme: {
        $init: function $init(obj) {
            // Будет работать если раскомментировать поле _age
            obj._age = secondsToDhms(obj._Age);
        }
    },
    url: "index.php?route=order/order/getTicketList&token=" + token,
    onClick: {
        "mdi-file-document-box": function mdiFileDocumentBox(e, id) {
            this.select(id);
            $$('paging').hide();
            $$('edit-tools').hide();
            $$('edit-form-icon').show();
            $$('order-form').show();
        }
    },
    ready: function ready() {
        webix.extend(this, webix.ProgressBar);
    }
};

var iform = {
    view: "form",
    id: "order-form",
    multiview: { keepViews: true },
    elements: [{ cols: [{ view: "text", name: "TicketID", label: "ID заявки", labelWidth: 80, width: 160, readonly: true }, { view: "text", name: "TicketNumber", label: "Номер заявки", labelWidth: 120, labelAlign: "right", readonly: true }, { view: "text", name: "Created", label: "Создана", labelWidth: 80, labelAlign: "right", readonly: true }] }, { view: "text", name: "Queue", label: "Очередь", labelWidth: 170, readonly: true }, { cols: [{ view: "text", name: "CustomerID", label: "Заказчик", labelWidth: 170, readonly: true }, { view: "text", name: "Owner", label: "Агент", labelWidth: 170, labelAlign: "right", readonly: true }] }, { cols: [{ view: "text", name: "Title", label: "Название", labelWidth: 170, readonly: true }] }, { cols: [{ view: "textarea", name: "Request", height: 200, label: "Текст заявки", labelPosition: "top" }, { view: "textarea", name: "Response", height: 200, label: "Текст ответа", labelPosition: "top" }] }, { cols: [{ view: "text", name: "Age", label: "Возраст", labelWidth: 170, readonly: true }, { view: "select", name: "StateType", label: "Статус", labelWidth: 170, labelAlign: "right", disabled: true,
            options: [{ id: 'closed', value: "<span class='webix_table_checkbox order-status order-closed'> Закрыта </span>" }, { id: 'open', value: "<span class='webix_table_checkbox order-status order-open'> Открыта </span>" }]
        }] }, {
        margin: 10,
        cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
                $$("order-views").back();
                $$('paging').show();
                $$('edit-form-icon').hide();
                $$('edit-tools').show();
            } }]
    }]
};

var order_views = {
    view: "multiview",
    id: "order-views",
    cells: [grid, iform]
};

var layout = {
    id: "layout",
    type: "space",
    rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"] }, { height: 40, id: "edit-form-icon", cols: views_menus_formview__WEBPACK_IMPORTED_MODULE_2__["default"], hidden: true }, { rows: [order_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_3__["default"]] }]
};

/***/ }),

/***/ "./sources/views/owners.js":
/*!*********************************!*\
  !*** ./sources/views/owners.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import {data} 	from "models/owners";







var OwnerView = function (_JetView) {
	_inherits(OwnerView, _JetView);

	function OwnerView() {
		_classCallCheck(this, OwnerView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	OwnerView.prototype.config = function config() {
		return layout;
	};

	OwnerView.prototype.init = function init(view) {
		$$('owner-form').bind($$('catalog-owner'));
		webix.dp.$$("catalog-owner").config.updateFromResponse = true;
	};

	return OwnerView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (OwnerView);


var grid = {
	id: "catalog-owner",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	pager: "pagerA",
	"export": true,
	columns: [{ id: "owner_id", header: "#", sort: "int", width: 50 }, { id: "ownername", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "sort_order", header: { text: "Порядок сортировки", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 1, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	url: "index.php?route=catalog/owner/getList&token=" + token,
	save: {
		"insert": "index.php?route=catalog/owner/add&token=" + token,
		"update": "index.php?route=catalog/owner/edit&token=" + token,
		"delete": "index.php?route=catalog/owner/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('owner-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('owner-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var grouplist = {
	view: "dbllist",
	list: { height: 180, scroll: true, css: "double-list" },
	labelBottomLeft: "Допустимые группы",
	labelBottomRight: "Имеющиеся группы"
};

var ui = {
	view: "form",
	id: "owner-form",
	//multiview:{ keepViews:true },
	dataFeed: function dataFeed(id) {
		var current_owner_id = $$('catalog-owner').getItem(id).owner_id;
		var dbllist = this.queryView({ view: "dbllist" });
		this.clear();
		dbllist.$$("left").clearAll();
		var promise = this.load("index.php?route=catalog/owner/getForm&token=" + token + "&owner_id=" + current_owner_id);

		var promise2 = dbllist.load("index.php?route=catalog/owner/getWialonGroups&token=" + token + "&owner_id=" + current_owner_id);

		var promise3 = webix.ajax().get("index.php?route=catalog/owner/getOwnerGroups", { token: token, owner_id: current_owner_id }, {
			error: function error(text, data, XmlHttpRequest) {
				alert("error");
			},
			success: function success(text, data, XmlHttpRequest) {
				dbllist.setValue(data.json());
			}
		});
		promise.then(promise2).then(promise3);
	},
	elements: [{ cols: [{ view: "text", id: "owner_id", name: "owner_id", label: "ID владельца", labelWidth: 170, readonly: true }, { view: "text", id: "date_added", name: "date_added", label: "Дата регистрации", labelWidth: 170, labelAlign: "right", readonly: true }] }, { cols: [{ view: "text", name: "ownername", label: "Название", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 128 знаков" }, { view: "text", name: "bin", label: "БИН/ИИН", labelWidth: 170, labelAlign: "right", invalidMessage: "должно быть 12 знаков" }] }, { cols: [{ view: "text", name: "address", label: "Фактический адрес", placeholder: "Введите адрес", labelWidth: 170 }, { view: "text", name: "contactname", label: "Контактное лицо", placeholder: "Введите контактное лицо", labelWidth: 170, labelAlign: "right" }] }, { cols: [{ view: "text", name: "telephone", label: "Телефон", placeholder: "Введите телефон", labelWidth: 170, invalidMessage: "поле должно содержать от 1 до 32 знаков" }, { view: "text", name: "email", type: 'email', label: "E-mail", placeholder: "Введите e-mail", labelWidth: 170, labelAlign: "right", invalidMessage: "не похоже на адрес электронной почты" }] }, { view: "forminput", name: "wialon_groups", body: grouplist, labelWidth: 170, label: "Группы владельца" }, { view: "textarea", name: "description", label: "Дополнительные сведения", labelWidth: 170, gravity: 1, minHeight: 60, maxHeight: 150 }, { cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("owner-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form_for_save = $$("owner-form");
				if (!form_for_save.validate()) return false;

				webix.ajax().post("index.php?route=catalog/owner/validateForm&token=" + token, form_for_save.getValues(), function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						//this.getFormView().save()
						form_for_save.save();
						$$("owner-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"ownername": function ownername(value) {
			return value.length >= 3 && value.length <= 128;
		},
		"email": function email(value) {
			return webix.rules.isEmail(value) || value.length == 0;
		},
		"bin": function bin(value) {
			return value.length == 12 || value.length == 0;
		}
	}
};

var owner_views = {
	view: "multiview",
	id: "owner-views",
	cells: [grid, ui]
};

var layout = {
	id: "layout",
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [owner_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/product_edit.js":
/*!***************************************!*\
  !*** ./sources/views/product_edit.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_modules_product_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/modules/product_search */ "./sources/views/modules/product_search.js");
/* harmony import */ var views_modules_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/editor */ "./sources/views/modules/editor.js");
/* harmony import */ var views_modules_product_upload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/product_upload */ "./sources/views/modules/product_upload.js");
/* harmony import */ var views_modules_product_meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/product_meta */ "./sources/views/modules/product_meta.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var ProductEditView = function (_JetView) {
	_inherits(ProductEditView, _JetView);

	function ProductEditView() {
		_classCallCheck(this, ProductEditView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	ProductEditView.prototype.config = function config() {
		return layout;
	};

	ProductEditView.prototype.ready = function ready() {
		webix.$$("mainView").bind(webix.$$("list"));
	};

	return ProductEditView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ProductEditView);


var buttons = [{ view: "button", type: "form", icon: "plus", label: "Save", width: 90 }, { view: "button", css: "button2", icon: "angle-left", label: "Reset", width: 90 }, {}, { view: "button", css: "button0", icon: "times", label: "Delete", width: 90 }];

var layout = {
	type: "space",
	rows: [{
		type: "wide",
		cols: [views_modules_product_search__WEBPACK_IMPORTED_MODULE_1__["default"], {
			gravity: 2.2,
			rows: [{ view: "tabbar", multiview: true, optionWidth: 130,
				options: [{ id: "mainView", value: "Main" }, { id: "imagesView", value: "Images" }, { id: "metaView", value: "Meta" }]
			}, {
				cells: [views_modules_editor__WEBPACK_IMPORTED_MODULE_2__["default"], views_modules_product_upload__WEBPACK_IMPORTED_MODULE_3__["default"], views_modules_product_meta__WEBPACK_IMPORTED_MODULE_4__["default"]]
			}, {

				view: "form",
				css: "highlighted_header header6",
				paddingX: 5,
				paddingY: 5,
				height: 40,
				cols: buttons
			}]
		}] }]
};

/***/ }),

/***/ "./sources/views/products.js":
/*!***********************************!*\
  !*** ./sources/views/products.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var models_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! models/products */ "./sources/models/products.js");
/* harmony import */ var views_menus_contextmenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/contextmenu */ "./sources/views/menus/contextmenu.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ProductsView = function (_JetView) {
	_inherits(ProductsView, _JetView);

	function ProductsView() {
		_classCallCheck(this, ProductsView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	ProductsView.prototype.config = function config() {
		return layout;
	};

	ProductsView.prototype.init = function init(view) {
		view.queryView({ view: "datatable" }).parse(models_products__WEBPACK_IMPORTED_MODULE_1__["data"]);

		var c = this.ui(views_menus_contextmenu__WEBPACK_IMPORTED_MODULE_2__["default"]);
		c.attachTo(this.$$("productsData").getNode());

		//	backendController = wconfig.products.backendController;
		$$("productsData").attachEvent("onBeforeContextMenu", function (id, e, node) {
			selRows = $$("productsData").getSelectedItem(true);
		});
	};

	return ProductsView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ProductsView);


var grid = {
	id: "productsData",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	onContext: {},
	//autowidth:true,
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	columns: [{ id: "product_id", header: "#", sort: "string", width: 50 }, { id: "model", header: ["Model", { content: "textFilter" }], sort: "string", minWidth: 80, fillspace: 1 }, { id: "name", header: ["Name", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "category", header: ["Category", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "price", header: ["Price"], sort: "int", minWidth: 80, fillspace: 1, format: webix.i18n.priceFormat }, { id: "quantity", header: ["Quantity"], sort: "int", minWidth: 60, fillspace: 1 }, { id: "special", header: ["Скидка"], sort: "string", minWidth: 60, fillspace: 1 }, { id: "statusName", header: ["Status", { content: "selectFilter" }], minWidth: 75, sort: "string", fillspace: 1, template: "<span class='status status#status#'>#statusName#</span>" }, { id: "edit", header: "&nbsp;", width: 35, template: "<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>" }, { id: "delete", header: "&nbsp;", width: 35, template: function template(obj) {
			if (obj.status != "0") return "<span  style=' cursor:pointer;' class='webix_icon fa-toggle-on'></span>";else return "<span  style=' cursor:pointer;' class='webix_icon fa-toggle-off'></span>";
		}
	}],
	pager: "pagerA",
	"export": true,
	save: {
		"insert": "index.php?route=catalog/product/add&token=" + token,
		"update": "index.php?route=catalog/product/edit&token=" + token,
		"delete": "index.php?route=catalog/product/delete&token=" + token
	},
	onClick: {
		"fa-toggle-on": function faToggleOn(e, id) {
			var item = this.getItem(id);
			item.status = "0";
			item.statusName = "Отключено";
			webix.ajax().post("index.php?route=catalog/product/edit&token=" + token, item);
			this.refresh(id);
		},
		"fa-toggle-off": function faToggleOff(e, id) {
			var item = this.getItem(id);
			item.status = "1";
			item.statusName = "Включено";
			webix.ajax().post("index.php?route=catalog/product/edit&token=" + token, item);
			this.refresh(id);
		},
		"fa-pencil": function faPencil(e, id) {
			this.refresh(id);
			this.$scope.app.show("/app/product_edit");
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

function logEvent(type, message, args) {
	webix.message({ text: message, expire: 2500 });
	console.log(type);
	console.log(args);
};

var controls = [{ view: "icon", type: "icon", borderless: false, icon: "file-excel-o", tooltip: "Export To Excel", click: function click() {
		webix.toExcel(webix.$$("productsData"));
	}
}, { view: "icon", type: "icon", borderless: false, icon: "file-pdf-o", tooltip: "Export To PDF", click: function click() {
		webix.toPDF(webix.$$("productsData"));
	}
}, { view: "icon", type: "icon", borderless: false, icon: "file-word-o", tooltip: "Export To PNG", click: function click() {
		webix.toPNG(webix.$$("productsData"));
	}
}, {}, { view: "icon", type: "icon", borderless: false, icon: "refresh", tooltip: "Освежить", click: function click() {
		var grid = webix.$$("productsData");
		grid.clearAll();
		grid.showProgress();
		webix.delay(function () {
			grid.parse(models_products__WEBPACK_IMPORTED_MODULE_1__["data"]);
			grid.hideProgress();
		}, null, null, 300);
	} }, { view: "icon", type: "icon", borderless: false, icon: "plus", tooltip: "Add new", click: function click() {
		var item = $$("productsData").add({});
		$$("productsData").showItem(item);
	}
}, { view: "icon", type: "icon", borderless: false, icon: "copy", tooltip: "Copy", click: function click() {
		selRows = $$("productsData").getSelectedItem(true);
		selRows.forEach(function (item, idx, arr) {
			var new_item = $$("productsData").add({});
			webix.$$("productsData").updateItem(new_item, item);
		});
		$$("productsData").showItem($$("productsData").getLastId());
	}
}, { view: "icon", type: "iconButton", borderless: false, icon: "trash-o", tooltip: "Delete", click: function click() {
		webix.confirm({
			text: " Выделенные строки будут удалены. <br/> Вы уверены? ", ok: "Да", cancel: "Отменить",
			callback: function callback(res) {
				if (res) {
					$$("productsData").remove($$("productsData").getSelectedId());
				}
			}
		});
	}
}, { view: "switch", width: 140, borderless: false, onLabel: "Отменить", offLabel: "Выделить все", value: 0,
	on: {
		'onItemClick': function onItemClick(id) {
			var val = this.getValue();
			if (val == "1") {
				webix.$$("productsData").selectRange(webix.$$("productsData").getFirstId(), webix.$$("productsData").getLastId(), true);
				//selRows = $$("productsData").getSelectedItem(true);
				//console.log(selRows);
			} else {
				webix.$$("productsData").clearSelection();
				//selRows = [];
			}
		}
	}
}, { view: "richselect", id: "order_filter", value: "all", maxWidth: 300, minWidth: 250, vertical: true, options: [{ id: "all", value: "Все" }, { id: "1", value: "Включено" }, { id: "2", value: "Отключено" }, { id: "0", value: "Удалено" }], label: "Статус", labelWidth: 60, on: {
		onChange: function onChange() {
			var val = this.getValue();
			if (val == "all") webix.$$("productsData").filter("#status#", "");else webix.$$("productsData").filter("#status#", val);
		}
	}
}];

var toolbar = {
	view: "toolbar",
	css: "highlighted_header header6",
	paddingX: 5, paddingY: 5, height: 40,
	cols: [{
		view: "pager", id: "pagerA",
		template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
		autosize: true,
		height: 35, group: 5
	}]
};

var layout = {
	type: "space",
	rows: [{ height: 40, cols: controls }, { rows: [grid, toolbar] }]
};

/***/ }),

/***/ "./sources/views/report_billing.js":
/*!*****************************************!*\
  !*** ./sources/views/report_billing.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ReportBillingView = function (_JetView) {
    _inherits(ReportBillingView, _JetView);

    function ReportBillingView() {
        _classCallCheck(this, ReportBillingView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ReportBillingView.prototype.config = function config() {
        return layout;
    };

    ReportBillingView.prototype.init = function init(view) {
        webix.extend(view.queryView({ view: "treetable" }), webix.ProgressBar);
        webix.extend($$("owner-tree"), webix.ProgressBar);
        $$("owner-tree").showProgress({
            type: "top",
            delay: 1500,
            hide: true
        });
    };

    return ReportBillingView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ReportBillingView);


var report_treetable_group = {
    id: "report-treetable-group",
    view: "treetable",
    "export": true,
    columns: [{ id: "item_id", header: "#", sort: "int", width: 60,
        template: function template(obj, common) {
            if (obj.$group) return common.treetable(obj, common) + obj.value + '  (' + obj.count + ' объектов)' + ' Сумма: ' + obj.total;
            return obj.item_id;
        }
    }, { id: "deleted", header: " ", sort: "int", width: 40, css: { "text-align": "center" },
        template: function template(obj, common, value) {
            if (value != 0) return "<span class='webix_icon fa-times deleted'></span>";else return "";
        }
    }, { id: "itemname", header: ["Название"], minWidth: 120, fillspace: 2 }, { id: "tracker_uid", header: ["Трекер UID"], minWidth: 140, fillspace: 1 }, { id: "ownername", header: ["Владелец"], minWidth: 120, fillspace: 2, hidden: true }, { id: "wialon_groupname", header: ["Группа"], sort: "string", minWidth: 120, fillspace: 2 }, { id: "wialon_group_off", header: ["Вид"], width: 65, css: { "text-align": "center" },
        template: function template(obj, common, value) {
            if (value == 1) return "<span class='webix_icon fa-eye-slash wialon-group-off'></span>";else return "<span class='webix_icon fa-eye wialon-group-on'></span>";
        }
    }, { id: "billing", header: "Сумма", sort: "int", minWidth: 120 }],
    scheme: {
        $init: function $init(obj) {
            if (obj.deleted == 1) obj.$css = "deleted";
        },
        $group: {
            by: "ownername",
            map: {
                title: ["ownername"],
                count: ["item_id", "count"],
                total: ["billing", "sum"]
            },
            //row:function(obj){
            //	return "Группа "+obj.item_id+", Начислено: "+webix.i18n.numberFormat(obj.item_id);
            //},
            row: "item_id",
            footer: {
                total: ["billing", "sum"],
                row: function row(obj) {
                    return "<span style='float:right;'>Итого: " + webix.i18n.numberFormat(obj.total) + "</span>";
                }
            }
        },
        $sort: { by: "ownername", as: "string", dir: "desc" }
    }
};

var report_treetable_tree = {
    id: "report-treetable-tree",
    view: "treetable",
    "export": true,
    footer: true,
    stringResult: true,
    columns: [{ id: "event_name", header: "Событие", sort: "int", minWidth: 450, fillspace: true,
        template: function template(obj, common) {
            if (obj.$level == 2)
                //return common.treetable(obj, common)+"<span>"+obj.value + '  ('+ obj.$count +' гр.)'+"</span>";
                return common.treetable(obj, common) + "<span>" + obj.value + "</span>";
            if (obj.$level == 3) return common.treetable(obj, common) + "<span>" + "<i>" + obj.value + '  (' + obj.$count + ' объектов)' + "</i>" + "</span>";
            if (obj.$level <= 4) return common.treetable(obj, common) + "<span>" + obj.value + "</span>";else return obj.event_name;
        }
    }, { id: "date_start", header: "Начало", sort: "int", minWidth: 120, footer: { text: "Итого:", colspan: 4 }, fillspace: true }, { id: "date_end", header: "Конец", sort: "int", minWidth: 120, fillspace: true }, { id: "tarif", header: "Тариф", sort: "int", minWidth: 120, fillspace: true }, { id: "discount", header: "Скидка", sort: "int", minWidth: 120, fillspace: true }, { id: "count", header: "Дней", sort: "int", minWidth: 120, footer: { content: "summColumn" } }, { id: "sum", header: "Сумма", sort: "int", minWidth: 120, footer: { content: "summColumn" } }],
    scheme: {}
};

var myjson = webix.DataDriver.myjson = webix.copy(webix.DataDriver.json);
myjson.child = function (obj) {
    var _id = obj.id.split('.');
    if (obj.$level == 1) return obj.data;
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

var owner_tree = {
    view: "tree",
    id: "owner-tree",
    template: "{common.icon()} {common.checkbox()} {common.folder()} #value# ",
    threeState: true,
    datatype: "myjson",
    url: "index.php?route=report/billing/getOwnersTree&token=" + token
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var checking_form = {
    view: "form",
    id: "checking-form",
    elements: [{ cols: [{ view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y" }, { view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y" }, { view: "button", value: "Расчитать", width: 120, click: function click() {
                var values = $$('checking-form').getValues();
                var date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
                var date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
                var billing_treetable = $$('billing-report').queryView({ view: "treetable" });
                billing_treetable.clearAll();
                $$('billing-report').show();
                billing_treetable.showProgress({
                    type: "top",
                    delay: 20000,
                    hide: true
                });
                var checked = $$("owner-tree").getChecked();
                //billing_treetable.load("index.php?route=report/billing/getOwnersBillingTree&token="+token+"&date_start="+date_start+"&date_end="+date_end+"&checked="+checked);
                var query = webix.ajax().post("index.php?route=report/billing/getOwnersBillingTree&token=" + token, { date_start: date_start, date_end: date_end, checked: checked });
                billing_treetable.load(function () {
                    return query;
                });
            } }] }, owner_tree]
};

var controls = [{ view: "button", value: "Назад", width: 120, click: function click() {
        $$("checking-form").show();
    } }];

var billing_report = {
    view: "form",
    id: "billing-report",
    elements: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(controls) }, report_treetable_tree]
};

var billing_report_views = {
    view: "multiview",
    id: "billing-report-views",
    cells: [checking_form, billing_report]
};

var layout = {
    type: "space",
    rows: [billing_report_views]
};

/***/ }),

/***/ "./sources/views/report_objects.js":
/*!*****************************************!*\
  !*** ./sources/views/report_objects.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ReportObjectsView = function (_JetView) {
    _inherits(ReportObjectsView, _JetView);

    function ReportObjectsView() {
        _classCallCheck(this, ReportObjectsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ReportObjectsView.prototype.config = function config() {
        return layout;
    };

    ReportObjectsView.prototype.init = function init(view) {
        webix.extend(view.queryView({ view: "treetable" }), webix.ProgressBar);
    };

    return ReportObjectsView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ReportObjectsView);


var report_treetable_group = {
    id: "report-treetable-group",
    view: "treetable",
    "export": true,
    footer: true,
    tooltip: function tooltip(obj, common) {
        if (obj.$group === true) return '';

        if (obj.$css === 'tracker-online') {
            return 'Объект "' + obj.itemName + '" работал';
        } else if (obj.$css === 'tracker-offline') {
            return 'Объект "' + obj.itemName + '" не работал';
        } else if (obj.$css === 'tracker-disconnect') {
            return 'Объект "' + obj.itemName + '" отключен';
        }
    },
    columns: [{ id: "index", header: "", width: 80, footer: { text: "<b>Итого:</b>", colspan: 2 } }, { id: "itemName", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 3,
        template: function template(obj, common) {
            if (obj.$group) return common.treetable(obj, common) + obj.itemName;
            return obj.itemName;
        }
    }, { id: "total", header: "Всего", sort: "int", footer: { content: "totalTolal" } }, { id: "on", header: "Работал", sort: "int", footer: { content: "onTotal" } }, { id: "off", header: "Не работал", sort: "int", footer: { content: "offTotal" } }, { id: "disconnect", header: "Отключен", sort: "int", footer: { content: "disconnectTotal" } }, { id: "servername", header: ["Сервер", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 1 }],
    scheme: {
        $group: {
            by: "organizationName",
            map: {
                total: ["total", "worktotal"],
                on: ["on", "workon"],
                off: ["off", "workoff"],
                disconnect: ["disconnect", "workdisconnect"],
                itemName: ["organizationName"]
            }
        },
        $sort: { by: "itemName", as: "string" },
        $change: function $change(item) {
            if (item.$group === true) return;

            var minworkdays = 0;
            if (item.total > 2) minworkdays = 2;

            if (item.on > minworkdays) item.$css = "tracker-online";else if (item.off > 0 || item.disconnect === 0) item.$css = "tracker-offline";else item.$css = "tracker-disconnect";
        }
    },
    on: {
        onBeforeLoad: function onBeforeLoad() {
            this.hideOverlay();
            webix.extend(this, webix.ProgressBar);
            this.showProgress({ type: "icon",
                delay: 20,
                hide: false });
        },
        onAfterLoad: function onAfterLoad() {
            this.hideProgress();
            if (!this.count()) this.showOverlay("Нет данных");
        },
        "data->onStoreUpdated": function dataOnStoreUpdated() {
            //    var temp = this.data;
            var i = 0;
            var orgindex = 0;
            this.data.each(function (obj) {
                if (obj.$group === true) {
                    i = 0;
                    orgindex = orgindex + 1;
                    obj.index = '<strong>' + orgindex + '</strong>';
                } else {
                    i = i + 1;
                    obj.index = orgindex + '.' + i;
                }
                //var a = obj;

                //      obj.index = i+1;
            });
        }
    }
};

webix.ui.datafilter.onTotal = webix.extend({
    refresh: function refresh(master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            if (obj.$group === true) result += obj.on;
        });

        node.firstChild.innerHTML = '<b>' + result + '</b>';
    }
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.offTotal = webix.extend({
    refresh: function refresh(master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            if (obj.$group === true) result += obj.off;
        });

        node.firstChild.innerHTML = '<b>' + result + '</b>';
    }
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.disconnectTotal = webix.extend({
    refresh: function refresh(master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            if (obj.$group === true) result += obj.disconnect;
        });

        node.firstChild.innerHTML = '<b>' + result + '</b>';
    }
}, webix.ui.datafilter.summColumn);

webix.ui.datafilter.totalTolal = webix.extend({
    refresh: function refresh(master, node, value) {
        var result = 0;
        master.data.each(function (obj) {
            if (obj.$group === true) result += obj.total;
        });

        node.firstChild.innerHTML = '<b>' + result + '</b>';
    }
}, webix.ui.datafilter.summColumn);

webix.GroupMethods.workon = function (prop, data) {
    if (!data.length) return 0;
    var counton = 0;
    var countoff = 0;
    var countdisconnect = 0;
    var maxtotal = 0;
    var minworkdays = 2;
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i]['total'] > maxtotal) maxtotal = data[i]['total'];
    }

    if (maxtotal > 2) minworkdays = 2;else minworkdays = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        var on = data[i]['on'];
        var off = data[i]['off'];
        var disconnect = data[i]['disconnect'];

        if (on > minworkdays) counton++;else if (off > 0 || disconnect === 0) countoff++;else countdisconnect++;
    }
    return counton;
};

webix.GroupMethods.workoff = function (prop, data) {
    if (!data.length) return 0;
    var counton = 0;
    var countoff = 0;
    var countdisconnect = 0;
    var maxtotal = 0;
    var minworkdays = 2;
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i]['total'] > maxtotal) maxtotal = data[i]['total'];
    }

    if (maxtotal > 2) minworkdays = 2;else minworkdays = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        var on = data[i]['on'];
        var off = data[i]['off'];
        var disconnect = data[i]['disconnect'];

        if (on > minworkdays) counton++;else if (off > 0 || disconnect === 0) countoff++;else countdisconnect++;
    }
    return countoff;
};

webix.GroupMethods.workdisconnect = function (prop, data) {
    if (!data.length) return 0;
    var counton = 0;
    var countoff = 0;
    var countdisconnect = 0;
    var maxtotal = 0;
    var minworkdays = 2;
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i]['total'] > maxtotal) maxtotal = data[i]['total'];
    }

    if (maxtotal > 2) minworkdays = 2;else minworkdays = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        var on = data[i]['on'];
        var off = data[i]['off'];
        var disconnect = data[i]['disconnect'];

        if (on > minworkdays) counton++;else if (off > 0 || disconnect === 0) countoff++;else countdisconnect++;
    }
    return countdisconnect;
};

webix.GroupMethods.worktotal = function (prop, data) {
    if (!data.length) return 0;
    var counton = 0;
    var countoff = 0;
    var countdisconnect = 0;
    var maxtotal = 0;
    var minworkdays = 2;
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i]['total'] > maxtotal) maxtotal = data[i]['total'];
    }

    if (maxtotal > 2) minworkdays = 2;else minworkdays = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        var on = data[i]['on'];
        var off = data[i]['off'];
        var disconnect = data[i]['disconnect'];

        if (on > minworkdays) counton++;else if (off > 0 || disconnect === 0) countoff++;else countdisconnect++;
    }
    return countdisconnect + countoff + counton;
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var checking_form = {
    view: "form",
    id: "checking-form",
    elements: [{ cols: [{ view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y" }, { view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y" }, { view: "button", value: "Сформировать", width: 120, click: function click() {
                var values = $$('checking-form').getValues();
                var date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
                var date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
                var treetable = $$('object-report').queryView({ view: "treetable" });
                treetable.clearAll();
                treetable.showProgress({
                    type: "top",
                    delay: 20000,
                    hide: true
                });
                treetable.load("index.php?route=report/objects&token=" + token + "&date_start=" + date_start + "&date_end=" + date_end);
            } }] }, { cols: [{ view: "button", value: "Развернуть все", click: function click() {
                $$('report-treetable-group').openAll();
            } }, { view: "button", value: "Свернуть все", click: function click() {
                $$('report-treetable-group').closeAll();
            } }, {}, { view: "label", label: "Работал", inputWidth: 100, align: "center", css: "tracker-online" }, { view: "label", label: "Не работал", inputWidth: 100, align: "center", css: "tracker-offline" }, { view: "label", label: "Отключен", inputWidth: 100, align: "center", css: "tracker-disconnect" }] }]
};

var controls = [];

var layout = {
    type: "space",
    id: "object-report",
    rows: [{ height: 40, id: "tools-bar", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(controls) }, { rows: [checking_form, report_treetable_group] }]
};

/***/ }),

/***/ "./sources/views/report_stat.js":
/*!**************************************!*\
  !*** ./sources/views/report_stat.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_modules_lastobjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/lastobjects */ "./sources/views/modules/lastobjects.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ReportStatView = function (_JetView) {
	_inherits(ReportStatView, _JetView);

	function ReportStatView() {
		_classCallCheck(this, ReportStatView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	ReportStatView.prototype.config = function config() {
		this.minItemWidth = 243;
		var initCount = Math.floor(document.documentElement.clientWidth / this.minItemWidth);

		return {
			gravity: 4,
			type: "space",
			rows: [{
				cols: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"] }, { view: "icon", id: "refresh", type: "icon", borderless: false, icon: "mdi mdi-refresh", tooltip: "Освежить", click: function click() {
						var dataview = this.getParentView().getParentView().queryView({ view: "dataview" });
						dataview.clearAll();
						dataview.showProgress({ type: "top" });
						webix.delay(function () {
							dataview.load("index.php?route=report/total&token=" + token + "&refresh=true");
							dataview.hideProgress();
						}, null, null, 300);
					} }]
			}, {
				view: "dataview",
				localId: "dataview",
				scroll: false,
				xCount: initCount > 4 ? 3 : initCount >= 0 && initCount <= 2 ? 1 : initCount - 2,
				minWidth: 255,
				select: true,
				//css: "flex_tmp item",
				type: {
					width: "auto",
					height: 104,
					type: "tiles",
					template: function template(obj, common) {
						return common.icon(obj) + "<div class='col-xs-8 details'>" + "<div class='text'>" + obj.text + "</div>" + common.total(obj) + "</div>";
					},
					icon: function icon(obj) {
						if (obj.icon) return "<div class='col-xs-4 webix_icon mdi mdi-" + obj.icon + " " + obj.css + "'></div>";else return "<span class='userpic'>" + obj.text.charAt(0) + "</span>";
					},

					total: function total(obj) {
						return "<div class=\"value\">" + obj.value + "</div>";
					}
				}
			}, {
				view: "richselect",
				id: "total-select",
				label: "Статистика по ",
				labelWidth: 120,
				value: 1,
				yCount: "3",
				options: [{ id: 1, value: "Трекерам" }, // the initially selected item
				{ id: 2, value: "Тарифам" }, { id: 3, value: "Владельцам" }],
				on: {
					"onChange": function onChange(newv, oldv) {
						$$("report-total-select").clearAll();
						$$("report-total-select").load("index.php?route=report/total/getTotalOfSelected&token=" + token + "&selected=" + newv);
					}
				}
			}, {
				cols: [{
					id: "report-total-select",
					view: "datatable",
					header: false,
					"export": true,
					columns: [{ id: "name", minWidth: 120, fillspace: 2 }, { id: "total_objects", minWidth: 120, fillspace: 2 }]
					//url:"index.php?route=report/total/getLast&token="+token,
				}, {
					view: "chart",
					id: "total-pie",
					type: "pie3D",
					value: "#total_objects#",
					//color:"#color#",
					label: "#name#",
					//pieInnerText:"#sales#",
					shadow: 0
					//data:month_dataset
				}]
			}]
		};
	};

	ReportStatView.prototype.init = function init(view) {
		var _this2 = this;

		var dataview = this.$$("dataview");
		var selectind = this.$$("report-total-select");
		webix.extend(view.queryView({ view: "dataview" }), webix.ProgressBar);
		dataview.load("index.php?route=report/total&token=" + token);
		selectind.load("index.php?route=report/total/getTotalOfSelected&token=" + token + "&selected=1");

		this._winresize = webix.event(window, "resize", function () {
			return _this2.resizeDataview(_this2.minItemWidth);
		});

		this._tooltip = webix.ui({
			view: "tooltip",
			template: "#value#"
		});

		dataview.attachEvent("onAfterRender", function () {
			return _this2.relocaleTooltips();
		});
		dataview.attachEvent("onAfterSelect", function () {
			return _this2.relocaleTooltips();
		});

		$$("total-pie").data.sync(selectind, function () {
			this.filter(function (data) {
				return data.total_objects > 20;
			});
		});
	};

	ReportStatView.prototype.resizeDataview = function resizeDataview(minItemWidth) {
		var elements = Math.floor(this.$$("dataview").$width / minItemWidth);
		var count = elements > 3 ? 3 : elements == 0 ? 1 : elements;
		this.$$("dataview").define("xCount", count);
		this.$$("dataview").adjust();
		this.$$("dataview").resize();
	};

	ReportStatView.prototype.relocaleTooltips = function relocaleTooltips() {
		var _this3 = this;

		var dataview = this.$$("dataview");
		var tasks = dataview.$view.querySelectorAll(".tasks");
		for (var i = 0; i < tasks.length; i++) {
			webix.event(tasks[i], "mouseover", function (e) {
				_this3._tooltip.show({ value: "Tasks completed" }, webix.html.pos(e));
			});
			webix.event(tasks[i], "mouseout", function () {
				return _this3._tooltip.hide();
			});
		}
	};

	ReportStatView.prototype.destroy = function destroy() {
		webix.eventRemove(this._winresize);
	};

	return ReportStatView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ReportStatView);

/***/ }),

/***/ "./sources/views/report_suspicious.js":
/*!********************************************!*\
  !*** ./sources/views/report_suspicious.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_groupfilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/groupfilter */ "./sources/views/modules/groupfilter.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_modules_onlinefilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/modules/onlinefilter */ "./sources/views/modules/onlinefilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
/* harmony import */ var views_templates_eye__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/templates/eye */ "./sources/views/templates/eye.js");
/* harmony import */ var views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! views/templates/deleted */ "./sources/views/templates/deleted.js");
/* harmony import */ var views_templates_online__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! views/templates/online */ "./sources/views/templates/online.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var ItemView = function (_JetView) {
	_inherits(ItemView, _JetView);

	function ItemView() {
		_classCallCheck(this, ItemView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	ItemView.prototype.config = function config() {
		return layout;
	};

	ItemView.prototype.init = function init(view) {
		$$("suspicious-form").bind($$("report-suspicious"));
		webix.extend(view.queryView({ view: "datatable" }), webix.ProgressBar);
		webix.extend($$("report-suspicious"), webix.ProgressBar);
		$$("report-suspicious").showProgress({
			type: "top",
			delay: 5500,
			hide: true
		});
	};

	return ItemView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (ItemView);


var grid = {
	id: "report-suspicious",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	checkboxRefresh: true,
	pager: "pagerA",
	"export": true,
	columns: [{ id: "item_id", header: "#", sort: "int", width: 60 }, { id: "itemname", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "ownername", header: ["Владелец", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2 }, { id: "wialon_groupname", header: ["Группа", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "date_last", header: "Дата", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y") }, { id: "online", header: "Состояние", sort: "int", minWidth: 120, css: { "text-align": "center" }, template: views_templates_online__WEBPACK_IMPORTED_MODULE_10__["default"] }, { id: "total", header: "Дней", sort: "int", minWidth: 30 }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	scheme: {
		$init: function $init(obj) {
			if (obj.deleted == 1) obj.$css = "deleted";
		}
	},
	url: "index.php?route=report/suspicious&token=" + token,
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('history-suspicious').clearAll();
			$$('history-suspicious').load("index.php?route=catalog/item/getItemHistory&token=" + token + "&item_id=" + this.getItem(id).item_id);
			$$('paging').hide();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('suspicious-form').show();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var xml_format = webix.Date.strToDate("%Y-%m-%d");

var history_grid = {
	id: "history-suspicious",
	view: "datatable",
	select: "row",

	columns: [{ id: "item_history_id", header: "#", sort: "int", minWidth: 120 }, { map: "(date)#date_changed#", header: "Дата", sort: "date", minWidth: 120, format: webix.Date.dateToStr("%d.%m.%Y") }, { id: "deleted", header: " ", sort: "int", width: 40, css: { "text-align": "center" }, template: views_templates_deleted__WEBPACK_IMPORTED_MODULE_9__["default"] }, { id: "tracker_uid", header: ["Трекер UID", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "trackername", header: ["Трекер", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "sim1", header: ["SIM-1", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "sim2", header: ["SIM-2", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "wialon_group_off", header: ["Вид", { content: "eyeFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 80, css: { "text-align": "center" }, template: views_templates_eye__WEBPACK_IMPORTED_MODULE_8__["default"] }, { id: "online", header: ["Состояние", { content: "onlFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 120, css: { "text-align": "center" }, template: views_templates_online__WEBPACK_IMPORTED_MODULE_10__["default"] }],
	scheme: {
		$init: function $init(obj) {
			obj.date_changed = xml_format(obj.start);
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
		this.sort({ by: "date_changed", dir: "desc" });
	}
};

var iform = {
	view: "form",
	id: "suspicious-form",
	multiview: { keepViews: true },
	elements: [{ cols: [{ view: "text", id: "item_id", name: "item_id", label: "ID объекта", labelWidth: 140, readonly: true }, { view: "text", name: "itemname", label: "Название", labelWidth: 140, labelAlign: "right", readonly: true }]
	}, { cols: [{ view: "text", name: "ownername", label: "Владелец", labelWidth: 140, readonly: true }, { view: "text", name: "wialon_groupname", label: "Группа", labelWidth: 140, labelAlign: "right", readonly: true }]
	}, history_grid, {
		margin: 10,
		cols: [{}, { view: "button", value: "Назад", width: 120, click: function click() {
				$$("suspicious-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }]
	}]
};

var item_views = {
	view: "multiview",
	id: "suspicious-views",
	cells: [grid, iform]
};

var layout = {
	id: "layout",
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"] }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_2__["default"], hidden: true }, { rows: [item_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_3__["default"]] }]
};

/***/ }),

/***/ "./sources/views/servers.js":
/*!**********************************!*\
  !*** ./sources/views/servers.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var serverView = function (_JetView) {
	_inherits(serverView, _JetView);

	function serverView() {
		_classCallCheck(this, serverView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	serverView.prototype.config = function config() {
		return layout;
	};

	serverView.prototype.init = function init(view) {
		$$('server-form').bind($$('setting-server'));
		webix.dp.$$("setting-server").config.updateFromResponse = true;
	};

	return serverView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (serverView);


var grid = {
	id: "setting-server",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	columns: [{ id: "server_id", header: "#", sort: "int", width: 50 }, { id: "servername", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "link", header: ["Домен", { content: "textFilter" }], sort: "int", minWidth: 80, fillspace: 2, editor: "text" }, { id: "soft", header: ["Софт"], sort: "int", minWidth: 120, fillspace: 2 }, { id: "sort_order", header: { text: "Порядок сортировки", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	pager: "pagerA",
	"export": true,
	url: "index.php?route=setting/server/getList&token=" + token,
	save: {
		"insert": "index.php?route=setting/server/add&token=" + token,
		"update": "index.php?route=setting/server/edit&token=" + token,
		"delete": "index.php?route=setting/server/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('server-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('server-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var ui = {
	view: "form",
	id: "server-form",
	multiview: { keepViews: true },
	dataFeed: function dataFeed(id) {
		var current_server_id = $$('setting-server').getItem(id).server_id;
		this.load("index.php?route=setting/server/getForm&token=" + token + "&server_id=" + current_server_id);
	},
	elements: [{ view: "text", id: "server_id", name: "server_id", label: "ID сервера", labelWidth: 170, readonly: true }, { view: "text", name: "servername", label: "Название", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 32 знаков" }, { view: "text", name: "link", label: "Домен", placeholder: "Адрес домена", labelWidth: 170, required: true, invalidMessage: "значение поля не должно быть пустым" }, { view: "text", name: "ip", label: "IP адрес", placeholder: "Введите ip адрес", labelWidth: 170 }, { view: "select", name: "soft", label: "Программное обеспечение", labelWidth: 170, options: ["Wialon Pro", "Wialon Local"] }, { view: "text", name: "login", label: "Логин", placeholder: "Введите логин для сервера", labelWidth: 170 }, { view: "text", name: "total", label: "Емкость", labelWidth: 170 }, { view: "text", name: "password", label: "Пароль/токен", placeholder: "Введите пароль для сервера", labelWidth: 170 }, { cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("server-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form = $$("server-form");
				if (!form.validate()) return false;

				webix.ajax().post("index.php?route=setting/server/validateForm&token=" + token, $$("server-form").getValues(), function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						form.save();
						$$("server-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"servername": function servername(value) {
			return value.length >= 3 && value.length <= 32;
		},
		"link": webix.rules.isNotEmpty
	}
};

var server_views = {
	view: "multiview",
	id: "server-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [server_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/settings.js":
/*!***********************************!*\
  !*** ./sources/views/settings.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var settingView = function (_JetView) {
	_inherits(settingView, _JetView);

	function settingView() {
		_classCallCheck(this, settingView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	settingView.prototype.config = function config() {
		return layout;
	};

	settingView.prototype.init = function init(view) {
		view.queryView({ view: "form" }).load("index.php?route=setting/setting&token=" + token);
	};

	return settingView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (settingView);


var position_options = [{ id: 1, value: "left" }, { id: 2, value: "right" }, { id: 3, value: "top" }, { id: 4, value: "bottom" }];

var propertysheet = {
	view: "form",
	id: "settings",
	//width: 500,
	//position:"center",
	complexData: true,
	multiview: { keepViews: true },
	dataFeed: function dataFeed(id) {
		this.load("index.php?route=setting/setting&token=" + token);
	},
	elements: [{
		view: "tabview",
		tabbar: { options: ["Общие", "Заявки"] }, animate: false,
		cells: [{ id: "Общие", rows: [{ template: "Локализация", type: "section" }, { view: "select", name: "config_admin_language", label: "Язык", labelWidth: 140, options: "index.php?route=setting/setting/getLanguages&token=" + token }, { template: "Исторический период", type: "section" }, { label: "Период (мес)", labelWidth: 180, view: "text", name: "config_history_period" }, { label: "Дата начала истории", labelWidth: 180, view: "datepicker", name: "config_history_date_start", format: "%d.%m.%Y" }, { label: "Считать автоматически", labelWidth: 180, view: "checkbox", name: "config_history_autoperiod" }, { template: "Статистика", type: "section" }, { label: "Подозрительность (дней)", labelWidth: 230, view: "text", name: "config_suspicious_range" }, { label: "Дата отсчета подозрительности", labelWidth: 230, view: "datepicker", name: "config_suspicious_date", placeholder: "Установите если не от текущей даты", format: "%d.%m.%Y" }, { template: "Дизайн", type: "section" }, { label: "Тема", labelWidth: 140, view: "richselect", options: position_options, name: "config_theme" }] }, { id: "Заявки", rows: [{ template: "Статусы", type: "section" }, { view: "select", name: "config_order_status_id", label: "Статус заявки по умолчанию", labelWidth: 220, options: "index.php?route=setting/setting/getOrderStatuses&token=" + token }, { view: "select", name: "config_processing_status", label: "Статус выполняемой заявки", labelWidth: 220, options: "index.php?route=setting/setting/getOrderStatuses&token=" + token }, { view: "select", name: "config_complete_status", label: "Статус завершенной заявки", labelWidth: 220, options: "index.php?route=setting/setting/getOrderStatuses&token=" + token }, { view: "select", name: "config_unsuccess_status", label: "Статус невыполненной заявки", labelWidth: 220, options: "index.php?route=setting/setting/getOrderStatuses&token=" + token }] }]
	}, { margin: 10,
		cols: [{}, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				//let sform = $$("item-form");
				var sform = this.getFormView();
				if (sform.isDirty()) {
					if (!sform.validate()) return false;

					webix.ajax().post("index.php?route=setting/setting/validate&token=" + token, sform.getValues(), function (errtext, data, XmlHttpRequest) {
						if (errtext && errtext != "[]") {
							webix.message({
								text: JSON.parse(errtext).warning,
								type: "error",
								expire: 5000
							}); //show server side response
							return false;
						} else {
							webix.ajax().post("index.php?route=setting/setting/edit&token=" + token, sform.getValues());
							webix.message({
								text: "Настройки сохранены.",
								type: "success",
								expire: 5000
							});
						}
					});
				}
			}
		}]
	}]
};

var layout = {
	type: "space",
	rows: [propertysheet]
};

/***/ }),

/***/ "./sources/views/tarifs.js":
/*!*********************************!*\
  !*** ./sources/views/tarifs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var TarifView = function (_JetView) {
	_inherits(TarifView, _JetView);

	function TarifView() {
		_classCallCheck(this, TarifView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	TarifView.prototype.config = function config() {
		return layout;
	};

	TarifView.prototype.init = function init(view) {
		$$('tarif-form').bind($$('billing-tarif'));
		webix.dp.$$("billing-tarif").config.updateFromResponse = true;
	};

	return TarifView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (TarifView);


var grid = {
	id: "billing-tarif",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	columns: [{ id: "tarif_id", header: "#", sort: "int", width: 50 }, { id: "tarifname", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "price", header: ["Ставка", { content: "textFilter" }], sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "sort_order", header: { text: "Порядок сортировки", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "roaming", header: ["Роуминг"], sort: "int", minWidth: 120, fillspace: 1, template: "{common.checkbox()}" }, { id: "gprs", header: ["Трафик"], sort: "int", minWidth: 120, fillspace: 1, template: "{common.checkbox()}" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	pager: "pagerA",
	"export": true,
	url: "index.php?route=billing/tarif/getList&token=" + token,
	save: {
		"insert": "index.php?route=billing/tarif/add&token=" + token,
		"update": "index.php?route=billing/tarif/edit&token=" + token,
		"delete": "index.php?route=billing/tarif/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('tarif-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('tarif-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var ui = {
	view: "form",
	id: "tarif-form",
	multiview: { keepViews: true },
	dataFeed: function dataFeed(id) {
		var current_tarif_id = $$('billing-tarif').getItem(id).tarif_id;
		this.load("index.php?route=billing/tarif/getForm&token=" + token + "&tarif_id=" + current_tarif_id);
	},
	elements: [{ cols: [{ view: "text", id: "tarif_id", name: "tarif_id", label: "ID тарифа", labelWidth: 170, readonly: true }, { view: "text", id: "date_added", name: "date_added", label: "Введен", labelWidth: 150, labelAlign: "right", readonly: true }, { view: "text", id: "date_modified", name: "date_modified", label: "Изменен", labelWidth: 150, labelAlign: "right", readonly: true }] }, { view: "text", name: "tarifname", label: "Название", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 32 знаков" }, { view: "text", name: "price", label: "Ставка", placeholder: "Установите расчетную ставку", labelWidth: 170, required: true, invalidMessage: "значение поля должно быть числом" }, { cols: [{ view: "checkbox", name: "roaming", label: "Включая роуминг", labelWidth: 170 }, { view: "checkbox", name: "gprs", label: "Включая GPRS-трафик", labelWidth: 170, labelAlign: "right" }] }, { view: "textarea", name: "description", label: "Дополнительные сведения", labelWidth: 170, gravity: 1, maxHeight: 150 }, { cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("tarif-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form = $$("tarif-form");
				if (!form.validate()) return false;

				webix.ajax().post("index.php?route=billing/tarif/validateForm&token=" + token, $$("tarif-form").getValues(), function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						form.save();
						$$("tarif-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"tarifname": function tarifname(value) {
			return value.length >= 3 && value.length <= 32;
		},
		"price": webix.rules.isNumber
	}
};

var tarif_views = {
	view: "multiview",
	id: "tarif-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [tarif_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/templates/deleted.js":
/*!********************************************!*\
  !*** ./sources/views/templates/deleted.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (obj, common, value) {
	if (value != 0) return "<span class='webix_icon mdi mdi-window-close deleted'></span>";else return "";
});

/***/ }),

/***/ "./sources/views/templates/eye.js":
/*!****************************************!*\
  !*** ./sources/views/templates/eye.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (obj, common, value) {
	if (value == 1) return "<span class='webix_icon mdi mdi-eye-off wialon-group-off'></span>";else return "<span class='webix_icon mdi mdi-eye wialon-group-on'></span>";
});

/***/ }),

/***/ "./sources/views/templates/online.js":
/*!*******************************************!*\
  !*** ./sources/views/templates/online.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (obj, common, value) {
	if (value == "1") return "<span class='tracker-online'> Online </span>";else return "<span class='tracker-offline'> Offline </span>";
});

/***/ }),

/***/ "./sources/views/templates/order_states.js":
/*!*************************************************!*\
  !*** ./sources/views/templates/order_states.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* harmony default export */ __webpack_exports__["default"] = (function (obj, common, value) {
  if (value == 'closed') return "<span class='webix_table_checkbox order-status order-closed'> Закрыта </span>";else return "<span class='webix_table_checkbox order-status order-open'> Открыта </span>";
});

/***/ }),

/***/ "./sources/views/templates/status.js":
/*!*******************************************!*\
  !*** ./sources/views/templates/status.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (obj, common, value) {
	if (value != 0) return "<span class='webix_table_checkbox status status1'> Включено </span>";else return "<span class='webix_table_checkbox status status0'> Отключено </span>";
});

/***/ }),

/***/ "./sources/views/test.js":
/*!*******************************!*\
  !*** ./sources/views/test.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");


function test(arg) {
    console.log('test for VS Code');
    console.log(arg);
}

/***/ }),

/***/ "./sources/views/trackers.js":
/*!***********************************!*\
  !*** ./sources/views/trackers.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var trackerView = function (_JetView) {
	_inherits(trackerView, _JetView);

	function trackerView() {
		_classCallCheck(this, trackerView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	trackerView.prototype.config = function config() {
		return layout;
	};

	trackerView.prototype.init = function init(view) {
		$$('tracker-form').bind($$('catalog-tracker'));
		webix.dp.$$("catalog-tracker").config.updateFromResponse = true;
	};

	return trackerView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (trackerView);


var grid = {
	id: "catalog-tracker",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	columns: [{ id: "tracker_id", header: "#", sort: "int", width: 50 }, { id: "trackername", header: ["Модель", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "sort_order", header: { text: "Порядок сортировки", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	pager: "pagerA",
	"export": true,
	url: "index.php?route=catalog/tracker/getList&token=" + token,
	save: {
		"insert": "index.php?route=catalog/tracker/add&token=" + token,
		"update": "index.php?route=catalog/tracker/edit&token=" + token,
		"delete": "index.php?route=catalog/tracker/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('hw').clearAll();
			$$('hw').load("index.php?route=catalog/tracker/getHw&token=" + token + "&tracker_id=" + this.getItem(id).tracker_id);
			//$$('tracker-form').setValues({hw:new webix.DataCollection({url:"index.php?route=catalog/tracker/getHw&token="+token+"&tracker_id="+this.getItem(id).tracker_id})});			
			$$('tracker-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('tracker-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

webix.protoUI({
	name: "formtable",
	setValue: function setValue(value) {
		this.clearAll();
		this.parse(value);
	},
	getValue: function getValue() {
		return this.serialize();
	}
}, webix.ui.datatable);

var grid_hw = { view: "formtable", name: "hw", id: "hw",
	columns: [{ id: "server_id", header: "#", sort: "int", width: 40 }, { id: "servername", header: "Сервер", sort: "int", minWidth: 120, fillspace: true }, //editor:"select", options:"index.php?route=catalog/tracker/getServers&token="+token },
	{ id: "tracker_hw", header: ["Трекер HW"], sort: "int", minWidth: 120, fillspace: 2, editor: "text" }],
	scroll: "xy",
	select: "row",
	maxHeight: 400,
	editable: true,
	type: { template: "{common.space()}" }
};

var ui = {
	view: "form",
	id: "tracker-form",
	multiview: { keepViews: true },
	dataFeed: function dataFeed(id) {
		var current_tracker_id = $$('catalog-tracker').getItem(id).tracker_id;
		this.load("index.php?route=catalog/tracker/getForm&token=" + token + "&tracker_id=" + current_tracker_id);
	},
	elements: [{ view: "text", id: "tracker_id", name: "tracker_id", label: "ID трекера", labelWidth: 170, readonly: true }, { view: "text", name: "trackername", label: "Модель", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 32 знаков" }, { cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, { view: "forminput", label: "Соответствие HW", labelWidth: 170, body: grid_hw }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("tracker-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form = $$("tracker-form");
				if (!form.validate()) return false;
				$$("hw").editStop();
				var request_post = form.getValues();
				//request_post.hw = $$("grid_hw").serialize();			
				webix.ajax().post("index.php?route=catalog/tracker/validateForm&token=" + token, request_post, function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						form.save(request_post);
						$$("tracker-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"trackername": function trackername(value) {
			return value.length >= 3 && value.length <= 32;
		}
	}
};

var tracker_views = {
	view: "multiview",
	id: "tracker-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [tracker_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/user_api.js":
/*!***********************************!*\
  !*** ./sources/views/user_api.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var views_modules_visitors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! views/modules/visitors */ "./sources/views/modules/visitors.js");
/* harmony import */ var views_modules_orderschart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/modules/orderschart */ "./sources/views/modules/orderschart.js");
/* harmony import */ var views_modules_chart_diff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/modules/chart_diff */ "./sources/views/modules/chart_diff.js");
/* harmony import */ var views_modules_revenue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/modules/revenue */ "./sources/views/modules/revenue.js");
/* harmony import */ var views_modules_taskschart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/taskschart */ "./sources/views/modules/taskschart.js");
/* harmony import */ var views_modules_diffchart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/diffchart */ "./sources/views/modules/diffchart.js");







var layout = {
	type: "clean",
	rows: [{
		type: "space",
		rows: [{
			type: "wide",
			minHeight: 250,
			cols: [{
				gravity: 4,
				type: "clean",
				rows: [{
					"template": "<span class='webix_icon fa-area-chart'></span>Different charts in one", "css": "sub_title", "height": 30
				}, views_modules_chart_diff__WEBPACK_IMPORTED_MODULE_2__["default"]]
			}, views_modules_diffchart__WEBPACK_IMPORTED_MODULE_5__["default"]]
		}, {

			type: "wide",
			cols: [{

				type: "clean",
				rows: [{
					"template": "<span class='webix_icon fa-line-chart'></span>Sales", "css": "sub_title", "height": 30
				}, views_modules_revenue__WEBPACK_IMPORTED_MODULE_3__["default"]]
			}, {
				"type": "clean",
				"rows": [{
					"template": "<span class='webix_icon fa-tasks'></span>Tasks", "css": "sub_title", "height": 30
				}, views_modules_taskschart__WEBPACK_IMPORTED_MODULE_4__["default"], { template: " " }]

			}]
		}, {
			height: 220,
			type: "wide",
			cols: [views_modules_orderschart__WEBPACK_IMPORTED_MODULE_1__["default"], views_modules_visitors__WEBPACK_IMPORTED_MODULE_0__["default"]]
		}]

	}]
};

/* harmony default export */ __webpack_exports__["default"] = (layout);

/***/ }),

/***/ "./sources/views/user_groups.js":
/*!**************************************!*\
  !*** ./sources/views/user_groups.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var UserGroupView = function (_JetView) {
	_inherits(UserGroupView, _JetView);

	function UserGroupView() {
		_classCallCheck(this, UserGroupView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	UserGroupView.prototype.config = function config() {
		return layout;
	};

	UserGroupView.prototype.init = function init(view) {
		$$('user-group-form').bind($$('user-user_permission'));
		webix.dp.$$("user-user_permission").config.updateFromResponse = true;
	};

	return UserGroupView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (UserGroupView);


var grid = {
	id: "user-user_permission",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	columns: [{ id: "user_group_id", header: "#", sort: "int", width: 50 }, { id: "name", header: ["Название группы", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "edit", header: "&nbsp;", width: 35, template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>" }],
	pager: "pagerA",
	"export": true,
	url: "index.php?route=user/user_permission/getList&token=" + token,
	save: {
		"insert": "index.php?route=user/user_permission/add&token=" + token,
		"update": "index.php?route=user/user_permission/edit&token=" + token,
		"delete": "index.php?route=user/user_permission/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('grida').clearAll();
			$$('grida').load("index.php?route=user/user_permission/getPermissions&token=" + token + "&user_group_id=" + this.getItem(id).user_group_id);
			$$('user-group-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('user-group-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var ui = {
	view: "form",
	id: "user-group-form",
	dataFeed: function dataFeed(id) {
		var current_group_id = $$('user-user_permission').getItem(id).user_group_id;
		this.load("index.php?route=user/user_permission/getForm&token=" + token + "&user_group_id=" + current_group_id);
	},
	elements: [{ view: "text", id: "user_group_id", name: "user_group_id", label: "ID группы", labelWidth: 170, readonly: true }, { view: "text", name: "name", label: "Название группы", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "поле не может быть пустым" }, { view: "datatable", name: "grida", id: "grida",
		columns: [{ id: "permission", header: "Модуль или задача", fillspace: true }, { id: "access", header: ["Просмотр", { content: "masterCheckbox" }], checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}" }, { id: "modify", header: ["Модификация", { content: "masterCheckbox" }], checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}" }, { id: "hiden", header: ["Скрыть", { content: "masterCheckbox" }], checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}" }],
		scroll: "xy",
		select: "row",
		maxHeight: 400,
		type: { template: "{common.space()}" }
	}, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("user-group-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form = $$("user-group-form");
				if (!form.validate()) return false;
				var request_post = form.getValues();
				request_post.permissions = $$("grida").serialize();
				form.save(request_post);
				$$("user-group-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }]
	}],
	rules: {
		"name": webix.rules.isNotEmpty
	}
};

var user_group = {
	view: "multiview",
	id: "user-group-views",
	cells: [grid, ui]
};
var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [user_group, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/users.js":
/*!********************************!*\
  !*** ./sources/views/users.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var UserView = function (_JetView) {
	_inherits(UserView, _JetView);

	function UserView() {
		_classCallCheck(this, UserView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	UserView.prototype.config = function config() {
		return layout;
	};

	UserView.prototype.init = function init(view) {
		$$('user-form').bind($$('user-user'));
		webix.dp.$$("user-user").config.updateFromResponse = true;
	};

	return UserView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (UserView);


var grid = {
	id: "user-user",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	columns: [{ id: "user_id", header: "#", sort: "int", width: 50 }, { id: "thumb2", header: "", template: "<img class='photo' src='#thumb2#'/>", width: 50 }, { id: "username", header: ["Логин", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "user_group_name", header: ["Группа", { content: "selectFilter" }], sort: "string", minWidth: 120, fillspace: 2 //editor:"select", 
		//options:"index.php?route=user/user/getUserGroups&token="+token, 
	}, { id: "date_added", header: ["Дата регистрации", { content: "dateFilter" }], sort: "int", minWidth: 120, fillspace: 2 }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	pager: "pagerA",
	"export": true,
	url: "index.php?route=user/user/getList&token=" + token,
	save: {
		"insert": "index.php?route=user/user/add&token=" + token,
		"update": "index.php?route=user/user/edit&token=" + token,
		"delete": "index.php?route=user/user/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('user-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('user-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

webix.protoUI({
	name: "imageLabel",
	setValue: function setValue(value) {
		this.setHTML("<a href='' id='thumb-image' data-toggle='image' class='img-thumbnail' data-original-title='' title=''><img  src='" + value + "'></img></a><input  name='image' value='' id='input-image' hidden='true' />");
	}
}, webix.ui.label);

var ui = {
	view: "form",
	id: "user-form",
	dataFeed: function dataFeed(id) {
		var current_user_id = $$('user-user').getItem(id).user_id;
		this.load("index.php?route=user/user/getForm&token=" + token + "&user_id=" + current_user_id);
	},
	elements: [{ view: "imageLabel", name: "thumb", id: "thumb", height: 110 }, { view: "text", name: "image", id: "image", hidden: true }, { view: "text", name: "thumb2", id: "thumb2", hidden: true }, { view: "text", id: "user_id", name: "user_id", label: "ID пользователя", labelWidth: 170, readonly: true }, { view: "text", name: "username", label: "Логин", placeholder: "Введите логин", labelWidth: 170, required: true, invalidMessage: "логин должен быть от 3 до 20 знаков" }, { view: "select", name: "user_group_id", label: "Группа", labelWidth: 170, editor: "select", options: "index.php?route=user/user/getUserGroups&token=" + token,
		required: true, invalidMessage: "поле не может быть пустым" }, { view: "text", name: "firstname", label: "Имя", placeholder: "Введите имя", labelWidth: 170, required: true, invalidMessage: "поле должно содержать от 1 до 32 знаков" }, { view: "text", name: "lastname", label: "Фамилия", placeholder: "Введите фамилию", labelWidth: 170, required: true, invalidMessage: "поле должно содержать от 1 до 32 знаков" }, { view: "text", name: "email", type: 'email', label: "E-mail", placeholder: "Введите e-mail", labelWidth: 170, required: true, invalidMessage: "не похоже на адрес электронной почты" }, { view: "text", name: "password", type: 'password', label: "Пароль", placeholder: "Введите пароль", labelWidth: 170, invalidMessage: "необходимо ввести пароль от 4 до 20 знаков" }, { view: "text", name: "confirm", type: 'password', label: "Подтверждение", placeholder: "Подтвердите пароль", labelWidth: 170, invalidMessage: "пароли не совпадают" }, { view: "select", name: "status", label: "Статус", placeholder: "Установите статус", labelWidth: 170, options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("user-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form = $$("user-form");
				if (!form.validate()) return false;

				webix.$$("thumb2").setValue($('a#thumb-image.img-thumbnail').find('img').attr("src"));
				if ($('input#input-image').val()) webix.$$("image").setValue($('input#input-image').val());

				webix.ajax().post("index.php?route=user/user/validateForm&token=" + token, $$("user-form").getValues(), function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						form.save();
						$$("user-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"username": function username(value) {
			return value.length >= 3 && value.length <= 20;
		},
		"firstname": function firstname(value) {
			return value.length >= 1 && value.length <= 32;
		},
		"lastname": function lastname(value) {
			return value.length >= 1 && value.length <= 32;
		},
		"email": function email(value) {
			return webix.rules.isEmail(value);
		},
		"password": function password(value) {
			if (value) return value.length >= 4 && value.length <= 20;else return true;
		},
		"confirm": function confirm(value) {
			return value == this.getValues().password;
		}
	}
};

var user_views = {
	view: "multiview",
	id: "user-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [user_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/vehicles.js":
/*!***********************************!*\
  !*** ./sources/views/vehicles.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var vehicleView = function (_JetView) {
	_inherits(vehicleView, _JetView);

	function vehicleView() {
		_classCallCheck(this, vehicleView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	vehicleView.prototype.config = function config() {
		return layout;
	};

	vehicleView.prototype.init = function init(view) {
		$$('vehicle-form').bind($$('catalog-vehicle'));
		webix.dp.$$("catalog-vehicle").config.updateFromResponse = true;
	};

	return vehicleView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (vehicleView);


var grid = {
	id: "catalog-vehicle",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	//pager:"pagerA",	
	"export": true,
	columns: [{ id: "vehicle_id", header: "#", sort: "int", width: 50 }, { id: "vehiclename", header: ["Модель", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "sort_order", header: { text: "Порядок сортировки", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1, editor: "text" }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 2, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_6__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	url: "index.php?route=catalog/vehicle/getList&token=" + token,
	save: {
		"insert": "index.php?route=catalog/vehicle/add&token=" + token,
		"update": "index.php?route=catalog/vehicle/edit&token=" + token,
		"delete": "index.php?route=catalog/vehicle/delete&token=" + token
	},
	pager: {
		autosize: true,
		group: 5,
		// level:1,
		template: function template(data, common) {
			return common.first(data, common) + common.prev(data, common) + common.pages(data, common) + common.next(data, common) + common.last(data, common);
		}
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('vehicle-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('vehicle-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var ui = {
	view: "form",
	id: "vehicle-form",
	//multiview:{ keepViews:true },
	dataFeed: function dataFeed(id) {
		var current_vehicle_id = $$('catalog-vehicle').getItem(id).vehicle_id;
		this.load("index.php?route=catalog/vehicle/getForm&token=" + token + "&vehicle_id=" + current_vehicle_id);
	},
	elements: [{ view: "text", id: "vehicle_id", name: "vehicle_id", label: "ID трекера", labelWidth: 170, readonly: true }, { view: "text", name: "vehiclename", label: "Модель", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 32 знаков" }, { cols: [{ view: "text", name: "sort_order", label: "Порядок сортировки", labelWidth: 170 }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("vehicle-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var form_for_save = $$("vehicle-form");
				if (!form_for_save.validate()) return false;

				webix.ajax().post("index.php?route=catalog/wialongroup/validateForm&token=" + token, form_for_save.getValues(), function (text, data, XmlHttpRequest) {
					if (text && text != "[]") {
						webix.message({
							text: JSON.parse(text).warning,
							type: "error",
							expire: 5000
						}); //show server side response
						return false;
					} else {
						//this.getFormView().save()
						form_for_save.save();
						$$("vehicle-views").back();
						$$('paging').show();
						$$('edit-form-icon').hide();
						$$('edit-tools').show();
					}
				});
			} }]
	}],
	rules: {
		"vehiclename": function vehiclename(value) {
			return value.length >= 3 && value.length <= 32;
		}
	}
};

var vehicle_views = {
	view: "multiview",
	keepViews: true,
	id: "vehicle-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [vehicle_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ }),

/***/ "./sources/views/webix/ckeditor.js":
/*!*****************************************!*\
  !*** ./sources/views/webix/ckeditor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

webix.protoUI({
	name: "ckeditor",
	$init: function $init() {
		this.$view.className += " webix_selectable";
	},
	defaults: {
		borderless: true,
		toolbar: [["Bold", "Italic", "-", "NumberedList", "BulletedList", "-", "Link", "Unlink"], ["FontSize", "TextColor", "BGColor"]]
	},
	_init_ckeditor_once: function _init_ckeditor_once() {
		var tid = this.config.textAreaID = "t" + webix.uid();
		this.$view.innerHTML = "<textarea id='" + tid + "'>" + this.config.value + "</textarea>";

		window.CKEDITOR_BASEPATH = webix.codebase + "ckeditor/";
		var t = {
			toolbar: this.config.toolbar,
			width: this.$width - 2,
			height: this.$height - 44
		};
		webix.extend(t, this.config.editor || {});
		webix.require("ckeditor/ckeditor.js", function () {
			this._3rd_editor = window.CKEDITOR.replace(this.config.textAreaID, t);
		}, this);
	},
	_set_inner_size: function _set_inner_size(x, y) {
		if (!this._3rd_editor || !this._3rd_editor.container || !this.$width) return;
		this._3rd_editor.resize(x, y);
	},
	$setSize: function $setSize(x, y) {
		if (webix.ui.view.prototype.$setSize.call(this, x, y)) {
			this._init_ckeditor_once();
			this._set_inner_size(x, y);
		}
	},
	setValue: function setValue(value) {
		this.config.value = value;
		if (this._3rd_editor) this._3rd_editor.setData(value);else webix.delay(function () {
			this.setValue(value);
		}, this, [], 100);
	},
	getValue: function getValue() {
		return this._3rd_editor ? this._3rd_editor.getData() : this.config.value;
	},
	focus: function focus() {
		this._focus_await = true;
		if (this._3rd_editor) this._3rd_editor.focus();
	},
	getEditor: function getEditor() {
		return this._3rd_editor.getData();
	}
}, webix.ui.view);

/***/ }),

/***/ "./sources/views/webix/icon.js":
/*!*************************************!*\
  !*** ./sources/views/webix/icon.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// icon button with count marker
webix.protoUI({
	name: "icon",
	$skin: function $skin() {
		this.defaults.height = webix.skin.$active.inputHeight;
	},
	defaults: {
		template: function template(obj) {
			var html = "<button style='height:100%;width:100%;line-height:" + obj.aheight + "px' class='webix_icon_button'>";
			html += "<span class='webix_icon " + obj.icon + "'></span>";
			if (obj.value) html += "<span class='webix_icon_count'>" + obj.value + "</span>";
			html += "</button>";
			return html;
		},
		width: 33
	},
	_set_inner_size: function _set_inner_size() {}
}, webix.ui.button);

/***/ }),

/***/ "./sources/views/webix/menutree.js":
/*!*****************************************!*\
  !*** ./sources/views/webix/menutree.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Type for left menu
webix.type(webix.ui.tree, {
	name: "menuTree",
	height: 40,
	icon: function icon() {
		return "";
	},
	folder: function folder(obj) {
		if (obj.icon) return "<span class='webix_icon icon fa-" + obj.icon + "'></span>";
		return "";
	}
});
webix.type(webix.ui.tree, {
	name: "menuTree2",
	height: 40,

	icon: function icon(obj) {
		var html = "";
		var open = "";
		for (var i = 1; i <= obj.$level; i++) {
			if (i == obj.$level && obj.$count) {
				var dir = obj.open ? "down" : "right";
				html += "<span class='" + open + " webix_icon fa-angle-" + dir + "'></span>";
			}
		}
		return html;
	},
	folder: function folder(obj) {
		if (obj.icon) return "<span class='webix_icon icon fa-" + obj.icon + "'></span>";
		return "";
	}
});

/***/ }),

/***/ "./sources/views/webix/scheduler.js":
/*!******************************************!*\
  !*** ./sources/views/webix/scheduler.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

webix.protoUI({
	name: "dhx-scheduler",
	defaults: {
		tabs: ["day", "week", "month"]
	},
	getScheduler: function getScheduler() {
		return this._scheduler;
	},
	$init: function $init() {
		this.$ready.push(function () {
			var tabs = this.config.tabs;

			var html = ["<div class='dhx_cal_container' style='width:100%; height:100%;'><div class='dhx_cal_navline'><div class='dhx_cal_prev_button'>&nbsp;</div><div class='dhx_cal_next_button'>&nbsp;</div><div class='dhx_cal_today_button'></div><div class='dhx_cal_date'></div>"];
			if (tabs) for (var i = 0; i < tabs.length; i++) {
				html.push("<div class='dhx_cal_tab" + (i === 0 ? " dhx_cal_tab_first" : "") + (i == tabs.length - 1 ? " dhx_cal_tab_last" : "") + "' name='" + tabs[i] + "_tab' ></div>");
			}html.push("</div><div class='dhx_cal_header'></div><div class='dhx_cal_data'></div></div>");

			this.$view.innerHTML = html.join("");

			//because we are not messing with resize model
			//if setSize will be implemented - below line can be replaced with webix.ready
			webix.delay(webix.bind(this._render_once, this));
		});
	},
	_render_once: function _render_once() {
		var scheduler = this._scheduler = window.Scheduler ? window.Scheduler.getSchedulerInstance() : window.scheduler;

		if (this.config.init) this.config.init.call(this);

		scheduler.init(this.$view.firstChild, this.config.date || new Date(), this.config.mode || "week");
		if (this.config.ready) this.config.ready.call(this);
	}
}, webix.ui.view);

/***/ }),

/***/ "./sources/views/wialongroups.js":
/*!***************************************!*\
  !*** ./sources/views/wialongroups.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/index.js");
/* harmony import */ var views_menus_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! views/menus/export */ "./sources/views/menus/export.js");
/* harmony import */ var views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! views/menus/toolbar */ "./sources/views/menus/toolbar.js");
/* harmony import */ var views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! views/menus/toolplug */ "./sources/views/menus/toolplug.js");
/* harmony import */ var views_modules_paging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! views/modules/paging */ "./sources/views/modules/paging.js");
/* harmony import */ var views_modules_groupfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! views/modules/groupfilter */ "./sources/views/modules/groupfilter.js");
/* harmony import */ var views_modules_statusfilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! views/modules/statusfilter */ "./sources/views/modules/statusfilter.js");
/* harmony import */ var views_templates_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! views/templates/status */ "./sources/views/templates/status.js");
/* harmony import */ var views_templates_eye__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! views/templates/eye */ "./sources/views/templates/eye.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import {data} 	from "models/wialongroups";









var WialongroupView = function (_JetView) {
	_inherits(WialongroupView, _JetView);

	function WialongroupView() {
		_classCallCheck(this, WialongroupView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	WialongroupView.prototype.config = function config() {
		return layout;
	};

	WialongroupView.prototype.init = function init(view) {
		//view.queryView({ view:"datatable" }).parse(data);
		$$('add').disable();
		$$('delete').disable();
		$$('wialon_group-form').bind($$('catalog-wialongroup'));
		webix.dp.$$("catalog-wialongroup").config.updateFromResponse = true;
	};

	return WialongroupView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_0__["JetView"]);

/* harmony default export */ __webpack_exports__["default"] = (WialongroupView);


var grid = {
	id: "catalog-wialongroup",
	view: "datatable",
	select: "row",
	clipboard: "selection",
	multiselect: true,
	editable: true,
	editaction: "dblclick",
	checkboxRefresh: true,
	pager: "pagerA",
	"export": true,
	columns: [{ id: "wialon_group_id", header: "#", sort: "int", width: 50 }, { id: "wialon_groupname", header: ["Название", { content: "textFilter" }], sort: "string", minWidth: 120, fillspace: 2, editor: "text" }, { id: "wialon_id", header: { text: "Wialon ID группы", height: 60, css: "multiline" }, sort: "int", minWidth: 80, fillspace: 1 }, { id: "servername", header: ["Сервер", { content: "selectFilter" }], sort: "int", minWidth: 120, fillspace: 1 }, { id: "wialon_group_off", header: ["Вид группы", { content: "eyeFilter", css: "webix_ss_filter" }], sort: "int", width: 110, css: { "text-align": "center" }, template: views_templates_eye__WEBPACK_IMPORTED_MODULE_8__["default"] }, { id: "status", header: ["Статус", { content: "staFilter", css: "webix_ss_filter" }], sort: "int", minWidth: 100, fillspace: 1, editor: "inline-checkbox", template: views_templates_status__WEBPACK_IMPORTED_MODULE_7__["default"] }, { id: "edit", header: "<span class='webix_icon mdi mdi-pencil-box-outline'></span>", width: 35,
		template: "<span style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>"
	}],
	url: "index.php?route=catalog/wialongroup/getList&token=" + token,
	save: {
		"insert": "index.php?route=catalog/wialongroup/add&token=" + token,
		"update": "index.php?route=catalog/wialongroup/edit&token=" + token,
		"delete": "index.php?route=catalog/wialongroup/delete&token=" + token
	},
	onClick: {
		"mdi-pencil": function mdiPencil(e, id) {
			this.select(id);
			$$('wialon_group-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	on: {
		"onAfterAdd": function onAfterAdd(obj, index) {
			var lastid = this.getLastId();
			this.select(lastid);
			$$('wialon_group-form').show();
			$$('edit-tools').hide();
			$$('edit-form-icon').show();
			$$('paging').hide();
		}
	},
	ready: function ready() {
		webix.extend(this, webix.ProgressBar);
	}
};

var ui = {
	view: "form",
	id: "wialon_group-form",
	multiview: { keepViews: true },
	dataFeed: function dataFeed(id) {
		var current_wialon_group_id = $$('catalog-wialongroup').getItem(id).wialon_group_id;
		this.load("index.php?route=catalog/wialongroup/getForm&token=" + token + "&wialon_group_id=" + current_wialon_group_id);
	},
	elements: [{ view: "text", id: "wialon_group_id", name: "wialon_group_id", label: "ID группы", labelWidth: 170, readonly: true }, { view: "text", name: "wialon_groupname", label: "Название", placeholder: "Введите название", labelWidth: 170, required: true, invalidMessage: "название должно быть от 3 до 128 знаков" }, { cols: [{ view: "text", name: "wialon_id", label: "Wialon ID", labelWidth: 170, readonly: true }, { view: "text", name: "servername", label: "Сервер", labelWidth: 170, labelAlign: "right", readonly: true }] }, { view: "select", name: "owner_id", label: "Владелец группы", labelWidth: 170, options: "index.php?route=catalog/wialongroup/getOwners&token=" + token }, { view: "select", name: "tarif_id", label: "Тариф группы", labelWidth: 170, options: "index.php?route=catalog/wialongroup/getTarifs&token=" + token }, { view: "select", name: "discount_id", label: "Скидка для группы", labelWidth: 170, options: "index.php?route=catalog/wialongroup/getDiscounts&token=" + token }, { cols: [{ view: "select", name: "wialon_group_off", label: "Скрытая", labelWidth: 170, options: [{ id: 0, value: "Нет" }, { id: 1, value: "Да" }], readonly: true }, { view: "select", name: "status", label: "Статус", labelWidth: 170, labelAlign: "right", options: [{ id: 0, value: "Отключено" }, { id: 1, value: "Включено" }] }] }, {
		margin: 10,
		cols: [{}, { view: "button", value: "Отменить", width: 120, click: function click() {
				$$("wialon_group-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }, { view: "button", value: "Сохранить", type: "form", width: 120, click: function click() {
				var savind_form = $$("wialon_group-form");
				if (savind_form.isDirty()) {
					if (!savind_form.validate()) return false;

					webix.ajax().post("index.php?route=catalog/wialongroup/validateForm&token=" + token, savind_form.getValues(), function (text, data, XmlHttpRequest) {
						if (text && text != "[]") {
							webix.message({
								text: JSON.parse(text).warning,
								type: "error",
								expire: 5000
							}); //show server side response
							return false;
						} else {
							date_popup.show();
							//savind_form.save();									
						}
					});
				}
				$$("wialon_group-views").back();
				$$('paging').show();
				$$('edit-form-icon').hide();
				$$('edit-tools').show();
			} }]
	}],
	on: {
		"onChange": function onChange(newv, oldv) {
			var changed = this.getDirtyValues();
			if (changed.discount_id) this.setValues({ old_discount_id: oldv }, true);
			if (changed.tarif_id) this.setValues({ old_tarif_id: oldv }, true);
		}
	},
	rules: {
		"wialon_groupname": function wialon_groupname(value) {
			return value.length >= 3 && value.length <= 128;
		}
	}
};

var date_popup = webix.ui({
	view: "window",
	modal: true,
	position: "center",
	head: "Какой датой внести изменения?",
	body: {
		view: "form",
		elements: [{ view: "datepicker", name: "set_date_changed", value: new Date(), format: "%d.%m.%Y" }, { view: "button", label: "Подтверждение", type: "form", click: function click() {
				var date_changed = this.getParentView().getValues().set_date_changed;
				$$("wialon_group-form").setValues({ date_changed: date_changed }, true);
				$$("wialon_group-form").save();
				this.getTopParentView().hide();
			} }]
	}
});

var wialon_group_views = {
	view: "multiview",
	id: "wialon_group-views",
	cells: [grid, ui]
};

var layout = {
	type: "space",
	rows: [{ height: 40, id: "edit-tools", cols: views_menus_export__WEBPACK_IMPORTED_MODULE_1__["default"].concat(views_menus_toolbar__WEBPACK_IMPORTED_MODULE_2__["default"]) }, { height: 40, id: "edit-form-icon", cols: views_menus_toolplug__WEBPACK_IMPORTED_MODULE_3__["default"], hidden: true }, { rows: [wialon_group_views, views_modules_paging__WEBPACK_IMPORTED_MODULE_4__["default"]] }]
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map