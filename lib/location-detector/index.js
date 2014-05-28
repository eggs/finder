module.exports = LocationDetector;


function LocationDetector(){

}

LocationDetector.prototype.askForLocation = function(){
  var lon, lat;
  return [lon, lat];
};

/**
var locationDetector = new LocationDetector();
var map = new Map();
var coords = locationDetector.ask();

map.search(coords[0], coords[1]);
**/
