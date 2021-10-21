import paper from 'paper';
import PlanteBuilder from './planteBuilder';
import EventEmitter from 'events';

const myEvents = new EventEmitter();
window.myEvents = myEvents;

import './detection_head';

//CANVAS
const canvas = document.querySelector('canvas');
paper.setup(canvas);

const width = paper.view.size.width;
const height = paper.view.size.height;

const background = new paper.Path.Rectangle(0, 0, width, height);
background.fillColor = 'lightblue';

const plantes = [];

window.myEvents.on("newFaces", (nb) => {
	for (let i = 0; i < nb; i++) {
		plantes.push(new PlanteBuilder());
	}
});
window.myEvents.on("lostFaces", (nb) => {
	if (plantes.length) {
		for (let i = 0; i < nb; i++) {
			plantes[i].remove();
			plantes.shift();
		}
	}
});
// });
// window.myEvents.on("newFaces", () => {
// 	plantes.push(new PlanteBuilder());
// });


// 	makeFlower(mouse_pos)

// 	last_pos = mouse_pos;
// });

// window.myEvents.on("fingermove", (pos) => {
// 	pos[0] = pos[0] * width;
// 	pos[1] = pos[1] * height;
// 	// console.log('finger', pos);
// 	makeFlower(pos)
// });




