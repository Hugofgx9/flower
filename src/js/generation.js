import { CONFIG } from "./config";
import paper from 'paper';
import { makeFlower } from "./flower";
import { random } from "./utils";


const rules = [
	['F', 'F[+F*][][+F][-F*]'],
	['G', 'F']
];
let sentence = 'F';
const iterations = 2;


function turtle(sentence) {

	const width = paper.view.size.width;
	const height = paper.view.size.height;
	const branch_color = {
		hue: CONFIG.color.petal.h + random(-1, 1) * 10,
		saturation: random(0.2, 0.7),
		brightness: random(0.2, 0.7),
	};
	let current_pos = [[width / 2, height]];
	let current_angle = [0];

	for (let i = 0; i < sentence.length; i++) {
		const char = sentence.charAt(i);
		// console.log( char );

		if (char === 'F' || char === 'G') {
			const length = random(CONFIG.branch_length.min, CONFIG.branch_length.max);
			const new_pos = [
				current_pos.at(-1)[0] + Math.sin(current_angle.at(-1)) * length,
				current_pos.at(-1)[1] - Math.cos(current_angle.at(-1)) * length
			];
			const line = new paper.Path({ segments: [current_pos.at(-1), new_pos] });
			line.strokeColor = branch_color;
			current_pos[current_pos.length - 1] = new_pos;
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
			current_angle[current_angle.length - 1] += random(CONFIG.branch_angl.min, CONFIG.branch_angl.max);
		}
		else if (char === '-') {
			current_angle[current_angle.length - 1] -= random(CONFIG.branch_angl.min, CONFIG.branch_angl.max);
		}
		else if (char === '*') {
			makeFlower(current_pos.at(-1));
		}
	}

}

export function generateSentence() {
	for (let i = 0; i < iterations; i++) {
		let new_sentence = '';
		for (let j = 0; j < sentence.length; j++) {
			const char = sentence.charAt(j);
			new_sentence += char;

			rules.forEach(rule => {
				if (char === rule[0]) {
					new_sentence += rule[1];
				}
			});
		}
		sentence = new_sentence;
		// console.log(sentence);
	}
	turtle(sentence);
}