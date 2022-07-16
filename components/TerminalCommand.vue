<script lang="ts" setup>
defineProps<{
  command: string;
  dir: string;
  cursor?: number;
}>();
</script>

<template>
  <li class="font-mono whitespace-pre">
    <span>{{ dir }}</span> $
    <span v-if="cursor == null">
      {{ command }}
    </span>
    <template v-else>
      {{ command.substring(0, cursor)
      }}<span class="bg-black text-white">{{ command[cursor] || ' ' }}</span
      ><span>{{ command.substring(cursor + 1) }}</span>
    </template>
  </li>
</template>
