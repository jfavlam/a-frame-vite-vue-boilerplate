<script setup>
import { ref } from "vue";
import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/look-at.js";

const allAssetsLoaded = ref(false);

const sceneText = ref('"Fake grab" demo');
const sceneTextColor = "white";
let itemsInHand = 0;

function getItem(evt) {
  console.log("Get item");

  const item = evt.target;
  const targetElm = document.getElementById(item.getAttribute("data-target"));

  targetElm.setAttribute("visible", true);

  item.setAttribute("visible", false);
  item.removeAttribute("clickable");
  item.removeEventListener("click", this.getItem);

  itemsInHand += 1;
  sceneText.value = `Items in hand: ${itemsInHand}`;
}

function dropItems(evt) {
  if (itemsInHand <= 0) return;

  console.log("Drop items");

  const dropArea = evt.target;
  const dropAreaTargets = dropArea.children;

  for (let i = 0, l = dropAreaTargets.length; i < l; i++) {
    const handElm = document.getElementById(
      dropAreaTargets[i].getAttribute("data-target")
    );

    // Check that item is "visible" in teh hand
    if (handElm.getAttribute("visible") === true) {
      dropAreaTargets[i].setAttribute("visible", true);
      handElm.setAttribute("visible", false);
    }
  }

  itemsInHand = 0;
  sceneText.value = `Items in hand: ${itemsInHand}`;
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
      <!-- Items -->
      <a-box
        id="cherry-1"
        position="-4 0 -6"
        rotation="0 45 0"
        color="red"
        clickable
        data-target="cherry-hand-1"
        @click="(evt) => getItem(evt)"
      ></a-box>
      <a-box
        id="cherry-2"
        position="0 0 -6"
        rotation="0 45 0"
        color="green"
        clickable
        data-target="cherry-hand-2"
        @click="(evt) => getItem(evt)"
      ></a-box>
      <a-box
        id="cherry-3"
        position="4 0 -6"
        rotation="0 45 0"
        color="blue"
        clickable
        data-target="cherry-hand-3"
        @click="(evt) => getItem(evt)"
      ></a-box>
      <!-- Drop area -->
      <a-box
        id="drop-area"
        material="color: yellow; side: double; opacity: 0.25"
        position="0 -0.2 -10"
        rotation="0 45 0"
        width="2"
        height="0.2"
        depth="2"
        clickable
        @click="(evt) => dropItems(evt)"
      >
        <a-box
          id="drop-area-1"
          position="-0.5 0.25 -0.5"
          width="0.5"
          height="0.5"
          depth="0.5"
          color="red"
          visible="false"
          data-target="cherry-hand-1"
        >
        </a-box>
        <a-box
          id="drop-area-2"
          position="0.5 0.25 -0.5"
          width="0.5"
          height="0.5"
          depth="0.5"
          color="green"
          visible="false"
          data-target="cherry-hand-2"
        >
        </a-box>
        <a-box
          id="drop-area-3"
          position="0.5 0.25 0.5"
          width="0.5"
          height="0.5"
          depth="0.5"
          color="blue"
          visible="false"
          data-target="cherry-hand-3"
        >
        </a-box>
      </a-box>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
