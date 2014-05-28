module.exports = Map;

function Map() {
  
}

Map.prototype.search = function(lon, lat) {
  // Ajax call to retrieve store places
  var endpoint = '/search/' + lon + '+' + lat;
};

