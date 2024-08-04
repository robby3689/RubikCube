// Basic setup for Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube pieces
const cubeSize = 1;
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

const colors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xffa500, // Orange
    0xffffff  // White
];

const createMaterial = (color) => new THREE.MeshBasicMaterial({ color });

const materials = colors.map(createMaterial);

const cubePieces = [];

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const cube = new THREE.Mesh(geometry, materials);
            cube.position.set(x * cubeSize, y * cubeSize, z * cubeSize);
            scene.add(cube);
            cubePieces.push(cube);
        }
    }
}

camera.position.z = 5;

// Rotate the cube
const rotateCube = (axis, index, direction) => {
    const angle = Math.PI / 2 * direction;
    const matrix = new THREE.Matrix4();
    switch (axis) {
        case 'x':
            matrix.makeRotationX(angle);
            break;
        case 'y':
            matrix.makeRotationY(angle);
            break;
        case 'z':
            matrix.makeRotationZ(angle);
            break;
    }
    cubePieces.forEach(cube => {
        if (Math.round(cube.position[axis]) === index) {
            cube.position.applyMatrix4(matrix);
            cube.rotation[axis] += angle;
        }
    });
};

// Example rotation (rotate the front face 90 degrees clockwise)
rotateCube('z', 1, 1);

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
