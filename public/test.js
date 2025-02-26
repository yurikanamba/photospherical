var container, camera, scene, renderer, effect;

var spheres = [];

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth;
var windowHalfY = window.innerHeight;

document.addEventListener("mousemove", onDocumentMouseMove, false);

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.z = 3;
  camera.focalLength = 3;

  //   var path = "textures/cube/pisa/";
  //   var format = ".png";
  //   var urls = [
  //     path + "px" + format,
  //     path + "nx" + format,
  //     path + "py" + format,
  //     path + "ny" + format,
  //     path + "pz" + format,
  //     path + "nz" + format,
  //   ];

  //var textureCube = new THREE.CubeTextureLoader().load(urls);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  //scene.background = textureCube;

  var geometry = new THREE.SphereBufferGeometry(0.1, 32, 16);
  var material = new THREE.MeshBasicMaterial({
    color: "red",
  });

  for (var i = 0; i < 500; i++) {
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = Math.random() * 10 - 5;
    mesh.position.y = Math.random() * 10 - 5;
    mesh.position.z = Math.random() * 10 - 5;

    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

    scene.add(mesh);

    spheres.push(mesh);
  }

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //   var width = window.innerWidth || 2;
  //   var height = window.innerHeight || 2;

  //   effect = new AnaglyphEffect(renderer);
  //   effect.setSize(width, height);

  //

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth;
  windowHalfY = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  var timer = 0.0001 * Date.now();

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  for (var i = 0, il = spheres.length; i < il; i++) {
    var sphere = spheres[i];

    sphere.position.x = 5 * Math.cos(timer + i);
    sphere.position.y = 5 * Math.sin(timer + i * 1.1);
  }

  renderer.render(scene, camera);
}
