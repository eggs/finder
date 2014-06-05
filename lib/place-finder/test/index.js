var say = require('say');
var PlaceFinder = require('./../.');
var placeholder = new PlaceFinder();

placeholder.search([45.534848619121426, -122.7042486839931], function(err, businesses){
  console.log(businesses);
});

placeholder.searchFourSquare([45.534848619121426 ,  -122.7042486839931], function(err, venues){
  var items = venues.map(function(v){
    var name = v.name;
    var address = v.location.address;
    var categories = v.categories.map(function(c){
      return c.id + ': ' + c.name;
    });
    // say.speak('Alex', name);
    console.log(name, address, categories);
    return {
      name: name,
      address: address,
      categories: categories
    };
  });
  var i = 0;
  function sayVenue(_i){
    var item = items[_i];
    if(item) {
      say.speak('Alex', item.name, function(){
        sayVenue([i++]);
      })
    }
  }
  // sayVenue(0);
});
