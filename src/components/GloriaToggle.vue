<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="col-span-2 flex flex-col items-center gap-2 md:col-span-1">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <img class="size-6" :src="`skills/75.png`" alt="" />
        </TooltipTrigger>

        <TooltipContent>
          <div class="flex flex-col items-center gap-1 text-center">
            <p class="text-lg font-medium">Temporariamente concede SOR +30</p>
            <a
              class="flex gap-1 underline"
              :href="`https://www.divine-pride.net/database/skill/75`"
              target="_blank"
            >
              DivinePride
              <ExternalLink :size="16" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <Label class="pb-2" for="gloria">Gloria</Label>
    <Checkbox
      id="gloria"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
