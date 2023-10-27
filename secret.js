import { OrbitControls } from '/threejs/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '/threejs/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '/threejs/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '/threejs/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from '/threejs/examples/jsm/postprocessing/FilmPass.js';


var material, controls, composer;
var camera, scene, renderer;
var id = 0; //to check if we are animating
var mouse = new THREE.Vector2(0, 0);
let disco;

var discoButton = document.getElementById("disco");
initDisco();
discoButton.onclick = function () {
    animateDisco();
}
// initSecret();
// animate();
function initDisco() {

    //basics

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.25, 200);
    camera.position.set(0, 0, 15);

    scene = new THREE.Scene();

    // renderer and controls
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // the default
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three').appendChild(renderer.domElement);

    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    var cubemap = new THREE.CubeTextureLoader()
    .setPath( 'img/guiville/' )
    .load( [
        'cube.png',
        'cube.png',
        'cube.png',
        'cube.png',
        'cube.png',
        'cube.png'
    ] );

    var discoMat = new THREE.MeshStandardMaterial( { //material to for disco ball
        metalness: 1,
        roughness: 0.0,
        color: 0xFFFFFF,
        envMap: cubemap,
    } );
    discoMat.side = THREE.DoubleSide;

    var loader = new THREE.GLTFLoader();
    loader.load("img/disco.gltf", function (gltf) {
        disco = gltf.scene.getObjectByName("Sphere");
        disco.material = discoMat;
        scene.add(gltf.scene);
    });

    // let ratio = window.innerWidth/window.innerHeight;
    // let width = 2;
    // let height = 2*ratio;

    // let geometry = new THREE.PlaneGeometry(height, width, 60, 60); //
    // material = new THREE.ShaderMaterial({
    //             uniforms: {
    //             mouse: { value: mouse },
    //             width: { value: width },
    //             height: { value: height },
	// 			uTexture: { value: new THREE.TextureLoader().load("img/guiville/fullcity.png") },
    //             },
    //             vertexShader: vertexShader(),
    //             fragmentShader: clearShader(),
    //             });
    // material.transparent = true;


    // let mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    // mesh.position.set(-0,-0,0.08);
    // function vertexShader() {
    //     return `
    //     uniform vec2 mouse;
    //     uniform float width;
    //     uniform float height;

    //     varying vec2 vUv; //x and y unit vector
    //     varying float zpos; //this will be z position after transformation

    //     void main(){
    //     vUv = uv;   //for use in frag

    //     float dx = 2. - uv.x + width;   
    //     float dy = 2. -uv.y * height;
    //     float freq = sqrt(dx*dx + dy*dy) * 0.001 * mouse.x ;
    //     float amp = 0.01;
    //     float angle = mouse.x* 0.001 +freq;
            
    //     zpos = sin(angle)*amp;

    //     vec3 local3 = vec3(uv.x*width, uv.y*height, zpos);
    //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    //     }
    //     `
    // }
    // function clearShader() {
    // return `
    // uniform vec2 mouse;
    // uniform sampler2D uTexture;
    //     varying vec2 vUv;
    //     varying float zpos;
       
    //     void main() {
    //         vec3 texture = texture2D(uTexture, vUv + zpos).rgb;
    //         float shadow = clamp(zpos / 1., 0., 1.);
    //         gl_FragColor = vec4(texture + shadow, 0.1);
    //         gl_FragColor.a = 0.2;
    //     }
    // `
    // }

    window.addEventListener('mousemove', onMouseMove);
    function onMouseMove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        // gsap.to(mouse, 0.5, {
        //     x: (event.clientX / window.innerWidth) * 2 - 1,
        //     y: -(event.clientY / window.innerHeight) * 2 + 1
        // })
        // gsap.to(mesh.rotation, 0.5, {
        //     z: mouse.y * 0.3,
        //     y: mouse.x * (Math.PI / 6)
        // })
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


function animateDisco() {
    id = requestAnimationFrame(animate);
    // controls.update();
    composer.render(); //render and post
    // renderer.render( scene, camera );
    console.log("rendering")
    if(disco){
        disco.rotation.y += 0.004;
    }
    // material.uniforms.utime.value += 0.007;           
}

function cancelDisco(){
    cancelAnimationFrame(id);
}

