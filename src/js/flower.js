import paper from 'paper';
import { CONFIG } from './config';
import { random } from './utils';

export function makeFlower(center) {

	// flower
	const nb_petal = CONFIG.nb_petal;
	const petals = [];
	const petal_color = {
		hue: CONFIG.color.petal.h + random(-1, 1) * 10,
		saturation: CONFIG.color.petal.s + random(-1, 1) * 0.2,
		brightness: CONFIG.color.petal.b + random(-1, 1) * 0.2,
	};
	const pistill_color = {...petal_color};
	pistill_color.brightness += 0.2;
	pistill_color.saturation += 0.2;

	// pistill
	const pistill = new paper.Path.Circle(center, CONFIG.pistill_radius);
	pistill.fillColor = pistill_color;
	
	// petal
	const dist_from_center = CONFIG.petal_offset_from_pistill;
	const petal_width = CONFIG.petal_width;
	const petal_height = CONFIG.petal_height;
	const cp = CONFIG.controls;

	const startX = center[0] + dist_from_center;
	const startY = center[1];
	const endX = startX + petal_width;
	const endY = startY + petal_height;

	for (let i = 0; i < nb_petal; i++) {

		const petal = makePetal();
		const rad = i / nb_petal * Math.PI * 2;
		petal.pivot = center;
		petal.rotate(rad * (180 / Math.PI));
		petal.fillColor = petal_color;
		petals.push(petal);
	}
	
	function makePetal() {
	
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
}
