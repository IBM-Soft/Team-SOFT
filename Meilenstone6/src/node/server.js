// Lets require/import the HTTP module
var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');

// Enable working with Data System und making it in variable local 
var players = require("C:\\Users\\Justard\\Desktop\\mus\\WAW\\Meilenstone6\\data.json");



// Define a port and IP we want to listen to and other Constant
// JS Statement "const" was not used due to a failure in Windows IE Support 
//var IP = "130.83.105.62";
var IP = "127.0.0.1";
var PORT = 8888;
var SERVER_START_MSG = "Der Server wurde gestartet und ist per http://"+IP+":"+PORT+"/ erreichbar";
var SUCC_SAVE_MSG = "Folgender Spieler wurde gespeichert: ";
var ERR_SAVE_MSG = "Der Spieler konnte nicht gespeichert werden!";
var REQ_ALL_MSG = "/AllPlayers: Es wurde allen Spielerdatensätzen angefordert";
var REQ_FAV_MSG = "/Favorites: Es wurde alle als Favorit gekennz. Spielerdatensätzen angefordert";
var REQ_SAVE_MSG = "/Player: Speichern eines Spielerdatensatzes angefordert";
var PLAYER_FILE_PATH = "C:\\Users\\Justard\\Desktop\\mus\\WAW\\Meilenstone6\\form.txt";
//var PLAYER_FILE_PATH = "../../form.txt";



// configuring HTTP-Server 
var server = express();

/** SetUp Middleware **/
server.use(bodyParser.json());

server.use(express.static(__dirname));

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// Starting the Server at the Port
server.listen(PORT);

// Output message
console.log(SERVER_START_MSG);


/**
Stores player infos in a test data
 */
server.put('/Player', function(request, response){

  console.log(REQ_SAVE_MSG);

  // Formating the result in the folowing order:
  // Vorname Name, Jahrgang, Headcoach, Assistantcoach, Position, Trikotnummer
  console.log(JSON.stringify(request.body));
  
  var dataset = { 
     parameters["vorname"] + " " +  parameters["name"],
     parameters["jahr"],
     parameters["hcoach"],
     parameters["acoach"],
     parameters["position"],
     parameters["number "]
	// parameters["  "]
  };
	
	var data ={};
	data[]
	
  // Writing the result in the player data
  fs.appendFile(PLAYER_FILE_PATH, dataset + "\n", function (err) {

    response.header("Access-Control-Allow-Origin", "*");

    if (err) {
      console.log(ERR_SAVE_MSG);
      response.writeHead(400, {"Content-Type": "text/plain"});
      response.end(ERR_SAVE_MSG);
    } else {
      // printing the result
      console.log(SUCC_SAVE_MSG);
      console.log(dataset);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end(SUCC_SAVE_MSG + dataset);
    }
  });
});


/**
Gives all Players Daten und send back response per JSON
 */
server.get('/AllPlayers', function(request, response){
    console.log(REQ_ALL_MSG);
    // Without this HTTP Header there will be problems in certain Browsers:
    // Also for reading external resources http://127.0.0.1:8888/AllPlayers.
    //  'Access-Control-Allow-Origin' failure).
    response.header("Access-Control-Allow-Origin", "*");
    response.json(getPlayers(favorites=false));
});


/**
Gives all favorites Players Daten und send back response per JSON
 */
server.get('/Favorites', function(request, response){
    console.log(REQ_FAV_MSG);
   
    response.header("Access-Control-Allow-Origin", "*");
    response.json(getPlayers(favorites=true));
});


/**
 *  Gives all Players Daten und send back response per JSON
 *
 *  Parameter:
 *      favorites:give favorites Daten als response when true.
 */
function getPlayers(favorites){

    if (favorites){
        var favPlayers = [];
        var player = {};
        // Filter favorites players
       
        for (i = 0; i < players.length; i++) {
            player = players[i];
            if (player.isFavorite) {
                favPlayers.push(player);
            }
        }
        return favPlayers;

    } else {
        // printing all players 
        return players;
    }
}



