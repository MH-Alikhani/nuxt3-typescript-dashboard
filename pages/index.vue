<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimals } from '~/composables/useAnimals'
import type { Animal } from '~/types'

const WELCOME_SHOWN_KEY = 'zoo-dashboard-welcome-shown'


const router = useRouter()
const { animals, loading, error, fetchAnimals } = useAnimals()

onMounted(() => {
  if (!sessionStorage.getItem(WELCOME_SHOWN_KEY)) {
    alert('🦁 Welcome to the Cologne Zoo Dashboard!')
    sessionStorage.setItem(WELCOME_SHOWN_KEY, 'true')
  }
})

const handleSelectAnimal = (animal: Animal) => {
  router.push(`/animals/${animal.id}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-gray-800 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🦁</span>
            <h1 class="text-xl font-bold">Cologne Zoo</h1>
          </div>
          <div class="flex gap-6">
            <NuxtLink
              to="/"
              class="hover:text-blue-300 transition font-medium"
              active-class="text-blue-400"
            >
              🏠 Overview
            </NuxtLink>
            <NuxtLink
              to="/feeding"
              class="hover:text-blue-300 transition font-medium"
              active-class="text-blue-400"
            >
              🍽️ Feeding Schedule
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-10">
      <!-- Header Section -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-4xl font-bold text-gray-900">Dashboard Overview</h2>
          <p class="text-gray-600 mt-2">
            Welcome, zookeeper! Here's your animal overview and food requirements.
          </p>
        </div>
        <button
          @click="fetchAnimals"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <span>↻</span>
          <span>{{ loading ? 'Loading...' : 'Refresh' }}</span>
        </button>
      </header>

      <!-- Info Banner -->
      <div class="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="text-sm text-amber-800">
          <span class="font-medium">⚠️ Security Notice:</span>
          Cyber-Attacks from the Duisburg Zoo defeated by Mohammad Hossein Alikhani (I fixed everything, added features & optimized the app).
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600 text-lg">Loading animal data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
        <p class="font-bold text-lg">❌ Failed to load animals</p>
        <p class="text-sm mt-1">{{ error.message }}</p>
        <button
          @click="fetchAnimals"
          class="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Try Again
        </button>
      </div>

      <!-- Main Content (when data is loaded) -->
      <template v-else-if="animals?.length">
        <!-- 🍽️ Food Summary Section -->
        <section class="mb-10">
          <FoodSummary :animals="animals" />
        </section>

        <!-- 🦁 Animal Table Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-semibold text-gray-900">Our Animals</h3>
            <span class="text-sm text-gray-500">
              {{ animals.length }} animal{{ animals.length !== 1 ? 's' : '' }} total
            </span>
          </div>
          <TheAnimalTable
            :animals="animals"
            @select-animal="handleSelectAnimal"
          />
          <p class="text-sm text-gray-500 mt-3 text-center">
            💡 Click on any animal name to view details
          </p>
        </section>
      </template>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white rounded-lg shadow">
        <p class="text-4xl mb-4">🦁</p>
        <p class="text-xl text-gray-600 font-medium">No animals found</p>
        <p class="text-gray-500 mt-2">The database appears to be empty.</p>
        <button
          @click="fetchAnimals"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reload Data
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-400 py-6 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm">
          © {{ new Date().getFullYear() }} Cologne Zoo Dashboard • Built for zookeepers 🦁
        </p>
        <p class="text-xs mt-2 text-gray-500">
          For support: admin [at] zoo-cologne [dot] de
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Smooth transitions for navigation */
nav a {
  @apply transition-colors duration-200;
}

/* Active link styling */
.router-link-active {
  @apply text-blue-400 font-semibold;
}
</style>
