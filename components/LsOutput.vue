<script lang="ts" setup>
defineProps<{
  files: VirtualFileSystem;
}>();
</script>

<template>
  <ul>
    <li v-for="file of files">
      <!-- File -->
      <pre v-if="file.type === 'file'">{{ file.name }}</pre>
      <!-- Link -->
      <a v-else-if="file.type === 'link'" class="text-primary" :href="file.to" target="_blank">
        <u>
          <pre>{{ file.name }}</pre>
        </u>
      </a>
      <!-- Folder -->
      <strong v-else class="text-secondary">
        <pre>{{ file.name }}/</pre>
      </strong>
    </li>
  </ul>
</template>
