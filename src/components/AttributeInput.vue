<script setup lang="ts">
import { Label } from './ui/label';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from './ui/number-field';

defineProps({
  label: {
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
    <Label class="block" :value="label" :for="label">
      {{ label }}
    </Label>

    <NumberField
      class="max-w-32"
      :default-value="1"
      :min="1"
      :max="999"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', Number($event))"
    >
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>
