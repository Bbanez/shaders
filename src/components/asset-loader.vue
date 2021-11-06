<script lang="tsx">
import { defineComponent, onUnmounted, ref } from '@vue/runtime-core';
import { Loader } from '@banez/three-tools';

const component = defineComponent({
  setup() {
    const loaderUnsub = Loader.subscribe(
      ({ type, items, loadedItemsCount, item }) => {
        if (type === 'started') {
          show.value = true;
        } else if (type === 'done') {
          show.value = false;
        } else if (type === 'progress') {
          if (item) {
            const path =
              item.path instanceof Array ? item.path.join(', ') : item.path;
            if (item.progress === 100) {
              history.value = [path, ...history.value];
            } else {
              activeItem.value = {
                loaded: `${loadedItemsCount}/${items.length}`,
                path,
                progress: item.progress,
              };
            }
          }
        }
      },
    );
    const show = ref(false);
    const activeItem = ref({
      loaded: '',
      path: '',
      progress: 0,
    });
    const history = ref<Array<string>>([]);

    onUnmounted(() => {
      loaderUnsub();
    });

    return {
      show,
      activeItem,
      history,
    };
  },
  render() {
    return (
      <>
        {this.show ? (
          <div class="assetLoader">
            <div class="assetLoader--wrapper">
              <div class="assetLoader--history">
                {this.history.map((item) => {
                  <div class="assetLoader--history-item">{item}</div>;
                })}
              </div>
              <div class="assetLoader--active">
                <div class="assetLoader--active-item">
                  <div class="bg" style={`width: ${this.activeItem.progress}%;`} />
                  <div class="loaded">{this.activeItem.loaded}</div>
                  <div class="path">{this.activeItem.path}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  },
});
export default component;
</script>
