var _ = require("lodash");
var http = require("http");
var pictures = require("./pictures");
var movies = require("./movies");
var fs = require("fs");

var server = http.createServer(function(req, res){
    console.log("I got something ");

    var response = '{}';
    var data = '';
    var urlArr = req.url.split('/');
    console.log("urlArr", urlArr);
    if (req.method == 'GET') {
        if (urlArr[1] == 'pictures') {
            res.writeHead(200, {"Content-Type": "application/json"});
            response = pictures.get();
        } else if (urlArr[1] == 'movies') {
            res.writeHead(200, {"Content-Type": "application/json"});
            response = movies.get();
        } else {
            response = getIndex();
        }
        res.end(response);
    } else if (req.method == 'POST') {
        res.writeHead(200, {"Content-Type": "application/json"});
        /* TODO http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/ */
        req.on('data', function(chunk) {
            data += chunk.toString();
            console.log("chunk: ", chunk.toString());
        });
        req.on('end', function() {
            if (urlArr[1] == 'pictures') {
                response = pictures.post(JSON.parse(data));
            } else if (urlArr[1] == 'movies') {
                response = movies.post(JSON.parse(data));
            }
            res.end(response);
        });
    } else if (req.method == 'DELETE') {
        res.writeHead(200, {"Content-Type": "application/json"});
        if (urlArr[1] == 'pictures') {
            response = pictures.delete(urlArr[2]);
        } else if (urlArr[1] == 'movies') {
            response = movies.delete(urlArr[2]);
        }
        res.end(response);
    } else if (req.method == 'PUT') {
        res.writeHead(200, {"Content-Type": "application/json"});
        req.on('data', function(chunk) {
            data += chunk.toString();
            console.log("chunk: ", chunk.toString());
        });
        req.on('end', function() {
            if (urlArr[1] == 'pictures') {
                response = pictures.put(urlArr[2], JSON.parse(data));
            } else if (urlArr[1] == 'movies') {
                response = movies.put(urlArr[2], JSON.parse(data));
            }
            res.end(response);
        });

    }
});

function getIndex() {
    return fs.readFileSync('./index.html');
}

server.listen(8080);

console.log("listening to 8080");
