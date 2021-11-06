<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Loader } from '@banez/three-tools/loader';

  const loaderUnsub = Loader.subscribe(
    ({ type, items, loadedItemsCount, item }) => {
      if (type === 'started') {
        show = true;
      } else if (type === 'done') {
        show = false;
      } else if (type === 'progress') {
        if (item) {
          const path =
            item.path instanceof Array ? item.path.join(', ') : item.path;
          if (item.progress === 100) {
            history = [path, ...history];
          } else {
            activeItem = {
              loaded: `${loadedItemsCount}/${items.length}`,
              path,
              progress: item.progress,
            };
          }
        }
      }
    }
  );
  let show = false;
  let activeItem = {
    loaded: '',
    path: '',
    progress: 0,
  };
  let history: string[] = [];
  onDestroy(() => {
    loaderUnsub();
  });
</script>

{#if show}
  <div class="assetLoader">
    <div class="assetLoader--wrapper">
      <div class="assetLoader--history">
        {#each history as item}
          <div class="assetLoader--history-item">{item}</div>
        {/each}
      </div>
      <div class="assetLoader--active">
        <div class="assetLoader--active-item">
          <div class="bg" style="width: {activeItem.progress}%;" />
          <div class="loaded">{activeItem.loaded}</div>
          <div class="path">{activeItem.path}</div>
        </div>
      </div>
    </div>
  </div>
{/if}
