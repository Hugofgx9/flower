import paper from 'paper';
import gsap from 'gsap';
import { random } from './utils';

export default class Flower {
	constructor(center, config) {
		this.center = center;
		this.config = config;

		this.petals = [];
		this.petal_color = {
			hue: this.config.color.petal.h + random(-1, 1) * 25,
			saturation: this.config.color.petal.s + random(-1, 1) * 0.2,
			brightness: this.config.color.petal.b + random(-1, 1) * 0.2,
		};

		this.makeFlower()
	}
	
	makeFlower() {
		
		// flower
		const nb_petal = this.config.nb_petal;
		const pistill_color = { ...this.petal_color };
		pistill_color.brightness += 0.2;
		pistill_color.saturation += 0.2;

		// pistill
		const pistill_radius = this.config.pistill_radius + random(-1, 1) * 4;
		const pistill = new paper.Path.Circle(this.center, pistill_radius);
		pistill.fillColor = pistill_color;

		gsap.fromTo(pistill, {
			opacity: 0
		}, {
			opacity: 1,
			duration: 0.5,
			onUpdate: () => {
			}
		});

		// petal
		const dist_from_center = this.config.petal_offset_from_pistill + random(-1, 1) * 4;
		const petal_width = this.config.petal_width + random(0, -1) * 4;
		const petal_height = this.config.petal_height;

		this.petal_pos = {
			cp : this.config.controls,
			startX : this.center[0] + dist_from_center,
			startY : this.center[1],
			endX : this.center[0] + dist_from_center + petal_width,
			endY : this.center[1] + petal_height,
		}

		const petal = this.makePetal();
		for (let i = 0; i < nb_petal; i++) {
			const cloned_petal = petal.clone();
			const rad = i / nb_petal * Math.PI * 2;
			cloned_petal.pivot = this.center;
			cloned_petal.rotate(rad * (180 / Math.PI));
			cloned_petal.fillColor = this.petal_color;

			gsap.fromTo(cloned_petal, {
				opacity: 0
			}, {
				opacity: 1,
				duration: 1
			});
		}
	}


	makePetal() {
		const {startX, startY, cp, endX, endY} = this.petal_pos;
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