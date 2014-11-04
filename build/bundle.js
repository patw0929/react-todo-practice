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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * 這支是程式進入點，它負責建立 root view (controller view)，
	 * 也就是 TodoApp 這個元件
	 *
	 * boot.js 存在的目地，是因為通常 app 啟動時有許多先期工作要完成，
	 * 例如預載資料到 store 內、檢查本地端 db 狀態、切換不同語系字串、
	 * 這些工作都先在 boot.js 內做完，再啟動 TodoApp view 建立畫面是比較好的
	 * 
	 */

	// v0.12 開始要用 factory 包一次才能直接呼叫	
	var MainApp = React.createFactory(__webpack_require__(1));

	$(function(){

		// 啟動 root view 時要傳入假資料
		React.render( MainApp(), document.getElementById('container') );

	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 這是 root view，也稱為 controller-view
	 */


	//========================================================================
	//
	// import

	var Header = React.createFactory( __webpack_require__(2) );
	var InputBox = React.createFactory(__webpack_require__(3));
	var List = React.createFactory( __webpack_require__(4) );
	var Footer = React.createFactory( __webpack_require__(5) );

	var TodoStore = __webpack_require__(6);
	var AppConstants = __webpack_require__(7);


	//========================================================================
	//
	// Component

	var MainApp = React.createClass({displayName: 'MainApp',

	    //========================================================================
	    //
	    // mixin | props | default value

	    mixins: [],

	    // 這裏列出所有要用到的 property 與其預設值
	    // 它在 getInitialState() 前執行，此時 this.state 還是空值
	    getDefaultProps: function() {
	        return {
	        };
	    },

	    // 這裏列出每個 prop 的型別，但只會在 dev time 檢查
	    propTypes: {
	        // foo: React.PropTypes.array,
	        // bar: React.PropTypes.bool
	    },


	    //========================================================================
	    //
	    // mount

	    // 這是 component API, 在 mount 前會跑一次，取值做為 this.state 的預設值
	    getInitialState: function () {
	      return this._getState();
	    },

	    /**
	     * 主程式進入點
	     */
	    componentWillMount: function () {
	      TodoStore.addListener(AppConstants.CHANGE_EVENT, this._onChange);
	    },

	    // 重要：root view 建立後第一件事，就是偵聽 store 的 change 事件
	    componentDidMount: function() {
	        //
	    },

	    //========================================================================
	    //
	    // unmount

	    componentWillUnmount: function() {
	    },


	    componentDidUnmount: function() {
	    },

	    //========================================================================
	    //
	    // update

	    // 在 render() 前執行，有機會可先處理 props 後用 setState() 存起來
	    componentWillReceiveProps: function(nextProps) {
	        //
	    },

	    shouldComponentUpdate: function(nextProps, nextState) {
	        return true;
	    },

	    // 這時已不可用 setState()
	    componentWillUpdate: function(nextProps, nextState) {
	        console.log( '\tMainAPP > willUpdate' );
	    },

	    /**
	     *
	     */
	    componentDidUpdate: function(prevProps, prevState) {
	        console.log( '\tMainAPP > didUpdate' );
	    },

	    //========================================================================
	    //
	    // render

	    render: function() {

	        console.log( '\tMainApp > render' );

	        return (

	            React.createElement("div", {className: "wrapper"}, 
	              React.createElement(Header, null), 
	                React.createElement(InputBox, null), 
	                React.createElement(List, {truth: this.state}), 
	              React.createElement(Footer, null)
	            )
	        )
	    },



	    //========================================================================
	    //
	    // private methods - 處理元件內部的事件

	    _onChange: function () {
	      console.log('_onChange 重繪: ', this._getState());

	      // 重要：從 root view 觸發所有 sub-view 重繪
	      this.setState(this._getState());
	    },

	    _getState: function () {
	      return {
	        arrTodos: TodoStore.getTodos(),
	        selectedItem: TodoStore.getSelectedItem()
	      }
	    }

	});

	module.exports = MainApp;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */

	var actions = __webpack_require__(9);
	var styles = __webpack_require__(14);

	var Header = React.createClass({displayName: 'Header',

	  /**
	   *
	   */
	  render: function() {


	    return (

	      React.createElement("header", {className: "header"}, 
	        React.createElement("h1", null, "My React Todo Practice")
	      )
	    );

	  }

	});

	module.exports = Header;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */

	var actions = __webpack_require__(9);
	var styles = __webpack_require__(16);

	var InputBox = React.createClass({displayName: 'InputBox',
	  render: function () {
	    return (
	      React.createElement("div", {className: "inputbox"}, 
	        React.createElement("input", {type: "text", name: "inputbox", placeholder: "請輸入待辦事項"}), 
	        React.createElement("button", {type: "submit"}, "新增")
	      )
	    );
	  }

	});

	module.exports = InputBox;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */

	var actions = __webpack_require__(9);
	var ListItem = React.createFactory(__webpack_require__(8));
	var styles = __webpack_require__(20);

	var List = React.createClass({displayName: 'List',

	  render: function () {
	    var arrTodos = this.props.truth.arrTodos;

	    var arr = arrTodos.map(function (item) {
	      return React.createElement(ListItem, {key: item.uid, 
	                       item: item, 
	                       selected: this.props.truth.selectedItem == item, 

	                       onClick: this.handleClick.bind(this, item)})
	    }, this);

	    return (
	      React.createElement("div", {className: "todo-list"}, 
	        arr
	      )
	    );
	  },

	  handleClick: function (item) {
	    console.log('我被點了', item.name);
	    actions.selectTodo(item);
	  }

	});

	module.exports = List;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */
	var ReactPropTypes = React.PropTypes;
	var actions = __webpack_require__(9);
	var styles = __webpack_require__(18);

	var Footer = React.createClass({displayName: 'Footer',

	  propTypes: {
	  },

	  /**
	   * @return {object}
	   */
	  render: function() {

	  	return (
	      React.createElement("footer", {className: "footer"}, 
	        React.createElement("span", {className: "licensing"}, 
	            "MIT licensing, use at will."
	        )
	      )
	    );
	  },


	});

	module.exports = Footer;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TodoStore
	 */

	//========================================================================
	//
	// IMPORT

	var AppDispatcher = __webpack_require__(10);
	var AppConstants = __webpack_require__(7);
	var actions = __webpack_require__(9);

	var objectAssign = __webpack_require__(11);
	var EventEmitter = __webpack_require__(12).EventEmitter; // 取得一個 pub/sub 廣播器

	var arrTodos = [
	  { name: '吃飯', created: Date.now(), uid: 1 },
	  { name: '睡覺', created: Date.now(), uid: 2 },
	  { name: '打東東', created: Date.now(), uid: 3 }
	];

	var TodoStore = {};

	var selectedItem = null;

	/**
	 * 建立 TodoStore class，並且繼承 EventEMitter 以擁有廣播功能
	 */
	objectAssign( TodoStore, EventEmitter.prototype, {
	  /**
	   * Public API
	   * 供外界取得 TodoStore 內部資料
	   */
	  getTodos: function(){
	    return arrTodos;
	  },

	  /**
	   *
	   */
	  getSelectedItem: function(){
	    return selectedItem;
	  }
	});

	//========================================================================
	//
	// event handlers

	TodoStore.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

	  // evt .action 就是 view 當時廣播出來的整包物件
	  // 它內含 actionType
	  var action = evt.action;

	  switch (action.actionType) {
	    /**
	     *
	     */
	    case AppConstants.TODO_CREATE:
	      arrTodos.push(action.item);
	      console.log('TodoStore 新增: ', arrTodos);
	      TodoStore.emit(AppConstants.CHANGE_EVENT);
	      break;

	    /**
	     *
	     */
	    case AppConstants.TODO_REMOVE:
	      arrTodos = arrTodos.filter(function (item) {
	        return item != action.item;
	      });
	      console.log('TodoStore 刪完: ', arrTodos);
	      TodoStore.emit(AppConstants.CHANGE_EVENT);
	      break;

	    /**
	     *
	     */
	    case AppConstants.TODO_UPDATE:
	      console.log('TodoStore 更新: ', arrTodos);
	      TodoStore.emit(AppConstants.CHANGE_EVENT);
	      break;

	    /**
	     *
	     */
	    case AppConstants.TODO_SELECT:
	      console.log('TodoStore 選取: ', action.item);

	      // 選取同樣的 item 就不用處理下去了
	      if (selectedItem != action.item) {
	        selectedItem = action.item;
	        TodoStore.emit(AppConstants.CHANGE_EVENT);
	      }
	      break;

	    default:
	        //
	  }

	});

	module.exports = TodoStore;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TodoConstants
	 */

	var keyMirror = __webpack_require__(13);

	// Constructs an enumeration with keys equal to their value.
	// 也就是讓 hash 的 key 與 value 值一樣
	// 不然原本 value 都是 null
	// 不過既然如此，為何不乾脆用 set 之類只有key 的就好
	module.exports = keyMirror({

		SOURCE_VIEW_ACTION: null,
		SOURCE_SERVER_ACTION: null,
		SOURCE_ROUTER_ACTION: null,

	  CHANGE_EVENT: null,

	  TODO_CREATE: null,
	  TODO_REMOVE: null,
	  TODO_UPDATE: null,
	  TODO_SELECT: null
	});



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */

	var actions = __webpack_require__(9);

	var ListItem = React.createClass({displayName: 'ListItem',
	  render: function () {
	    var cx = React.addons.classSet;
	    var classes = cx({
	      'selected': this.props.selected
	    });

	    return (
	      React.createElement("div", {onClick: this.props.onClick}, 
	        React.createElement("span", {className: classes}, this.props.item.uid, " ", this.props.item.name, " ", this.props.selected ? "XD" : "QQ")
	      )
	    );
	  }

	});

	module.exports = ListItem;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */
	var AppDispatcher = __webpack_require__(10);
	var AppConstants = __webpack_require__(7);
	var Promise = __webpack_require__(24).Promise;

	// 就是個單純的 hash table
	// 因此下面所有指令皆可視為 Action static method
	var AppActionCreators = {

	    /**
	     * ok
	     *
	     * app 啟動後，第一次載入資料
	     */
	    load: function(){
			//
	    },

	    selectTodo: function (item) {
	      AppDispatcher.handleViewAction({
	        actionType: AppConstants.TODO_SELECT,
	        item: item
	      });
	    }

	};

	module.exports = AppActionCreators;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	var AppConstants = __webpack_require__(7);

	var Dispatcher = __webpack_require__(23).Dispatcher;


	/**
	 * flux-chat 內最新的 dispatcher
	 */
	var AppDispatcher = new Dispatcher();

	// 注意：這裏等於是繼承 Dispatcher class 身上所有指令，目前是讓此物件俱有廣播能功
	// 同樣功能也可用 underscore.extend 或 Object.assign() 做到
	// 今天因為有用 jquery 就請它代勞了
	$.extend( AppDispatcher, {

	    /**
	     * @param {object} action The details of the action, including the action's
	     * type and additional data coming from the server.
	     */
	    handleServerAction: function(action) {
	        var payload = {
	            source: AppConstants.SOURCE_SERVER_ACTION,
	            action: action
	        };

	        this.dispatch(payload);
	    },

	    /**
	     * 
	     */
	    handleViewAction: function(action) {
	        var payload = {
	            source: AppConstants.SOURCE_VIEW_ACTION,
	            action: action
	        };
	        
	        this.dispatch(payload);
	    },

	    /**
	     * 將來啟用 router 時，這裏處理所有 router event
	     */
	    handleRouterAction: function(path) {
	        this.dispatch({
	            source: AppConstants.SOURCE_ROUTER_ACTION,
	            action: path
	        });
	    }

	});

	module.exports = AppDispatcher;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var pendingException;
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				try {
					to[keys[i]] = from[keys[i]];
				} catch (err) {
					if (pendingException === undefined) {
						pendingException = err;
					}
				}
			}
		}

		if (pendingException) {
			throw pendingException;
		}

		return to;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = __webpack_require__(25);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/Header.scss", function() {
			var newContent = require("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/Header.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, "header.header h1{text-align:center;background-color:#12c46e;line-height:60px}", ""]);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/InputBox.scss", function() {
			var newContent = require("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/InputBox.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, ".inputbox{margin:10px auto;text-align:center}.inputbox input[type=\"text\"]{width:90%;font-size:16px;padding:10px}.inputbox button[type=\"submit\"]{width:5%;min-width:85px;font-size:16px;line-height:42px;border-radius:5px;border:0;background-color:#eee;margin-left:10px}", ""]);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/Footer.scss", function() {
			var newContent = require("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/Footer.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, "footer.footer{position:fixed;bottom:0;background-color:#6b4308;color:#fff;text-align:center;line-height:60px;width:100%}", ""]);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/List.scss", function() {
			var newContent = require("!!/Users/gogolook/Projects/react-todo-practice/node_modules/css-loader/index.js!/Users/gogolook/Projects/react-todo-practice/node_modules/sass-loader/index.js!/Users/gogolook/Projects/react-todo-practice/app/assets/sass/views/List.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, ".todo-list div>span{display:block;background-color:#eee;padding:10px}.todo-list div>span.selected{background-color:#999}", ""]);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};

	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;

		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}

	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(28)


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.0
	 */

	(function() {
	    "use strict";

	    function $$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function $$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function $$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var $$utils$$_isArray;

	    if (!Array.isArray) {
	      $$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      $$utils$$_isArray = Array.isArray;
	    }

	    var $$utils$$isArray = $$utils$$_isArray;
	    var $$utils$$now = Date.now || function() { return new Date().getTime(); };
	    function $$utils$$F() { }

	    var $$utils$$o_create = (Object.create || function (o) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (typeof o !== 'object') {
	        throw new TypeError('Argument must be an object');
	      }
	      $$utils$$F.prototype = o;
	      return new $$utils$$F();
	    });

	    var $$asap$$len = 0;

	    var $$asap$$default = function asap(callback, arg) {
	      $$asap$$queue[$$asap$$len] = callback;
	      $$asap$$queue[$$asap$$len + 1] = arg;
	      $$asap$$len += 2;
	      if ($$asap$$len === 2) {
	        // If len is 1, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        $$asap$$scheduleFlush();
	      }
	    };

	    var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
	    var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;

	    // test for web worker but not in IE10
	    var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function $$asap$$useNextTick() {
	      return function() {
	        process.nextTick($$asap$$flush);
	      };
	    }

	    function $$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function $$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = $$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function $$asap$$useSetTimeout() {
	      return function() {
	        setTimeout($$asap$$flush, 1);
	      };
	    }

	    var $$asap$$queue = new Array(1000);

	    function $$asap$$flush() {
	      for (var i = 0; i < $$asap$$len; i+=2) {
	        var callback = $$asap$$queue[i];
	        var arg = $$asap$$queue[i+1];

	        callback(arg);

	        $$asap$$queue[i] = undefined;
	        $$asap$$queue[i+1] = undefined;
	      }

	      $$asap$$len = 0;
	    }

	    var $$asap$$scheduleFlush;

	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      $$asap$$scheduleFlush = $$asap$$useNextTick();
	    } else if ($$asap$$BrowserMutationObserver) {
	      $$asap$$scheduleFlush = $$asap$$useMutationObserver();
	    } else if ($$asap$$isWorker) {
	      $$asap$$scheduleFlush = $$asap$$useMessageChannel();
	    } else {
	      $$asap$$scheduleFlush = $$asap$$useSetTimeout();
	    }

	    function $$$internal$$noop() {}
	    var $$$internal$$PENDING   = void 0;
	    var $$$internal$$FULFILLED = 1;
	    var $$$internal$$REJECTED  = 2;
	    var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

	    function $$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function $$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.')
	    }

	    function $$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        $$$internal$$GET_THEN_ERROR.error = error;
	        return $$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function $$$internal$$handleForeignThenable(promise, thenable, then) {
	       $$asap$$default(function(promise) {
	        var sealed = false;
	        var error = $$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            $$$internal$$resolve(promise, value);
	          } else {
	            $$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          $$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          $$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function $$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, thenable._result);
	      } else if (promise._state === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, thenable._result);
	      } else {
	        $$$internal$$subscribe(thenable, undefined, function(value) {
	          $$$internal$$resolve(promise, value);
	        }, function(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        $$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = $$$internal$$getThen(maybeThenable);

	        if (then === $$$internal$$GET_THEN_ERROR) {
	          $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          $$$internal$$fulfill(promise, maybeThenable);
	        } else if ($$utils$$isFunction(then)) {
	          $$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          $$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function $$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        $$$internal$$reject(promise, $$$internal$$selfFullfillment());
	      } else if ($$utils$$objectOrFunction(value)) {
	        $$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        $$$internal$$fulfill(promise, value);
	      }
	    }

	    function $$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      $$$internal$$publish(promise);
	    }

	    function $$$internal$$fulfill(promise, value) {
	      if (promise._state !== $$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = $$$internal$$FULFILLED;

	      if (promise._subscribers.length === 0) {
	      } else {
	        $$asap$$default($$$internal$$publish, promise);
	      }
	    }

	    function $$$internal$$reject(promise, reason) {
	      if (promise._state !== $$$internal$$PENDING) { return; }
	      promise._state = $$$internal$$REJECTED;
	      promise._result = reason;

	      $$asap$$default($$$internal$$publishRejection, promise);
	    }

	    function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + $$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        $$asap$$default($$$internal$$publish, parent);
	      }
	    }

	    function $$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          $$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function $$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();

	    function $$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        $$$internal$$TRY_CATCH_ERROR.error = e;
	        return $$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function $$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = $$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = $$$internal$$tryCatch(callback, detail);

	        if (value === $$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== $$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        $$$internal$$resolve(promise, value);
	      } else if (failed) {
	        $$$internal$$reject(promise, error);
	      } else if (settled === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, value);
	      } else if (settled === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, value);
	      }
	    }

	    function $$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          $$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        $$$internal$$reject(promise, e);
	      }
	    }

	    function $$$enumerator$$makeSettledResult(state, position, value) {
	      if (state === $$$internal$$FULFILLED) {
	        return {
	          state: 'fulfilled',
	          value: value
	        };
	      } else {
	        return {
	          state: 'rejected',
	          reason: value
	        };
	      }
	    }

	    function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor($$$internal$$noop, label);
	      this._abortOnReject = abortOnReject;

	      if (this._validateInput(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._init();

	        if (this.length === 0) {
	          $$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            $$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        $$$internal$$reject(this.promise, this._validationError());
	      }
	    }

	    $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return $$utils$$isArray(input);
	    };

	    $$$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    $$$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var $$$enumerator$$default = $$$enumerator$$Enumerator;

	    $$$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var promise = this.promise;
	      var input   = this._input;

	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      if ($$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
	          entry._onerror = null;
	          this._settledAt(entry._state, i, entry._result);
	        } else {
	          this._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        this._remaining--;
	        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === $$$internal$$PENDING) {
	        this._remaining--;

	        if (this._abortOnReject && state === $$$internal$$REJECTED) {
	          $$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = this._makeResult(state, i, value);
	        }
	      }

	      if (this._remaining === 0) {
	        $$$internal$$fulfill(promise, this._result);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
	      return value;
	    };

	    $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      $$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt($$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt($$$internal$$REJECTED, i, reason);
	      });
	    };

	    var $$promise$all$$default = function all(entries, label) {
	      return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
	    };

	    var $$promise$race$$default = function race(entries, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor($$$internal$$noop, label);

	      if (!$$utils$$isArray(entries)) {
	        $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        $$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        $$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    };

	    var $$promise$resolve$$default = function resolve(object, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$resolve(promise, object);
	      return promise;
	    };

	    var $$promise$reject$$default = function reject(reason, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$reject(promise, reason);
	      return promise;
	    };

	    var $$es6$promise$promise$$counter = 0;

	    function $$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function $$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;

	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise’s eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @constructor
	    */
	    function $$es6$promise$promise$$Promise(resolver, label) {
	      this._id = $$es6$promise$promise$$counter++;
	      this._label = label;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if ($$$internal$$noop !== resolver) {
	        if (!$$utils$$isFunction(resolver)) {
	          $$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof $$es6$promise$promise$$Promise)) {
	          $$es6$promise$promise$$needsNew();
	        }

	        $$$internal$$initializePromise(this, resolver);
	      }
	    }

	    $$es6$promise$promise$$Promise.all = $$promise$all$$default;
	    $$es6$promise$promise$$Promise.race = $$promise$race$$default;
	    $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
	    $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;

	    $$es6$promise$promise$$Promise.prototype = {
	      constructor: $$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection, label) {
	        var parent = this;
	        var state = parent._state;

	        if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        parent._onerror = null;

	        var child = new this.constructor($$$internal$$noop, label);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          $$asap$$default(function(){
	            $$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection, label) {
	        return this.then(null, onRejection, label);
	      }
	    };

	    var $$es6$promise$polyfill$$default = function polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	        local = global;
	      } else if (typeof window !== 'undefined' && window.document) {
	        local = window;
	      } else {
	        local = self;
	      }

	      var es6PromiseSupport =
	        "Promise" in local &&
	        // Some of these methods are missing from
	        // Firefox/Chrome experimental implementations
	        "resolve" in local.Promise &&
	        "reject" in local.Promise &&
	        "all" in local.Promise &&
	        "race" in local.Promise &&
	        // Older version of the spec had a resolver object
	        // as the arg rather than a function
	        (function() {
	          var resolve;
	          new local.Promise(function(r) { resolve = r; });
	          return $$utils$$isFunction(resolve);
	        }());

	      if (!es6PromiseSupport) {
	        local.Promise = $$es6$promise$promise$$default;
	      }
	    };

	    var es6$promise$umd$$ES6Promise = {
	      Promise: $$es6$promise$promise$$default,
	      polyfill: $$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(29)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = es6$promise$umd$$ES6Promise;
	    }
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27), (function() { return this; }()), __webpack_require__(30)(module)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(31);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }
/******/ ])