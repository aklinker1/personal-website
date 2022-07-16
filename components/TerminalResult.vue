<script lang="ts" setup>
defineProps<{
  result: TerminalResult;
}>();
</script>

<template>
  <template v-if="result.type === 'none'" />

  <template v-else-if="result.type === 'text'">
    <pre>{{ result.text }}</pre>
  </template>

  <template v-else-if="result.type === 'component'">
    <component-output :result="result" />
  </template>

  <template v-else-if="result.type === 'error'">
    <pre class="text-error font-bold">{{ result.error }}</pre>
  </template>
</template>
