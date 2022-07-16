import { PropType } from 'vue';

export default defineComponent({
  name: 'ComponentResult',
  props: {
    result: { type: Object as PropType<ComponentResult>, required: true },
  },
  render() {
    return this.result.render();
  },
});
