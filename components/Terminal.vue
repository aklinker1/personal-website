<script lang="ts" setup>
import { files } from '~/assets/filesystem';

const cursorIndex = ref(0);
const command = ref('');
const suggestions = ref<string[] | undefined>();
const { history, workingDir, loadSuggestions, exec } = useTerminalState('/', files);

const { eventFired: onTab } = useDoubleEvent((text: string) => {
  suggestions.value = loadSuggestions(text);
});

function onEnter(command: string) {
  suggestions.value = undefined;
  exec(command);
}
</script>

<template>
  <div class="font-mono">
    <terminal-input
      @tab="onTab"
      @enter="onEnter"
      v-model:text="command"
      v-model:cursor-index="cursorIndex"
    />
    <ul>
      <!-- History -->
      <history-list-item v-for="item of history" :key="item.id" :item="item" />

      <!-- Current command -->
      <terminal-command :dir="workingDir" :command="command" :cursor="cursorIndex" />
      <li v-if="suggestions?.length">{{ suggestions.join('\n') }}</li>
    </ul>
  </div>
</template>
