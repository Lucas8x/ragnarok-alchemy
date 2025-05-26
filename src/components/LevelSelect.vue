<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

defineProps({
  label: {
    type: String,
    required: true
  },
  skillId: {
    type: String,
    required: true
  },
  max: {
    type: Number,
    required: false,
    default: 10
  },
  tooltip: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <img class="size-6" :src="`skills/${skillId}.png`" alt="" />
        </TooltipTrigger>

        <TooltipContent>
          <div class="flex flex-col items-center gap-1 text-center">
            <p class="max-w-screen text-lg font-medium whitespace-pre-wrap">
              {{ tooltip }}
            </p>

            <a
              class="flex gap-1 underline"
              :href="`https://www.divine-pride.net/database/skill/${skillId}`"
              target="_blank"
            >
              DivinePride
              <ExternalLink :size="16" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <Label class="block" :value="label" :for="label">
      {{ label }}
    </Label>

    <Select
      :id="label"
      :default-value="0"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', Number($event))"
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione o nível" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Nível</SelectLabel>
          <SelectItem :key="0" :value="0">Nível 0</SelectItem>
          <SelectItem v-for="i in max ?? 10" :key="i" :value="i">
            Nível {{ i }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
