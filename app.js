const express = require('express');
const cors = require('cors')
const app = express();
const world = require('./world');

app.use(cors());

app.get('/generateRandom', (req, res, next) => {
    world.generateRandom(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/reconstructMap', (req, res, next) => {
    world.reconstructMap(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/plantTrees', (req, res, next) => {
    world.plantTrees(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/reconstructTrees', (req, res, next) => {
    world.reconstructTrees(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/placeStones', (req, res, next) => {
    world.placeStones(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/reconstructStones', (req, res, next) => {
    world.reconstructStones(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/placeSnowOnMountainPeaks', (req, res, next) => {
    world.placeSnowOnMountainPeaks(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/placeBeaches', (req, res, next) => {
    world.placeBeaches(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/generateGoldVeinsBeginings', (req, res, next) => {
    world.generateGoldVeinsBeginings(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/growGoldVeins', (req, res, next) => {
    world.growGoldVeins(1);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.listen(3001, function(){
   console.log('app listening');
});

module.exports = app;