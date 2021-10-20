import paper from 'paper';
import { makeFlower } from "./flower";


console.log("hello");


const canvas = document.querySelector('canvas');
// Create an empty project and a view for the canvas:
paper.setup(canvas);

const width = paper.view.size.width;
const height = paper.view.size.height;


const background = new paper.Path.Rectangle(0, 0, width, height);
background.fillColor = 'lightblue';
makeFlower()


// gui.__controllers.forEach(c => {
// 	c.onChange(_ => {
// 		petals.forEach((petal, i) => {
// 			const rad = i / nb_petal * Math.PI * 2;
// 			const petal_width = 70;
// 			const startX = center[0] + petal_distance;
// 			const startY = center[1];
// 			const endX = startX + petal_width;
// 			const endY = startY;
// 			petal.segments = [
// 				[startX, startY, p1.x, p1.y, p1.x, -p1.y],
// 				[endX, endY, -p2.x, -p2.y, -p2.x, p2.y],
// 			];
// 			petal.rotate(rad * (180 / Math.PI));
// 		});
// 		paper.view.update();
// 		// console.log( p1_in);
// 	});
// });

// gui.onchange( (e) => console.log(e))


function random(min, max) {
	return Math.random() * (max - min) + min;
}


