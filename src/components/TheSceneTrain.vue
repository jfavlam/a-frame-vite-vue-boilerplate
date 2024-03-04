<script setup>
import { onMounted, ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/day-night-cycle.js";

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    xr-mode-ui="XRMode: xr"
    _day-night-cycle="duration: 10000"
    fog="type: linear; color: #AAA; near: 10; far: 20"
  >
    <a-assets @loaded="allAssetsLoaded = true" id="all-loaded">
      <img id="sky" src="/assets/sky.png" />
      <a-mixin id="fog_material" material="fog: false"></a-mixin>
      <a-mixin id="sky_material" material="src: #sky"></a-mixin>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-box
        position="0 1 -6"
        rotation="0 45 0"
        color="teal"
        proximity="distance: 3"
      ></a-box>

      <!-- <a-sky mixin="sky_material fog_material"> </a-sky> -->
      <a-sky src="#sky" material="fog: false"> </a-sky>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
