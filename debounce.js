/**
 * 防抖：指定时间内多次触发，只执行一次
 * @param {Function} fn
 * @param {Number} delay
 */
function debounce(fn, delay) {
	let timer = null;

	return function () {
		// 执行事件之前，清楚定时器，确保只有本次一个定时器
		clearInterval(timer);
		timer = setTimeout(fn, delay);
	};
}
