/**
 *
 */

var actions = require('../actions/AppActionCreator');

var ListItem = React.createClass({

  render: function () {
    return (
      <div onClick={this.props.onClick}>
        <span>{this.props.item.uid} {this.props.item.name}</span>
      </div>
    );
  }

});

module.exports = ListItem;
