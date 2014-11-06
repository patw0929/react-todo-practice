/**
 *
 */

var actions = require('../actions/AppActionCreator');

var FilterBox = React.createClass({
  render: function () {
    return (
      <div className="filterbox">
        <input onChange={this.handleChange}
               ref="filter" type="text" name="filterbox"
               placeholder="請輸入要過濾的字串" />
      </div>
    );
  },

  handleChange: function (e) {
    var val = e.target.value;
    console.log('過濾: ', val);
    actions.filterTodo(val);
  }
});

module.exports = FilterBox;
