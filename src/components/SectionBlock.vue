<script setup lang="ts">
import { ref } from 'vue';
import { ChevronsUpDown, ChevronsDownUp } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

defineProps<{
  title: string;
  collapsible?: boolean;
}>();

const isOpen = ref(true);
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-center justify-between px-4">
        <p class="text-xl font-medium">{{ title }}</p>
        <CollapsibleTrigger v-if="collapsible" as-child>
          <Button
            variant="ghost"
            size="sm"
            class="w-9 p-0 hover:cursor-pointer"
          >
            <ChevronsUpDown v-if="isOpen" class="h-4 w-4" />
            <ChevronsDownUp v-else class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <slot />
      </CollapsibleContent>
    </div>
  </Collapsible>
</template>
