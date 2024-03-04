AFRAME.registerComponent("day-night-cycle", {
  schema: {
    duration: { type: "number", default: 24000 },
    dayColor: { type: "string", default: "#FFD700" },
    nightColor: { type: "string", default: "#001D3D" },
  },
  init: function () {
    this.elapsedTime = 0;
  },
  tick: function (time, timeDelta) {
    this.elapsedTime += timeDelta;
    let cycleFraction =
      (this.elapsedTime % this.data.duration) / this.data.duration;

    const smoothFraction = 0.5 * (1 - Math.cos(Math.PI * 2 * cycleFraction));

    const dayIntensity = 1.0;
    const nightIntensity = 0.1;

    const currentColor = this.lerpColor(
      this.data.dayColor,
      this.data.nightColor,
      smoothFraction
    );
    const currentIntensity = this.lerp(
      dayIntensity,
      nightIntensity,
      smoothFraction
    );

    // Interpolate values
    const lightElement = this.el.sceneEl.querySelector("a-light");
    if (lightElement) {
      lightElement.setAttribute("color", currentColor);
      lightElement.setAttribute("intensity", currentIntensity.toString());
    }
    this.el.sceneEl.setAttribute("background", "color", currentColor);
  },

  lerp: function (start, end, fraction) {
    return start + (end - start) * fraction;
  },

  lerpColor: function (color1, color2, fraction) {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    const result = c1.lerp(c2, fraction);
    return "#" + result.getHexString();
  },
});
