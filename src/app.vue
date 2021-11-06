<style lang="scss">
@import './styles/_main.scss';
</style>

<script lang="tsx">
import { defineComponent } from '@vue/runtime-core';
import { RouterView } from 'vue-router';
import { AssetLoader } from './components';

const component = defineComponent({
  render() {
    return (
      <>
        <RouterView />
        <div class="global">
          <AssetLoader />
        </div>
      </>
    );
  },
});
export default component;
</script>
