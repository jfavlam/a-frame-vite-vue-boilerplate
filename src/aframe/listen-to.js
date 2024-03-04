AFRAME.registerComponent("listen-to", {
  multiple: true,

  schema: {
    target: { type: "selector" },
    event: { type: "string", default: "click" },
    emit: { type: "string", default: "click" },
  },

  init: function () {
    this.onEvent = this.onEvent.bind(this);
    this.data.target.addEventListener(this.data.event, this.onEvent);
  },

  onEvent: function () {
    this.el.emit(this.data.emit);
    console.log(this.data.emit);
    // if (this.el.getAttribute("id") === "boat") {
    //   console.log(this.el);
    //   this.el.setAttribute("position", "0.1 -0.5 -6.5");
    // }
  },

  update: function (oldData) {
    if (
      oldData.target != this.data.target ||
      oldData.event != this.data.event
    ) {
      if (oldData.target)
        oldData.target.removeEventListener(oldData.event, this.onEvent);
      this.data.target.addEventListener(this.data.event, this.onEvent);
    }
  },

  remove: function () {
    this.data.target.removeEventListener(this.data.event, this.onEvent);
  },
});
