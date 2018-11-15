export default class BoardMaster {
  /**
   * [constructor description]
   * @param  {Array} - [{int} width, {int} height]
   * @return {[type]}     [description]
   */
  constructor(mapSizes) {
    this._map = [];
    for (var x=0; x<mapSizes[0]; x++) {
      this._map[x] = [];
      for (var y=0; y<mapSizes[1]; y++) {
        this._map[x][y] = 0;
      }
    }
    this._map = this._map.transpose();
  }

  mergeLeft() {
    this._map = this._map.map((a, y)=> {
      return a.map((v, x)=> {
        return this.mergeBy2048(a, x);
      });
    });
  }

  mergeBy2048(a, i) {
    for(var j=i+1; j<a.length; j++) {
      if(a[i]===0 && a[j]!==0) {
        var v=a[j];
        a[j]=0;
        return v;
      }
      if(a[i]>0 && a[i]===a[j]) {
        var v=a[i]+a[j];
        a[j]=0;
        return v;
      }
    }
    return a[i];
  }

  /**
   * 加算する
   * @param {object}
   * @param {object}
   */
  add(map, position = { x:0, y:0 }) {
    this._map = this._map.merge(position.y, map, function(val1, val2) {
      return val1.merge(position.x, val2, (val1, val2)=> val1 + val2);
    });
    // or
    // map().map((arrOfX)=> {
    //   this._map[y][x]++;
    // });
    return this._map;
  }

  /**
   * 配置可能な場所`position`を配列で返す
   * @return {Array}
   */
  getPutablePositions(map) {
    var positions = [];
    this._map.forEach((a, y)=> {
      a.forEach((v, x)=> {
        !this.isOverBeyondMap(map, { x:x, y:y }) &&
        !this.isAlreadyExist(map, { x:x, y:y }) &&
        positions.push({ x:x, y:y });
      });
    });
    return positions;
  }

  /**
   * [isOverBeyondMap description]
   * @param  {[type]} postion [description]
   * @param  {[type]} map     [description]
   * @return {[type]}         [description]
   */
  isOverBeyondMap(map, position) {
    return this._map.length < position.y + map.length || this._map.some((a, i)=> {
      return map[i-position.y] && a.length < position.x + map[i-position.y].length;
    });
  }

  /**
   * [isAlreadyExist description]
   * @param  {[type]}  position [description]
   * @param  {[type]}  map      [description]
   * @return {Boolean}          [description]
   */
  isAlreadyExist(map, position) {
    return this._map.some((a, y)=> {
      return a.some((v, x)=> map[y-position.y] && map[y-position.y][x-position.x] && v + map[y-position.y][x-position.x] > 1);
    });
  }
}