const app = require('./app');
const world = require('./world');

app.get('/generateRandom', () => {
    res.send(world.generateRandom());
});

app.get('/reconstructMap', () => {

});

app.get('/plantTrees', () => {

});

app.get('/reconstructTrees', () => {

});

app.get('/placeStones', () => {

});

app.get('/reconstructStones', () => {

});

app.get('/placeSnowOnMountainPeaks', () => {

});

app.get('/placeBeaches', () => {

});

app.get('/generateGoldVeinsBeginings', () => {

});

app.get('/growGoldVeins', () => {

});