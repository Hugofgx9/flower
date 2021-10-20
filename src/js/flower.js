import paper from 'paper';
import { random } from './utils';

const CONFIG = {
	controls: [
		new paper.Point(random(-40, 40), random(-40, 40)),
		new paper.Point(random(-40, 40), random(-40, 40))
	],
	petal_width: random(0, 60),
	petal_height: random(-30, 30),
	pistill_radius: random(2, 40, true),
	nb_petal: random(6, 20, true)
};

export function makeFlower() {
	
	const width = paper.view.size.width;
	const height = paper.view.size.height;

	const center = [width / 2, height / 2];
	const nb_petal = CONFIG.nb_petal;
	const petals = [];

	const pistill = new paper.Path.Circle(center, CONFIG.pistill_radius);
	pistill.fillColor = "orange";

	for (let i = 0; i < nb_petal; i++) {

		const petal = makePetal(center);

		const rad = i / nb_petal * Math.PI * 2;
		petal.pivot = [width / 2, height / 2];
		petal.rotate(rad * (180 / Math.PI));
		petal.fillColor = "blue";
		petals.push(petal);
	}

}

function makePetal(center) {

	const dist_from_center = CONFIG.pistill_radius;
	const petal_width = CONFIG.petal_width;
	const petal_height = CONFIG.petal_height;
	const cp = CONFIG.controls;

	const startX = center[0] + dist_from_center;
	const startY = center[1];
	const endX = startX + petal_width;
	const endY = startY + petal_height;

	const petal = new paper.Path({
		segments:
			[
				[startX, startY, cp[0].x, cp[0].y, cp[0].x, -cp[0].y],
				[endX, endY, -cp[1].x, cp[1].y, -cp[1].x, -cp[1].y],
			],
	});
	petal.closePath();

	return petal;
}