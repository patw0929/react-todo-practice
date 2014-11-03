/**
 *
 */

var actions = require('../actions/AppActionCreator');

var ListItem = React.createClass({

  render: function () {
    return (
      <div>
        <span>{this.props.key}</span>
      </div>
    );
  }

});

module.exports = ListItem;
