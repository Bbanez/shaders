<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { AssetLoader } from './components';

  import { createGame, Loader } from '@banez/three-tools';

  const loaderUnsub = Loader.subscribe(({ item }) => {
    if (item) {
      console.log(item);
    }
  });
  let gameArea: HTMLElement;

  onMount(() => {
    const game = createGame({
      element: gameArea,
    });
    Loader.register({
      name: 'test',
      path: '/text.txt',
      type: 'string',
    });
    game.run();
  });
  onDestroy(() => {
    loaderUnsub();
  });
</script>

<div>
  <h1>Game</h1>
  <div bind:this={gameArea} />

  <div class="global">
    <AssetLoader />
  </div>
</div>
