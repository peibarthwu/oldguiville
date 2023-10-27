import { OrbitControls } from '/threejs/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '/threejs/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '/threejs/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '/threejs/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from '/threejs/examples/jsm/postprocessing/FilmPass.js';


var container, controls, composer;
var camera, scene, renderer;
var mesh, mesh1, mesh2, mesh3; //the house
var id = 0; //to check if we are animating


var stguisbutton = document.getElementById("stguisbutton");

$(document).ready(function () {
    $("#stguisbutton").dblclick(function () {
        $("#imagine").fadeIn("slow");
        $("#three").fadeIn("slow");
        $('#overlay1').fadeIn('slow');
        if (!id) {
            init("house1");
        } else {
            changeModel("house1")
        }
        animate();
    });

    $("#stguisbutton1").dblclick(function () {
        $("#expand").fadeIn("slow");
        $("#three").fadeIn("slow");
        $('#overlay2').fadeIn('slow');
        if (!id) {
            init("house2");
        } else {
            changeModel("house2")
        }
        animate();
    });

    $("#stguisbutton2").dblclick(function () {
        $("#expand").fadeIn("slow");
        $("#three").fadeIn("slow");
        $('#overlay3').fadeIn('slow');
        if (!id) {
            init("city");
        } else {
            changeModel("city")
        }
        animate();
    });

    $("#three").click(function () {
        cancelAnimationFrame(id);
        console.log(id);
        $("#expand").fadeOut("slow");
        $("#imagine").fadeOut("slow");
        $("#three").fadeOut("slow");
        $('#overlay1').fadeOut('slow');
        $('#overlay2').fadeOut('slow');
        $('#overlay3').fadeOut('slow');
        console.log("cancelled animation");
    });
});

function init(model) {

    //basics

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.25, 200);
    camera.position.set(0, 0, 9);

    scene = new THREE.Scene();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    // model
    var loader = new THREE.GLTFLoader();
    loader.load("img/guiville/assets.gltf", function (gltf) {
        mesh1 = gltf.scene.getObjectByName("house");
        mesh2 = gltf.scene.getObjectByName("house1");
        mesh3 = gltf.scene.getObjectByName("city");
        if (model == "house1") {
            mesh = mesh1;
        }
        else if (model == "house2") {
            mesh = mesh2;
        }
        else {
            mesh = mesh3;
        }
        mesh.material = material;
        scene.add(mesh);
    });


    // renderer and controls
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // the default
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three').appendChild(renderer.domElement);

    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.minDistance = 11;
    // controls.maxDistance = 11;

    var mouse = new THREE.Vector2(0, 0);
    window.addEventListener('mousemove', onMouseMove);
    function onMouseMove(event) {
        gsap.to(mouse, 0.5, {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        })
        gsap.to(mesh.rotation, 0.5, {
            z: mouse.y * 0.3,
            y: mouse.x * (Math.PI / 6)
        })
    }

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

/**
 * BUTTONS
**/


function animate() {
    id = requestAnimationFrame(animate);
    // controls.update();
    composer.render(); //render and post
    // renderer.render( scene, camera );
    console.log("rendering")

}

/**
 * model is the id of target model
**/
function changeModel(model) {
    if (mesh1 && mesh && mesh2 && mesh3) {
        if (model == "house1") {
            mesh.geometry = mesh1.geometry;
        }
        else if (model == "house2") {
            console.log("changing to house2")
            console.log(mesh1.geometry == mesh2.geometry);
            mesh.geometry = mesh2.geometry;
        }
        else {
            mesh.geometry = mesh3.geometry;
        }
    }
}


