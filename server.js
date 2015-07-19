var _ = require("lodash");
var http = require("http");
var pictures = require("./pictures");
var movies = require("./movies");
var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser')

var app = express();

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/pictures', function(req, res) {
    var pix = pictures.get();
    res.json(pix);
});

app.get('/pictures/:id', function(req, res) {
    var pix = pictures.get(req.params.id);
    res.json(pix);
});

app.post('/pictures', function(req, res) {
    var picture = pictures.post(req.body);
    res.json(picture);
});

app.put('/pictures/:id', function(req,res) {
    var picture = pictures.put(req.params.id, req.body);
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

app.get('/movies/:id', function(req, res) {
    var pix = movies.get(req.params.id);
    res.json(pix);
});

app.post('/movies', function(req, res) {
    console.log('hey hey', req.body);
    var movie = movies.post(req.body);
    res.json(movie);
});

app.put('/movies/:id', function(req,res) {
    var movie = movies.put(req.params.id, req.body);
    res.json(movie);
});

app.delete('/movies/:id', function(req, res) {
    var mov = movies.delete(req.params.id);
    res.json(mov);
});

app.listen(8080);

console.log("listening to 8080");
