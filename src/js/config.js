import paper from 'paper';
import { random } from './utils';

export const CONFIG = {
	controls: [
		new paper.Point(random(-20, 20), random(-20, 20)),
		new paper.Point(random(-20, 20), random(-20, 20))
	],
	petal_width: random(2, 20),
	petal_height: random(-10, 10),
	petal_offset_from_pistill: random(-2, 10),
	pistill_radius: random(1, 11, true),
	nb_petal: random(6, 20, true),
	branch_length: {
		min: 15,
		max: 35
	},
	branch_angl: {
		min: Math.PI / 15,
		max: Math.PI / 4,
	},
	color: {
		petal: {
			h: random(0, 360),
			s: random(0.6, 1),
			b: random(0.4, 1)
		},
	},
};
