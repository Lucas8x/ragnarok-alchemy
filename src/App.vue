<script setup lang="ts">
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import ItemCard from '@/components/ItemCard.vue';
import AttributeInput from '@/components/AttributeInput.vue';
import LevelSelect from '@/components/LevelSelect.vue';
import GloriaToggle from '@/components/GloriaToggle.vue';
import SectionBlock from '@/components/SectionBlock.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import { SpPharmacyRandomness } from './constants';

const data = useLocalStorage('data', {
  baseLevel: 1,
  jobLevel: 1,
  intAttribute: 1,
  dexAttribute: 1,
  lukAttribute: 1,
  blessLevel: 0,
  gloriaEnabled: false,
  potionResearch: 0,
  preparePotion: 0,
  instructionChange: 0,
  specialPharmacy: 0,
  fullChemicalProtection: 0
});

const gloriaBonus = computed(() => (data.value.gloriaEnabled ? 30 : 0));

const specialPharmacyPotions = {
  1: 7,
  2: 8,
  3: 8,
  4: 9,
  5: 9,
  6: 10,
  7: 10,
  8: 11,
  9: 11,
  10: 12
}[data.value.specialPharmacy];

function getPotionChance(difficultyMin: number, difficultyMax: number) {
  const i = data.value;

  const preparePotionBonus = i.preparePotion * 3;
  const dexChance = i.dexAttribute * 0.1;
  const lukChance = (i.lukAttribute + i.blessLevel + gloriaBonus.value) * 0.1;
  const intChance = (i.intAttribute + i.blessLevel) * 0.05;

  const chance =
    preparePotionBonus +
    i.potionResearch +
    i.instructionChange +
    i.jobLevel * 0.2 +
    dexChance +
    lukChance +
    intChance;

  return {
    min: Math.abs(chance + difficultyMin),
    max: Math.abs(chance + difficultyMax)
  };
}

function specialPharmacyComparison(creation: number, difficulty: number) {
  const diff = creation - difficulty;
  const max = specialPharmacyPotions || 0;

  if (diff >= 400) return max;
  else if (diff >= 300) return max - 3;
  else if (diff >= 100) return max - 4;
  else if (diff >= 1) return max - 5;
  else return max - 6;
}

function specialPharmacy(itemRate: number) {
  const i = data.value;

  if (i.specialPharmacy === 0) {
    return {
      min: 0,
      max: 0
    };
  }

  const baseValue =
    i.intAttribute +
    i.blessLevel +
    i.dexAttribute / 2 +
    (i.lukAttribute + i.blessLevel + gloriaBonus.value) +
    i.jobLevel +
    (i.baseLevel - 100) +
    i.potionResearch * 5;

  const creationMin =
    baseValue +
    SpPharmacyRandomness.lowest +
    i.fullChemicalProtection * SpPharmacyRandomness.chemicalProtection.lowest;

  const creationMax =
    baseValue +
    SpPharmacyRandomness.highest +
    i.fullChemicalProtection * SpPharmacyRandomness.chemicalProtection.highest;

  const specificValue =
    i.specialPharmacy === 1 ? 600 : 600 - 20 * i.specialPharmacy;

  const difficulty = specificValue + itemRate;

  return {
    min: specialPharmacyComparison(creationMin, difficulty),
    max: specialPharmacyComparison(creationMax, difficulty)
  };
}
</script>

<template>
  <main
    class="flex min-h-screen flex-col justify-between gap-8 bg-neutral-50 dark:bg-zinc-800"
  >
    <div class="flex h-full flex-col gap-4">
      <SectionBlock title="Personagem">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">
          <AttributeInput v-model="data.baseLevel" label="Nível de Base" />
          <AttributeInput v-model="data.jobLevel" label="Nível de Classe" />
          <AttributeInput v-model="data.intAttribute" label="INT" />
          <AttributeInput v-model="data.dexAttribute" label="DES" />
          <AttributeInput
            v-model="data.lukAttribute"
            label="SOR"
            class="col-span-2 md:col-span-1"
          />
        </div>
      </SectionBlock>

      <SectionBlock title="Habilidades">
        <div
          class="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4 lg:grid-cols-5"
        >
          <LevelSelect
            v-model="data.potionResearch"
            label="Pesquisa de Poções"
            skill-id="227"
            :tooltip="'Aumenta a chance de sucesso na criação de poções.\n+1% de chance por nível.'"
          />

          <LevelSelect
            v-model="data.preparePotion"
            label="Preparar Poção"
            skill-id="228"
            :tooltip="'Aumenta a chance de sucesso na criação de poções.\n+3% de chance por nível.'"
          />

          <LevelSelect
            v-model="data.instructionChange"
            label="Mudança de Planos"
            skill-id="8015"
            :max="5"
            :tooltip="'Habilidade do Homunculus Vanilmirth.\nAumenta a chance de sucesso na criação de poções.\n+1% de chance por nível.'"
          />

          <LevelSelect
            v-model="data.specialPharmacy"
            label="Farmacologia Avançada"
            skill-id="2497"
            :tooltip="'O número de poções criadas de uma só vez aumenta com o nível da habilidade.'"
          />

          <LevelSelect
            v-model="data.fullChemicalProtection"
            label="Proteção Química Total"
            skill-id="479"
            :tooltip="'Cada nível aumenta de 4 a 10 pontos na formula da Farmacologia Avançada .'"
          />

          <LevelSelect
            v-model="data.blessLevel"
            label="Bênção"
            skill-id="34"
            :tooltip="'Concede bônus em INT e DES.\n+1 de cada por nível.'"
          />

          <GloriaToggle v-model="data.gloriaEnabled" />
        </div>
      </SectionBlock>

      <SectionBlock title="Resultados" collapsible>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <ItemCard
            :sprite-ids="[501, 503, 504]"
            :result="getPotionChance(15, 25)"
          />

          <ItemCard :sprite-ids="[970]" :result="getPotionChance(5, 15)" />

          <ItemCard
            :sprite-ids="[7135, 7136, 7137, 7138]"
            :result="getPotionChance(-5, 15)"
          />

          <ItemCard
            :sprite-ids="[505, 605, 606, 7142, 545, 12118, 12119, 12120, 12121]"
            :result="getPotionChance(-5, -5)"
          />

          <ItemCard :sprite-ids="[546]" :result="getPotionChance(-10, -5)" />

          <ItemCard
            :sprite-ids="[547, 7139]"
            :result="getPotionChance(-15, -5)"
          />
        </ul>
      </SectionBlock>

      <SectionBlock title="Farmacologia Avançada" collapsible>
        <div class="flex w-full flex-col items-center justify-center gap-4">
          <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <ItemCard
              :sprite-ids="[12428, 12422, 12425]"
              :result="specialPharmacy(10)"
              potion-suffix
            />

            <ItemCard
              :sprite-ids="[6212, 12426]"
              :result="specialPharmacy(15)"
              potion-suffix
            />

            <ItemCard
              :sprite-ids="[12436, 12423, 12427]"
              :result="specialPharmacy(20)"
              potion-suffix
            />

            <ItemCard
              :sprite-ids="[12437, 6210, 6211]"
              :result="specialPharmacy(30)"
              potion-suffix
            />

            <ItemCard
              :sprite-ids="[12475, 12424]"
              :result="specialPharmacy(40)"
              potion-suffix
            />

            <ItemCard
              :sprite-ids="[1100003]"
              :result="specialPharmacy(80)"
              potion-suffix
            />
          </ul>

          <ul class="grid gap-4 sm:grid-cols-2">
            <ItemCard
              :sprite-ids="[100232, 100233]"
              :result="specialPharmacy(120)"
              potion-suffix
            />

            <ItemCard
              :sprite-ids="[1100004, 1100005, 100231]"
              :result="specialPharmacy(160)"
              potion-suffix
            />
          </ul>
        </div>
      </SectionBlock>
    </div>

    <BasicFooter />
  </main>
</template>
