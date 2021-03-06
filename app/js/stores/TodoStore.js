/**
 * TodoStore
 */

//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/AppActionCreator');

var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

var arrTodos = [];
var selectedItem = null;
var searchFilter = '';

var db = window.localStorage;
if (db.hasOwnProperty('patwDB') === false) {
  db.setItem('patwDB', JSON.stringify({
    todos: [],
    selectedItem: null
  }));
}

var lsDB = JSON.parse(db.getItem('patwDB'));
arrTodos = lsDB.todos ? lsDB.todos : [];
selectedItem = lsDB.selectedItem ? lsDB.selectedItem : null;

// var arrTodos = [
//   { name: '吃飯', created: Date.now(), uid: 1 },
//   { name: '睡覺', created: Date.now(), uid: 2 },
//   { name: '打東東', created: Date.now(), uid: 3 }
// ];

var TodoStore = {};

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
  },

  getSearchFilter: function () {
    return searchFilter;
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
      saveToLocalStorage();
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
      saveToLocalStorage();
      break;

    /**
     *
     */
    case AppConstants.TODO_UPDATE:
      console.log('TodoStore 更新: ', arrTodos);
      TodoStore.emit(AppConstants.CHANGE_EVENT);
      saveToLocalStorage();
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
      saveToLocalStorage();
      break;

    /**
     *
     */
    case AppConstants.TODO_FILTER:
      console.log('TodoStore 搜尋: ', action.val);

      if (searchFilter != action.val) {
        searchFilter = action.val;
        TodoStore.emit(AppConstants.CHANGE_EVENT);
      }
      break;

    default:
        //
  }

});

function saveToLocalStorage() {
  db.setItem('patwDB', JSON.stringify({
    todos: arrTodos,
    selectedItem: selectedItem
  }));
}

module.exports = TodoStore;
