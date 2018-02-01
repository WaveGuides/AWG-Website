/*
The MIT License

Copyright © 2010-2018 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// Based on source:
// https://github.com/mrdoob/three.js/blob/dev/examples/canvas_interactive_particles.html

var mouseX = 0, mouseY = 0,

windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,

SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,

camera, scene, renderer;

init();
animate();

function init() {
  var container, separation = 100, amountX = 50, amountY = 50,
  particles, particle;

  container = document.createElement('div');
  container.setAttribute("id","background");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 100;

  scene = new THREE.Scene();

  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor( 0xffd902, 1 );
          renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // particles

  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial( {

    color: 0x00843D,
    program: function ( context ) {

      context.beginPath();
      context.arc( 0, 0, 0.25, 0, PI2, true );
      context.fill();

    }

  } );

          var material2 = new THREE.SpriteCanvasMaterial( {

              color: 0xffd902,
              program: function ( context ) {

                  context.beginPath();
                  context.arc( 0, 0, 0, 0, PI2, true );
                  context.fill();

              }

          } );

  var geometry = new THREE.Geometry();

  for ( var i = 0; i < 10; i ++ ) {

    particle = new THREE.Sprite( material );
              var x = Math.random() * 2 - 1;
              var y = Math.random() * 2 - 1;
              var z = Math.random() * 2 - 1;

    particle.position.x = x;
    particle.position.y = y;
    particle.position.z = z;
    particle.position.normalize();
    particle.position.multiplyScalar( Math.random() * 10 + 450 );
    particle.scale.x = particle.scale.y = 10;
    scene.add( particle );

              geometry.vertices.push( particle.position );
              
              // Cutout
              particle2 = new THREE.Sprite( material2 );
              particle2.position.x = x;
              particle2.position.y = y;
              particle2.position.z = z;
              //particle2.position.normalize();
              particle2.position.multiplyScalar( Math.random() * 10 + 450 );
              particle2.scale.x = particle2.scale.y = 8;
              scene.add( particle2 );

              geometry.vertices.push( particle2.position );

              // Cutout
              particle3 = new THREE.Sprite( material2 );
              particle3.position.x = z;
              particle3.position.y = x;
              particle3.position.z = y;
              //particle2.position.normalize();
              particle3.position.multiplyScalar( Math.random() * 10 + 450 );
              particle3.scale.x = particle3.scale.y = 8;
              scene.add( particle2 );

              geometry.vertices.push( particle3.position );

  }

  // lines

  var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00843D, opacity: 0.5 } ) );
  scene.add( line );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // Don't prevent scrolling on mobile devices
  //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  //document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

  if ( event.touches.length > 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}