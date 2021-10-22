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

myEvents.on("newFaces", (nb) => {
	for (let i = 0; i < nb; i++) {
		plantes.push(new PlanteBuilder());
	}
});

myEvents.on("lostFaces", (nb) => {
	if (plantes.length) {
		for (let i = 0; i < nb; i++) {
			plantes[i].remove();
			plantes.shift();
		}
	}
});


// myEvents.emit('newFaces', 1)

// setInterval(() => {
// }, 1200);