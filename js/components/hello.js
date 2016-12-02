var React = require('react');

var Test = require('./test');

var Hello = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello, react!</h1>
        <Test/>
      </div>
    );
  },
});

module.exports = Hello;
