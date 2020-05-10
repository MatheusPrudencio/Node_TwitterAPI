"use strict";

const express = require('express');
const path = require('path');
const http = require('http');
const tweet_counts = require('./tweet_counter2.js');

let app = express();

app.use('/', express.static(__dirname + path.sep + 'static'));

// API que retorna apenas o contador de awesome e cool
app.get('/counts_terms.json', (req,res) =>{
    res.json(tweet_counts[0]);
});

// API que retorna o indicador de frequencia dos aplicativos
app.get('/counter_app.json', (req,res) =>{
    res.json(tweet_counts[1]);
});

http.createServer(app).listen(3000);

console.log("estou vivo");