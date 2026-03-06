<script lang="ts" setup>
import type { Animal } from '~/types'
import { useFoodCalculator } from '~/composables/useFoodCalculator'

const props = defineProps<{
  animals: Animal[]
}>()

const { calculateMonthlyFood } = useFoodCalculator()
const foodData = calculateMonthlyFood(props.animals)
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">🍽️ Food Requirements</h2>
        <p class="text-gray-600">For {{ foodData.monthName }}</p>
      </div>
      <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
        {{ foodData.daysInMonth }} days
      </span>
    </div>

    <!-- Total Summary -->
    <div class="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
      <p class="text-lg">
        <span class="text-gray-600">Total food to purchase:</span>
      </p>
      <p class="text-4xl font-bold text-green-700 mt-1">
        {{ foodData.total.toLocaleString('de-DE') }} kg
      </p>
      <p class="text-sm text-gray-500 mt-2">
        For {{ foodData.perAnimal.length }} animals •
        Avg: {{ (foodData.total / foodData.perAnimal.length).toFixed(1) }} kg/animal
      </p>
    </div>

    <!-- Animal Breakdown Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full text-left">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="pb-3 text-gray-600 font-medium">Animal</th>
            <th class="pb-3 text-gray-600 font-medium">Species</th>
            <th class="pb-3 text-gray-600 font-medium text-right">Age</th>
            <th class="pb-3 text-gray-600 font-medium text-right">Daily (kg)</th>
            <th class="pb-3 text-gray-600 font-medium text-right">Monthly (kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in foodData.perAnimal"
            :key="item.name"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 font-medium text-gray-900">{{ item.name }}</td>
            <td class="py-3 text-gray-600">{{ item.species }}</td>
            <td class="py-3 text-right text-gray-600">
              {{ item.age }} yrs
            </td>
            <td class="py-3 text-right font-mono">{{ item.daily }}</td>
            <td class="py-3 text-right font-bold font-mono text-green-700">{{ item.monthly }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formula Reference -->
    <details class="mt-6 text-sm text-gray-500">
      <summary class="cursor-pointer hover:text-gray-700 font-medium">📋 View calculation formula</summary>
      <div class="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
        <ol class="list-decimal list-inside space-y-1">
          <li>Base: <code>(height + weight) / 250</code></li>
          <li>Age &gt; 20: × 0.5 | Age &lt; 2: × 2</li>
          <li>Favourite fruit = cherry: + 28 kg</li>
          <li>Gender = male: × 1.2</li>
          <li>Species = fish: 0 kg</li>
        </ol>
        <p class="mt-2 text-xs">Monthly = Daily × {{ foodData.daysInMonth }} days</p>
      </div>
    </details>
  </div>
</template>
