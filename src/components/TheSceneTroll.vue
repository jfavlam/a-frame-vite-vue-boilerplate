<script setup>
import { onMounted, ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/proximity.js";

const allAssetsLoaded = ref(false);

// const troll = ref(null);

// onMounted(() => {
//   if (troll.value) {
//     console.log("TROLL");
//     troll.value.addEventListener("prox-in", function (evt) {
//       console.log("L'utilisateur est entré dans la zone de proximité.");
//     });

//     troll.value.addEventListener("prox-out", function (evt) {
//       console.log("L'utilisateur est sorti de la zone de proximité.");
//     });
//   }
// });
</script>

<template>
  <a-scene
    background="color: SteelBlue;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    xr-mode-ui="XRMode: xr"
  >
    <a-assets @loaded="allAssetsLoaded = true" id="all-loaded">
      <a-asset-item
        id="sound-1"
        response-type="arraybuffer"
        src="assets/sound1.mp3"
        preload="auto"
      ></a-asset-item>
      <a-asset-item
        id="sound-ambiance"
        response-type="arraybuffer"
        src="assets/3.wav"
        preload="auto"
      ></a-asset-item>
      <a-asset-item
        id="sound-drum"
        response-type="arraybuffer"
        src="assets/2.wav"
        preload="auto"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- <a-entity
        sound="src: #sound-1; volume:1; loop: true; autoplay: true; positional: false"
      ></a-entity> -->
      <a-entity
        sound="src: #sound-ambiance; volume: 1.0; autoplay: true; positional: false; loop: true"
      ></a-entity>
      <a-entity camera look-controls position="0 1.6 0"></a-entity>
      <a-box
        position="0 1 -6"
        rotation="0 45 0"
        color="purple"
        proximity="distance: 3"
        sound="src: #sound-drum; volume: 1.0"
      ></a-box>
    </template>
    <!-- <TheCameraRig /> -->
  </a-scene>
</template>
