<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/physx-grab.js";

//Variables de base (pos: 20000; rot: 22000)
const vitessePos = 20000 / 2;
const vitessRot = 22000 / 2;
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
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
  >
    <a-entity
      id="head"
      look-controls="pointerLockEnabled: true"
      simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      disable-in-vr="component: simple-navmesh-constraint;"
      camera
      position="0 1.65 0"
    >
      <a-entity
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 400; objects: [clickable]; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>
    </a-entity>

    <a-entity
      id="hand-left"
      hand-controls="hand: left"
      blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        "
      physx-grab
    >
      <a-sphere
        id="hand-left-collider"
        radius="0.02"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
      >
      </a-sphere>
    </a-entity>

    <a-entity
      id="hand-right"
      hand-controls="hand: right"
      laser-controls="hand: right"
      raycaster="far: 400; objects: [clickable]; showLine: true;"
      physx-grab
    >
      <a-sphere
        id="hand-right-collider"
        radius="0.02"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
      >
      </a-sphere>
    </a-entity>
  </a-entity>
</template>
