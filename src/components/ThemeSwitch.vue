<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const mode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="cursor-pointer">
        <Moon
          class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />

        <Sun
          class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        <span class="sr-only">Alternar Tema</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="center">
      <DropdownMenuItem @click="mode = 'light'"> Claro </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'"> Escuro </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'"> Sistema </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
