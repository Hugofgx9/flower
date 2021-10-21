import paper from 'paper';
import { random } from './utils';
import { makeFlower } from "./flower";
import { generateSentence } from './generation';
import blow from 'on-blow';

import './detection';

// blow.run({ onFNlc: 4000 });
// blow.events.on('start', () => console.log('user blew'));


const canvas = document.querySelector('canvas');
paper.setup(canvas);

const width = paper.view.size.width;
const height = paper.view.size.height;

const background = new paper.Path.Rectangle(0, 0, width, height);
background.fillColor = 'lightblue';

// makeFlower();
generateSentence();




