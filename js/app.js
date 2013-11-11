/*global $, Dropbox, Backbone */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;

$(function () {
	'use strict';

  var client = new Dropbox.Client({key: 'tf2wh43gm42688v'});

  // Try to finish OAuth authorization.
  client.authenticate({interactive: false});

  // Redirect to Dropbox to authenticate if client isn't authenticated
  if (!client.isAuthenticated()) client.authenticate();

  // Set client for Backbone.DropboxDatastore to work with Dropbox
  Backbone.DropboxDatastore.client = client;

	// kick things off by creating the `App`
	new app.AppView();
});
