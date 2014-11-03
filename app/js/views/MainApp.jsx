/**
 * 這是 root view，也稱為 controller-view
 */


//========================================================================
//
// import

var Header = React.createFactory( require('./Header.jsx') );
var List = React.createFactory( require('./List.jsx') );
var Footer = React.createFactory( require('./Footer.jsx') );

var TodoStore = require('../stores/TodoStore');
var AppConstants = require('../constants/AppConstants');


//========================================================================
//
// Component

var MainApp = React.createClass({

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

            <div className="wrapper">
                <Header />

                <List truth={this.state} />

                <Footer />
            </div>
        )
    },



    //========================================================================
    //
    // private methods - 處理元件內部的事件

    _getState: function () {
      return {
        arrTodos: TodoStore.getTodos()
      }
    }

});

module.exports = MainApp;
