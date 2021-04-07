import React, { Component } from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import galaxy_starfield from '../assets/galaxy_starfield.png'
//import earthmap1k from './MainPage/ThreeAssets/earthmap1k.jpg'
//import earthbump1k from './MainPage/ThreeAssets/earthbump1k.jpg'
//import earthspec1k from './MainPage/ThreeAssets/earthspec1k.jpg'
//import earthcloudmap from './MainPage/ThreeAssets/earthcloudmap.jpg'
//import earthcloudmaptrans from './MainPage/ThreeAssets/earthcloudmaptrans.jpg'
import earthmap1k from '../assets/earthmap1k.jpg'
import earthbump1k from '../assets/earthbump1k.jpg'
import earthspec1k from '../assets/earthspec1k.jpg'
import earthcloudmap from '../assets/earthcloudmap.jpg'
import earthcloudmaptrans from '../assets/earthcloudmaptrans.jpg'

import moonmap1k from '../assets/moonmap1k.jpg'
import moonbump1k from '../assets/moonbump1k.jpg'

import marsmap1k from '../assets/marsmap1k.jpg'
import marsbump1k from '../assets/marsbump1k.jpg'

import jupitermap from '../assets/jupitermap.jpg'


const style = {
    display:'block',
    height: document.documentElement.clientHeight, // we can control scene size by setting container dimensions
    width: document.documentElement.clientWidth

};

class ThreeMap extends Component {
    [x: string]: any;
    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    // Standard scene setup in Three.js
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        
        this.scene = new THREE.Scene();

        //initialize camera
        this.camera = new THREE.PerspectiveCamera(
            45, // fov = field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            0.01, // near plane
            1000, // far plane
            
        );
        this.camera.position.z = 2.0; // is used here to set some distance from a cube that is located at z = 0

        //initialize ctrls and renders
        this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer	= new THREE.WebGLRenderer({
            antialias	: true
        });
        this.renderer.shadowMap.enabled	= true
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref
    };

    //a custom helper for generating clouds
    createEarthCloud = () => {
        // create destination canvas
        var canvasResult	= document.createElement('canvas')
        canvasResult.width	= 1024
        canvasResult.height	= 512
        var contextResult	= canvasResult.getContext('2d') as CanvasRenderingContext2D;
    
        // load earthcloudmap
        var imageMap	= new Image();
        imageMap.addEventListener("load", function() {
            
            // create dataMap ImageData for earthcloudmap
            var canvasMap	= document.createElement('canvas')
            canvasMap.width	= imageMap.width
            canvasMap.height= imageMap.height
            var contextMap	= canvasMap.getContext('2d') as CanvasRenderingContext2D;
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)
    
            // load earthcloudmaptrans
            var imageTrans	= new Image();
            imageTrans.addEventListener("load", function(){
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans		= document.createElement('canvas')
                canvasTrans.width	= imageTrans.width
                canvasTrans.height	= imageTrans.height
                var contextTrans	= canvasTrans.getContext('2d') as CanvasRenderingContext2D
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
                for(var y = 0, offset = 0; y < imageMap.height; y++){
                    for(var x = 0; x < imageMap.width; x++, offset += 4){
                        dataResult.data[offset+0]	= dataMap.data[offset+0]
                        dataResult.data[offset+1]	= dataMap.data[offset+1]
                        dataResult.data[offset+2]	= dataMap.data[offset+2]
                        dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult,0,0)	
                if(material.map)
                    material.map.needsUpdate = true;
            })
            imageTrans.src	= earthcloudmaptrans;
        }, false);
        imageMap.src	= earthcloudmap;
    
        var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
        var material	= new THREE.MeshPhongMaterial({
            map		: new THREE.Texture(canvasResult),
            side		: THREE.DoubleSide,
            transparent	: true,
            opacity		: 0.8,
        }) as THREE.MeshPhongMaterial;

        var mesh	= new THREE.Mesh(geometry, material)
        return mesh	
    }

    //a custom helper for generating glowing atmosphere
    createAtmosphereMaterial = () => {
        var vertexShader	= [
            'varying vec3	vVertexWorldPosition;',
            'varying vec3	vVertexNormal;',
    
            'void main(){',
            '	vVertexNormal	= normalize(normalMatrix * normal);',
    
            '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',
    
            '	// set gl_Position',
            '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
            '}',
    
            ].join('\n')
        var fragmentShader	= [
            'uniform vec3	glowColor;',
            'uniform float	coeficient;',
            'uniform float	power;',
    
            'varying vec3	vVertexNormal;',
            'varying vec3	vVertexWorldPosition;',
    
            'void main(){',
            '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
            '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
            '	viewCameraToVertex	= normalize(viewCameraToVertex);',
            '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
            '	gl_FragColor		= vec4(glowColor, intensity);',
            '}',
        ].join('\n')
    
        // create custom material from the shader code above
        //   that is within specially labeled script tags
        var material	= new THREE.ShaderMaterial({
            uniforms: { 
                coeficient	: {
                    value	: 1.0
                },
                power		: {
                    value	: 2
                },
                glowColor	: {
                    value	: new THREE.Color('pink')
                },
            },
            vertexShader	: vertexShader,
            fragmentShader	: fragmentShader,
            //blending	: THREE.AdditiveBlending,
            transparent	: true,
            depthWrite	: false,
        });
        return material
    }

    createMoon = () => {
        
        var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
        var material	= new THREE.MeshPhongMaterial({
            map	: this.loader.load(moonmap1k),
            bumpMap	: this.loader.load(moonbump1k),
            bumpScale: 0.002,
        })
        var mesh	= new THREE.Mesh(geometry, material)
        return mesh	
    }

    //responsible for generating earth
    createEarth = () => {
        this.containerEarth	= new THREE.Object3D()
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshPhongMaterial( {
            //add earth base map

            map : this.loader.load(earthmap1k),
            //add earth bump map
            bumpMap : this.loader.load(earthbump1k),
            bumpScale	: 0.05,

            //add earth specular map
            specularMap : this.loader.load(earthspec1k),

            
        } );
        //add earth mesh
        this.earthMesh = new THREE.Mesh( geometry, material );
        this.earthMesh.receiveShadow = true
	    this.earthMesh.castShadow = true
        this.containerEarth.add( this.earthMesh );
        //add earth cloud mesh
        this.cloudMesh	= this.createEarthCloud();
        this.cloudMesh.receiveShadow	= true
	    this.cloudMesh.castShadow	= true
        this.containerEarth.add( this.cloudMesh )

        //add atmosphere mesh
        var atmosphere_geometry	= new THREE.SphereGeometry(0.5, 32, 32)
        var atmosphere_material	= this.createAtmosphereMaterial()
        atmosphere_material.uniforms.glowColor.value.set(0x00b3ff)
        atmosphere_material.uniforms.coeficient.value	= 0.8
        atmosphere_material.uniforms.power.value		= 2.0
        var mesh	= new THREE.Mesh(atmosphere_geometry, atmosphere_material );
        mesh.scale.multiplyScalar(1.01);
        this.containerEarth.add( mesh );

        //add atmosphere glow
        atmosphere_geometry	= new THREE.SphereGeometry(0.49, 32, 32)
        atmosphere_material	= this.createAtmosphereMaterial()
	    atmosphere_material.side	= THREE.BackSide
	    atmosphere_material.uniforms.glowColor.value.set(0x00b3ff)
	    atmosphere_material.uniforms.coeficient.value	= 0.4
        atmosphere_material.uniforms.power.value		= 4.0
	    mesh	= new THREE.Mesh(atmosphere_geometry, atmosphere_material );
	    mesh.scale.multiplyScalar(1.15);
        this.containerEarth.add( mesh );
        this.scene.add(this.containerEarth)

        //add satellite: moon
        this.moonMesh	= this.createMoon()
        this.moonMesh.position.set(0.5,0.5,0.5)
        this.moonMesh.scale.multiplyScalar(1/5)
        this.moonMesh.receiveShadow	= true
        this.moonMesh.castShadow	= true
        this.containerEarth.add(this.moonMesh)
    }

    //responsible for generating mars
    createMars = () => {
        
        var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	    var material	= new THREE.MeshPhongMaterial({
            map	: this.loader.load(marsmap1k),
            bumpMap	: this.loader.load(marsbump1k),
            bumpScale: 0.005,
	    })
	    var mesh	= new THREE.Mesh(geometry, material)
	    return mesh	
        
    }

    //responsible for generating jupiter
    createJupiter = () => {
        var geometry = new THREE.SphereGeometry(0.5, 32, 32)
	    var material = new THREE.MeshPhongMaterial({
            map	: this.loader.load(jupitermap),
            bumpMap	: this.loader.load(jupitermap),
            bumpScale: 0.02,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh	
    }

    //responsible for generating the starfield
    createStarField = () => {
        var geometry  = new THREE.SphereGeometry(900, 32, 32)
        // create the material, using a texture of startfield
        var material  = new THREE.MeshBasicMaterial({
            map   : this.loader.load(galaxy_starfield),
            side  : THREE.BackSide
        })
           
        // create the mesh based on geometry and material
        var mesh  = new THREE.Mesh(geometry, material)
        this.scene.add( mesh )
    }


    //handle lights
    lightHandler = () => {
        
        var light_1	= new THREE.AmbientLight( 0x222222 )
	    this.scene.add( light_1 )

        var light	= new THREE.DirectionalLight( 0xffffff, 1.2 )
        light.position.set(50,50,50)
        
        light.castShadow	= true
        light.shadow.camera.near	= 0.01
        light.shadow.camera.far	= 15
        // light.shadow.camera.fov	= 45

        light.shadow.camera.left	= -1
        light.shadow.camera.right	=  1
        light.shadow.camera.top	=  1
        light.shadow.camera.bottom= -1

        light.shadow.bias	= 0.001
        // light.shadowDarkness	= 0.2

        // light.shadow.mapsizeWidth	= 1024
        // light.shadow.mapSizeHeight	= 1024
        light.shadow.mapSize = new THREE.Vector2(1024, 1024);
        this.scene.add( light )
    }

    //main scene constructor
    addCustomSceneObjects = () => {
        this.loader = new THREE.TextureLoader();  
        this.lightHandler();
        this.createEarth();
        this.createStarField();

        //create Mars
        this.marsMesh = this.createMars();
        this.marsMesh.position.set(0,0,2.0)
        this.marsMesh.scale.multiplyScalar(3/5)
        this.marsMesh.receiveShadow	= true
        this.marsMesh.castShadow	= true
        this.scene.add(this.marsMesh)

        //create Jupiter
        this.jupiterMesh = this.createJupiter();
        this.jupiterMesh.position.set(0,0,3.5)
        this.jupiterMesh.scale.multiplyScalar(6/5)
        this.jupiterMesh.receiveShadow	= true
        this.jupiterMesh.castShadow	= true
        this.scene.add(this.jupiterMesh)

        //create camera orbit
        this.curve = new THREE.CatmullRomCurve3( [
            //start point
            new THREE.Vector3(-10, 0, 10),
            
            //middle breakpoints
            new THREE.Vector3(-5,10,-10),
            new THREE.Vector3(2, 5, -5),
            
            //endpoint
            new THREE.Vector3(10, 0, 10),
          ],
            true,
        );

        let curve_geom = new THREE.BufferGeometry();
		// 初始化曲线的顶点(放样点，数值越大弯曲更光滑)
        // curve_geom.__arcLengthDivisions = 1000;
		// curve_geom.vertices = this.curve.getSpacedPoints(100);
		let curve_mat = new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(Math.random(),0.5,0.5) });
		let curveObject = new THREE.Line(curve_geom, curve_mat);
		this.scene.add(curveObject);
				
    };

    startAnimationLoop = () => {
        //handle earth & earth mesh movement
        this.earthMesh.rotation.y += 1/16 * 0.01;
        this.cloudMesh.rotation.y  += 1/16 * 0.02
        
        //handle the movement of other planets
        this.moonMesh.rotation.y += 1/16 * 0.02;
        this.marsMesh.rotation.y += 1/16 * 0.03;
        this.jupiterMesh.rotation.y += 1/16 * 0.01;
       
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

//these are also react parts...
class Container extends React.Component {
    state = {isMounted: true};

    render() {
        const {isMounted = true} = this.state;
        return (
            <>
                <button onClick={() => this.setState(state => ({isMounted: this.state.isMounted}))}>
                    {isMounted ? "Unmount" : "Mount"}
                </button>
                {isMounted && <ThreeMap />}
                {isMounted && <div>Scroll to zoom, drag to rotate</div>}
            </>
        )
    }
}

export default ThreeMap;
