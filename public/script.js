//TOGGLE
const photoFeed = document.querySelector(".photo-feed");
const playground = document.getElementById("playground");
const feed = document.getElementById("feed");
const toggleBtn = document.getElementById("toggle");

toggleBtn.addEventListener("click", (e) => {
  if (e.target.value === "feed") {
    console.log(document.getElementById("feed").style.display);
    document.getElementById("feed").style.display = "block";
    document.getElementById("playground").style.display = "none";
    document.getElementById("toggle").innerHTML = "Playground";
    document.getElementById("toggle").value = "playground";
  } else {
    document.getElementById("playground").style.display = "block";
    document.getElementById("feed").style.display = "none";
    document.getElementById("toggle").innerHTML = "Feed";
    document.getElementById("toggle").value = "feed";
  }
});

//UPLOAD PHOT TO FIREBASE
window.addEventListener("scroll", () => {
  document.getElementById("fixed-btn").style.display = "block";
});
const progressBar = document.getElementById("uploader");
const uploadBtn = document.getElementById("upload-btn");
uploadBtn.addEventListener("change", (e) => {
  // Get file
  const file = e.target.files[0];
  // Create a storage ref
  const storageRef = firebase.storage().ref("photos/" + file.name);
  // Upload file
  const task = storageRef.put(file);
  // Update progress bar
  task.on(
    "state_changed",
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (snapshot.state === "running") console.log("Upload is running");
      if (snapshot.state === "paused") console.log("Upload is paused");
      if (snapshot.bytesTransferred === snapshot.totalBytes)
        alert("Upload is complete!");
      closeForm();
    },
    function error(err) {
      console.log(err.code);
    }
  );
});
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//DOWNLOAD PHOTOS FROM FIREBASE
const photoURLs = [];
const photos = firebase.storage().ref("photos/");
photos.listAll().then((result) => {
  const photoURLs = [];
  result.items.forEach((imageRef, i) => {
    imageRef
      .getDownloadURL()
      .then((url) => {
        photoURLs.push(url);
        init2(url);
        return photoURLs;
      })
      .then((photoURLs) => {
        if (i === result.items.length - 1) {
          init(photoURLs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//THREE JS CODE FROM HERE
//PLAYGROUND
var container, camera, scene, renderer;
var spheres = [];
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth;
var windowHalfY = window.innerHeight;
document.addEventListener("mousemove", onDocumentMouseMove, false);
//init(photoURLs);
animate();
function init(photoURLs) {
  container = document.createElement("div");
  container.id = "playground";
  photoFeed.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.z = 3;
  camera.focalLength = 3;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  var geometry = new THREE.SphereBufferGeometry(0.1, 32, 16);

  for (var i = 0; i < photoURLs.length; i++) {
    const texture = new THREE.TextureLoader().load(photoURLs[i]);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 10 - 5;
    mesh.position.y = Math.random() * 10 - 5;
    mesh.position.z = Math.random() * 10 - 5;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 3;
    scene.add(mesh);
    spheres.push(mesh);
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth;
  windowHalfY = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
}

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

//FEED
function init2(url) {
  let renderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add("sphere");
  //to make objects sharper edges you can anti-alias
  //var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);

  //you can set background color
  //renderer.setClearColor(0x140b33, 1);
  const feedContainer = document.getElementById("feed");
  feedContainer.appendChild(renderer.domElement);

  //allow you to set up what and where is to be rendered
  //where you place objects, lights and cameras
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  let camera = new THREE.PerspectiveCamera(
    //field of view is the extent of the sene that is seen on the display at any given moment
    //the value is in degrees
    75,
    //aspect ratio
    window.innerWidth / window.innerHeight,
    //near clipping plane
    0.1,
    //far clipping plane
    1000
    //objects further away from the cammera than the value of far or closer than near won't be rendered
  );

  //camera.position.set(0, 20, 100);
  camera.position.z = 10;
  //   camera.position.set(100, -400, 2000);
  //   adding camera to the scene
  //   scene.add(camera);

  //an object that contains all the vertices and faces of the cube
  //depth, width, height
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry = new THREE.SphereGeometry(4, 32, 32);
  //material to colour the cube
  //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('./anish_kapoor.jpg') });

  //to set a texture to material
  const texture = new THREE.TextureLoader().load(url);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  //mesh takes a geometry and applies a material to it
  //cube = new THREE.Mesh(geometry, material);

  let sphere = new THREE.Mesh(geometry, material);

  //insert into scene
  //automatically added to coordinates (0, 0, 0)
  //this causes both camera and cube to be inside each other so move the camera out
  //scene.add(cube);
  scene.add(sphere);

  //ANIMATE THE SPHERE
  const animate = function () {
    //pauses when user navigates to another browser tab
    requestAnimationFrame(animate);

    //will be run every frame and gives rotation animation
    //changes numbers to change speed of rotation
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();

  //resize the renderer when window resizes
  function onWindowResize() {
    //set camera fresttrum? ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    //update camera
    camera.updateProjectionMatrix();
    //set renderer size
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
  }
  window.addEventListener("resize", onWindowResize);
}
