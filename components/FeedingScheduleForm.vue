<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import type { Animal, Fruit } from '~/types'
import { useFoodCalculator } from '~/composables/useFoodCalculator'

const props = defineProps<{
  animals: Animal[]
}>()

const emit = defineEmits<{
  (e: 'task-created', task: any): void
}>()

const { calculateDailyFood } = useFoodCalculator()

// Form state
const selectedAnimalId = ref<string>('')
const selectedDate = ref<string>('')
const selectedFruit = ref<Fruit>('banana')

// Computed
const selectedAnimal = computed(() =>
  props.animals.find(a => a.id === selectedAnimalId.value)
)

const calculatedAmount = computed(() => {
  if (!selectedAnimal.value) return 0
  return Math.round(calculateDailyFood(selectedAnimal.value) * 100) / 100
})

// Set minimum date to today
const today = new Date().toISOString().split('T')[0]

// Reset form after submission
const resetForm = () => {
  selectedAnimalId.value = ''
  selectedDate.value = ''
  selectedFruit.value = 'banana'
}

// Handle form submission
const handleSubmit = () => {
  if (!selectedAnimal.value || !selectedDate.value) return

  emit('task-created', {
    animal: selectedAnimal.value,
    date: selectedDate.value,
    fruit: selectedFruit.value
  })

  resetForm()
}

// Watch animal changes to log (for debugging)
watch(selectedAnimalId, (newId) => {
  if (newId) {
    console.log('🍽️ Animal selected:', selectedAnimal.value?.name)
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-4">📅 Add Feeding Task</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Animal Selector -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Animal *
        </label>
        <select
          v-model="selectedAnimalId"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select an animal</option>
          <option
            v-for="animal in animals"
            :key="animal.id"
            :value="animal.id"
          >
            {{ animal.name }} ({{ animal.species }})
          </option>
        </select>
      </div>

      <!-- Date Picker -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Feeding Date *
        </label>
        <input
          v-model="selectedDate"
          type="date"
          :min="today"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p class="text-xs text-gray-500 mt-1">
          Minimum date: {{ today }}
        </p>
      </div>

      <!-- Fruit Selector -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Fruit *
        </label>
        <select
          v-model="selectedFruit"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="banana">🍌 Banana</option>
          <option value="apple">🍎 Apple</option>
          <option value="cherry">🍒 Cherry</option>
        </select>
      </div>

      <!-- Calculated Amount (Read-only) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Required Amount (kg)
        </label>
        <div class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
          {{ selectedAnimal ? calculatedAmount : '—' }} kg
          <span v-if="selectedAnimal" class="text-xs text-gray-500 ml-2">
            (auto-calculated)
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="!selectedAnimalId || !selectedDate"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        + Add Task
      </button>
    </form>
  </div>
</template>
