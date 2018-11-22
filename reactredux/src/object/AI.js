export default class AI {
  constructor(gm) {
    this.gm = gm;

    var timer = setInterval(()=> {
      var method = this.getMethodBest();
      method === undefined ? clearInterval(timer) : this.gm.play(method);
    }, 5);
  }

  getMethodBest() {
    var result = undefined;

    if(
      !this.gm.isUnchangedTo(this.gm.mergeToTop()) &&
      this.getMergableScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true })) >=
      this.getMergableScore(this.gm.mergeToTop({ isReturnMapJustMerged: true })) &&
      this.getDangerScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true })) >=
      this.getDangerScore(this.gm.mergeToTop({ isReturnMapJustMerged: true }))
    )
      result = 'top';
    if(
      !this.gm.isUnchangedTo(this.gm.mergeToRight()) &&
      this.getMergableScore(this.gm.mergeToTop({ isReturnMapJustMerged: true })) >=
      this.getMergableScore(this.gm.mergeToRight({ isReturnMapJustMerged: true })) &&
      this.getDangerScore(this.gm.mergeToTop({ isReturnMapJustMerged: true })) >=
      this.getDangerScore(this.gm.mergeToRight({ isReturnMapJustMerged: true }))
    )
      result = 'right';
    if(
      !this.gm.isUnchangedTo(this.gm.mergeToBottom()) &&
      this.getMergableScore(this.gm.mergeToRight({ isReturnMapJustMerged: true })) >=
      this.getMergableScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true })) &&
      this.getDangerScore(this.gm.mergeToRight({ isReturnMapJustMerged: true })) >=
      this.getDangerScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true }))
    )
      result = 'bottom';
    if(
      !this.gm.isUnchangedTo(this.gm.mergeToLeft()) &&
      this.getMergableScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true })) >=
      this.getMergableScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true })) &&
      this.getDangerScore(this.gm.mergeToBottom({ isReturnMapJustMerged: true })) >=
      this.getDangerScore(this.gm.mergeToLeft({ isReturnMapJustMerged: true }))
    )
      result = 'left';
    return result;
  }

  getDangerScore(map) {
    var score = 0;
    // INFO: horizontal check.
    map.forEach((a, y)=> {
      a.forEach((v, x)=> {
        score = score + (a[x] < a[x+1] ? 1 : 0);
      });
    });
    // INFO: vertical check.
    // map[0].forEach((v, x)=> {
    //   map.forEach((a, y)=> {
    //     if(map[y+1]===undefined)
    //       return;
    //     score = score + (map[y][x] < map[y+1][x] ? 1 : 0);
    //   });
    // }, 0);
    return score;
  }

  getMergableScore(map) {
    var score = 0;
    map.forEach((a, y)=> {
      a.forEach((v, x)=> {
        score = score + (a[x] === a[x+1] ? 1 : 0);
      });
    });
    return score;
  }
}

// - reduce
// - reduceRight

// INFO: 以下はどちらも score: 2だが、前者のほうがdangerではない

// getDangerScore([
//   2,3
//   2,3
// ])

// getDangerScore([
//   2,3
//   3,3
// ])
