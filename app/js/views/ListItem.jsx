/**
 *
 */

var actions = require('../actions/AppActionCreator');

var ListItem = React.createClass({

  render: function () {
    return (
      <div onClick={this.props.onClick}>
        <span>{this.props.item.uid} {this.props.item.name} {this.props.selected ? "XD" : "QQ"}</span>
      </div>
    );
  }

});

module.exports = ListItem;
