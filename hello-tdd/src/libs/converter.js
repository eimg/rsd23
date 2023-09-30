export function convertToC(f) {
	let result = (f - 32) * (5 / 9);
	return parseFloat(result.toFixed(2));
}
