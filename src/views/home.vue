<script lang="tsx">
import { defineComponent, ref } from "@vue/runtime-core";

const component = defineComponent({
  setup() {
    const count = ref(0);
    return { count };
  },
  render() {
    return (
      <div>
        <h1>{this.count}</h1>
        <button
          onClick={() => {
            this.count++;
          }}
        ></button>
      </div>
    );
  },
});
export default component;
</script>
