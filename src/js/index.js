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

// generateSentence();

window.myEvents.on("newFaces", () => {
	new PlanteBuilder();
});


// 	makeFlower(mouse_pos)

// 	last_pos = mouse_pos;
// });

// window.myEvents.on("fingermove", (pos) => {
// 	pos[0] = pos[0] * width;
// 	pos[1] = pos[1] * height;
// 	// console.log('finger', pos);
// 	makeFlower(pos)
// });




