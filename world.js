class World{
    constructor(size,
                aliveChance,
                aliveNum,
                deathNum,
                treeChance,
                treeAliveNum,
                treeDeathNum,
                stoneChance,
                reconstructRange,
                reconstructTreeRange,
                mountainChance,
                mountainChanceNearWater,
                mountainReconstructRange,
                stoneAliveChance,
                snowReconstructRange,
                beachRange,
                goldVeinChance,
                goldVeinGrowChance){
        this.size = size;
        this.aliveChance = aliveChance;
        this.aliveNum = aliveNum
        this.deathNum = deathNum;
        this.treeChance = treeChance;
        this.treeAliveNum = treeAliveNum;
        this.treeDeathNum = treeDeathNum;
        this.stoneChance = stoneChance;
        this.reconstructRange = reconstructRange;
        this.reconstructTreeRange = reconstructTreeRange;
        this.mountainChance = mountainChance;
        this.mountainChanceNearWater = mountainChanceNearWater;
        this.mountainReconstructRange = mountainReconstructRange;
        this.stoneAliveChance = stoneAliveChance;
        this.snowReconstructRange = snowReconstructRange;
        this.beachRange = beachRange;
        this.goldVeinChance = goldVeinChance;
        this.map = [];
        this.goldVeins = [];
        this.goldVeinsGrowChance = goldVeinGrowChance;
    }
    generateRandom(){
        for ( let i = 0 ; i < this.size ; i++ ) {
            this.map[i] = [];
            for ( let m = 0 ; m < this.size ; m++ ) {
                if ( this.random() < this.aliveChance ) {
                    this.map[i][m] = 1;
                } else {
                    this.map[i][m] = 0;
                }
            }
        }
        this.goldVeins = [];
    }
    random(){
        return Math.random();
    }
    setMap(newMap){
        this.map = newMap;
    }
    reconstructPixel(map, x, y){
        let aliveNeighbours = 0;
        for ( let i = (x - this.reconstructRange) ; i < (x + this.reconstructRange) ; i++ ) {
            for ( let m = (y - this.reconstructRange) ; m < (y + this.reconstructRange) ; m++ ) {
                let _x = 0;
                let _y = 0;
                if ( i === x && m === y ) {
                    //do nothing
                } else {
                    _x = this.periodicFunction(this.size, i);
                    _y = this.periodicFunction(this.size, m);
                    if ( map[_x][_y] === 1 ) {
                        aliveNeighbours = aliveNeighbours+1;
                    }
                }
            }
        }
        if ( map[x][y] ) {
            if ( aliveNeighbours < this.deathNum ){
                return 0;
            } else {
                return 1;
            }
        } else {
            if ( aliveNeighbours > this.aliveNum ){
                return 1;
            } else {
                return 0;
            }
        }
    }
    reconstructPixelForTree(map, x, y){
        let aliveNeighbours = 0;
        for ( let i = (x - this.reconstructTreeRange) ; i < (x + this.reconstructTreeRange) ; i++ ) {
            for ( let m = (y - this.reconstructTreeRange) ; m < (y + this.reconstructTreeRange) ; m++ ) {
                let _x = 0;
                let _y = 0;
                if ( i === x && m === y ) {
                    //do nothing
                } else {
                    _x = this.periodicFunction(this.size, i);
                    _y = this.periodicFunction(this.size, m);

                    if (map[_x][_y] === 2) {
                        aliveNeighbours = aliveNeighbours + 1;
                    } else if (map[_x][_y] === 0) {
                        aliveNeighbours = aliveNeighbours + 1;
                    } else if (map[_x][_y] === 1) {
                        aliveNeighbours = aliveNeighbours - 1;
                    }
                }
            }
        }
        if ( map[x][y] === 1 ) {
            if ( aliveNeighbours < this.treeDeathNum ){
                return 1;
            } else {
                return 2;
            }
        } else if ( map[x][y] === 2 ) {
            if ( aliveNeighbours > this.treeAliveNum ){
                return 2;
            } else {
                return 1;
            }
        } else if ( map[x][y] === 0 ) {
            return 0;
        }
    }
    reconstructMap(times){
        for (let t = 0 ; t < times ; t++ ) {
            let newMap = [];
            for ( let i = 0 ; i < this.size ; i++ ) {
                newMap[i] = [];
                for ( let m = 0 ; m < this.size ; m++ ) {
                    newMap[i][m] = this.reconstructPixel(this.map, i, m);
                }
            }
            this.setMap(newMap);
        }
    }
    plantTrees(){
        for ( let i = 0 ; i < this.size ; i++ ) {
            for ( let m = 0 ; m < this.size ; m++ ) {
                if ( this.random() < this.treeChance && this.map[i][m] == 1 ) {
                    this.map[i][m] = 2;
                }
            }
        }
    }
    reconstructTrees(times){
        for (let t = 0 ; t < times ; t++ ) {
            let newMap = [];
            for ( let i = 0 ; i < this.size ; i++ ) {
                newMap[i] = [];
                for ( let m = 0 ; m < this.size ; m++ ) {
                    newMap[i][m] = this.reconstructPixelForTree(this.map, i, m);
                }
            }
            this.setMap(newMap);
        }
    }
    placeStones(){
        for ( let i = 0 ; i < this.size ; i++ ) {
            for ( let m = 0 ; m < this.size ; m++ ) {
                if ( this.random() < this.stoneChance && this.map[i][m] == 1 ) {
                    this.map[i][m] = 3;
                }
            }
        }
    }
    reconstructStones(times){
        for (let t = 0 ; t < times ; t++ ) {
            let newMap = [];
            for ( let i = 0 ; i < this.size ; i++ ) {
                newMap[i] = [];
                for ( let m = 0 ; m < this.size ; m++ ) {
                    if ( this.map[i][m] == 1 ||
                        this.map[i][m] == 2 ||
                        this.map[i][m] == 3 ) {
                        newMap[i][m] = this.reconstructStoneForMountain(this.map, i, m);
                    } else {
                        newMap[i][m] = this.map[i][m];
                    }
                }
            }
            this.setMap(newMap);
        }
    }
    periodicFunction(size, cords){
        let val = 0;
        if ( cords < 0 ) {
            val = size + cords;
        } else if ( cords >= size ) {
            val = cords - size;
        } else {
            val = cords;
        }
        return val;
    }
    reconstructStoneForMountain(map, x, y){
        let stonesNearby = 0;
        let waterNearby = 0;
        for ( let i = (x - this.mountainReconstructRange) ; i < (x + this.mountainReconstructRange) ; i++ ) {
            for ( let m = (y - this.mountainReconstructRange) ; m < (y + this.mountainReconstructRange) ; m++ ) {
                let _x = 0;
                let _y = 0;
                if ( i === x && m === y ) {
                    //do nothing
                } else {
                    _x = this.periodicFunction(this.size, i);
                    _y = this.periodicFunction(this.size, m);
                    if ( map[_x][_y] === 3 ) {
                        stonesNearby = stonesNearby + 1;
                    } else if ( map[_x][_y] === 0 ) {
                        waterNearby = waterNearby + 1;
                    }
                }
            }
        }

        if ( map[x][y] === 1 ) {
            if ( stonesNearby > this.mountainChance ) {
                return 3;
            } else {
                if ( waterNearby > this.mountainChanceNearWater ) {
                    return 3;
                } else {
                    return 1;
                }
            }
        } else if ( map[x][y] === 2 ) {
            if ( stonesNearby > this.mountainChance ) {
                if ( waterNearby > this.mountainChanceNearWater ) {
                    return 3;
                } else {
                    return 2;
                }
            } else {
                return 2;
            }
        } else if ( map[x][y] === 3 ) {
            if ( stonesNearby <= this.stoneAliveChance ) {
                if (  waterNearby > this.mountainChanceNearWater ) {
                    return 3;
                } else {
                    return 1;
                }
            } else {
                return 3;
            }
        }
    }
    placeSnowOnMountainPeaks() {
        let newMap = [];
        for (let i = 0; i < this.size; i++) {
            newMap[i] = [];
            for (let m = 0; m < this.size; m++) {
                if (this.map[i][m] === 3) {
                    newMap[i][m] = this.reconstructStoneForSnow(this.map, i, m);
                } else {
                    newMap[i][m] = this.map[i][m];
                }
            }
        }
        this.setMap(newMap);
    }
    reconstructStoneForSnow(map, x, y){
        let onlyStonesNearby = true;
        for ( let i = (x - this.snowReconstructRange) ; i < (x + this.snowReconstructRange) ; i++ ) {
            for ( let m = (y - this.snowReconstructRange) ; m < (y + this.snowReconstructRange) ; m++ ) {
                let _x = 0;
                let _y = 0;
                if ( i === x && m === y ) {
                    //do nothing
                } else {
                    _x = this.periodicFunction(this.size, i);
                    _y = this.periodicFunction(this.size, m);
                    if ( map[_x][_y] !== 3 ) {
                        onlyStonesNearby = false;
                    }
                }
            }
        }
        return onlyStonesNearby ? 4 : 3;
    }
    placeBeaches() {
        let newMap = [];
        for (let i = 0; i < this.size; i++) {
            newMap[i] = [];
            for (let m = 0; m < this.size; m++) {
                if (this.map[i][m] === 1) {
                    newMap[i][m] = this.reconstructGrassForBeach(this.map, i, m);
                } else {
                    newMap[i][m] = this.map[i][m];
                }
            }
        }
        this.setMap(newMap);
    }
    reconstructGrassForBeach(map, x, y){
        let treesNearby = false;
        let waterNearby = false;
        let sandNearby = false;
        for ( let i = (x - this.beachRange) ; i < (x + this.beachRange) ; i++ ) {
            for ( let m = (y - this.beachRange) ; m < (y + this.beachRange) ; m++ ) {
                let _x = 0;
                let _y = 0;
                if ( i === x && m === y ) {
                    //do nothing
                } else {
                    _x = this.periodicFunction(this.size, i);
                    _y = this.periodicFunction(this.size, m);
                    if ( map[_x][_y] === 2  ) {
                        treesNearby = true;
                    }
                    if ( map[_x][_y] === 0 ) {
                        waterNearby = true;
                    }
                    if ( map[_x][_y] === 5 ) {
                        sandNearby = true;
                    }
                }
            }
        }

        return !treesNearby && (waterNearby || sandNearby) ? 5 : 1;
    }
    generateGoldVeinsBeginings(){
        let newMap = [];
        for (let i = 0; i < this.size; i++) {
            newMap[i] = [];
            for (let m = 0; m < this.size; m++) {
                if (this.map[i][m] === 1) {
                    if ( Math.random() < this.goldVeinChance ) {
                        newMap[i][m] = 6;
                        this.goldVeins.push({x:i,y:m});
                    } else {
                        newMap[i][m] = this.map[i][m];
                    }
                } else {
                    newMap[i][m] = this.map[i][m];
                }
            }
        }
        this.setMap(newMap);
    }
    goldNearby(x,y, except, map){
        let res = false;
        for ( let i = -1 ; i < 2 ; i++ ){
            for( let m = -1 ; m < 2; m++ ){
                if ( Math.abs(i) === Math.abs(m) || (i === 0 && m === 0) ) {
                    continue;
                }
                let  _x = this.periodicFunction(this.size, x + i);
                let  _y = this.periodicFunction(this.size, y + m);

                if ( _x == except.x && _y == except.y ) {

                } else if ( m === 0 && i === 0 ) {

                } else if ( map[_x][_y] === 6 ) {
                    res = true;
                }

            }
        }
        return res;
    }
    growGoldVeins(){
        let newMap = this.map;
        let oldGoldBeginnings = this.goldVeins;
        this.goldVeins = [];
        for( let i = 0 ; i < oldGoldBeginnings.length ; i++ ){
            for ( let m = -1 ; m < 2; m++ ) {
                for ( let k = -1 ; k < 2 ; k++ ) {
                    if ( Math.abs(m) === Math.abs(k) || (m === 0 && k === 0) ) {
                        continue;
                    }
                    let  _x = this.periodicFunction(this.size, oldGoldBeginnings[i].x + m);
                    let  _y = this.periodicFunction(this.size, oldGoldBeginnings[i].y + k);
                    if ( this.map[_x][_y] === 1 && this.map[_x][_y] !== 6 ) {
                        if ( Math.random() > this.goldVeinsGrowChance && !this.goldNearby(_x,_y, oldGoldBeginnings[i], newMap) ) {
                            newMap[_x][_y] = 6;
                            this.goldVeins.push({x:_x,y:_y});
                        } else {
                            newMap[_x][_y] = 1;
                        }
                    }
                }
            }
        }
        this.setMap(newMap);
    }
}

module.exports = world = new World(
    200, //rozmiar mapy
    0.53, //szansa na stworzenie żywej komórki 'trawy'
    72, //ilość potrzebnych komórek żywych w sąsiedztwie do ożywienia martwej komórki
    71, //ilość martwych komórek w sąsiedztwie potrzebnych do zabicia żywej komórki
    0.76, //szansa na stworzenie drzewa
    32,
    31,
    0.31, //szansa na stworzenie kamienia
    6, //promień komórek wchodzących w skład sąsiedztwa danej komórki
    4, //tree range
    10, //ilosc komorek kamienia w sasiedztwie potrzebnych do stworzenia gor
    17, //ilosc komorek wody w poblizu potrzebnych do tworzenia gor przy wodzie
    3, //promien komorek sasiedztwa kamienia
    18, //ilosc kamieni potrzebnych w otoczeniu zeby skala przezyla
    5, //obszar sprawdzajacy czy w otoczeniu sa same kamienie zeby osniezyc szczyty
    1, //obszar sprawdzajacy czy nie ma drzew w otoczeniu oraz czy komorka znajduje sie przy wodzie
    0.003,//chance for gold vein begining
    0.4//chance to grow gold vein
);

