#deploy using firebase hosting
https://www.youtube.com/watch?v=GzG1hqej7UQ

- go to your directory and run firebase init
- it will create some config files for you and a 404 in your public that you can edit
- put all files you want to deploy in the public folder
- you can initialize a server by running firebase serve
- run firebase init to let firebase know which directory you want to connect
- if you're deploying a single page app, use "dist" as your public directory and configure as a single-page app
  - you then have to run "build" to build the application
  - you'll find a dist folder
- run firebase deploy from root directory
- go to firebase settings and increase deploy history so you have a log of deploys that you can access and rollback if needed

#firebase serve
-run firebase serve to set up server
OR
-yarn start

#firebase storage

- add SDK into script tags
- cors configuration to use images
  https://firebase.google.com/docs/storage/web/download-files
  downloaded gsutil and ran the cors.json file

use for examples and learning
https://github.com/mrdoob/three.js/wiki/Getting-Started
https://stemkoski.github.io/Three.js/
https://aerotwist.com/tutorials/getting-started-with-three-js/
https://yomotsu.github.io/threejs-examples/
https://speckyboy.com/three-js-in-action/
https://discoverthreejs.com/book/first-steps/shapes-transformations/
https://medium.com/@PavelLaptev/three-js-for-beginers-32ce451aabda

https://blog.mastermaps.com/2014/01/photo-spheres-with-threejs.html
examples
https://github.com/mrdoob/three.js/tree/master/examples/js/controls

good article that shows the relationship between renderer and scene

projects using threejs
https://mrdoob.com/
https://experiments.withgoogle.com/collection/chrome

scroll to bottom of page for resources
https://tutorialzine.com/2013/09/20-impressive-examples-for-learning-webgl-with-three-js

Music visualizer
https://github.com/KanteLabs/Music-Visualizer

For presentation:
What challenges did you face?
What did you learn?
What Technologies did you use? Why?
A Demo of your Project

Readme:
https://github.com/matiassingers/awesome-readme
https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
