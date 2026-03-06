<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimals } from '~/composables/useAnimals'
import type { Animal } from '~/types'

const route = useRoute()
const router = useRouter()
const { animals, loading, error, fetchAnimals } = useAnimals()

// ✅ Top-level computed - automatically exposed to template
const animalIdFromRoute = computed(() => route.params.id as string)

// ✅ Top-level function - automatically exposed to template
const calculateAge = (birthdate: string | Date): number => {
  const birth = birthdate instanceof Date ? birthdate : new Date(birthdate)
  const ageDiff = Date.now() - birth.getTime()
  return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25))
}

// ✅ Top-level computed - automatically exposed to template
const animal = computed(() =>
  animals.value.find(a => a.id === animalIdFromRoute.value)
)

// ✅ Top-level function - automatically exposed to template
const goBack = () => router.push('/')

// ✅ Top-level function - automatically exposed to template
const formatDate = (dateString: string | Date) =>
  new Date(dateString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

// Fetch if not loaded yet
if (!animal.value && !loading.value && animals.value.length === 0) {
  await fetchAnimals()
}
</script>

<template>
  <div class="my-10 container mx-auto max-w-3xl">
    <!-- Breadcrumb -->
    <nav class="mb-6 text-sm text-gray-600">
      <button @click="goBack" class="hover:text-blue-600 hover:underline transition">
        ← Back to Overview
      </button>
      <span class="mx-2">/</span>
      <span class="text-gray-900 font-medium">Animal Details</span>
    </nav>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading animal details...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p class="font-medium">Failed to load animal details</p>
      <p class="text-sm">{{ error.message }}</p>
      <button @click="fetchAnimals" class="mt-2 text-sm underline hover:text-red-900">Try again</button>
    </div>

    <!-- Not Found -->
    <div v-else-if="!animal" class="text-center py-12">
      <p class="text-xl text-gray-600">🦁 Animal not found</p>
      <p class="text-gray-500 mt-2">
        No animal matches ID: <code class="bg-gray-100 px-1 rounded">{{ animalIdFromRoute }}</code>
      </p>
      <button @click="goBack" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Return to Overview
      </button>
    </div>

    <!-- Detail Card -->
    <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4">
        <h1 class="text-3xl font-bold">{{ animal.name }}</h1>
        <p class="text-blue-100 text-lg">{{ animal.species }}</p>
      </div>

      <!-- Details Grid -->
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-500">Name</span>
            <span class="font-medium">{{ animal.name }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-500">Species</span>
            <span class="font-medium">{{ animal.species }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-500">Gender</span>
            <span class="font-medium">{{ animal.gender }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-500">Age</span>
            <span class="font-medium">{{ calculateAge(animal.birthdate) }} years</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-500">Weight</span>
            <span class="font-medium">{{ animal.weight }} kg</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-500">Birthdate</span>
            <span class="font-medium">{{ formatDate(animal.birthdate) }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex gap-4">
          <button @click="goBack" class="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition">
            ← Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
