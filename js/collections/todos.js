/*global Backbone, $ */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *Dropbox Datastore API* instead of a remote
	// server.
	var Todos = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		// Save all of the todo items into `"todos"` table.
		dropboxDatastore: new Backbone.DropboxDatastore('todos'),

		initialize: function() {
			this.dropboxDatastore.syncCollection(this);
		},

		// Filter down the list of all todo items that are finished.
		completed: function () {
			return this.filter(function (todo) {
				return todo.get('completed');
			});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function () {
			return this.without.apply(this, this.completed());
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: function (todo) {
			return todo.get('order');
		}
	});

	// Create our global collection of **Todos**.
	app.todos = new Todos();

	// Check sync status before close
  $(window).bind('beforeunload', function () {
    if (app.todos.dropboxDatastore.getStatus() === 'uploading') {
      return 'You have pending changes that haven\'t been synchronized to the server.';
    }
  });
})();
