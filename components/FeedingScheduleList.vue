<script lang="ts" setup>
import type { FeedingTask } from '~/types'

const props = defineProps<{
  tasksByDate: Record<string, FeedingTask[]>
}>()

const emit = defineEmits<{
  (e: 'complete', id: string): void
  (e: 'undo', id: string): void
  (e: 'delete', id: string): void
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// ✅ Get sorted dates
const dates = computed(() =>
  Object.keys(props.tasksByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )
)

// ✅ Debug: log tasks for each date
const debugTasks = (date: string) => {
  console.log(`📅 ${date}:`, props.tasksByDate[date])
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-4">📋 Feeding Tasks</h2>

    <!-- Empty State -->
    <div v-if="dates.length === 0" class="text-center py-8 text-gray-500">
      <p class="text-lg">🍽️ No feeding tasks scheduled</p>
      <p class="text-sm mt-1">Add a task using the form above</p>
    </div>

    <!-- Task Groups by Date -->
    <div v-else class="space-y-6">
      <div v-for="date in dates" :key="date" class="border-b border-gray-200 pb-4 last:border-0">
        <!-- Date Header -->
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-800">
            📅 {{ formatDate(date) }}
          </h3>
          <span class="text-sm text-gray-500">
            {{ tasksByDate[date].length }} task{{ tasksByDate[date].length !== 1 ? 's' : '' }}
          </span>
        </div>

        <!-- ✅ Tasks for this Date - Fixed v-for -->
        <div class="space-y-2">
          <FeedingTaskItem
            v-for="task in tasksByDate[date]"
            :key="task.id"
            :task="task"
            @complete="emit('complete', $event)"
            @undo="emit('undo', $event)"
            @delete="emit('delete', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
