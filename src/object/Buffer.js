export default class Buffer {
  /**
   * @param  {Array} - 二次元なら[2,3] 三次元なら[4,4,4]のように
   * @param  {any} undefined - 初期化したい値
   */
  constructor(size, initialValue) {
    const len = size.length;
    for (let i=0; i<len; i++) {
      initialValue = this.buffer(size.pop(), initialValue);
    }
    this.o = initialValue;
  }

  /**
   * initialValueの値でlengthの長さの配列を作る
   * @param  {int}
   * @param  {any} undefined
   * @return {Array}
   */
  buffer(length, initialValue) {
    var a = [];
    for (let i=0; i<length; i++)
      a.push(initialValue);
    return a;
  }

  dump() {
    return this.o;
  }
}
