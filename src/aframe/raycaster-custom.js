AFRAME.registerComponent("custom-raycaster", {
  schema: {
    distanceNear: { type: "number", default: 1 },
    distanceFar: { type: "number", default: 1000 },
  },

  init: function () {
    // Initialisation
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = this.data.distanceNear;
    this.raycaster.far = this.data.distanceFar;
    this.targets = [];
  },

  update: function () {
    // Mise à jour des distances si elles changent
    this.raycaster.near = this.data.distanceNear;
    this.raycaster.far = this.data.distanceFar;
  },

  tick: function () {
    // Logique à exécuter à chaque frame
    this.updateTargets();
    this.checkIntersections();
  },

  updateTargets: function () {
    // Mettre à jour la liste des cibles basée sur les attributs near/far
    const allElements = Array.from(document.querySelectorAll("[near], [far]"));
    this.targets = allElements.filter((el) => {
      const near = el.getAttribute("near");
      const far = el.getAttribute("far");
      return near <= this.raycaster.far && far >= this.raycaster.near;
    });
  },

  checkIntersections: function () {
    // Vérifier les intersections avec les cibles
    const origin = this.el.object3D.position;
    const direction = this.el.object3D.getWorldDirection(new THREE.Vector3());
    this.raycaster.set(origin, direction);

    const intersects = this.raycaster.intersectObjects(
      this.targets.map((t) => t.object3D),
      true
    );
    // intersects.forEach((intersection) => {
    //   console.log("Intersection:", intersection);
    //   // Traiter l'intersection ici, par exemple en déclenchant un événement
    // });
  },
});

AFRAME.registerComponent("custom-raycaster-distance", {
  schema: {
    objects: { default: "" }, // Sélecteur pour filtrer les objets cliquables
  },

  init: function () {
    this.el.addEventListener("click", this.onClick.bind(this));
  },

  onClick: function (evt) {
    // Obtenez le pointeur vers la caméra ou l'élément qui émet le rayon
    const cameraEl = this.el.sceneEl.camera.el;
    const raycaster = cameraEl.components.raycaster;

    if (raycaster) {
      const intersections = raycaster.getIntersections(this.data.objects);

      intersections.forEach((intersection) => {
        const clickDistance =
          intersection.object.el.getAttribute("click-distance");

        if (
          clickDistance &&
          intersection.distance <= parseFloat(clickDistance)
        ) {
          // L'objet est dans la portée de clic spécifiée
          console.log("Objet cliquable à distance:", intersection.object.el);
          // Ici, vous pouvez déclencher un événement ou une action spécifique
        }
      });
    }
  },
});

AFRAME.registerComponent("raycaster-near", {
  init: function () {
    this.el.setAttribute("raycaster", {
      objects: ".clickable-near",
      far: 4,
    });

    this.el.addEventListener("raycaster-intersected", (evt) => {
      console.log("Objet proche intersecté :", evt.detail.el);
    });
  },
});

AFRAME.registerComponent("raycaster-far", {
  init: function () {
    this.el.setAttribute("raycaster", {
      objects: ".clickable-far",
      far: 400,
    });

    this.el.addEventListener("raycaster-intersected", (evt) => {
      console.log("Objet lointain intersecté :", evt.detail.el);
    });
  },
});
