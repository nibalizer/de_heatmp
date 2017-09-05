var cheeseshop_heatmap = require("./cheeseshop_heatmap.js");

// Don't know what this does
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

var heatmap = new Heatmap("de_cache", "canvas");

// Setup websocket connection
var connection = new WebSocket('ws://localhost:5051/games/csgo/gsi/sources/032ea9b5-867f-462f-98a7-5c415272ceee/play');

connection.onopen = function(){
  /*Send a small message to the console once the connection is established */
  console.log('Connection open!');
}

// respond to websocket messages
connection.onmessage = function(msg){
  //console.log("message recieved, captian");
  payload = JSON.parse(msg.data);
  if ("allplayers" in payload){
    // get positional data points, draw

    Object.keys(payload.allplayers).forEach ( function(player_id, index) {
      console.log("player id: " + player_id);
      // get position of player  - translate into heatmap coordinates - display
      position = payload.allplayers[player_id].position.split(",").map(parseFloat);
      console.log(payload.allplayers[player_id].name + " " + payload.allplayers[player_id].team );
      console.log(position);
      updated_position = (heatmap.translate_coordinates(position[0], position[1]));
      console.log(updated_position);
      heatmap.heat.add([updated_position["x"], updated_position["y"], 2]);
      frame = frame || window.requestAnimationFrame(draw);
    });
  }
}

// Draw heatmap
heatmap.draw();

// simpleheat stuff, needs to be after draw() (??)
var radius = heatmap.get('radius'),
    blur = heatmap.get('blur'),
    changeType = 'oninput' in radius ? 'oninput' : 'onchange';

radius[changeType] = blur[changeType] = function (e) {
    heatmap.heat.radius(+radius.value, +blur.value);
    frame = frame || window.requestAnimationFrame(draw);
};
