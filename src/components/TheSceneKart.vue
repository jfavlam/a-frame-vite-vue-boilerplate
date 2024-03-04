<script setup>
import { onMounted, ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";

const allAssetsLoaded = ref(false);
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
        id="kart-model"
        src="/assets/cartoonish_go-kart.glb"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-plane
        position="0 0 0"
        rotation="-90 0 0"
        width="30"
        height="30"
        color="#7BC8A4"
      ></a-plane>

      <a-box
        position="0 1 -6"
        rotation="0 45 0"
        color="orange"
        proximity="distance: 3"
        sound="src: #sound-drum; volume: 1.0"
      ></a-box>

      <a-entity
        id="kart"
        gltf-model="#kart-model"
        position="0 0 -3"
        animation="property: position; to: 0 0 -10; dur: 1000; startEvents:
        avancer"
      ></a-entity>
    </template>
    <TheCameraRig />
  </a-scene>
</template>
