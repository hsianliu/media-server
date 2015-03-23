var _ = require("lodash");
var http = require("http");
var pictures = require("./pictures");
var movies = require("./movies");
var fs = require("fs");
var express = require("express");

var app = express();
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/pictures', function(req, res) {
    var pix = pictures.get();
    res.json(pix);
});

app.post('/pictures', function(req, res) {
    var picture = pictures.post(JSON.parse(req.body));
    res.json(picture);
});

app.put('/pictures/:id', function(req,res) {
    var picture = pictures.put(req.params.id, JSON.parse(req.body));
    res.json(picture);
});

app.delete('/pictures/:id', function(req, res) {
    var pix = pictures.delete(req.params.id);
    res.json(pix);
});

app.get('/movies', function(req, res) {
    var mov = movies.get();
    res.json(mov);
});

app.post('/movies', function(req, res) {
    var movie = movies.post(JSON.parse(req.body));
    res.json(movie);
});

app.put('/movies/:id', function(req,res) {
    var movie = movies.put(req.params.id, JSON.parse(req.body));
    res.json(movie);
});

app.delete('/movies/:id', function(req, res) {
    var mov = movies.delete(req.params.id);
    res.json(mov);
});

app.listen(8080);

console.log("listening to 8080");
