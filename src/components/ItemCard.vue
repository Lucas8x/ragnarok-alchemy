<script setup lang="ts">
import { computed } from 'vue';
import { ExternalLink } from 'lucide-vue-next';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ITEMS } from '@/constants';

const props = defineProps<{
  spriteIds: number[];
  result: {
    min: number;
    max: number;
  };
  potionSuffix?: boolean;
}>();

function formatChance(n: number) {
  const chance = parseFloat(n.toFixed(2)).toString();
  return props.potionSuffix ? chance + ' poções' : chance + ' %';
}

const min = computed(() => formatChance(props.result.min));
const max = computed(() => formatChance(props.result.max));

const showAverage = computed(() => min.value !== max.value);
</script>

<template>
  <Card class="flex w-56 items-center justify-center">
    <CardContent class="space-y-2">
      <div class="flex max-w-40 flex-wrap items-center justify-center gap-2">
        <TooltipProvider v-for="spriteId in spriteIds" :key="spriteId">
          <Tooltip>
            <TooltipTrigger>
              <img class="size-6" :src="`items/${spriteId}.png`" alt="" />
            </TooltipTrigger>

            <TooltipContent>
              <div class="flex flex-col items-center gap-1 text-center">
                <p class="text-lg font-semibold">{{ ITEMS[spriteId] }}</p>
                <a
                  class="flex gap-1 underline"
                  :href="`https://www.divine-pride.net/database/item/${spriteId}`"
                  target="_blank"
                >
                  DivinePride
                  <ExternalLink :size="16" />
                </a>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div class="flex flex-col gap-1">
        <span class="grid grid-cols-2 gap-4">
          Mínimo:
          <span class="font-medium text-red-500"> {{ min }}</span>
        </span>

        <span
          class="grid grid-cols-2 gap-4"
          :class="{ 'opacity-50': !showAverage }"
        >
          Média:
          <span class="font-medium text-yellow-400">
            {{
              showAverage ? formatChance((result.min + result.max) / 2) : '...'
            }}</span
          >
        </span>

        <span class="grid grid-cols-2 gap-4">
          Máximo:
          <span class="font-medium text-green-500"> {{ max }}</span>
        </span>
      </div>
    </CardContent>
  </Card>
</template>
