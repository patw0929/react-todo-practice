/**
 *
 */
var ReactPropTypes = React.PropTypes;
var actions = require('../actions/AppActionCreator');
var styles = require('../../assets/sass/views/Footer.scss');

var Footer = React.createClass({

  propTypes: {
  },

  /**
   * @return {object}
   */
  render: function() {

  	return (
      <footer className="footer">
        <span className="licensing">
            MIT licensing, use at will.
        </span>
      </footer>
    );
  },


});

module.exports = Footer;
