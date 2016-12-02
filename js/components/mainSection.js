var React = require('react');
var Types = React.PropTypes;
var Actions = require('../actions/todoActions');
var TodoItem = require('./todoItem');

module.exports = React.createClass({

  propTypes: {
    allTodos: Types.object.isRequired,
    areAllComplete: Types.bool.isRequired
  },

  render: function() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    // render nothing if no todos
    if (total === 0) {
      return null;
    }

    var todos = [];
    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  _onToggleCompleteAll: function(event) {
    Actions.toggleCompleteAll();
  },

});
