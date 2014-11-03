/**
 *
 */

var actions = require('../actions/AppActionCreator');
var ListItem = React.createFactory(require('./ListItem.jsx'));

var List = React.createClass({

  render: function () {
    var arrTodos = this.props.truth.arrTodos;

    var arr = arrTodos.map(function (item) {
      return <ListItem key={item.uid} item={item} />
    }, this);

    return (
      <div className="todo-list">
        {arr}
      </div>
    );
  }

});

module.exports = List;
