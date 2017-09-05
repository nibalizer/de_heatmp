// Don't know what this does
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

// Setup websocket connection
var connection = new WebSocket('ws://localhost:5051/games/csgo/gsi/sources/032ea9b5-867f-462f-98a7-5c415272ceee/play');

connection.onopen = function(){
  /*Send a small message to the console once the connection is established */
  console.log('Connection open!');
}


// simpleheat boilerplate
function get(id) {
    return document.getElementById(id);
}
var null_data = [];


// create the heatmap
var heat = simpleheat('canvas').data(null_data).max(18),
    frame;
heat.radius(15, 10);


function draw() {
    //console.time('draw');
    heat.draw();
    //console.timeEnd('draw');
    frame = null;
}

// end simpleheat boilerplate
// translate notes
// 2263 coordinates = 422 pixels

var map_name = "unset";

var translate_coordinates_cache = function (x_game, y_game){
  // upper left corner = -2000, 3250
  // scale factor = 5.5
  pos_x = -3840;
  pos_y = 3072;
  scale_factor = 6;

  x_prime = (x_game - pos_x) / scale_factor;
  y_prime = (pos_y - y_game) / scale_factor;


  return { "x": x_prime, "y":  y_prime};
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
      updated_position = (translate_coordinates_cache(position[0], position[1]));
      console.log(updated_position);
      heat.add([updated_position["x"], updated_position["y"], 2]);
      frame = frame || window.requestAnimationFrame(draw);
    });


  }
}

// Draw heatmap
draw();

// simpleheat stuff, needs to be after draw() (??)
var radius = get('radius'),
    blur = get('blur'),
    changeType = 'oninput' in radius ? 'oninput' : 'onchange';

radius[changeType] = blur[changeType] = function (e) {
    heat.radius(+radius.value, +blur.value);
    frame = frame || window.requestAnimationFrame(draw);
};

