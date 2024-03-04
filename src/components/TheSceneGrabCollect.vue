<script setup>
import { onMounted, ref } from "vue";
import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/look-at.js";

import "../aframe/bind-position.js";
import "../aframe/bind-rotation.js";
import "../aframe/copy-position.js";
import "../aframe/copy-rotation.js";
import "../aframe/select-color.js";
import "../aframe/point-in-box.js";

import "../aframe/event-set.js";

const allAssetsLoaded = ref(false);

const sceneText = ref("Grab demo");
const sceneTextColor = "white";

function grabItem(evt) {
  // if something already grabbed, switch it
  const el = evt.target;

  const grabbedEl = document.querySelector("[data-grabbed]");
  if (grabbedEl) {
    grabbedEl.removeAttribute("bind-position");
    grabbedEl.removeAttribute("bind-rotation");
    grabbedEl.setAttribute("copy-position", `target: #${el.id}`);
    grabbedEl.setAttribute("copy-rotation", `target: #${el.id}`);

    delete grabbedEl.dataset.grabbed;
    delete grabbedEl.dataset.dropped;

    if (el.dataset.dropped) {
      grabbedEl.dataset.dropped = el.dataset.dropped;
    }
  }
  el.removeAttribute("copy-position");
  el.removeAttribute("copy-rotation");

  sceneText.value = `Drop to ${el.getAttribute("color")} zone`;

  if (el.sceneEl.is("vr-mode")) {
    el.setAttribute("bind-position", "target: #hand-right");
    el.setAttribute("bind-rotation", "target: #hand-right");
  } else {
    el.setAttribute("bind-position", "target: #dummy-hand-right");
    el.setAttribute(
      "bind-rotation",
      "target: #dummy-hand-right; convertToLocal: true"
    );
  }
  el.dataset.grabbed = true;
  delete el.dataset.dropped;
}

function dropItem(evt) {
  const grabbedEl = document.querySelector("[data-grabbed]");
  // if nothing grabbed, return
  if (!grabbedEl) return;

  const dropZoneId = evt.target.id;
  grabbedEl.setAttribute("bind-position", `target: #${dropZoneId};`);
  grabbedEl.setAttribute("bind-rotation", `target: #${dropZoneId};`);

  const grabbedItemColor = grabbedEl.getAttribute("color");
  const targetZoneColor = evt.target.getAttribute("color");

  console.log(evt.target);

  console.log(`${grabbedItemColor} cube | ${targetZoneColor} zone`);

  if (grabbedItemColor === targetZoneColor) sceneText.value = "Grab a cube";
  else
    sceneText.value = `The ${grabbedItemColor} cube is not in the right place…`;

  delete grabbedEl.dataset.grabbed;

  // if something was in the drop zone, grab it
  const elInDropZone = document.querySelector(`[data-dropped="${dropZoneId}"]`);
  if (elInDropZone) {
    grabItem({ target: elInDropZone });
  }

  grabbedEl.dataset.dropped = dropZoneId;
}
</script>

<template>
  <a-scene
    background="color: #212F3C;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    xr-mode-ui="XRMode: xr"
  >
    <a-assets @loaded="allAssetsLoaded = true" id="all-loaded"> </a-assets>

    <template v-if="allAssetsLoaded">
      <a-entity
        :text="`value:${sceneText}; color: ${sceneTextColor}; align: center; width: 8`"
        position="0 1.8 -6"
        look-at
      ></a-entity>

      <a-box
        id="box-a"
        position="-4 0 -6"
        rotation="0 45 0"
        color="red"
        clickable
        @click="(evt) => grabItem(evt)"
      ></a-box>
      <a-box
        id="box-b"
        position="0 0 -6"
        rotation="0 45 0"
        color="green"
        clickable
        @click="(evt) => grabItem(evt)"
      ></a-box>
      <a-box
        id="box-c"
        position="4 0 -6"
        rotation="0 45 0"
        color="blue"
        clickable
        @click="(evt) => grabItem(evt)"
      ></a-box>

      <a-box
        id="drop-a"
        material="color: red; side: double; opacity: 0.25"
        position="-6 -0.2 -2"
        width="2"
        height="0.2"
        depth="2"
        clickable
        @click="(evt) => dropItem(evt)"
      ></a-box>
      <a-box
        id="drop-b"
        material="color: green; side: double; opacity: 0.25"
        position="0 -0.2 -2"
        rotation="0 45 0"
        width="2"
        height="0.2"
        depth="2"
        clickable
        @click="(evt) => dropItem(evt)"
      ></a-box>
      <a-box
        id="drop-c"
        material="color: blue; side: double; opacity: 0.25"
        position="6 -0.2 -2"
        width="2"
        height="0.2"
        depth="2"
        clickable
        @click="(evt) => dropItem(evt)"
      ></a-box>

      <a-box
        color="yellow"
        position="0 0.8 -10"
        point-in-box="target: #desktop-hand-right"
      >
      </a-box>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
