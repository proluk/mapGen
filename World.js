class World{
  constructor(size, aliveChance, aliveNum, deathNum, reconstructRange){
    this.size = size;
    this.aliveChance = aliveChance;
    this.aliveNum = aliveNum
    this.deathNum = deathNum;
    this.reconstructRange = reconstructRange;
    this.treeChance = 0.2;
    this.stoneChance = 0.99;
    this.map = [];
  }
  generateRandom(){
    for ( let i = 0 ; i < this.size ; i++ ) {
      this.map[i] = [];
      for ( let m = 0 ; m < this.size ; m++ ) {
        if ( this.random() > this.aliveChance ) {
          this.map[i][m] = 1;
        } else {
          this.map[i][m] = 0;
        }
      }
    }
  }
  random(){
    return Math.random();
  }
  reconstructPixel(map, x, y){
    let aliveNeighbours = 0;
    for ( let i = (x - this.reconstructRange) ; i < (x + this.reconstructRange) ; i++ ) {
      for ( let m = (y - this.reconstructRange) ; m < (y + this.reconstructRange) ; m++ ) {
        if ( i == 0 && m == 0 ) {
          
        } else if ( i < 0 || m < 0 || i >= this.size || m >= this.size ) {
          aliveNeighbours = aliveNeighbours + 1;
        } else if ( map[i][m] == 1 ) {
          aliveNeighbours = aliveNeighbours + 1;
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
    for ( let i = (x - this.reconstructRange) ; i < (x + this.reconstructRange) ; i++ ) {
      for ( let m = (y - this.reconstructRange) ; m < (y + this.reconstructRange) ; m++ ) {
        if ( i == 0 && m == 0 ) {
          
        } else if ( i < 0 || m < 0 || i >= this.size || m >= this.size ) {
          aliveNeighbours = aliveNeighbours + 1;
        } else if ( map[i][m] == 2 ) {
          aliveNeighbours = aliveNeighbours + 1;
        } else if ( map[i][m] == 0 ) {
          aliveNeighbours = aliveNeighbours + 1;
        } else if ( map[i][m] == 1 ) {
          aliveNeighbours = aliveNeighbours - 1;
        }
      }
    }
    if ( map[x][y] == 1 ) {
      if ( aliveNeighbours < this.deathNum ){
        return 1;
      } else {
        return 2;
      }
    } else if ( map[x][y] == 2 ) {
      if ( aliveNeighbours > this.aliveNum ){
        return 2;
      } else {
        return 1;
      }
    } else if ( map[x][y] == 0 ) {
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
      this.map = newMap;      
    }
  }
  plantTrees(){
    for ( let i = 0 ; i < this.size ; i++ ) {
      for ( let m = 0 ; m < this.size ; m++ ) {
        if ( this.random() > this.treeChance && this.map[i][m] == 1 ) {
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
      this.map = newMap;      
    }
  }
  placeStones(){
    for ( let i = 0 ; i < this.size ; i++ ) {
      for ( let m = 0 ; m < this.size ; m++ ) {
        if ( this.random() > this.stoneChance && this.map[i][m] == 1 ) {
          this.map[i][m] = 3;
        } 
      }
    }
  }
}

module.exports = World;