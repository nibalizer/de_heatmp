$.getJSON("examples/example_position_data_cbble.json", function(data) {
  let points_array = [];
  data.forEach(function(gamestate_event, index) {
    Object.keys(gamestate_event).forEach(function(player_id, index) {
      // get position of player (in csgo coordinates) - append to array
      let position = gamestate_event[player_id]
        .position.split(",")
        .map(parseFloat);

      points_array.push(position);
    });
  });
  // Create heatmap, passing map name and array of csgo coordinates
  let heatmap = new de_heatmp( "canvas", "de_cbble", points_array);
  // Draw heatmap
  heatmap.draw();
});
