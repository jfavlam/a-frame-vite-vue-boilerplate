AFRAME.registerComponent("point-in-box", {
  schema: {
    target: { type: "selector" },
  },

  init: function () {},

  tick: function () {
    let el = this.el; // Box
    let target = this.data.target; // Target point

    if (!target) {
      console.warn("point-in-box component requires a target");
      return;
    }

    let box = new THREE.Box3().setFromObject(el.object3D);

    let pointPosition = new THREE.Vector3();
    target.object3D.getWorldPosition(pointPosition);

    if (box.containsPoint(pointPosition)) {
      console.log("Le point est à l'intérieur de la boîte");
    } else {
      console.log("Le point n'est PAS à l'intérieur de la boîte");
    }
  },
});
