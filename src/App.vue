<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import ItemCard from '@/components/ItemCard.vue';
import AttributeInput from '@/components/AttributeInput.vue';
import LevelSelect from '@/components/LevelSelect.vue';
import GloriaToggle from '@/components/GloriaToggle.vue';
import SectionBlock from '@/components/SectionBlock.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import ExtraInfo from '@/components/ExtraInfo.vue';
import { PREPARE_POTION_ITEMS, SP_PHARMACY_ITEMS } from './constants';
import { useAlchemy, type CharacterData } from './composables/useAlchemy';

const data = useLocalStorage<CharacterData>('data', {
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

const {
  preparePotionBaseChance,
  specialPharmacyCreation,
  getPotionChance,
  specialPharmacy
} = useAlchemy(data);
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
            :tooltip="'Cada nível da habilidade multiplicara 4 a 10 pontos na formula da Farmacologia Avançada.\n[Nível da habilidade x (4 ~ 10)]'"
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
        <div class="flex flex-col items-center justify-center gap-4">
          <ExtraInfo
            title="Chance base"
            :value="preparePotionBaseChance"
            show-percentage
            tooltip-text="Chance baseada na soma de atributos, habilidades e bônus."
          />

          <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <ItemCard
              v-for="item in PREPARE_POTION_ITEMS"
              :key="item.ids.join('-')"
              :items-ids="item.ids"
              :result="
                getPotionChance(item.difficulty.min, item.difficulty.max)
              "
            />
          </ul>
        </div>
      </SectionBlock>

      <SectionBlock title="Farmacologia Avançada" collapsible>
        <div class="flex w-full flex-col items-center justify-center gap-4">
          <div class="flex flex-col gap-4 md:flex-row">
            <ExtraInfo
              title="Pontuação Bruta"
              :value="specialPharmacyCreation.base"
              :tooltip-text="'Pontuação bruta para a criação de poções especiais, calculada com base nos atributos e habilidades do personagem. \nNão considera a aleatoriedade da habilidade.'"
            />
            <ExtraInfo
              title="Pontuação Mínima"
              :value="specialPharmacyCreation.min"
              tooltip-text="A menor pontuação considerando a aleatoriedade mais baixa possível para a criação de poções especiais."
            />
            <ExtraInfo
              title="Pontuação Máxima"
              :value="specialPharmacyCreation.max"
              tooltip-text="A maior pontuação considerando a aleatoriedade mais alta possível para a criação de poções especiais."
            />
          </div>

          <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <ItemCard
              v-for="item in SP_PHARMACY_ITEMS.filter((i) => i.rate <= 80)"
              :key="item.ids.join('-')"
              :items-ids="item.ids"
              :result="specialPharmacy(item.rate)"
              potion-suffix
            />
          </ul>

          <ul class="grid gap-4 sm:grid-cols-2">
            <ItemCard
              v-for="item in SP_PHARMACY_ITEMS.filter((i) => i.rate > 80)"
              :key="item.ids.join('-')"
              :items-ids="item.ids"
              :result="specialPharmacy(item.rate)"
              potion-suffix
            />
          </ul>
        </div>
      </SectionBlock>
    </div>

    <BasicFooter />
  </main>
</template>
