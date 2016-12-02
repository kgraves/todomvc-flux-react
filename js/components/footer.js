var React = require('react');
var Types = React.PropTypes;
var Actions = require('../actions/todoActions');

module.exports = React.createClass({

  propTypes: {
    allTodos: Types.object.isRequired
  },

  render: function() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    // render nothing if no todos
    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var notComplete = total - completed;
    var notCompletePhrase = notComplete === 1 ? ' item left' : ' items left';

    var clearCompleteButton;
    if (completed) {
      clearCompleteButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {notComplete}
          </strong>
          {notCompletePhrase}
        </span>
        {clearCompleteButton}
      </footer>
    );
  },

  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  _onClearCompletedClick: function() {
    Actions.destroyCompleted();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === 13) {
      this._save();
    }
  },

});
