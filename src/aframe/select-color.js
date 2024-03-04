AFRAME.registerComponent("select-color", {
  schema: {
    color: { type: "color", default: "black" },
  },

  init: function () {
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.el.addEventListener("mouseenter", this.onEnter);
    this.el.addEventListener("mouseleave", this.onLeave);
  },

  onEnter: function (evt) {
    const cursor = evt.detail.cursorEl;

    if (cursor.getAttribute("raycaster").showLine) {
      this.savedColor = cursor.getAttribute("raycaster").lineColor;
      cursor.setAttribute("raycaster", "lineColor", this.data.color);
      cursor.setAttribute("raycaster", "near", 0.4);
      cursor.setAttribute("raycaster", "far", 1);
    } else {
      this.savedColor = cursor.getAttribute("material").color;
      cursor.setAttribute("material", "color", this.data.color);
      cursor.setAttribute("raycaster", "near", 0.4);
      cursor.setAttribute("raycaster", "far", 1);
      console.log(this.el);
    }
  },

  onLeave: function (evt) {
    const cursor = evt.detail.cursorEl;
    if (cursor.getAttribute("raycaster").showLine) {
      cursor.setAttribute("raycaster", "lineColor", this.savedColor);
    } else {
      cursor.setAttribute("material", "color", this.savedColor);
    }
  },

  remove: function () {
    this.el.removeEventListener("mouseenter", this.onEnter);
    this.el.removeEventListener("mouseleave", this.onLeave);
  },
});
