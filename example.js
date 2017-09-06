//var cheeseshop_heatmap = require("./cheeseshop_heatmap.js");



var translate_coordinates = function (x_game, y_game){
  pos_x = csgoMaps.mapDetails["de_cbble"].pos_x;
  pos_y = csgoMaps.mapDetails["de_cbble"].pos_y;
  scale_factor = csgoMaps.mapDetails["de_cbble"].scale;

  x_prime = (x_game - pos_x) / scale_factor;
  y_prime = (pos_y - y_game) / scale_factor;

  return {"x": x_prime, "y": y_prime};
}
var derp = {};

$.getJSON( "examples/example_position_data.json", function (data ) {
  derp = data;
  heat_data = [];
  data.forEach ( function(gamestate_event, index) {
    Object.keys(gamestate_event).forEach ( function(player_id, index) {
      // get position of player  - translate into heatmap coordinates - display
      position = gamestate_event[player_id].position.split(",").map(parseFloat);
      //console.log(gamestate_event[player_id].name + " " + gamestate_event[player_id].team );
      console.log(position);
      updated_position = (translate_coordinates(position[0], position[1]));
      console.log(updated_position);
      heat_data.push([updated_position["x"], updated_position["y"], 2]);
    });
  });
  var heatmap = new de_heatmp("de_cbble", "canvas", heat_data);
  // Draw heatmap
  heatmap.draw();
});


