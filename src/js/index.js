import paper from 'paper';
import { random } from './utils';
import { makeFlower } from "./flower";
import { generateSentence } from './generation';
import blow from 'on-blow';
import EventEmitter from 'events';


const myEvents = new EventEmitter();
window.myEvents = myEvents;

// blow.run({ onFNlc: 4000 });
// blow.events.on('start', () => console.log('user blew'));
import './detection';

//CANVAS
const canvas = document.querySelector('canvas');
paper.setup(canvas);

const width = paper.view.size.width;
const height = paper.view.size.height;

const background = new paper.Path.Rectangle(0, 0, width, height);
background.fillColor = 'lightblue';

// generateSentence();

let last_pos;
// document.addEventListener('mousemove', (ev) => {
// 	const mouse_pos = [ev.clientX, ev.clientY];
// 	// if (last_pos) {
// 	// 	const diff_x = mouse_pos[0] - last_pos[0];
// 	// 	const diff_y = mouse_pos[1] - last_pos[1];
// 	// 	const dist = Math.hypot(diff_x, diff_y);

// 	// 	for(let i = 0; i < dist; i++){
// 	// 		const point = [
// 	// 			last_pos[0] + diff_x * (i/dist),
// 	// 			last_pos[1] + diff_y * (i/dist),
// 	// 		]
// 	// 		makeFlower(point)
// 	// 	}
// 	// }

// 	// makeFlower(mouse_pos)

// 	last_pos = mouse_pos;
// });

// window.myEvents.on("fingermove", (pos) => {
// 	pos[0] = pos[0] * width;
// 	pos[1] = pos[1] * height;
// 	// console.log('finger', pos);
// 	makeFlower(pos)
// });




