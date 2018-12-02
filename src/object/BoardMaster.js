export default class BoardMaster {
  /**
   * [constructor description]
   * @param  {Array} - [{int} width, {int} height]
   * @return {[type]}     [description]
   */
  constructor(mapSizes) {
    this._map = [];
    for (var y=0; y<mapSizes[1]; y++) {
      this._map[y] = [];
      for (var x=0; x<mapSizes[0]; x++) {
        this._map[y][x] = { x:x, y:y, value:0 };
      }
    }
  }

  /**
   * 加算する
   * @param {object}
   * @param {object}
   */
  add(map, position = { x:0, y:0 }) {
    map = this.setPosition(map, position);
    this._map = this._map.merge(position.y, map, function(val1, val2) {
      return val1.merge(position.x, val2, (val1, val2)=> {
        val1.value = val1.value + val2.value;
        return val1;
      });
    });
    // or
    // map().map((arrOfX)=> {
    //   this._map[y][x]++;
    // });
    return this._map;
  }

  setPosition(map, position) {
    return map.map((a, y)=> a.map((dat, x)=> {
      return { x: x + position.x, y: y + position.y, value: dat.value }
    }));
  }

  /**
   * [isOverBeyondMap description]
   * @param  {[type]} position [description]
   * @param  {[type]} map      [description]
   * @return {[type]}          [description]
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
    return map.some((a, y)=> a.some((dat, x)=> this._map[y+position.y][x+position.x].value !== 0));
  }

  /**
   * 参照渡ししたい場合はtrueを引数にいれる
   * @return {[type]}
   */
  getMap(isAsReference = false) {
    return isAsReference ? this._map : this._map.clone();
  }

  overrideMap(map) {
    this._map = map;
  }
}