<script lang="ts" setup>
import { computed } from 'vue'
import type { Animal } from '~/types'

const props = defineProps<{
  animals: Animal[]
}>()

const emit = defineEmits<{
  (e: 'select-animal', animal: Animal): void
}>()

// Utility function to calculate age from birthdate
const calculateAge = (birthdate: string | Date): number => {
  const birth = birthdate instanceof Date ? birthdate : new Date(birthdate)
  const ageDiff = Date.now() - birth.getTime()
  return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25))
}

//  Sort animals by species for better readability
const animalsSortedBySpecies = computed(() =>
  [...props.animals].sort((a, b) =>
    a.species.localeCompare(b.species)
  )
)
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full text-left">
      <thead>
        <tr class="border-b-2">
          <th class="w-12">Index</th>
          <th class="w-48">Name</th>
          <th>Species</th>
          <th>Gender</th>
          <th>Age (yrs)</th>
          <th>Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(animal, index) in animalsSortedBySpecies"
          :key="index"
          class="border-b hover:bg-gray-200 transition cursor-pointer"
          @click="emit('select-animal', animal)"
        >
          <td class="w-12">{{ index + 1 }}</td>
          <td class="font-medium text-blue-600 hover:underline">{{ animal.name }}</td>
          <td>{{ animal.species }}</td>
          <td>{{ animal.gender }}</td>
          <td>{{ calculateAge(animal.birthdate) }}</td>
          <td>{{ animal.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table { @apply table-auto w-full text-left; }
td { @apply w-40; }
tr { @apply border-b-2; }
tbody tr { @apply hover:bg-gray-200; }
</style>
