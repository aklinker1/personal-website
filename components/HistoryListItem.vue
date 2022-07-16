<script lang="ts" setup>
defineProps<{
  item: PreviousCommand;
}>();
</script>

<template>
  <terminal-command :command="item.command" :dir="item.dir" />
  <terminal-result :result="item.result" />
</template>
