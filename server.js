var _ = require("lodash");
var http = require("http");

var server = http.createServer(function(req, res){
	console.log("I got something ");
	res.writeHead(200, {"Content-Type": "application/json"});
	
	var response = '{}';
	var data = '';
	var urlArr = req.url.split('/');
	console.log("urlArr", urlArr);
	if (req.method == 'GET') {
		if (urlArr[1] == 'pictures') {
			response = getPictures();
		} else if (urlArr[1] == 'movies') {
			response = getMovies();
		}
		res.end(response);
	} else if (req.method == 'POST') {
		/* TODO http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/ */
		req.on('data', function(chunk) {
			data += chunk.toString();
			console.log("chunk: ", chunk.toString());
		});
		req.on('end', function() {
			if (urlArr[1] == 'pictures') {
				response = postPicture(JSON.parse(data));
			} else if (urlArr[1] == 'movies') {
				response = postMovie(JSON.parse(data));
			}
			res.end(response);
		});
	} else if (req.method == 'DELETE') {
		if (urlArr[1] == 'pictures') {
			response = deletePicture(urlArr[2]);
		} else if (urlArr[1] == 'movies') {
			response = deleteMovie(urlArr[2]);
		}
		res.end(response);
	} else if (req.method == 'PUT') {
		req.on('data', function(chunk) {
			data += chunk.toString();
			console.log("chunk: ", chunk.toString());
		});
		req.on('end', function() {
			if (urlArr[1] == 'pictures') {
				response = putPicture(urlArr[2], JSON.parse(data));
			} else if (urlArr[1] == 'movies') {
				response = putMovie(urlArr[2], JSON.parse(data));
			}
			res.end(response);
		});
		
	}
});

server.listen(8080);

console.log("listening to 8080");

var pictures = [
	{key: _.uniqueId(), filename: "1.jpg", size: 100},
	{key: _.uniqueId(), filename: "2.jpg", size: 200},
	{key: _.uniqueId(), filename: "3.jpg", size: 300},
];

var movies = [
	{key: _.uniqueId(), filename: "a.avi", size: 1000},
	{key: _.uniqueId(), filename: "b.avi", size: 2000},
	{key: _.uniqueId(), filename: "c.avi", size: 3000},
];


function getPictures() {
	console.log("getPictures function");
	return JSON.stringify({count: pictures.length, pictures: pictures});
}

function getMovies() {
	console.log("getMovies function");
	return JSON.stringify({count: movies.length, movies: movies});
}

function postPicture(picture) {
	var obj = {key: _.uniqueId(), filename: picture.name, size: picture.size};
	pictures.push(obj);
	return JSON.stringify(obj); 
}

function postMovie(movie) {
	var obj = {key: _.uniqueId(), filename: movie.name, size: movie.size};
	movies.push(obj);
	return JSON.stringify(obj); 
}

function deletePicture(key) {
	var idx = -1;
	pictures.forEach(function(pic, index) {
		if (pic.key == key) {
			idx = index;
		}
	});
	pictures.splice(idx, 1);
	return getPictures(); 
}

function deleteMovie(key) {
	_.remove(movies, {key: key});	
	return getMovies(); 
}

function putPicture(key, obj) {
	var picture = _.find(pictures, {key: key});
	if (obj.filename) {
		picture.filename = obj.filename;
	}

	if (obj.size) {	
		picture.size = obj.size;
	}
	return JSON.stringify(picture);
}

function putMovie(key, obj) {
	var movie = _.find(movies, {key: key});
	if (obj.filename) {
		movie.filename = obj.filename;
	}

	if (obj.size) {	
		movie.size = obj.size;
	}
	return JSON.stringify(movie);
}
