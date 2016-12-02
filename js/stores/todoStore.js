var Dispatcher = require('../dispatchers/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/todoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// TODO use local storage
// for now we'll use an internal object, rather than local storage
var _todos = {};

function _makeId() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
};

function create(text) {
  var id = _makeId();
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
};

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
};

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
};

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var key in _todos) {
    if (_todos[key].complete) {
      destroy(key);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  areAllComplete: function() {
    for (var key in _todos) {
      if (!_todos[key].complete) {
        return false;
      }
    }

    return true;
  },

  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

Dispatcher.register(function(action) {
  var text;

  if (action.actionType === Constants.TODO_CREATE) {
    text = action.text.trim();

    if (text !== '') {
      create(text);
      TodoStore.emitChange();
    }
  } else if (action.actionType === Constants.TODO_TOGGLE_COMPLETE_ALL) {
    // if all are complete, change to incomplete, and vice versa
    updateAll({ complete: !TodoStore.areAllComplete() });
    TodoStore.emitChange();
  } else if (action.actionType === Constants.TODO_UNDO_COMPLETE) {
    update(action.id, { complete: false });
    TodoStore.emitChange();
  } else if (action.actionType === Constants.TODO_COMPLETE) {
    update(action.id, { complete: true });
    TodoStore.emitChange();
  } else if (action.actionType === Constants.TODO_UPDATE_TEXT) {
    text = action.text.trim();

    if (text !== '') {
      update(action.id, { text: text });
      TodoStore.emitChange();
    }
  } else if (action.actionType === Constants.TODO_DESTROY) {
    destroy(action.id);
    TodoStore.emitChange();
  } else if (action.actionType === Constants.TODO_DESTROY_COMPLETED) {
    destroyCompleted();
    TodoStore.emitChange();
  }

});

module.exports = TodoStore;
