/**
 *
 */

var actions = require('../actions/AppActionCreator');
var FilterBox = React.createFactory(require('./FilterBox.jsx'));
var styles = require('../../assets/sass/views/Header.scss');

var Header = React.createClass({

  /**
   *
   */
  render: function() {


    return (

      <header className="header">
        <h1>My React Todo Practice</h1>

        <FilterBox />
      </header>
    );

  }

});

module.exports = Header;
