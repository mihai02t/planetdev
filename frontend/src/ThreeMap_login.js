
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
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

    //attempt to mock up stars
    //let STAR_COUNT = 800;   //control the density of the stars
    //let geom_stars = new THREE.BufferGeometry();
    //geom_stars.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3*STAR_COUNT), 3));
    //geom_stars.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(1*STAR_COUNT), 1));
    //geom_stars.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(4*STAR_COUNT), 4))
    //geom_stars.setAttribute("size", new THREE.Float32BufferAttribute(new Float32Array(1*STAR_COUNT), 1))
    //let pos_stars = geom_stars.getAttribute("position");
    //let p_sa = pos_stars.array;
    //let vel_stars = geom_stars.getAttribute("velocity");
    //let v_sa = vel_stars.array;
    
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
    
    planet_mats[0] = new THREE.MeshBasicMaterial( {color: 0x660099} );
    planet_mats[1] = new THREE.MeshBasicMaterial( {color: 0x660033} );
    planet_mats[2] = new THREE.MeshBasicMaterial( {color: 0x663399} );

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

        //construct the coordinates of stars
        //for (let star_index = 0; star_index < STAR_COUNT; star_index++) {
        //    var x = Math.random() * 400 - 200;
        //    var y = Math.random() * 200 - 100;
        //    var z = Math.random() * 500 - 250 - 950;
        //    p_sa[3*star_index] = x;
        //    p_sa[3*star_index+1] = y;
        //    p_sa[3*star_index+2] = z;
        //    va[star_index] = 0;
        //}

        //define a handy helper for returning random int
        function getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //construct several planets
        for (let planet_index = 0; planet_index < PLANETS_COUNT; planet_index++){
            
            
            planets[planet_index] = new THREE.Mesh( planet_geos[getRandom(0, 3)], planet_mats[getRandom(0, 3)] );
            planets[planet_index].position.x = Math.random() * 300 - 150 ;
            planets[planet_index].position.y = Math.random() * 200 - 100 ;
            planets[planet_index].position.z = Math.random() * 200 - 50 ;
            v_p[planet_index] = 0;
            scene.add( planets[planet_index] );
        }

        //debugger;
        let mat = new THREE.LineBasicMaterial({color: 0xffffff});
        let lines = new THREE.LineSegments(geom, mat);
        //let stars = new THREE.Points(geom_stars, mat);

        scene.add(lines);
        //scene.add(stars);
        

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
        
        //take care of stars movement
        //for (let star_index = 0; star_index < STAR_COUNT; star_index++){
        //    v_sa[star_index] += 0.03;
        //    p_sa[3*star_index + 2] += v_sa[star_index];
        //    
        //    if(p_sa[3*star_index+2] > 200) {
        //        var z= Math.random() * 200 - 100;
        //        p_sa[3*star_index+2] = z;
        //        v_sa[star_index] = 0;
        //    }
        //}
        
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