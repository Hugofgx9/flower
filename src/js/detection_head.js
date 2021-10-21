
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs-backend-webgl';

const $video = document.querySelector('#myvideo');
let model;
let nb_of_faces = 0;

async function setupCam() {
	$video.play();
	const stream = await navigator.mediaDevices.getUserMedia({
		'audio': false,
		'video': { facingMode: 'user' },
	});
	$video.srcObject = stream;
}

async function setup() {
	// model = await bodyPix.load();
	model = await blazeface.load();
	await setupCam();
	$video.addEventListener('loadeddata', () => {
		setInterval(() => {
			runPrediction();
		}, 200);
	});
}

async function runPrediction() {
	const predictions = await model.estimateFaces($video);
	const length = predictions.length;

	if (nb_of_faces != length) {
		if (nb_of_faces < length) {
			window.myEvents.emit('newFaces', length - nb_of_faces);
		}
		else {
			window.myEvents.emit('lostFaces', nb_of_faces - length);
		}
		nb_of_faces = length;
	}
}

setup();
