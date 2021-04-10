import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from 'three';
import { Challenge } from "../../../backend/models";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import moon_1024 from "../assets/moonmap1k.jpg";

const style = {
    display:'block',
    height: document.documentElement.clientHeight, // we can control scene size by setting container dimensions
    width: document.documentElement.clientWidth

};

type VoyageProps = {
    challenges: Challenge[]
};

class ThreeVoyage extends Component<VoyageProps> {
    [x: string]: any;
    componentDidMount() {
        console.log(this.props.challenges);
        let keys: any = {
            a: false,
            s: false,
            d: false,
            w: false
        };
        this.keys = keys;
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('keydown', function(e) {
            const key = e.code.replace('Key', '').toLowerCase().toString();
            if(keys[key] !== undefined)
                keys[key] = true;
        });
        window.addEventListener('keyup', function(e) {
            const key = e.code.replace('Key', '').toLowerCase();
            if(keys[key] !== undefined)
                keys[key] = false;
        }); 

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        let keys: any = {
            a: false,
            s: false,
            d: false,
            w: false
        };
        window.removeEventListener('keydown', function(e) {
            const key = e.code.replace('Key', '').toLowerCase().toString();
            if(keys[key] !== undefined)
                keys[key] = true;
        });
        window.removeEventListener('keyup', function(e) {
            const key = e.code.replace('Key', '').toLowerCase();
            if(keys[key] !== undefined)
                keys[key] = false;
        }); 
    }

    // Standard scene setup in Three.js
    sceneSetup = () => {
        this.clock = new THREE.Clock();
        this.time = 0;
        this.newPosition = new THREE.Vector3();
        this.matrix = new THREE.Matrix4();

        this.stop = 1;
        this.DEGTORAD = 0.01745327;
        this.temp = new THREE.Vector3();
        this.dir = new THREE.Vector3();
        this.a = new THREE.Vector3();
        this.b = new THREE.Vector3();
        this.coronaSafetyDistance = 0.8;
        this.velocity = 0.0;
        this.speed = 0.0;
        

        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();

        //initialize camera
        this.camera = new THREE.PerspectiveCamera(
            70, // fov = field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            0.01, // near plane
            7, // far plane
            
        );
        
        this.camera.position.set(0, 0.5, 0);
        this.camera.lookAt(this.scene.position);

        
        //initialize ctrls and renders
        //this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer	= new THREE.WebGLRenderer({
            antialias	: true
        });
        //this.renderer.shadowMap.enabled	= true
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref

        //debug: initialize gui
        // this.gui_init()
        
        

    };


    // //initialize debugging gui
    // gui_init = () => {
    //     var cameraX = {
    //         get Enabled() {
    //             return this.camera.position.x;
    //         },
    //         set Enabled(v) {
    //             this.camera.position.x = v;
    //         }
    //     }

    //     var cameraY = {
    //         get Enabled() {
    //             return this.camera.position.y;
    //         },
    //         set Enabled(v) {
    //             this.camera.position.y = v;
    //         }
    //     }

    //     var cameraZ = {
    //         get Enabled() {
    //             return this.camera.position.z;
    //         },
    //         set Enabled(v) {
    //             this.camera.position.z = v;
    //         }
    //     }

    //     this.GUI = new dat.GUI();
    //     var folderLocal = this.GUI.addFolder("Camera ctrl");
    //     folderLocal.add(this.camera.position, 'x').step(0.1)
    //     folderLocal.add(this.camera.position, 'y').step(0.1)
    //     folderLocal.add(this.camera.position, 'z').step(0.1)

    //     var foldersight = this.GUI.addFolder("Camera LookAt");
    //     //foldersight.add(this.camera.lookAt, 'x').step(0.1)
    //     //foldersight.add(this.camera.lookAt, 'y').step(0.1)
    //     //foldersight.add(this.camera.lookAt, 'z').step(0.1)

    // }


    //main scene constructor
    addCustomSceneObjects = () => {
        this.loader = new THREE.TextureLoader();  
        
        //construct planet surface
        let texture = this.loader.load(moon_1024);
        let planet_geom = new THREE.CircleGeometry(5, 64);
        let planet_mat = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
        this.plane = new THREE.Mesh(planet_geom, planet_mat);
        this.plane.rotation.x = Math.PI / 2;
        this.scene.add(this.plane);



        //construct agent
        let agent_geom = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
        let agent_mat = new THREE.MeshNormalMaterial();
        this.agent_mesh = new THREE.Mesh(agent_geom, agent_mat);
        this.agent_mesh.position.y = 0.1;

        this.goal = new THREE.Object3D();
        this.follow = new THREE.Object3D();
        this.follow.position.z = -this.coronaSafetyDistance;
        this.agent_mesh.add(this.follow);
        this.goal.add(this.camera);
        this.scene.add(this.agent_mesh);
        
    };

    //handle animations
    handleAnimation = () => {
        window.requestAnimationFrame(this.handleAnimation);
        this.speed = 0.0;
        if(this.keys.w)
            this.speed = 0.01;
        else if (this.keys.s)
            this.speed = -0.01;

        this.velocity += (this.speed - this.velocity) * .3;
        this.agent_mesh.translateZ(this.velocity);

        if (this.keys.a)
            this.agent_mesh.rotateY(0.025);
        else if (this.keys.d)
            this.agent_mesh.rotateY(-0.025);
        
        this.a.lerp(this.agent_mesh.position, 0.4);
        this.b.copy(this.goal.position);
    
        this.dir.copy(this.a).sub(this.b).normalize();
        const dis = this.a.distanceTo(this.b) - this.coronaSafetyDistance;
        this.goal.position.addScaledVector(this.dir, dis);
        this.goal.position.lerp(this.temp, 0.02);
        this.temp.setFromMatrixPosition(this.follow.matrixWorld);
        this.camera.lookAt(this.agent_mesh.position);
        
       //this.renderer.render(this.scene, this.camera);
    }

    startAnimationLoop = () => {
        //lock the refresh rate == 60fps
        const time = this.clock.getElapsedTime();
        if (time*100 % 2 === 0){
            this.handleAnimation();
        }
        //render the entire scene
        this.renderer.render( this.scene, this.camera );
        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
        
    };

    //resize the canvas when window resize
    handleWindowResize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    };

    //this is a react part...
    render() {
        console.log(document.documentElement.clientWidth);
        return <p style={style} ref={ref => (this.mount = ref)} />;
    }
}

// //these are also react parts...
// class Container extends React.Component {
//     state = {isMounted: true};

//     render() {
//         const {isMounted = true} = this.state;
//         return (
//             <>
//                 <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
//                     {isMounted ? "Unmount" : "Mount"}
//                 </button>
//                 {isMounted && <ThreeVoyage />}
//                 {isMounted && <div>Scroll to zoom, drag to rotate</div>}
//             </>
//         )
//     }
// }

export default ThreeVoyage;