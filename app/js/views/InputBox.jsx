/**
 *
 */

var actions = require('../actions/AppActionCreator');
var styles = require('../../assets/sass/views/InputBox.scss');

var InputBox = React.createClass({
  render: function () {
    return (
      <div className="inputbox">
        <input type="text" name="inputbox" placeholder="請輸入待辦事項" />
        <button type="submit">新增</button>
      </div>
    );
  }

});

module.exports = InputBox;
