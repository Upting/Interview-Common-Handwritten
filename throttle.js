/**
 * 节流：指定时间内 只触发一次
 * @param {Function} fn
 * @param {Number} delay ms
 * @param {Boolean} method true 时间戳版，false定时器版，默认时间戳
 * @returns
 */
function throttle(fn, delay, method = true) {
	// 时间戳版：最后不会多执行
	if (method) {
		let start = +new Date();
		return function () {
			let args = arguments;
			let now = +new Date();
			// 当前时间 - 上次执行时间 大于 指定时间 执行事件
			if (now - start > delay) {
				fn.call(this, args);
				start = now;
			}
		};
	} else {
		// 定时器版：最后会多执行一次
		let timer = null;
		return function () {
			let args = arguments;
			// 上次定时触发完成时候，再次调用
			if (!timer) {
				timer = setTimeout(() => {
					// 触发事件，完成之后定时器置空
					fn.call(this, args);
					timer = null;
				}, delay);
			}
		};
	}
}
