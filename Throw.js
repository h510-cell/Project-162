AFRAME.registerComponent("bowls", {
  init: function () {
    this.shootBowl();
  },
  shootBowl: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bowl = document.createElement("a-entity");

        bowl.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bowl.setAttribute("dynamic-body",{
          shape:"sphere",
          mass: "0"
        })

        bowl.setAttribute("material", "color", "red");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bowl.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bowl.setAttribute("velocity", direction.multiplyScalar(-9));

        var scene = document.querySelector("#scene");
        bowl.addEventListener("collide",this.removeBowl)
        scene.appendChild(bowl);
      }
    });
  },
  removeBowl: function(e){
    //Bowl element
    var element = e.detail.target.el;
    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("pin")){
      elementHit.setAttribute("material",{
        opacity:0.6,
        transperent: true
      });
      element.removeEventListener("collide",this.bowl)
      var scene = document.querySelector("#scene")
      scene.removeChild(element)

      // Impulse and worldPoint
      var impulse = new CANNON.Vec3(-2,2,1);
      var worldPoint = new CANNON.Vector3().copy(
        elementHit.getAttribute("position")
      )
      elementHit.body.apply.Impulse(impulse,worldPoint);
      element.removeEventListener("collide",this.bowl)
      var scene = document.querySelector("#scene")
      scene.removeChild(element)
    }
  }
});
