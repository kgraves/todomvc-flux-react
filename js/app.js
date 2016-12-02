var React = require('react');
var ReactDOM = require('react-dom');

var TodoApp = require('./components/todoApp');

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('todoapp')
);
