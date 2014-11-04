/**
 *
 */

var actions = require('../actions/AppActionCreator');
var styles = require('../../assets/sass/views/InputBox.scss');

var InputBox = React.createClass({
  getInitialState: function () {
    return {
      inputData: {
        value: '',
        created: null
      }
    }
  },

  render: function () {
    return (
      <div className="inputbox">
        <input type="text" name="inputbox"
                           value={this.state.inputData.value}
                           placeholder="請輸入待辦事項"

                           onChange={this.handleChange}
                           onKeydown={this.handleKeydown} />
        <button type="submit" onClick={this.handleClick}>新增</button>
      </div>
    );
  },

  handleChange: function (e) {
    this.setState({
      inputData: {
        value: e.target.value,
        created: Date.now()
      }
    })
  },

  handleKeydown: function (e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      this.handleSave();
    }
  },

  handleSave: function () {
    var item = this.state.inputData;
    if (item.value.trim().length === 0) {
      return false;
    }

    console.log("儲存");
  },

  handleClick: function (e) {
    e.preventDefault();

    console.log('點擊!', this.state.inputData);
    this.handleSave();
  }

});

module.exports = InputBox;
