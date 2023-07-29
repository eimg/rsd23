let count = 0;

function A() {
	return ++count;
}

function B() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(++count);
		}, 1000);
	});
}

function C() {
	console.log(++count);
}

// A();
// B()
// 	.then(() => C());

(async function () {
	A();
	await B();
	C();
})();
