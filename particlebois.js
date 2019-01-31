// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

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
renderer.setClearColor( 0x002642, 1 );

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

var ambientLight  = new THREE.AmbientLight( '#FF9BDA' ),
	hemiLight     = new THREE.HemisphereLight('#FF9BDA', '#FF9BDA', 1000 ),
	light         = new THREE.PointLight( '#FF9BDA', 1, 1000 );
ambientLight.position.set( 0, 0, 0 );
hemiLight.position.set( 0, 0, 0 );
light.position.set( 0, 0, 10 );
scene.add( ambientLight ); 
scene.add( hemiLight );
scene.add( light );

//FUN STUFF
createBoi = () => {
	var geometry = new THREE.SphereGeometry(10,10,10);
	var material = new THREE.MeshBasicMaterial({ color: 0xFFF3EF, wireframe:true} );
	var sphere = new THREE.Mesh(geometry, material);
	var randomPos = [Math.random()*10, Math.random()*10, 0];
	sphere.position.set(randomPos[0], randomPos[1], randomPos[2]);	
	scene.add(sphere);

	moveBoi = () => {
		let x = sphere.position.x,
			y = sphere.position.y;

		let dX = Math.random(),
			dY = Math.random();

		xRange = [-dX, dX];
		yRange = [-dY, dY];
		dX = xRange[Math.floor(Math.random() * xRange.length)]
		dY = yRange[Math.floor(Math.random() * yRange.length)]

		var magnitude = Math.sqrt(Math.abs(dX*dX)+Math.abs(dY*dY)) / 2.5;


		newX = x + dX / (magnitude);
		newY = y + dY / (magnitude);

		var frustum = new THREE.Frustum();
		frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)); 

		var pos = new THREE.Vector3(newX, newY, 0);
		if (!frustum.containsPoint(pos)) {
			console.log("beep")
		    newX = x - dX / (magnitude);
		    newY = y - dY / (magnitude);
		}
		
		sphere.position.set(newX, newY, 0);

	}

	render = () => {
		requestAnimationFrame( render );
		moveBoi();
		renderer.render (scene, camera);
	}
	render();

}

var myBoi = createBoi();







