var http = require("http");

var server = http.createServer(function(req, res){
	console.log("I got something ");
	res.writeHead(200, {"Content-Type": "application/json"});
	
	var response = '{}';
	var data = '';
	if (req.url == '/pictures') {
		if (req.method == 'GET') {
			response = getPictures();
			res.end(response);
		} else if (req.method == 'POST') {
			/* TODO http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/ */
			req.on('data', function(chunk) {
				data += chunk.toString();
				console.log("chunk: ", chunk.toString());
			});
			req.on('end', function() {
				response = postPictures(JSON.parse(data));
				res.end(response);
			});

		}
	} else if (req.url == '/movies') {
		if (req.method == 'GET') {
			response = getMovies();
			res.end(response);
		} else if (req.method == 'POST') {
			req.on('data', function(chunk) {
				data += chunk.toString();
			});
			req.on('end', function() {
				response = postMovies(JSON.parse(data));
				res.end(response);
			});
		}
	}
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
	pictures.push(picture.filename);
}

function postMovies(movie) {
	movies.push(movie.filename);
}
