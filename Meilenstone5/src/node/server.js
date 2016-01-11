// Lets require/import the HTTP module
var http = require('http');
// Enable working with Data System
var fs = require("fs");

// Define a port and IP we want to listen to and other Constant
// JS Statement "const" was not used due to a failure in Windows IE Support 
//var IP = "130.83.105.62";
var IP = "127.0.0.1";
var PORT = 8080;
var SERVER_START_MSG = "Der Server wurde gestartet und ist per http://"+IP+":"+PORT+"/ erreichbar";
var CONNECTION_MSG = "<User connected to Server>";
var WELCOME_MSG = "Sie haben sich erfolgreich auf dem WebServer mit der Url "+IP+":"+PORT+" verbunden";
var NOT_FOUND_MSG = "[404] Aufruf der nicht unterstützten URL: ";
var NOT_FOUND_HTML = "<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>";
var SUCC_SAVE_MSG = "Folgender Spieler wurde gespeichert: ";
var ERR_SAVE_MSG = "Der Spieler konnte nicht gespeichert werden!";
var PLAYER_FILE_PATH = "../../form.txt";
//var PLAYER_FILE_PATH = "C:\\Users\\Justard\\Desktop\\mus\\WAW\\Meilenstone5\\form.txt";



// Create and configure a server
var server = http.createServer(function (request, response) {
    switch(request.url) {
        case "/":
            welcome(request, response);
        default:
            if (request.url.startsWith("/Player")) {
                savePlayer(request, response);
            } else {
                notFound(request, response);
            }
    };
});

// Lets start our server
server.listen(PORT);

// Output on the Consol
console.log(SERVER_START_MSG);


/**
 * This methode gives us information about the User Connection end 
 *  output a wellcome message on the screen
 */
function welcome(request, response) {
  // Connection message
  console.log(CONNECTION_MSG);
  // Wellcome message
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(WELCOME_MSG);
}


/**
 * This methode responses to request on the serve 
 *with a 404 (Not found) error and print on the screen.
 */
function notFound(request, response) {
  // Error message
  console.log(NOT_FOUND_MSG + request.url);
  // sending 404 (Not found) errror and html warning as request
  response.writeHead(404, "Not found", {'Content-Type': 'text/html'});
  response.end(NOT_FOUND_HTML);
}

/**
  Stores the new player in a testdaten with player daten(infos)
 */
function savePlayer(request, response) {

  var parameters = parseParameters(request.url);
  response.writeHead(200, {"Content-Type": "text/plain"});

  // Formating the result in the folowing order:
  // Vorname Name, Jahrgang, Headcoach, Assistantcoach, Position, Trikotnummer
  var dataset = [
     parameters["vorname"] + " " +  parameters["name"],
     parameters["jahr"],
     parameters["hcoach"],
     parameters["acoach"],
     parameters["position"],
     parameters["number "]
	 parameters["  "]

  ].join(", ");

  // Writing the result in the player data
  fs.appendFile(PLAYER_FILE_PATH, dataset + "\n", function (err) {
    if (err) {
      console.log(ERR_SAVE_MSG);
      response.end(ERR_SAVE_MSG);
    } else {
      // printing the result
      console.log(SUCC_SAVE_MSG);
      console.log(dataset);
      response.end(SUCC_SAVE_MSG + dataset);
    }
  });
}


/**
 *Reads the paramrter from a URL which will be given as Object 
just like:
 *  {<Parameter>: "<Wert>", ... }
 *  Bsp: /hello?a=1&b=2&c=3  =>  {a: 1, b: 2, c:3}
 */
function parseParameters(url) {
    var parameters = {};
    var keyValuePairs = [];
    var keyValuePair = [];
    var key = "";
    var value = "";

    // Extaction the parameter from URL and divides  per &-character  
    // Bsp: /hello?a=1&b=2&c=3  =>  ["hello?a=1", "b=2", "c=3"]
    keyValuePairs = url.split('?')[1].split("&");

    // iterating alle names
    for (var i = 0; i < keyValuePairs.length; i++) {

        // dividing aktual Name-Value-Paire by =-character 
        keyValuePair = keyValuePairs[i].split("=");

        // extracting names and values with the help  decodeURIComponenten 
        // decodeURIComponenten delete for ex.. all particuler character 
        key = decodeURIComponent(keyValuePair[0]);
        value = decodeURIComponent(keyValuePair[1]) || "";

        // adding Name-Value-Paire output type
        parameters[key] = value;
        
    }
    return parameters;
}


