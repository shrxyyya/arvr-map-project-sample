// // OSMLoader.js
// import * as THREE from 'three';

// export async function loadOSMBuildings(url) {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Failed to load OSM data: ${response.statusText}`);
//     }
//     const data = await response.json();

//     return parseOSMBuildings(data);
// }

// function parseOSMBuildings(data) {
//     const buildings = new THREE.Group();

//     data.features.forEach(feature => {
//         if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
//             const height = feature.properties.height || 10; // Default height if not specified
//             const color = 0x808080; // Default grey color for buildings
//             const geometry = new THREE.ExtrudeGeometry(
//                 new THREE.Shape(feature.geometry.coordinates[0].map(coord => new THREE.Vector2(coord[0], coord[1]))),
//                 { depth: height, bevelEnabled: false }
//             );
//             const material = new THREE.MeshLambertMaterial({ color });
//             const mesh = new THREE.Mesh(geometry, material);
//             buildings.add(mesh);
//         }
//     });

//     return buildings;
// }



// OSMLoader.js
import * as THREE from 'three';

export async function loadOSMBuildings(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load OSM data: ${response.statusText}`);
    }
    const data = await response.json();

    return parseOSMBuildings(data);
}

function parseOSMBuildings(data) {
    const buildings = new THREE.Group();

    data.features.forEach(feature => {
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
            const height = feature.properties.height || 10; // Default height if not specified
            const color = 0x808080; // Default grey color for buildings
            const shape = new THREE.Shape();

            // Create geometry from polygon coordinates
            if (feature.geometry.type === 'Polygon') {
                feature.geometry.coordinates[0].forEach(([x, y], index) => {
                    if (index === 0) shape.moveTo(x, y);
                    else shape.lineTo(x, y);
                });
            }

            const geometry = new THREE.ExtrudeGeometry(
                shape,
                { depth: height, bevelEnabled: false }
            );

            const material = new THREE.MeshLambertMaterial({ color });
            const mesh = new THREE.Mesh(geometry, material);
            buildings.add(mesh);
        }
    });

    return buildings;
}
