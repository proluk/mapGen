const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const world = require('./world');
const saveImage = require('./file');
const app = express();

app.count = 0;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/generateRandom', (req, res, next) => {
    world.generateRandom(1);
    app.count = 0;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/reconstructMap', (req, res, next) => {
    world.reconstructMap(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/plantTrees', (req, res, next) => {
    world.plantTrees(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/reconstructTrees', (req, res, next) => {
    world.reconstructTrees(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/placeStones', (req, res, next) => {
    world.placeStones(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/reconstructStones', (req, res, next) => {
    world.reconstructStones(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/placeSnowOnMountainPeaks', (req, res, next) => {
    world.placeSnowOnMountainPeaks(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/placeBeaches', (req, res, next) => {
    world.placeBeaches(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/generateGoldVeinsBeginings', (req, res, next) => {
    world.generateGoldVeinsBeginings(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.get('/growGoldVeins', (req, res, next) => {
    world.growGoldVeins(1);
    app.count++;
    res.send(JSON.stringify({map: world.map}, null, 3));
});

app.post('/makeImage',(req,res,next) => {
    saveImage(req.body.canvas, app.count);
    res.send("ok");
});


app.listen(3001, function(){
   console.log('app listening');
});

module.exports = app;