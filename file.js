const fs = require('fs');

module.exports = saveImage = (image, count) => {
    fs.writeFile(`./images/${count}.png`, image.replace(/^data:image\/png;base64,/, ""), 'base64', function(err){
        if (err) throw err
    });
};
