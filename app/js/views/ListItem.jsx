/**
 *
 */

var actions = require('../actions/AppActionCreator');

var ListItem = React.createClass({
  render: function () {
    var cx = React.addons.classSet;
    var classes = cx({
      'selected': this.props.selected
    });

    return (
      <div onClick={this.props.onClick}>
        <span className={classes}>
          {this.props.item.uid} {this.props.item.name} {this.props.selected ? "XD" : "QQ"}
          <a className="delete-btn" onClick={this.props.onDelete}>x</a>
        </span>
      </div>
    );
  }

});

module.exports = ListItem;
