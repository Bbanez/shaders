<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import {
    createSvemir,
    PerspectiveCamera,
    Renderer,
    Scene,
    Spectator,
    Ticker,
  } from 'svemir';
  import type { Svemir } from 'svemir/types';
  import {
    ShaderMaterial,
    DirectionalLight,
    SphereGeometry,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
    Vector3,
  } from 'three';
  import V1 from './shaders/s1/.vert?raw';
  import F1 from './shaders/s1/.frag?raw';
  import V2 from './shaders/s2/.vert?raw';
  import F2 from './shaders/s2/.frag?raw';

  let container: HTMLElement;
  let game: Svemir;

  onMount(async () => {
    game = createSvemir({
      element: container,
      frameTicker: true,
      async onReady() {
        const dirLight = new DirectionalLight(0xffffff, 0.5);
        Scene.scene.add(dirLight);
        const plane = new Mesh(
          new PlaneGeometry(10, 10, 10, 10),
          new MeshStandardMaterial({
            color: 0xffffff,
          }),
        );
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        plane.translateZ(-1);
        Scene.scene.add(plane);
        const s1 = new Mesh(
          new SphereGeometry(1),
          new ShaderMaterial({
            uniforms: {},
            vertexShader: V1,
            fragmentShader: F1,
          }),
        );
        s1.castShadow = true;
        s1.position.setX(-2);
        Scene.scene.add(s1);
        const s2 = new Mesh(
          new SphereGeometry(1),
          new ShaderMaterial({
            uniforms: {
              sphereColor: {
                value: new Vector3(0, 0, 1),
              },
            },
            vertexShader: V2,
            fragmentShader: F2,
          }),
        );
        Ticker.subscribe((cTime) => {
          const r = Math.cos(cTime / 1000) * 0.5 + 0.5;
          const b = Math.sin(cTime / 1000) * 0.5 + 0.5;
          s2.material.uniforms.sphereColor.value = new Vector3(r, 0, b);
        });
        s2.castShadow = true;
        s2.position.set(2, 0, 0);
        Scene.scene.add(s2);

        new Spectator(camera);
      },
    });
    const camera = new PerspectiveCamera();
    camera.position.set(2, 5, 10);
    camera.lookAt(0, 0, 0);
    Renderer.setCamera(camera);
    await game.run();
  });
  onDestroy(() => {
    if (game) {
      game.destroy();
    }
  });
</script>

<div class="main">
  <div bind:this={container} />
</div>
