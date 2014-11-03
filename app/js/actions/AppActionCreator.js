/**
 *
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Promise = require('es6-promise').Promise;

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

};

module.exports = AppActionCreators;
