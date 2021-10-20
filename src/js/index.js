import paper from 'paper';
import makeFlower from "./flower";
import * as dat from 'dat.gui';


console.log("hello");

makeFlower();

const canvas = document.querySelector('canvas');
// Create an empty project and a view for the canvas:
paper.setup(canvas);

const width = paper.view.size.width;
const height = paper.view.size.height;

const background = new paper.Path.Rectangle(0, 0, width, height);
background.fillColor = 'lightblue';

const center = [width / 2, height / 2];

const pistill = new paper.Path.Circle(center, 30);
pistill.fillColor = "orange";

const nb_petal = 20;
const petal_distance = 60;

let p1 = new paper.Point(0, 0);
let p1_in = new paper.Point(200, 0);
let p1_out = new paper.Point(-40, 0);
let p2 = new paper.Point(200, 200);
let p2_in = new paper.Point(100, 200);
let p2_out = new paper.Point(100, 50);


const petal = new paper.Path({
	segments: [
		[p1, p1_in, p1_out],
		[p2, p2_in, p2_out],
	]
});
petal.closePath();
petal.strokeColor = "red";

for (let i = 0; i < nb_petal; i++) {

	const rad = i / nb_petal * Math.PI * 2;

	const posX = center[0] + Math.cos(rad) * petal_distance;
	const posY = center[1] + Math.sin(rad) * petal_distance;
	const posW = 20;
	const posH = 50;
	const petal = new paper.Path.Rectangle(posX - posW/2, posY - posH/2, posW, posH);
	petal.rotate( rad * (180 /Math.PI) );
	petal.fillColor = "blue";
	petal.strokeColor = "black";
}


paper.view.draw();


const gui = new dat.GUI({ name: 'Flower' });


gui.add(p1, 'x', 0, 400);
gui.add(p1, 'y', 0, 400);
gui.add(p1_in, 'x', 0, 400);
gui.add(p1_in, 'y', 0, 400);
gui.add(p1_out, 'x', 0, 400);
gui.add(p1_out, 'y', 0, 400);
gui.add(p2, 'x', 0, 400);
gui.add(p2, 'y', 0, 400);
gui.add(p2_in, 'x', -400 , 0);
gui.add(p2_in, 'y', -400 , 0);
gui.add(p2_out, 'x', -400 , 0);
gui.add(p2_out, 'y', -400 , 0);

gui.__controllers.forEach(c => {
	c.onChange( _ => {
		petal.segments = [
			[p1, p1_in, p1_out],
			[p2, p2_in, p2_out],
		];
		paper.view.draw();
		// console.log( p1_in);
	});
});

// gui.onchange( (e) => console.log(e))



