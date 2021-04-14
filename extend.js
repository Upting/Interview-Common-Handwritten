/**
 * 1.原型链继承：将父类的实例作为子类的原型
 * 2.构造函数继承：在子类构造函数内部中调用父类构造函数
 * 3.组合继承：原型链继承+构造函数继承
 * 4.寄生组合继承：借用 构造函数 继承 属性 ，通过 原型链的混成形式 来继承 方法
 *            通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
 *            把原型链继承方式 变为 直接让子类原型指向父类原型
 *            原型式继承 + 构造函数继承
 * 5.原型式继承：实现思路就是将子类的原型设置为父类的原型
 * 6.ES6继承：同寄生组合继承一样
 */

// 由于原型链等特性的存在，在不同对象之间功能的共享通常被叫做 委托 - 特殊的对象将功能委托给通用的对象类型完成

// 1.原型链继承
{
	// 父类
	function SuperType() {
		// 属性
		this.name = "SuperType";
	}
	// 原型方法
	SuperType.prototype.sayName = function () {
		return this.name;
	};

	// 子类
	function SubType() {
		this.subName = "SubType"; // 子类属性
	}

	SubType.prototype = new SuperType(); // 重写原型对象，代之以一个新类型的实例
	// 这里实例化一个 SuperType 时， 实际上执行了两步
	// 1，新创建的对象复制了父类构造函数内的所有属性及方法
	// 2，并将原型 __proto__ 指向了父类的原型对象

	SubType.prototype.saySubName = function () {
		// 子类原型方法
		return this.subName;
	};

	// 子类实例
	let instance = new SubType();

	// instanceof 通过判断对象的 prototype 链来确定对象是否是某个类的实例
	instance instanceof SubType; // true
	instance instanceof SuperType; // true

	// 注意
	SubType instanceof SuperType; // false
	SubType.prototype instanceof SuperType; // true
}

// 2. 构造函数继承
{
	// 父类
	function SuperType() {
		// 属性
		this.name = "SuperType";
	}
	// 原型方法
	SuperType.prototype.sayName = function () {
		return this.name;
	};

	// 子类
	function SubType() {
		// 调用 SuperType 构造函数
		SuperType.call(this, "SuperType"); // 在子类构造函数中，向父类构造函数传参
		this.subName = "SubType"; // 子类属性
	}
	// 子类实例
	let instance = new SubType();
	// 运行子类构造函数，并在子类构造函数中运行父类构造函数，this绑定到子类
}

// 3. 组合继承
{
	// 父类
	function SuperType(name) {
		this.colors = ["red", "blue", "green"];
		this.name = name; // 父类属性
	}
	SuperType.prototype.sayName = function () {
		// 父类原型方法
		return this.name;
	};

	// 子类
	function SubType(name, subName) {
		// 调用 SuperType 构造函数
		SuperType.call(this, name); // ----第二次调用 SuperType----
		this.subName = subName;
	}

	// ----第一次调用 SuperType----
	SubType.prototype = new SuperType(); // 重写原型对象，代之以一个新类型的实例

	SubType.prototype.constructor = SubType; // 组合继承需要修复构造函数指向
	SubType.prototype.saySubName = function () {
		// 子类原型方法
		return this.subName;
	};

	// 子类实例
	let instance = new SubType("An", "sisterAn");
	instance.colors.push("black");
	console.log(instance.colors); // ["red", "blue", "green", "black"]
	instance.sayName(); // An
	instance.saySubName(); // sisterAn

	let instance1 = new SubType("An1", "sisterAn1");
	console.log(instance1.colors); //  ["red", "blue", "green"]
	instance1.sayName(); // An1
	instance1.saySubName(); // sisterAn1

	// instanceof：instance 的原型链是针对 SuperType.prototype 进行检查的
	instance instanceof SuperType; // true
	instance instanceof SubType; // true

	// isPrototypeOf：instance 的原型链是针对 SuperType 本身进行检查的
	SuperType.prototype.isPrototypeOf(instance); // true
	SubType.prototype.isPrototypeOf(instance); // true
}

// 4. 寄生组合继承
{
	// 父类
	function SuperType(name) {
		this.colors = ["red", "blue", "green"];
		this.name = name; // 父类属性
	}
	SuperType.prototype.sayName = function () {
		// 父类原型方法
		return this.name;
	};

	// 子类
	function SubType(name, subName) {
		// 调用 SuperType 构造函数
		SuperType.call(this, name); // ----第二次调用 SuperType，继承实例属性----
		this.subName = subName;
	}

	// ----第一次调用 SuperType，继承原型属性----
	SubType.prototype = Object.create(SuperType.prototype);

	SubType.prototype.constructor = SubType; // 增强对象

	// 子类实例
	let instance = new SubType("An", "sisterAn");
}

// 5. 原型式继承
{
	// 父类
	function SuperType(name) {
		this.colors = ["red", "blue", "green"];
		this.name = name; // 父类属性
	}
	SuperType.prototype.sayName = function () {
		// 父类原型方法
		return this.name;
	};

	/** 第一步 */
	// 子类，通过 call 继承父类的实例属性和方法，不能继承原型属性/方法
	function SubType(name, subName) {
		SuperType.call(this, name); // 调用 SuperType 的构造函数，并向其传参
		this.subName = subName;
	}

	/** 第二步 */
	// 解决 call 无法继承父类原型属性/方法的问题
	// Object.create 方法接受传入一个作为新创建对象的原型的对象，创建一个拥有指定原型和若干个指定属性的对象
	// 通过这种方法指定的任何属性都会覆盖原型对象上的同名属性
	SubType.prototype = Object.create(SuperType.prototype, {
		constructor: {
			// 注意指定 SubType.prototype.constructor = SubType
			value: SubType,
			enumerable: false,
			writable: true,
			configurable: true,
		},
		run: {
			value: function () {
				// override
				SuperType.prototype.run.apply(this, arguments);
				// call super
				// ...
			},
			enumerable: true,
			configurable: true,
			writable: true,
		},
	});

	/** 第三步 */
	// 最后：解决 SubType.prototype.constructor === SuperType 的问题
	// 这里，在上一步已经指定，这里不需要再操作
	// SubType.prototype.constructor = SubType;

	var instance = new SubType("An", "sistenAn");
}

// 6. ES6继承
{
	class People {
		constructor(name) {
			this.name = name;
		}
		run() {}
	}

	// extends 相当于方法的继承
	// 替换了上面的3行代码
	class Man extends People {
		constructor(name) {
			// super 相当于属性的继承
			// 替换了 People.call(this, name)
			super(name);
			this.gender = "男";
		}
		fight() {}
	}
	function _inherits(subType, superType) {
		// 创建对象，Object.create 创建父类原型的一个副本
		// 增强对象，弥补因重写原型而失去的默认的 constructor 属性
		// 指定对象，将新创建的对象赋值给子类的原型 subType.prototype
		subType.prototype = Object.create(superType && superType.prototype, {
			constructor: {
				// 重写 constructor
				value: subType,
				enumerable: false,
				writable: true,
				configurable: true,
			},
		});
		if (superType) {
			Object.setPrototypeOf
				? Object.setPrototypeOf(subType, superType)
				: (subType.__proto__ = superType);
		}
	}
}
