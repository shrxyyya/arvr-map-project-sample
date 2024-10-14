// // Main.js
// import { createScene, render } from './SceneSetup.js';
// import { loadOSMBuildings } from './OSMLoader.js';
// import * as THREE from 'three';

// async function init() {
//     const container = document.getElementById('threejs-container');
//     const { scene, camera, renderer, controls } = createScene(container);

//     // Light setup
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(100, 100, 100);
//     scene.add(directionalLight);

//     // Load OSM buildings
//     try {
//         const osmUrl = 'https://data.osmbuildings.org/0.2/anonymous/tile/15/17605/10743.json';
//         const buildings = await loadOSMBuildings(osmUrl);
//         scene.add(buildings);
//     } catch (error) {
//         console.error('Error loading OSM buildings:', error);
//     }

//     // Animation loop
//     function animate() {
//         requestAnimationFrame(animate);
//         controls.update();
//         render(renderer, scene, camera);
//     }

//     animate();
// }

// init();


// Main.js
import { createScene, render } from './SceneSetup.js';
import { loadOSMBuildings } from './OSMLoader.js';
import * as THREE from 'three';

async function init() {
    const container = document.getElementById('threejs-container');
    const { scene, camera, renderer, controls } = createScene(container);

    // Light setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);

    // Load OSM buildings
    try {
        const osmUrl = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson';
        const buildings = await loadOSMBuildings(osmUrl);
        scene.add(buildings);
    } catch (error) {
        console.error('Error loading OSM buildings:', error);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render(renderer, scene, camera);
    }

    animate();
}

init();
