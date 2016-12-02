var React = require('react');
var Actions = require('../actions/todoActions');
var TextInput = require('./textInput');

module.exports = React.createClass({
  render: function() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  _onSave: function(text) {
    if (text.trim()) {
      Actions.create(text);
    }
  },

});
