var React = require('react');

var Header = require('./header');
var MainSection = require('./mainSection');
var Footer = require('./footer');

var Store = require('../stores/todoStore');

function getTodoState() {
  return {
    allTodos: Store.getAll(),
    areAllComplete: Store.areAllComplete()
  }
};

module.exports = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTodoState());
  },

});
