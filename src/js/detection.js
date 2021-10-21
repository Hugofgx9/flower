import * as handpose from "@tensorflow-models/handpose";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

setup();

let model;
let x, y;
const $video = document.querySelector('#myvideo');

async function setupModel() {
	model = await handpose.load();
}

async function setupCam() {
	$video.play();
	const stream = await navigator.mediaDevices.getUserMedia({
		'audio': false,
		'video': { facingMode: 'user' },
	});
	$video.srcObject = stream;
}

async function setup() {
	await setupModel();
	await setupCam();
	$video.addEventListener('loadeddata', () => {
		runPrediction();
		// setInterval(() => {
		// }, 100);
	})
}

async function runPrediction() {
	const predictions = await model.estimateHands($video);
	if (predictions.length !== 0) {
		x = (1 - predictions[0].landmarks[8][0] / $video.videoWidth).toFixed(3);
		y = (predictions[0].landmarks[8][1] / $video.videoHeight).toFixed(3);

		window.myEvents.emit('fingermove', [x, y]);
	}
	requestAnimationFrame(() => runPrediction())
}
