<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/physx-grab.js";
// import "../aframe/track-vertical-gesture.js";
// import "../aframe/brush.js";
// import "../aframe/vibrate.js";
import "../aframe/raycaster-custom.js";
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >
    <a-entity
      id="head"
      look-controls="pointerLockEnabled: true"
      simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      disable-in-vr="component: simple-navmesh-constraint;"
      camera
      position="0 1.65 0"
      _draw-tube
    >
      <!-- _raycaster="far: 40; objects: [clickable]; showLine: false;" -->
      <a-entity
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
        _raycaster-near
        _raycaster-far
      ></a-entity>
      <a-entity id="dummy-hand-right" position="0.3 -0.6 -1"></a-entity>
      <a-entity id="dummy-hand-left" position="-0.3 -0.6 -1"></a-entity>
    </a-entity>

    <a-entity
      id="hand-left"
      hand-controls="hand: left"
      oculus-touch-controls="hand: left"
      blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        "
      __physx-grab
      vibrate-controller="hand: left"
      vibrate-on-click
      _raycaster-near
      _raycaster-far
    >
      <!-- <a-sphere
        id="hand-left-collider"
        radius="0.02"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
      >
      </a-sphere> -->
    </a-entity>

    <a-entity
      id="hand-right"
      hand-controls="hand: right"
      oculus-touch-controls="hand: right"
      laser-controls="hand: right"
      _raycaster="far: 4; objects: [clickable]; showLine: true;"
      _physx-grab
      track-vertical-gesture
      _raycaster-near
      _raycaster-far
      _vibrate-controller="hand: right"
      _vibrate-on-click
    >
      <!-- <a-sphere
        id="hand-right-collider"
        radius="0.02"
        visible="false"
        __physx-body="type: kinematic; emitCollisionEvents: true"
      >
      </a-sphere> -->
    </a-entity>

    <a-box
      _brush="activeColor: #00ff00; context: screen"
      id="desktop-hand-right"
      class="hand"
      position="0.3 1.1 -0.5"
      rotation="0 0 0"
      color="yellow"
      width="0.5"
      height="0.1"
      depth="0.5"
      opacity="0.5"
    >
      <a-box
        id="cherry-hand-1"
        class="hand"
        position="-0.15 0.075 0"
        rotation="0 0 0"
        color="red"
        width="0.1"
        height="0.1"
        depth="0.1"
        opacity="1"
        visible="false"
      ></a-box>
      <a-box
        id="cherry-hand-2"
        class="hand"
        position="0 0.075 -0.15"
        rotation="0 0 0"
        color="green"
        width="0.1"
        height="0.1"
        depth="0.1"
        opacity="1"
        visible="false"
      ></a-box>
      <a-box
        id="cherry-hand-3"
        class="hand"
        position="0.15 0.075 0"
        rotation="0 0 0"
        color="blue"
        width="0.1"
        height="0.1"
        depth="0.1"
        opacity="1"
        visible="false"
      ></a-box>
    </a-box>
  </a-entity>
</template>
