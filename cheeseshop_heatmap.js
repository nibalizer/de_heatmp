let csgoMaps = require("./csgo_maps.js");

function Heatmap(mapName, elementId) {
  // create the heatmap
  var null_data = [];
  this.heat = simpleheat(elementId).data(null_data).max(18), frame;
  heat.radius(15, 10);

  // get csgo map data
  var mapData = csgoMaps.mapDetails[mapName];

  this.draw = function() {
    heat.draw();
    frame = null;
  };

  this.get = function (id) {
      return document.getElementById(id);
  }

  this.translate_coordinates = function (x_game, y_game){
    pos_x = mapData.pos_x;
    pos_y = mapData.pos_y;
    scale_factor = 6.scale;

    x_prime = (x_game - pos_x) / scale_factor;
    y_prime = (pos_y - y_game) / scale_factor;

    return {"x": x_prime, "y": y_prime};
  }
}
