import { computed, type Ref } from 'vue';
import {
  SP_PHARMACY_POTIONS_PER_LEVEL,
  SP_PHARMACY_RANDOMNESS
} from '@/constants';

export interface CharacterData {
  baseLevel: number;
  jobLevel: number;
  intAttribute: number;
  dexAttribute: number;
  lukAttribute: number;
  blessLevel: number;
  gloriaEnabled: boolean;
  potionResearch: number;
  preparePotion: number;
  instructionChange: number;
  specialPharmacy: number;
  fullChemicalProtection: number;
}

export function useAlchemy(data: Ref<CharacterData>) {
  const gloriaBonus = computed(() => (data.value.gloriaEnabled ? 30 : 0));

  const specialPharmacyPotions = computed(
    () => SP_PHARMACY_POTIONS_PER_LEVEL[data.value.specialPharmacy as number]
  );

  const preparePotionBaseChance = computed(() => {
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

    return chance;
  });

  const specialPharmacyCreation = computed(() => {
    const i = data.value;
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
      SP_PHARMACY_RANDOMNESS.lowest +
      i.fullChemicalProtection *
        SP_PHARMACY_RANDOMNESS.chemicalProtection.lowest;

    const creationMax =
      baseValue +
      SP_PHARMACY_RANDOMNESS.highest +
      i.fullChemicalProtection *
        SP_PHARMACY_RANDOMNESS.chemicalProtection.highest;

    return {
      base: baseValue,
      min: creationMin,
      max: creationMax
    };
  });

  function getPotionChance(difficultyMin: number, difficultyMax: number) {
    const baseChance = preparePotionBaseChance.value;
    return {
      min: baseChance + difficultyMin,
      max: baseChance + difficultyMax
    };
  }

  function specialPharmacyComparison(creation: number, difficulty: number) {
    const diff = creation - difficulty;
    const max = specialPharmacyPotions.value || 0;

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

    const specificValue =
      i.specialPharmacy === 1 ? 600 : 600 - 20 * i.specialPharmacy;

    const difficulty = specificValue + itemRate;

    return {
      min: specialPharmacyComparison(
        specialPharmacyCreation.value.min,
        difficulty
      ),
      max: specialPharmacyComparison(
        specialPharmacyCreation.value.max,
        difficulty
      )
    };
  }

  return {
    preparePotionBaseChance,
    specialPharmacyCreation,
    getPotionChance,
    specialPharmacy
  };
}
