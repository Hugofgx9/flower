export function random(min, max, int = false) {
	if (int) {
		return Math.floor(Math.random() * (max - min) + min);

	}
	else {
		return Math.random() * (max - min) + min;
	}
}