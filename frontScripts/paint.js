function paintMapOnCanvas(map, canvas) {
    let ctx = canvas.getContext('2d');
    let w = canvas.width / map.length;

    for ( let i = 0 ; i < map.length ; i++){
        for ( let m = 0 ; m < map.length ; m++){
            if ( map[i][m] == 1 ) {
                //grass
                ctx.fillStyle = '#00ab2f';
                ctx.fillRect(i*w,m*w,w,w);
            } else if ( map[i][m] == 0 ) {
                //water
                ctx.fillStyle = '#0002ab';
                ctx.fillRect(i*w,m*w,w,w);
            } else if ( map[i][m] == 2 ) {
                //tree
                ctx.fillStyle = '#0d4a00';
                ctx.fillRect(i*w,m*w,w,w);
            } else if ( map[i][m] == 3 ) {
                //stone
                ctx.fillStyle = '#4b4749';
                ctx.fillRect(i*w,m*w,w,w);
            } else if ( map[i][m] == 4 ) {
                //snow
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(i*w,m*w,w,w);
            } else if ( map[i][m] == 5 ) {
                //beach
                ctx.fillStyle = '#fcff40';
                ctx.fillRect(i*w,m*w,w,w);
            } else if ( map[i][m] == 6 ) {
                //gold
                ctx.fillStyle = '#8c5a00';
                ctx.fillRect(i*w,m*w,w,w);
            }
        }
    }
}