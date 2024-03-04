<script setup>
import { onMounted, ref } from "vue";

import TheCameraRigBoat from "./TheCameraRigBoat.vue";

import "../aframe/clickable.js";
import "../aframe/teleport-camera-rig.js";
import "../aframe/listen-to.js";
import "../aframe/teleport-object.js";

const allAssetsLoaded = ref(false);

//Variables de base (pos: 20000; rot: 22000)
const vitessePos = 20000 / 2;
const vitessRot = 22000 / 2;
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
    <a-assets @loaded="allAssetsLoaded = true" id="all-loaded"> </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- <a-entity
      gltf-model="#boatDock"
      position="-45 -1 -68"
      scale="7 7 7"
      rotation="0 170 0"
    ></a-entity>
 -->
      <a-box
        id="spawn-boat"
        position="0.1 -0.5 -6.5"
        rotation="0 190 0"
        color="orange"
      ></a-box>
      <a-box
        id="wooden-sign-el"
        position="-2 0.75 -6.5"
        rotation="0 -45 0"
        color="red"
        clickable
        teleport-camera-rig="x:0.1; y: 0; z: -5"
      ></a-box>

      <a-box
        id="wooden-sign-el-arrival"
        rotation="0 -45 0"
        position="10 0 -10"
        color="green"
        clickable
        teleport-camera-rig="x:0.1; y: 0; z: -5"
      ></a-box>

      <!-- <a-entity birds-position></a-entity> -->

      <!--Bateau-->
      <a-box
        id="boat"
        position="0.1 -0.5 -6.5"
        rotation__1="0 190 0"
        listen-to="target: #wooden-sign-el; event: click; emit: boat-sail"
        :animation__1="`property: position; to: 0.1 0 -14 ; dur: ${vitessePos}; startEvents: boat-sail`"
        :animation__1b="`property: null; to: 0 260 0; startEvents: boat-sail; dur: ${vitessRot}`"
        :animation__2="`property: position; to: -20  0 -20; dur: ${vitessePos}; startEvents: animationcomplete__1`"
        :animation__2b="`property: null; to: 0 180 0; startEvents: animationcomplete__1; dur: ${vitessRot}`"
        :animation__3="`property: position; to: -20 0 -38; dur: ${vitessePos}; startEvents: animationcomplete__2`"
        :animation__3b="`property: null; to: 0 260 0; startEvents: animationcomplete__2; dur: ${vitessRot}`"
        :animation__4="`property: position; to: -45 0 -40; dur: ${vitessePos}; startEvents: animationcomplete__3`"
        :animation__4b="`property: null; to: 0 190 0; startEvents: animationcomplete__3; dur: ${vitessRot}`"
        :animation__5="`property: position; to: -47 0 -66; dur: ${vitessePos}; startEvents: animationcomplete__4`"
        listen-to__2="target: #wooden-sign-el-arrival; event: click; emit: teleport-object"
        animation_x="property: position; to: 0.1 -0.5 -6.5; startEvents: teleport-object"
      ></a-box>

      <!-- <a-box color="blue" position="0.1 -0.5 -15" ></a-box>
    <a-box color="blue" position="-20 -0.5 -20"></a-box>
    <a-box color="blue" position="-20 -0.5 -38" ></a-box>
    <a-box color="blue" position="-45 -0.5 -40" ></a-box>
    <a-box color="blue" position="-47 -0.5 -66" ></a-box> -->
    </template>
    <TheCameraRigBoat />
  </a-scene>
</template>
