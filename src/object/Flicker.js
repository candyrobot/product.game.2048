import $ from 'jquery';

// REF: http://www.hp-stylelink.com/news/2014/06/20140617.php
// REF: https://qiita.com/shge/items/d2ae44621ce2eec183e6
// INFO: ※preventDefault()を使用してブラウザのスクロールを停止する必要がある場合には，適宜スクロール処理を追加する必要があります．
export default new class {

  callback = function() {};

  touchStartX;
  touchStartY;
  touchMoveX;
  touchMoveY;

  constructor() {
    $(document).on('touchstart', (e)=> {
      e.preventDefault();
      this.touchStartX = e.touches[0].pageX;
      this.touchStartY = e.touches[0].pageY;
    });
    $(document).on('touchmove', (e)=> {
      e.preventDefault();
      this.touchMoveX = e.changedTouches[0].pageX;
      this.touchMoveY = e.changedTouches[0].pageY;
    });
    $(document).on('touchend', (e)=> {
      this.callback({
        x: this.touchMoveX - this.touchStartX,
        y: this.touchMoveY - this.touchStartY
      });

      if (this.touchStartX > this.touchMoveX) {
          if (this.touchStartX > (this.touchMoveX + 50)) {
            console.log('右から左に指が移動した場合');
          }
      } else if (this.touchStartX < this.touchMoveX) {
          if ((this.touchStartX + 50) < this.touchMoveX) {
            console.log('左から右に指が移動した場合');
          }
      }

      if (this.touchStartY > this.touchMoveY) {
          if (this.touchStartY > (this.touchMoveY + 50)) {
            console.log('下から上に指が移動した場合');
          }
      } else if (this.touchStartY < this.touchMoveY) {
          if ((this.touchStartY + 50) < this.touchMoveY) {
            console.log('上から下に指が移動した場合');
          }
      }
    });
  }

  onFlick(callback) {
    this.callback = callback;
  }
}
