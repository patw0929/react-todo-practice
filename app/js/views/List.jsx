/**
 *
 */

var actions = require('../actions/AppActionCreator');
var ListItem = React.createFactory(require('./ListItem.jsx'));

var List = React.createClass({

  render: function () {
    var arrTodos = this.props.truth.arrTodos;

    var arr = arrTodos.map(function (item) {
      return <ListItem key={item.uid} item={item} onClick={this.handleClick.bind(this, item)} />
    }, this);

    return (
      <div className="todo-list">
        {arr}
      </div>
    );
  },

  handleClick: function (item) {
    console.log('我被點了', item.name);
  }

});

module.exports = List;
