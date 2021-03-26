
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import marsbump1k from './MainPage/ThreeAssets/marsbump1k.jpg'
import marsmap1k from './MainPage/ThreeAssets/marsmap1k.jpg'
import moonbump1k from './MainPage/ThreeAssets/moonbump1k.jpg'
import neptunemap from './MainPage/ThreeAssets/neptunemap.jpg'

class ThreeMap extends Component {

    componentDidMount() {
    // === THREE.JS CODE START ===
    
    //initialization
    var scene, camera, renderer;
    
    
    let LINE_COUNT = 800;   //control the density of the lines
    //mock up warp effect
    let geom = new THREE.BufferGeometry();  //construct a buffer geometry with multile vertices, consider each vertex as the endpoint of the line 
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6*LINE_COUNT), 3));
    geom.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2*LINE_COUNT), 1));
    let pos = geom.getAttribute("position");
    let pa = pos.array;
    let vel = geom.getAttribute("velocity");
    let va = vel.array;

    this.loader = new THREE.TextureLoader();  
    
    //attempt to mock up planets
    //we only mock up several planets
    let PLANETS_COUNT = 40;
    let planets = new Array;
    let v_p = new Array;
    let planet_geos = new Array;
    planet_geos[0] =  new THREE.SphereGeometry( 4, 32, 32 );    //small planet
    planet_geos[1] =  new THREE.SphereGeometry( 7, 32, 32 );    //middle-size planet
    planet_geos[2] =  new THREE.SphereGeometry( 12, 32, 32 );    //large-size planet
    let planet_mats = new Array;
    
    planet_mats[0] = new THREE.MeshPhongMaterial({
        map	: this.loader.load(marsmap1k),
        bumpMap	: this.loader.load(marsbump1k),
    })
    planet_mats[1] = new THREE.MeshPhongMaterial({
        color: 0x8e8a7d,
        bumpMap	: this.loader.load(moonbump1k),
    })


    planet_mats[2] = new THREE.MeshPhongMaterial({
        map	: this.loader.load(neptunemap),
    })

    function init() {
        //initialize scene, camera and renderer
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 500);
        camera.position.z = 200;
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        //mount the canvas to the correct place...
        document.getElementById("root").children[0].children[0].children[1].appendChild(renderer.domElement);

        //construct the coordinate of lines' heads & tails
        for (let line_index= 0; line_index < LINE_COUNT; line_index++) {
            var x = Math.random() * 400 - 200;
            var y = Math.random() * 200 - 100;
            var z = Math.random() * 500 - 100;
            var xx = x;
            var yy = y;
            var zz = z;
            //line start
            pa[6*line_index] = x;
            pa[6*line_index+1] = y;
            pa[6*line_index+2] = z;
            //line end
            pa[6*line_index+3] = xx;
            pa[6*line_index+4] = yy;
            pa[6*line_index+5] = zz;

            va[2*line_index] = va[2*line_index+1]= 0;
        }

        //define a handy helper for returning random int
        function getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //construct several planets
        for (let planet_index = 0; planet_index < PLANETS_COUNT; planet_index++){
            
            
            planets[planet_index] = new THREE.Mesh( planet_geos[getRandom(0, 3)], planet_mats[Math.round(getRandom(0, 2))] );
            planets[planet_index].position.x = Math.random() * 300 - 150 ;
            planets[planet_index].position.y = Math.random() * 200 - 100 ;
            planets[planet_index].position.z = Math.random() * 200 - 50 ;
            v_p[planet_index] = 0;
            scene.add( planets[planet_index] );
        }

        //debugger;
        let mat = new THREE.LineBasicMaterial({color: 0xffffff});
        let lines = new THREE.LineSegments(geom, mat);

        scene.add(lines);
        

        //handle lights
        var light_1	= new THREE.AmbientLight( 0x222222 )
	    scene.add( light_1 )

        var light	= new THREE.DirectionalLight( 0xffffff, 1.2 )
        light.position.set(50,50,50)
        
        light.castShadow	= true
        light.shadow.camera.near	= 0.01
        light.shadow.camera.far	= 15
        light.shadow.camera.fov	= 45

        light.shadow.camera.left	= -1
        light.shadow.camera.right	=  1
        light.shadow.camera.top	=  1
        light.shadow.camera.bottom= -1

        light.shadow.bias	= 0.001
        light.shadowDarkness	= 0.2

        light.shadow.mapsizeWidth	= 1024
        light.shadow.mapSizeHeight	= 1024
        scene.add( light )
    


        //listen screen resize event
        window.addEventListener("resize", onWindowResize, false);
        animate();
        
    }
    
    // handle canvas resize when stretching window
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // handle animation
    function animate() {
        
        //take care of warp lines movement
        for (let line_index= 0; line_index < LINE_COUNT; line_index++) {
            va[2*line_index] += 0.03; //bump up the velocity by the acceleration amount
            va[2*line_index+1] += 0.025;

            //pa[6*line_index]++;                       //x Start
            //pa[6*line_index+1]++;                     //y
            pa[6*line_index+2] += va[2*line_index];     //z
            //pa[6*line_index+3]++;                     //x End
            //pa[6*line_index+4]                        //y
            pa[6*line_index+5] += va[2*line_index+1];   //z

            if(pa[6*line_index+5] > 200) {
                var z= Math.random() * 200 - 100;
                pa[6*line_index+2] = z;
                pa[6*line_index+5] = z;
                va[2*line_index] = 0;
                va[2*line_index+1] = 0;
            }
        }

        
        //take care of planets movement
        for (let planet_index = 0; planet_index < PLANETS_COUNT; planet_index++){
        
            if(planets[planet_index].position.z >400){
                planets[planet_index].position.z += 2*v_p[planet_index];
            }
            v_p[planet_index] += 0.01;
            planets[planet_index].position.z += v_p[planet_index];
            
            if(planets[planet_index].position.z > 200) {
                var z= Math.random() * 200 - 700;
                planets[planet_index].position.z = z;
                v_p[planet_index] = 0;
            }
            
        }

    
        //pos_stars.needsUpdate = true;
        pos.needsUpdate = true;

        renderer.render(scene,camera);
        requestAnimationFrame(animate);


    }
    
    // animation begin
    init();
        // === THREE.JS EXAMPLE CODE END ===
    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
          )
  }
}


export default ThreeMap;