/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

Vue.component('teamspeak-channel', __webpack_require__(57));

var app = new Vue({
    el: '#app',

    data: {
        channels: []
    }
});

socket.on('channels', function (channels) {
    app.channels = channels;
});

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['channel']
});

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(58)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(59),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/Sgt-Wikkidoo/github/ts3-viewer/assets/js/components/TeamspeakChannel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TeamspeakChannel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ee82352", Component.options)
  } else {
    hotAPI.reload("data-v-5ee82352", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('span', {
    staticClass: "level-item"
  }, [(!_vm.channel.channel.spacer) ? _c('img', {
    attrs: {
      "src": "/img/channel.svg"
    }
  }) : _vm._e()]), _vm._v(" "), (!_vm.channel.channel.spacer) ? _c('span', {
    staticClass: "level-item",
    domProps: {
      "textContent": _vm._s(_vm.channel.channel.name)
    }
  }) : _vm._e(), _vm._v(" "), (_vm.channel.channel.spacer && _vm.channel.channel.spacerAlignment == 1) ? _c('span', {
    staticClass: "level-item",
    domProps: {
      "textContent": _vm._s(_vm.channel.channel.spacerName)
    }
  }) : _vm._e(), _vm._v(" "), (_vm.channel.channel.spacer && _vm.channel.channel.spacerName.length == 0) ? _c('span', {
    staticClass: "level-item"
  }, [_c('br')]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "level-center"
  }, [(_vm.channel.channel.spacerAlignment == 2 || _vm.channel.channel.spacerAlignment == 4) ? _c('span', {
    staticClass: "level-item",
    domProps: {
      "textContent": _vm._s(_vm.channel.channel.spacerName)
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [(!_vm.channel.channel.spacer) ? _c('span', {
    staticClass: "level-item"
  }, [(_vm.channel.channel.defaultChannel) ? _c('img', {
    attrs: {
      "src": "/img/home.svg"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.channel.channel.passwordProtected) ? _c('img', {
    attrs: {
      "src": "/img/lock.svg"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.channel.channel.codec == 5) ? _c('img', {
    attrs: {
      "src": "/img/music.svg"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.channel.channel.neededTalkPower > 0) ? _c('img', {
    attrs: {
      "src": "/img/moderated.svg"
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.channel.channel.spacerAlignment == 3) ? _c('span', {
    staticClass: "level-item",
    domProps: {
      "textContent": _vm._s(_vm.channel.channel.spacerName)
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "list"
  }, _vm._l((_vm.channel.clients), function(client) {
    return _c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "level is-mobile"
    }, [_c('div', {
      staticClass: "level-left"
    }, [_c('span', {
      staticClass: "level-item"
    }, [(client.away) ? _c('img', {
      attrs: {
        "src": "/img/away.svg"
      }
    }) : (client.soundMuted || client.soundDisabled) ? _c('img', {
      attrs: {
        "src": "/img/sound-off.svg"
      }
    }) : (client.micMuted || client.micDisabled) ? _c('img', {
      attrs: {
        "src": "/img/mic-off.svg"
      }
    }) : _c('img', {
      attrs: {
        "src": "/img/person.svg"
      }
    })]), _vm._v(" "), _c('span', {
      staticClass: "level-item",
      domProps: {
        "textContent": _vm._s(client.name)
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "level-right"
    }, [_c('span', {
      staticClass: "level-item"
    }, [(client.talkPower < _vm.channel.channel.neededTalkPower && client.isTalker) ? _c('img', {
      attrs: {
        "src": "/img/mic.svg"
      }
    }) : (client.talkPower < _vm.channel.channel.neededTalkPower && !client.isTalker) ? _c('img', {
      attrs: {
        "src": "/img/mic-off.svg"
      }
    }) : _vm._e()])])])])
  }))]), _vm._v(" "), _vm._l((_vm.channel.subChannels), function(subChannel) {
    return _c('teamspeak-channel', {
      key: subChannel.name,
      attrs: {
        "channel": subChannel
      }
    })
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5ee82352", module.exports)
  }
}

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ })

/******/ });