var Dispatcher = require('../dispatchers/appDispatcher');
var Constants = require('../constants/todoConstants');

module.exports = {

  create: function(text) {
    Dispatcher.dispatch({
      actionType: Constants.TODO_CREATE,
      text: text
    });
  },

  destroy: function(id) {
    Dispatcher.dispatch({
      actionType: Constants.TODO_DESTROY,
      id: id
    });
  },

  destroyCompleted: function(id) {
    Dispatcher.dispatch({
      actionType: Constants.TODO_DESTROY_COMPLETED
    });
  },

  toggleComplete: function(todo) {
    var type = todo.complete?
        Constants.TODO_UNDO_COMPLETE :
        Constants.TODO_COMPLETE;

    Dispatcher.dispatch({
      actionType: type,
      id: todo.id
    });
  },

  toggleCompleteAll: function() {
    Dispatcher.dispatch({
      actionType: Constants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  updateText: function(id, text) {
    Dispatcher.dispatch({
      actionType: Constants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

};
