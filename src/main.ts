import "./index.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const root = new THREE.Group();
// Flip Z axis to face in direction of camera.
root.scale.z = -1;

scene.add(root);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

function colorGeometry(geometry: THREE.BoxGeometry) {
	const count = geometry.attributes.position.count;
	const colors = new Float32Array(count * 3);

	const color = new THREE.Color();

	for (let i = 0; i < count; i++) {
		const x = geometry.attributes.position.getX(i);
		const y = geometry.attributes.position.getY(i);

		color.setRGB(x + 0.5, y + 0.5, 0.7);

		colors[i * 3]     = color.r;
		colors[i * 3 + 1] = color.g;
		colors[i * 3 + 2] = color.b;
	}

	geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

colorGeometry(geometry);

const material = new THREE.MeshBasicMaterial({
	vertexColors: true,
	wireframe: false,
});

const cube = new THREE.Mesh(geometry, material);

root.add(cube);

camera.position.z = 5;

const timer = new THREE.Timer();

function animate(time: number) {
	timer.update(time);
	const deltaTime = timer.getDelta();

	cube.rotation.x += 1.0 * deltaTime;
	cube.rotation.y += 1.0 * deltaTime;
	cube.rotation.z += 1.0 * deltaTime;

	renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(animate);