//Photo Uploader
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
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

//Download Photos and store photo urls in array
const photoFeed = document.querySelector(".photo-feed");
const photos = firebase.storage().ref("photos/");
photos.listAll().then((result) => {
  result.items.forEach((imageRef) => {
    imageRef
      .getDownloadURL()
      .then((url) => {
        init(url);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//display photos
function init(url) {
  let renderer = new THREE.WebGLRenderer();
  renderer.domElement.classList.add("sphere");
  //to make objects sharper edges you can anti-alias
  //var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);
  //you can set background color
  //renderer.setClearColor(0x140b33, 1);
  photoFeed.appendChild(renderer.domElement);
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
  camera.position.z = 10;
  //   camera.position.set(100, -400, 2000);
  //   adding camera to the scene
  //   scene.add(camera);

  //an object that contains all the vertices and faces of the cube
  //depth, width, height
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry = new THREE.SphereGeometry(5, 32, 32);
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
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;

    renderer.render(scene, camera);
  };
  animate();

  //resize the renderer when window resizes
  function onWindowResize() {
    //set camera fresttrum? ratio
    camera.aspect = (window.innerWidth * 0.6) / (window.innerHeight * 0.6);
    //update camera
    camera.updateProjectionMatrix();
    //set renderer size
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);
  }
  window.addEventListener("resize", onWindowResize);
}
