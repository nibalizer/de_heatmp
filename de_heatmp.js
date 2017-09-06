// Don't know what this does
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

$("body").css({
  "text-align": "center",
  "background": "#f2f6f8",
});
$(".img").css({
  "position": "absolute",
  "z-index": "1",
});

$("#container").css({
  "display": "inline-block",
  "width": "1024px",
  "height": "1024px",
  "background-image": "url('images/de_cbble_radar.png')",
  "position": "relative",
  "border": "5px solid black",
  "border-radius": "10px",
  "float": "left",
});

$("#canvas").css({
  "position": "relative",
  "z-index": "20",
});

const csgoMaps  = {
  mapDetails : {
    "de_cache": {
      "pos_x" : "-2000",
      "pos_y" : "3250",
      "scale" : "5.5"
    },
    "de_cbble": {
      "pos_x" : "-3840", // upper left world x coordinate
      "pos_y" : "3072", // upper left world y coordinate
      "scale" : "6"
    },
    "de_inferno": {
      "pos_x" : "-2087", // upper left world x coordinate
      "pos_y" : "3072", // upper left world y coordinate
      "scale" : "4.9"
    },
    "de_mirage": {
      "pos_x" : "-3230",
      "pos_y" : "1713",
      "scale" : "5.00"
    },
    "de_nuke": {
      "pos_x" : "-3453",
      "pos_y" : "2887",
      "scale" : "7.00"
    },
    "de_overpass": {
      "pos_x" : "-4831",
      "pos_y" : "1781",
      "scale" : "5.2"
    },
    "de_train": {
      "pos_x" : "-2477",
      "pos_y" : "2392",
      "scale" : "4.7"
    }
  }
}

translate_coordinates = function (x_game, y_game){
  pos_x = csgoMaps.mapDetails["de_cbble"].pos_x;
  pos_y = csgoMaps.mapDetails["de_cbble"].pos_y;
  scale_factor = csgoMaps.mapDetails["de_cbble"].scale;

  x_prime = (x_game - pos_x) / scale_factor;
  y_prime = (pos_y - y_game) / scale_factor;

  return {"x": x_prime, "y": y_prime};
}


function de_heatmp(elementId, mapName, coordinates_array) {


  // get csgo map data
  var mapData = csgoMaps.mapDetails[mapName];

  this.draw = function() {
    this.heat.draw();
    frame = null;
  };

  this.add = function(x, y, intensity) {
    this.heat.add(x, y, intensity);
    frame = frame || window.requestAnimationFrame(draw);
  };

  this.get = function (id) {
      return document.getElementById(id);
  }


  // main

  // translate coordinates from csgo x,y,z to postions on heatmap
  var translated_coordinates = [];
  coordinates_array.forEach ( function(point, index) {

      updated_coordinates = (this.translate_coordinates(point[0], point[1]));
      translated_coordinates.push([updated_coordinates["x"], updated_coordinates["y"], 2]);

  });

  // create the heatmap
  var frame = null;
  this.heat = simpleheat(elementId).data(translated_coordinates).max(18),
    frame;

  this.heat.radius(9, 5);
}


