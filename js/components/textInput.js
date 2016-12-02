var React = require('react');
var Types = React.PropTypes;

var TextInput = require('./textInput');

module.exports = React.createClass({
  propTypes: {
    className: Types.string,
    id: Types.string,
    placeholder: Types.string,
    onSave: Types.func.isRequired,
    value: Types.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
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

  _onKeyDown: function(event) {
    if (event.keyCode === 13) {
      this._save();
    }
  },

});
