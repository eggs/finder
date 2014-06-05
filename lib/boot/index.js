/**
 * Module dependencies
 */

var Emitter = require('emitter');
var request = require('superagent');

/**
 * Expose `Boot`
 */

module.exports = Boot;

/**
 * Initialize boot
 */

function Boot() {

  var self = this;
  navigator.geolocation.getCurrentPosition(function(position) {
    self.search(position.coords);
  });

}

Boot.prototype.search = function(position) {

  var query = {
    latitude: position.latitude,
    longitude: position.longitude
  };

  request
    .get('/search')
    .type('json')
    .query(query)
    .end(function(res){
      var div = document.createElement('code');
      div.innerText = JSON.stringify(res.body, null, 2);
      debugger
      document.body.appendChild(div);
    });
}

/**
 * Install emitter
 */

Emitter(Boot.prototype);
