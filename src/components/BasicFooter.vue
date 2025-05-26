<script setup lang="ts">
import { Github } from 'lucide-vue-next';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
</script>

<template>
  <footer class="mx-auto h-fit w-fit space-y-2 text-center">
    <ThemeSwitch />

    <a
      class="flex p-2 opacity-60"
      href="https://github.com/lucas8x/ragnarok-alchemy"
      title="Github Repository"
      target="_blank"
    >
      <Github />
    </a>
  </footer>
</template>
