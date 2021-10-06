// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;

var img;

function preload() {
	eye = loadImage('images/eye.png');
	nose = loadImage('images/nose.png');
	lefthand = loadImage('images/lefthand.png');
	righthand = loadImage('images/righthand.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
	video.hide();
	video.size(windowWidth, windowHeight);
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
	//console.log(poses); 
	if (poses.length > 0) {
		pose = poses[0].pose;
		skeleton = poses[0].skeleton;
	}
}


function modelLoaded() {
	console.log('poseNet ready');
}

function draw() {
	image(video, 0, 0);
	background(170, 220, 220);
	translate(video.width, 0);
	//then scale it by -1 in the x-axis to flip the image
	scale(-1, 1);
	if (pose) {
		let eyeR = pose.rightEye;
		let eyeL = pose.leftEye;
		let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
		image(eye, pose.rightEye.x, pose.rightEye.y, 100, 150);
		image(eye, pose.leftEye.x, pose.leftEye.y, 100, 150);
		image(nose, pose.nose.x, pose.nose.y, 120, 230);

		image(righthand, pose.rightWrist.x, pose.rightWrist.y, 200, 300);
		image(lefthand, pose.leftWrist.x, pose.leftWrist.y, 200, 300);

		imageMode(CENTER);

		//fill(255, 0, 0);
		//ellipse(pose.nose.x, pose.nose.y, d);
		fill(0);
		ellipse(pose.rightEar.x, pose.rightEar.y, 70);
		ellipse(pose.leftEar.x, pose.leftEar.y, 70);
		for (let i = 0; i < pose.keypoints.length; i++) {
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;
			//fill(0, 0, 0);
			//ellipse(x, y, 0, 0);
		}

		for (let i = 0; i < skeleton.length; i++) {
			let a = skeleton[i][0];
			let b = skeleton[i][1];
			strokeWeight(0);
			//stroke(0);
			line(a.position.x, a.position.y, b.position.x, b.position.y);
		}
	}
}
