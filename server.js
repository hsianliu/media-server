var _ = require("lodash");
var http = require("http");
var pictures = require("./pictures");
var movies = require("./movies");

var server = http.createServer(function(req, res){
    console.log("I got something ");
    res.writeHead(200, {"Content-Type": "application/json"});

    var response = '{}';
    var data = '';
    var urlArr = req.url.split('/');
    console.log("urlArr", urlArr);
    if (req.method == 'GET') {
        if (urlArr[1] == 'pictures') {
            response = pictures.get();
        } else if (urlArr[1] == 'movies') {
            response = movies.get();
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
                response = pictures.post(JSON.parse(data));
            } else if (urlArr[1] == 'movies') {
                response = movies.post(JSON.parse(data));
            }
            res.end(response);
        });
    } else if (req.method == 'DELETE') {
        if (urlArr[1] == 'pictures') {
            response = pictures.delete(urlArr[2]);
        } else if (urlArr[1] == 'movies') {
            response = movies.delete(urlArr[2]);
        }
        res.end(response);
    } else if (req.method == 'PUT') {
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

server.listen(8080);

console.log("listening to 8080");
