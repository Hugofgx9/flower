import { newConfig } from "./config";
import paper from 'paper';
import Flower from "./flower";
import { random } from "./utils";
import gsap from "gsap";


export default class PlanteBuilder {

	constructor(bottom) {

		this.group = new paper.Group();
		this.flower = [];

		const width = paper.view.size.width;
		const height = paper.view.size.height;

		// this.bottom = bottom || [width/2, height]
		this.bottom = bottom || [random(width * 0.1, width * 0.9), random(height, height * 0.7)];
		this.rules = [
			['F', 'F[+F*][][+F][-F*]'],
			['G', 'F']
		];
		this.sentence = 'F';
		this.iterations = 2;
		this.config = newConfig();

		this.generateSentence();
		this.turtle();
		setTimeout(() => {
			this.sendCanvas()
		}, 1000);

	}

	sendCanvas() {

		const png = document.querySelector('canvas').toDataURL("image/png");
		const data = { image: { file: png, name: 'screenshot' } };
		fetch("http://localhost:3000/upload-experience", {
			method: "POST",
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(data)
		})
			// .then((res) => { log res.json(); })
			// .then((data) => { alert(JSON.stringify(data)); })
			;
	}

	turtle() {


		const branch_color = {
			hue: this.config.color.petal.h + random(-1, 1) * 10,
			saturation: random(0.2, 0.7),
			brightness: random(0.2, 0.7),
		};

		let current_pos = [this.bottom];
		let current_angle = [0];

		for (let i = 0; i < this.sentence.length; i++) {
			const char = this.sentence.charAt(i);
			// console.log( char );

			if (char === 'F' || char === 'G') {
				const length = random(this.config.branch_length.min, this.config.branch_length.max);
				const new_pos = [
					current_pos.at(-1)[0] + Math.sin(current_angle.at(-1)) * length,
					current_pos.at(-1)[1] - Math.cos(current_angle.at(-1)) * length
				];
				const line = new paper.Path({ segments: [current_pos.at(-1), new_pos] });
				line.strokeColor = branch_color;
				current_pos[current_pos.length - 1] = new_pos;

				this.group.addChild(line);
			}
			else if (char === '[') {
				current_pos.push(current_pos.at(-1));
				current_angle.push(current_angle.at(-1));
			}
			else if (char === ']') {
				current_pos.pop();
				current_angle.pop();
			}
			else if (char === '+') {
				current_angle[current_angle.length - 1] += random(this.config.branch_angl.min, this.config.branch_angl.max);
			}
			else if (char === '-') {
				current_angle[current_angle.length - 1] -= random(this.config.branch_angl.min, this.config.branch_angl.max);
			}
			else if (char === '*') {
				const flower = new Flower(current_pos.at(-1), this.config);
				this.flower.push(flower);
				this.group.addChild(flower.group);
			}
		}
	}

	generateSentence() {
		for (let i = 0; i < this.iterations; i++) {
			let new_sentence = '';
			for (let j = 0; j < this.sentence.length; j++) {
				const char = this.sentence.charAt(j);
				new_sentence += char;

				this.rules.forEach(rule => {
					if (char === rule[0]) {
						new_sentence += rule[1];
					}
				});
			}
			this.sentence = new_sentence;
			// console.log(sentence);
		}
	}

	remove() {
		this.flower.forEach(flower => flower.remove());
		gsap.fromTo(this.group, {
			opacity: 1
		}, {
			opacity: 0,
			duration: 0.6,
			ease: "power2.inOut",
		});
	}
}
