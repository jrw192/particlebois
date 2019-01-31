// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------


//form stuff
let count = 1;
let speed = 1;


onCountClick = (event) => {
	count = document.getElementById("count").value;
	console.log(count);
	while(scene.children.length > 0){ 
	    scene.remove(scene.children[0]); 
	}
	for(i = 0; i < count; i++) {
		bois[i] = new createBoi();
		bois[i].placeBoi();
	}
	render();
}
onSpeedClick = (event) => {
	speed = document.getElementById("speed").value;
	console.log(speed);
}


var countButton = document.getElementById("goCount");
countButton.addEventListener("click", onCountClick, false);

var speedButton = document.getElementById("goSpeed");
speedButton.addEventListener("click", onSpeedClick, false);





// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 100;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x002642, 1.5 );

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );
renderer.render (scene, camera);



//FUN STUFF
var group = new THREE.Group();
scene.add(group);

var bois = [];

function createBoi() {
	var geometry = new THREE.SphereGeometry(0.3,10,10);
	//var material = new THREE.MeshBasicMaterial({ color: 0xFFF3EF, wireframe:true} );
	var material = new THREE.MeshBasicMaterial({ color: 'yellow'} );
	var sphere = new THREE.Mesh(geometry, material);
	
	scene.add(sphere);

	this.placeBoi = () => {
		var randomPos = [Math.random()*10, Math.random()*10, 0];
		sphere.position.set(randomPos[0], randomPos[1], randomPos[2]);	
	}

	this.moveBoi = () => {
		let x = sphere.position.x,
			y = sphere.position.y;

		let dX = Math.random(),
			dY = Math.random();

		xRange = [-dX, dX];
		yRange = [-dY, dY];
		dX = xRange[Math.floor(Math.random() * xRange.length)]
		dY = yRange[Math.floor(Math.random() * yRange.length)]

		var magnitude = Math.sqrt(Math.abs(dX*dX)+Math.abs(dY*dY)) / speed;


		newX = x + dX / (magnitude);
		newY = y + dY / (magnitude);

		var frustum = new THREE.Frustum();
		frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)); 

		//make sure they don't go offscreen
		var pos = new THREE.Vector3(newX, newY, 0);
		if (!frustum.containsPoint(pos)) {
			console.log("beep")
		    newX = x - dX / (magnitude);
		    newY = y - dY / (magnitude);
		}
		
		sphere.position.set(newX, newY, 0);

	}

}

render = () => {

	requestAnimationFrame( render );

	for(i = 0; i < bois.length; i++) {
		bois[i].moveBoi();
	}
	renderer.render (scene, camera);
}





