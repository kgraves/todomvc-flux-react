var React = require('react');
var Types = React.PropTypes;
var Actions = require('../actions/todoActions');
var TextInput = require('./textInput');

module.exports = React.createClass({

  propTypes: {
    todo: Types.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  render: function() {
    var todo = this.props.todo;
    var input;

    if (this.state.isEditing) {
      input =
        <TextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    var className = todo.complete ? 'completed' : '';
    className += this.state.isEditing ? 'editing' : '';

    return (
      <li
        className={className}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function(event) {
    Actions.toggleComplete(this.props.todo);
  },

  _onDoubleClick: function() {
    this.setState({ isEditing: true });
  },

  _onSave: function(text) {
    Actions.updateText(this.props.todo.id, text);
    this.setState({ isEditing: false });
  },

  _onDestroyClick: function() {
    Actions.destroy(this.props.todo.id);
  }

});
