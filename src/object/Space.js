export default class Space {
	/**
	 * @param  {Array} - 二次元なら[2,3] 三次元なら[4,4,4]のように
	 * @param  {any} undefined - 初期化したい値
	 */
	constructor(size, initialValue) {
		const len = size.length;
		for (let i=0; i<len; i++) {
			initialValue = this.buffer(size.pop(), initialValue).clone();
		}
		this.o = initialValue;
	}

	/**
	 * initialValueの値でlengthの長さの配列を作る
	 * WARN:
	 *   Array(n)は empty === undefined は true だが、
	 *   map関数などを使うとemptyを飛ばしてしまう（undefinedは飛ばさない）。
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

	filter(cond) {
		return this.o.reduce((p, a, y)=> {
			a.forEach((value, x)=> {
				const dat = { x, y, value };
				cond(dat) && p.push(dat);
			});
			return p;
		}, []);
	}

	/**
	 * INFO: 3次元以降に対応していない。したい。
	 * @param  {[type]}
	 * @return {[type]}
	 */
	map(fn) {
		return this.o.map((a, y)=> {
			return a.map((value, x)=> {
				return fn({ x, y, value }, this);
			});
		});
	}
}
