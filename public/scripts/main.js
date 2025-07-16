import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from '../node_modules/gsap';
import { ScrollTrigger } from '../node_modules/gsap/ScrollTrigger';
import { ScrollToPlugin } from '../node_modules/gsap/ScrollToPlugin';

setTimeout(function () {
    document.body.className = '';
}, 500);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
ScrollTrigger.defaults({ scroller: '.parent' });

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Light
// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 20).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 70, 100, 1.7);
pointLight.position.set(-5, 7, 10);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(
    70,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 70;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;

// Load GLTF model
const loader = new GLTFLoader();
let gltfModel;
loader.load(
    'models/spaceship/scene.gltf',
    (gltf) => {
        gltfModel = gltf.scene;
        scene.add(gltfModel);
        gltfModel.scale.set(0.0015, 0.0015, 0.0015); // Adjust the scale as needed

        gltfModel.position.x = 35;

        gsap.to(gltfModel.rotation, {
            y: '+=7',
            x: '+=7',
            scrollTrigger: {
                trigger: '.webgl',
                start: 'top top+=0', // Adjust as needed
                end: 'bottom center-=100', // Adjust as needed
                scrub: 5,
                pin: true, // Pin the canvas during the animation
                onEnter: () => {
                    // Disable page scrolling when the animation starts
                    document.body.style.overflow = 'hidden';
                },
                onLeaveBack: () => {
                    // Enable page scrolling when the animation is complete
                    document.body.style.overflow = 'auto';
                },
            },
        });

        console.log('GLTF model loaded successfully');
        animate(); // Make sure to call animate() after the model is loaded
    },
    undefined,
    (error) => {
        console.error('Error loading GLTF model', error);
    }
);

// Create particle system for stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

// Create stars
const starsPositions = new Float32Array(5000 * 3); // Adjust the number of stars
const starsOpacities = new Float32Array(5000); // Array to store opacities
for (let i = 0; i < 5000; i++) {
    starsPositions[i * 3] = (Math.random() - 0.5) * 200;
    starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    starsOpacities[i] = 0.7 + Math.random() * 0.3;
}
starsGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(starsPositions, 3)
);

// Create star system
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Update controls in the animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

//SHUTTLE

//SCENE

//DIVIDER

//WAHOOOO
// Shuttle Scene
const shuttleScene = new THREE.Scene();

// Sizes
const shuttleSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Light
// Add lights to the shuttle scene
const shuttleAmbientLight = new THREE.AmbientLight(0xffffff);
shuttleScene.add(shuttleAmbientLight);

// Camera
const shuttleCamera = new THREE.PerspectiveCamera(
    70,
    shuttleSizes.width / shuttleSizes.height,
    0.1,
    200
);
shuttleCamera.position.z = 60;
shuttleScene.add(shuttleCamera);

// Renderer
const shuttleCanvas = document.querySelector('.shuttle');
const shuttleRenderer = new THREE.WebGLRenderer({ canvas: shuttleCanvas });
shuttleRenderer.setSize(shuttleSizes.width, shuttleSizes.height);
shuttleRenderer.setPixelRatio(3);

// Controls
const shuttleControls = new OrbitControls(shuttleCamera, shuttleCanvas);
shuttleControls.enableDamping = false;
shuttleControls.enablePan = false;
shuttleControls.enableZoom = false;
shuttleControls.enableRotate = false;

// Load GLTF model
const shuttleLoader = new GLTFLoader();
let shuttleModel;
shuttleLoader.load(
    'models/shuttle/scene.gltf',
    (gltf) => {
        shuttleModel = gltf.scene;
        shuttleScene.add(shuttleModel);
        shuttleModel.position.y = -20;

        shuttleModel.scale.set(0.05, 0.05, 0.05); // Adjust the scale as needed

        gsap.to(shuttleModel.scale, {
            x: '+=0.12',
            y: '+=0.12',
            z: '+=0.12',

            scrollTrigger: {
                trigger: '.shuttle',
                start: 'top top+=0', // Adjust as needed
                end: 'bottom top+=600', // Adjust as needed
                scrub: 2,
                pin: true, // Pin the canvas during the animation
                onEnter: () => {
                    // Disable page scrolling when the animation starts
                    document.body.style.overflow = 'hidden';
                },
                onLeaveBack: () => {
                    // Enable page scrolling when the animation is complete
                    document.body.style.overflow = 'auto';
                },
                onLeave: () => {
                    // Make the .space section visible when the animation ends
                    gsap.to('.scroll-info', { opacity: 1, duration: 1 });
                },
            },
        });

        gsap.to(shuttleModel.position, {
            y: '+=-40', // Adjust the value as needed
            scrollTrigger: {
                trigger: '.shuttle',
                start: 'top top+=0',
                end: 'bottom top+=600',
                scrub: 2,
            },
        });

        console.log('Shuttle GLTF model loaded successfully');
        animateShuttle(); // Make sure to call animate() after the model is loaded
    },
    undefined,
    (error) => {
        console.error('Error loading Shuttle GLTF model', error);
    }
);

// Update controls in the animation loop
function animateShuttle() {
    requestAnimationFrame(animateShuttle);

    // Update controls for the shuttle scene
    shuttleControls.update();

    // Render the shuttle scene
    shuttleRenderer.render(shuttleScene, shuttleCamera);
}

// Resize
window.addEventListener('resize', () => {
    // Update sizes for the shuttle scene
    shuttleSizes.width = window.innerWidth;
    shuttleSizes.height = window.innerHeight;

    // Update Camera for the shuttle scene
    shuttleCamera.aspect = shuttleSizes.width / shuttleSizes.height;
    shuttleCamera.updateProjectionMatrix();
    shuttleRenderer.setSize(shuttleSizes.width, shuttleSizes.height);
});

// // Monolith Scene
// const monolithScene = new THREE.Scene();

// // Sizes
// const monolithSizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
// };

// // Light
// // Add lights to the monolith scene
// const monolithAmbientLight = new THREE.AmbientLight(0xffffff);
// monolithScene.add(monolithAmbientLight);

// // Camera
// const monolithCamera = new THREE.PerspectiveCamera(
//     70,
//     monolithSizes.width / monolithSizes.height,
//     0.1,
//     100
// );
// monolithCamera.position.z = 70;
// monolithScene.add(monolithCamera);

// // Renderer
// const monolithCanvas = document.querySelector('.loading');
// const monolithRenderer = new THREE.WebGLRenderer({ canvas: monolithCanvas });
// monolithRenderer.setSize(monolithSizes.width, monolithSizes.height);
// monolithRenderer.setPixelRatio(3);

// // Controls
// const monolithControls = new OrbitControls(monolithCamera, monolithCanvas);
// monolithControls.enableDamping = false;
// monolithControls.enablePan = false;
// monolithControls.enableZoom = false;
// monolithControls.enableRotate = false;

// // Load GLTF model
// const monolithLoader = new GLTFLoader();
// let monolithModel;
// monolithLoader.load(
//     'models/monolith/scene.gltf',
//     (gltf) => {
//         monolithModel = gltf.scene;
//         monolithScene.add(monolithModel);

//         monolithModel.scale.set(0.001, 0.001, 0.001); // Adjust the scale as needed

//         console.log('Monolith GLTF model loaded successfully');
//         animateMonolith(); // Make sure to call animate() after the model is loaded
//     },
//     undefined,
//     (error) => {
//         console.error('Error loading Monolith GLTF model', error);
//     }
// );

// // Update controls in the animation loop
// function animateMonolith() {
//     requestAnimationFrame(animateMonolith);

//     // Update controls for the monolith scene
//     monolithControls.update();

//     // Render the monolith scene
//     monolithRenderer.render(monolithScene, monolithCamera);
// }

// // Resize
// window.addEventListener('resize', () => {
//     // Update sizes for the monolith scene
//     monolithSizes.width = window.innerWidth;
//     monolithSizes.height = window.innerHeight;

//     // Update Camera for the monolith scene
//     monolithCamera.aspect = monolithSizes.width / monolithSizes.height;
//     monolithCamera.updateProjectionMatrix();
//     monolithRenderer.setSize(monolithSizes.width, monolithSizes.height);
// });

const bgAudio = new Audio('audio/strauss.mp3');
const bgAudioButton = document.querySelector('.bg-audio');
const bgAudioIcon = document.querySelector('.bg-audio img');

bgAudioButton.addEventListener('click', () => {
    // Toggle the 'playing' class
    bgAudioButton.classList.toggle('playing');

    // Check if the 'playing' class is active
    const isPlaying = bgAudioButton.classList.contains('playing');

    // If the 'playing' class is active, play the audio; otherwise, pause it
    if (isPlaying) {
        bgAudio.play();
        bgAudioIcon.src = 'img/play.png';
    } else {
        bgAudio.pause();
        bgAudioIcon.src = 'img/mute.png';
    }
});
