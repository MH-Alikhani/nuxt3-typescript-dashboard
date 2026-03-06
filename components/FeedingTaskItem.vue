<script lang="ts" setup>
import type { FeedingTask } from '~/types'

const props = defineProps<{
  task: FeedingTask
}>()

const emit = defineEmits<{
  (e: 'complete', id: string): void
  (e: 'undo', id: string): void
  (e: 'delete', id: string): void
}>()

const getFruitEmoji = (fruit: string) => {
  const emojis: Record<string, string> = {
    banana: '🍌',
    apple: '🍎',
    cherry: '🍒'
  }
  return emojis[fruit] || '🍽️'
}

const confirmDelete = () => {
  if (confirm(`Delete feeding task for ${props.task.animalName}?`)) {
    emit('delete', props.task.id)
  }
}

// ✅ Debug: log task data
console.log('🔍 TaskItem received:', props.task)
</script>

<template>
  <div
    class="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition"
    :class="{ 'bg-green-50 border-green-200': task.status === 'completed' }"
  >
    <!-- Left: Task Info -->
    <div class="flex items-center gap-4">
      <!-- Status Checkbox -->
      <button
        @click="task.status === 'completed' ? emit('undo', task.id) : emit('complete', task.id)"
        class="w-6 h-6 rounded border-2 flex items-center justify-center transition font-bold"
        :class="task.status === 'completed'
          ? 'bg-green-500 border-green-500 text-white'
          : 'border-gray-300 hover:border-green-500'"
        :title="task.status === 'completed' ? 'Mark as pending' : 'Mark as complete'"
      >
        <span v-if="task.status === 'completed'">✓</span>
      </button>

      <!-- ✅ Animal Name, Fruit, and Amount -->
      <div>
        <p
          class="font-medium text-lg"
          :class="task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'"
        >
          {{ task.animalName }}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          <span class="text-lg">{{ getFruitEmoji(task.fruit) }}</span>
          <span class="ml-2">{{ task.fruit }}</span>
          <span class="mx-2">•</span>
          <span class="font-mono font-semibold">{{ task.amountKg }} kg</span>
        </p>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-3">
      <span
        class="text-xs px-3 py-1 rounded-full font-medium"
        :class="task.status === 'completed'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'"
      >
        {{ task.status === 'completed' ? '✓ Completed' : '⏳ Pending' }}
      </span>
      <button
        @click="confirmDelete"
        class="text-red-500 hover:text-red-700 text-xl"
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  </div>
</template>
