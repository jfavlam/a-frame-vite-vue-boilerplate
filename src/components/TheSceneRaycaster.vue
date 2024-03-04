<script setup>
import { ref } from "vue";

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
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>

    <template v-if="allAssetsLoaded">
      <a-box
        class="clickable-near"
        position="-4 0 -4"
        color="red"
        _clickable
      ></a-box>
      <a-box
        class="clickable-far"
        position="-4 0 -40"
        color="blue"
        _clickable
      ></a-box>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
