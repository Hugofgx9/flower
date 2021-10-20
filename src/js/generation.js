
const rules = [
	['F', 'G[+F][-F]GF*'],
	['G', 'GG']
];
let sentence = 'F';
const iterations = 2;

function turtle(sentence) {

	for (let i = 0; i < sentence.length; i++) {
		const char = sentence.charAt(i);

		if (char === 'F' || char === 'G') {
		}
		else if(char === '[') {

		}
		else if(char === ']') {

		}
		else if(char === '+') {

		}
		else if(char === '-') {

		}
		else if(char === '*') {

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
	}
}