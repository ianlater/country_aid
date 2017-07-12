'use strict'
//Depends on version of datamaps w/ country code conversion in handleArcs (http://datamaps.github.io)

var data_dict = {};
var map = new Datamap({
  element: document.getElementById('container'),
  // projection: 'mercator',
  arcConfig: {
    strokeWidth: 3,
    animationSpeed: 1200,
  },
  done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', countryClicked);
  },
  geographyConfig: {
    popupTemplate: function(geo, data) { // This function should just return a string
      return '<div class="hoverinfo">' +
               '<h3>' + geo.properties.name + '</h3>' +
               'Amount given: $' + data_dict[geo.id]["given"] +
             '</div>';
    }
  }
});

var usa = {
  id: "USA",
  destination_countries: [
    {
      id:"CHN",
      amount_given:250
    },
    {
      id:"MEX"
    },
    {
      id:"CUB",
      amount_given:0
    }
  ]
};
var ussr = {
  id: "RUS",
  destination_countries: [
    {
      id:"CHN",
      amount_given:350
    },
    {
      id:"CUB",
      amount_given:800
    }
  ]
};
var countries = {};
countries[usa.id] = usa;
countries["RUS"] = ussr;
loadCountry("USA");
console.log(map);
console.log(countries);

function loadCountry(country) {
  var country = countries[country];
  if (country == undefined) return;
  var data = [];
  data_dict = {};
  
  map.arc(data);
  for (var j in country.destination_countries) {
    var destination_country = country.destination_countries[j];
    var link = {
      origin: country.id,
      destination: destination_country.id
    };
    link.given = destination_country.amount_given != undefined ? destination_country.amount_given : 100;
    data.push(link);
    data_dict[destination_country.id] = link;
  }
  map.arc(data);
}

function countryClicked(geo) {
  loadCountry(geo.id);
}
