/**
 * 柯里化函数
 * @param {Function} fn
 * @returns 返回一个新的函数
 */

function curry(fn) {
	let that = this;
	function inner(...args) {
		// 函数参数传递完毕
		if (args.length == fn.length) {
			return fn.call(that, ...args);
		} else {
			// 递归传参
			return (...innerArg) => inner.call(that, ...args, ...innerArg);
		}
	}
	return inner;
}

function sum(a, b, c) {
	return a + b + c;
}

let a = curry(sum);
console.log(a(1)(2)(3));
console.log(a(1)(2, 3));
