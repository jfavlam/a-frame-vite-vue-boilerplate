/**Ne marche que si l'entité n'est pas enfant d'une autre entité**/

AFRAME.registerComponent("teleport-object", {
  schema: {
    on: { type: "string", default: "click" },
    x: { type: "number", default: 0 },
    y: { type: "number", default: 0 },
    z: { type: "number", default: 0 },
    rotationy: { type: "number", default: 0 },
  },
  init: function () {
    this.onEvent = this.onEvent.bind(this);
    this.el.addEventListener(this.data.on, this.onEvent);
  },
  onEvent: function () {
    this.el.object3D.position.x = this.data.x;
    this.el.object3D.position.y = this.data.y;
    this.el.object3D.position.z = this.data.z;
    this.el.object3D.rotationy.y = this.data.rotationy;
  },

  remove: function () {
    this.el.removeEventListener(this.data.on, this.onEvent);
  },
});
