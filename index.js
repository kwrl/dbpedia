var express = require('express');
var sparql = require('sparql-client');
var path = require('path');
var util = require('util');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

var endpoint = 'http://dbpedia.org/sparql';
var query = 'PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>PREFIX dbpprop:<http://dbpedia.org/property/>PREFIX dbres:<http://dbpedia.org/resource/>SELECT DISTINCT ?abstract WHERE {dbres:?country dbpedia-owl:abstract ?abstract FILTER(langMatches(lang(?abstract), "en"))}';
//var query = 'select distinct ?Concept where {[] a ?Concept} LIMIT 100';
var client = new sparql(endpoint);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.post('/country/', function(req, res) {
  try {
    client.query(query)
    .bind('country', req.body.country)
    .execute(function(error, results) {
      if(!error) {
        res.send(results);
      }
    });
  } catch(ex) {
  }
});

app.get('/country/', function(req, res) {
  res.render('home', {'title':'Post i vei', 'info_text':'Enter country name'})
})

app.listen('8081');
