/**
 *
 */

var actions = require('../actions/AppActionCreator');
var shortId = require('shortid');
var mui = require('material-ui');
var PaperButton = mui.PaperButton;

require('../../assets/sass/views/InputBox.scss');

var InputBox = React.createClass({
  getInitialState: function () {
    return {
      inputData: {
        value: '',
        created: null
      }
    }
  },

  componentDidMount: function() {
    this.refs.todo.getDOMNode().addEventListener('keydown', this.handleKeydown);
  },

  componentWillUnmount: function() {
    this.refs.todo.getDOMNode.removeEventListener('keydown', this.handleKeydown);
  },

  render: function () {
    return (
      <div className="inputbox">
        <mui.Input onChange={this.handleChange}
                   onKeyDown={this.handleKeydown}

                   ref="todo" type="text" name="inputbox"
                   placeholder="請輸入待辦事項"
                   description="輸入完畢請點選新增。" />

        <PaperButton className="button" type={PaperButton.Types.RAISED} label="新增" primary={true} onClick={this.handleClick} />
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
    if (e.keyCode === 13) {
      this.handleSave();
    }
  },

  handleSave: function () {
    var item = this.state.inputData;
    if (item.value.trim().length === 0) {
      return false;
    }

    // retrieve max uid in arrTodos
    var arrTodos = this.props.truth.arrTodos;

    console.log("儲存");
    actions.createTodo({
      name: item.value,
      created: Date.now(),
      uid: shortId.generate()
    });

    this.setState({
      inputData: {
        value: '',
        created: null
      }
    });

    this.refs.todo.setValue('');
  },

  handleClick: function (e) {
    e.preventDefault();

    console.log('點擊!', this.state.inputData);
    this.handleSave();
  }

});

module.exports = InputBox;
