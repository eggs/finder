/**
 * Place finder
 *
 * Make requests to FourSquare
 */

var OAuth = require('oauth');
var config = require('./config.json');
var request = require('superagent');

require('superagent-oauth')(request);

module.exports = PlaceFinder;


function PlaceFinder() {
  // yelp stuff
  this.oauth = new OAuth.OAuth(null, null, config.yelp.consumerKey, config.yelp.consumerSecret, '1.0', null, 'HMAC-SHA1');
}

PlaceFinder.prototype.search = function(ll, next) {

  var endpoint = 'http://api.yelp.com/v2/search/';
  
  request(endpoint)
    .sign(this.oauth, config.yelp.token, config.yelp.secret)
    .query({ term: 'burrito', ll: ll.join(',') })
    .type('json')
    .end(function(err, res){
      if (err) return next(err);
      next(null, res.body.businesses);
    });
}

PlaceFinder.prototype.searchFourSquare = function(ll, next) {


  // Set lat and lon
  var endpoint = 'https://api.foursquare.com/v2/venues/search';
  var query = {
    client_id: config.foursquare.key,
    client_secret: config.foursquare.secret,
    v: '20131016'
  };

  query.ll = ll.join();
  query.categoryId = '4bf58dd8d48988d153941735';

  request(endpoint)
    .query(query)
    .type('json')
    .end(function(err, res){
      if (err) return next(err);
      next(null, res.body.response.venues);
    });
}
