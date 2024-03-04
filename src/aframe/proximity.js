AFRAME.registerComponent("proximity", {
  schema: {
    distance: { type: "number", default: 2 },
  },
  init: function () {
    this.inside = false;
  },
  tick: function () {
    if (!this.el.sceneEl.camera || !this.el.sceneEl.camera.el) return;

    const cameraEl = this.el.sceneEl.camera && this.el.sceneEl.camera.el;
    if (!cameraEl) return;

    let distance = this.el.object3D.position.distanceTo(
      cameraEl.object3D.position
    );
    // console.log("Distance:", distance);

    if (distance <= this.data.distance && !this.inside) {
      console.log("In");
      this.inside = true;
      this.el.components.sound.playSound();
    } else if (distance > this.data.distance && this.inside) {
      console.log("Out");
      this.inside = false;
      this.el.components.sound.stopSound();
    } else {
    }
  },
});
