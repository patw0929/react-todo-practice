/**
 *
 */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var actions = require('../actions/AppActionCreator');
var ListItem = React.createFactory(require('./ListItem.jsx'));
var styles = require('../../assets/sass/views/List.scss');

var List = React.createClass({

  render: function () {
    var arrTodos = this.props.truth.arrTodos;
    var filterVal = this.props.truth.searchFilter;

    var arr = arrTodos.filter(function (item) {
                return item.name.indexOf(filterVal) > -1;
              }).map(function (item) {
                return <ListItem key={item.uid}
                                 item={item}
                                 selected={this.props.truth.selectedItem == item}

                                 onClick={this.handleClick.bind(this, item)}
                                 onDelete={this.handleDelete.bind(this, item)} />
    }, this);

    return (
      <div className="todo-list">
        <ReactCSSTransitionGroup transitionName="items">
          {arr}
        </ReactCSSTransitionGroup>
      </div>
    );
  },

  handleClick: function (item) {
    console.log('我被點了', item.name);
    actions.selectTodo(item);
  },

  handleDelete: function (item) {
    console.log('刪除', item.name);
    if (confirm('確定要刪除嗎？')) {
      actions.deleteTodo(item);
    }
  }
});

module.exports = List;
