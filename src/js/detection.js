import * as handpose from "@tensorflow-models/handpose";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

let model;
const $video = document.querySelector('#myvideo');

async function setupModel() {
	model = await handpose.load();
}

async function setupCam() {
	$video.play();
	const stream = await navigator.mediaDevices.getUserMedia({
		'audio': false,
		'video': { facingMode: 'user'},
	});
	$video.srcObject = stream;
}

async function setup() {
	await setupModel();
	await setupCam();
	setInterval(() => {
		runPrediction($video)
	}, 200);
}

setup();

async function runPrediction(video) {
	const predictions = await model.estimateHands(video);
	if ( predictions.length !== 0){
		console.log( predictions[0].boundingBox.topLeft );
	}
}