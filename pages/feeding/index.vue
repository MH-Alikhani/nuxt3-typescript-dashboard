<script setup lang="ts">
import { computed } from 'vue'
import { useAnimals } from '~/composables/useAnimals'
import { useFeedingSchedule } from '~/composables/useFeedingSchedule'

const { animals, loading: animalsLoading } = useAnimals()
const {
  tasksByDate,
  createTask,
  completeTask,
  undoTask,
  deleteTask,
  pendingCount
} = useFeedingSchedule()

// ✅ Debug: watch for changes
if (import.meta.client) {
  console.log('🍽️ Feeding page loaded')
}

const handleCreateTask = ({ animal, date, fruit }: any) => {
  console.log('📝 Creating task:', { animal: animal.name, date, fruit })
  const task = createTask(animal, date, fruit)
  console.log('✅ Task created:', task)
}
</script>

<template>
  <div class="my-10 container mx-auto max-w-6xl">
    <!-- Header -->
    <header class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-4xl font-bold">🍽️ Feeding Schedule</h1>
        <p class="text-gray-600 mt-1">
          Plan and track animal feeding tasks
          <span v-if="pendingCount > 0" class="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            {{ pendingCount }} pending
          </span>
        </p>
      </div>
      <NuxtLink
        to="/"
        class="px-4 py-2 text-blue-600 hover:text-blue-800 hover:underline"
      >
        ← Back to Overview
      </NuxtLink>
    </header>

    <!-- Loading State -->
    <div v-if="animalsLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading animal data...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Form (1 column) -->
      <div class="lg:col-span-1">
        <FeedingScheduleForm
          :animals="animals"
          @task-created="handleCreateTask"
        />

        <!-- Quick Stats -->
        <div class="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 class="font-semibold text-blue-900 mb-2">📊 Quick Stats</h3>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• Total animals: {{ animals.length }}</li>
            <li>• Pending tasks: {{ pendingCount }}</li>
            <li>• Scheduled days: {{ Object.keys(tasksByDate).length }}</li>
          </ul>
        </div>
      </div>

      <!-- Right: Task List (2 columns) -->
      <div class="lg:col-span-2">
        <FeedingScheduleList
          :tasksByDate="tasksByDate"
          @complete="completeTask"
          @undo="undoTask"
          @delete="deleteTask"
        />
      </div>
    </div>
  </div>
</template>
