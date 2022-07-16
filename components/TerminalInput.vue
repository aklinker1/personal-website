<script lang="ts" setup>
defineProps<{
  cursorIndex: number;
  text: string;
}>();

const emit = defineEmits<{
  (event: 'tab', text: string): void;
  (event: 'enter', text: string): void;
  (event: 'update:cursorIndex', index: number): void;
  (event: 'update:text', text: string): void;
}>();

useEventListener('focus', refocus);
useEventListener('pageshow', refocus);

const input = ref<HTMLInputElement>();
function refocus() {
  setTimeout(() => input.value?.focus());
}
function enter() {
  emit('enter', input.value?.value ?? '');
  emit('update:text', '');
}
function tab() {
  emit('tab', input.value?.value ?? '');
}
function updateText(event: Event) {
  emit('update:text', (event.target as HTMLInputElement).value);
}
useEventListener(input, 'selectionchange', () => {
  emit('update:cursorIndex', input.value!.selectionStart ?? 0);
});
</script>

<template>
  <input
    class="w-0 h-0 opacity-0 overflow-hidden fixed"
    ref="input"
    :value="text"
    @input="updateText"
    autofocus
    @blur="refocus"
    @keydown.enter.prevent.stop="enter"
    @keydown.tab.prevent.stop="tab"
  />
</template>
