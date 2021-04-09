function BinTree(value, left, right) {
	this.value = value;
	this.left = left;
	this.right = right;
}
let arr = [1, 2, 2, 8, 4, 4, 3];
let a = new BinTree(1, null, null);
let b = new BinTree(2, null, null);
let c = new BinTree(2, null, null);
let d = new BinTree(8, null, null);
let e = new BinTree(4, null, null);
let f = new BinTree(4, null, null);
let g = new BinTree(3, null, null);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

// 深度优先搜索
function depthSearch(root, target) {
	// 严谨性判断
	if (!root) return;
	if (root.value == target) return true;
	// 递归左子树
	let left = depthSearch(root.left, target);
	// 左子树找到目标返回
	if (left) return true;
	else {
		// 递归右子树
		let right = depthSearch(root.right, target);
		if (right) return true;
		else return false;
	}
}

// 广度优先搜索
function breadthSearch(list, target) {
	if (list == null || list.length == 0) return;

	const children = []; // 存放每一层节点
	for (let i = 0; i < list.length; i++) {
		if (list[i] != null) {
			if (list[i].value == target) {
				console.log(list[i]);
				return true;
			} else {
				children.push(list[i].left);
				children.push(list[i].right);
			}
		} else {
			return false;
		}
	}
	return breadthSearch(children, target);
}

console.log(depthSearch(a, 1));
