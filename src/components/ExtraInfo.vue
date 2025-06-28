<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

defineProps<{
  title: string;
  value: number;
  showPercentage?: boolean;
  tooltipText?: string;
}>();
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Card class="w-56 py-2">
          <CardContent class="grid grid-cols-2 items-center gap-2 text-center">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ title }}
            </p>

            <span class="text-gray-800 dark:text-gray-100">{{
              value.toFixed(2).concat(showPercentage ? '%' : '')
            }}</span>
          </CardContent>
        </Card>
      </TooltipTrigger>

      <TooltipContent>
        <div class="flex max-w-lg items-center gap-1 text-center">
          <p class="text-lg font-medium whitespace-pre-wrap">
            {{ tooltipText }}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
