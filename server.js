var http = require("http");

var server = http.createServer(function(req, res){
	console.log("I got something ", req);
	res.writeHead(200, {"Content-Type": "application/json"});
	
	var response = '{}';
	if (req.url == '/pictures') {
		if (req.method == 'GET') {
			response = getPictures();
		} else if (req.method == 'POST') {
			/*TODO http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/*/
			response = postPictures();
		}
	} else if (req.url == '/movies') {
		if (req.method == 'GET') {
			response = getMovies();
		} else if (req.method == 'POST') {
			response = postMovies();
		}
	}
	
	res.end(response);

});

server.listen(8080);

console.log("listening to 8080");

var pictures = ["1.jpg", "2.jpg", "3.jpg"];
var movies = ["a.avi" ,"b.avi", "c.avi", "d.avi"];

function getPictures() {
	console.log("getPictures function");
	return JSON.stringify({count: pictures.length, pictures: pictures});
}

function getMovies() {
	console.log("getMovies function");
	return JSON.stringify({count: movies.length, movies: movies});
}

function postPictures(picture) {
	pictures.push(picture);
}

function postMovies(movie) {
	movies.push(movie);
}
