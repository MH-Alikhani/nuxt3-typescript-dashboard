import { ref, computed, onMounted, watch } from 'vue'
import type { FeedingTask, Fruit, Animal } from '~/types'
import { useFoodCalculator } from './useFoodCalculator'

const STORAGE_KEY = 'zoo-feeding-tasks'

export const useFeedingSchedule = () => {
  const tasks = ref<FeedingTask[]>([])
  const { calculateDailyFood } = useFoodCalculator()

  // Load tasks from localStorage
  const loadTasks = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          tasks.value = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to parse feeding tasks:', e)
          tasks.value = []
        }
      }
    }
  }

  // Save tasks to localStorage
  const saveTasks = () => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
    }
  }

  // Generate unique ID
  const generateId = () => {
    if (import.meta.client && typeof crypto !== 'undefined') {
      return crypto.randomUUID()
    }
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Create new feeding task
  const createTask = (animal: Animal, date: string, fruit: Fruit): FeedingTask => {
    const amount = calculateDailyFood(animal)

    const task: FeedingTask = {
      id: generateId(),
      animalId: animal.id,
      animalName: animal.name,
      scheduledDate: date,
      fruit,
      amountKg: Math.round(amount * 100) / 100,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // ✅ Push to reactive array
    tasks.value.push(task)
    // ✅ Save immediately
    saveTasks()

    console.log('✅ Task created:', task)
    console.log('✅ Total tasks:', tasks.value.length)

    return task
  }

  // Mark task as complete
  const completeTask = (taskId: string) => {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.status = 'completed'
      task.completedAt = new Date().toISOString()
      saveTasks()
      console.log('✅ Task completed:', taskId)
    }
  }

  // Undo completion
  const undoTask = (taskId: string) => {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.status = 'pending'
      task.completedAt = undefined
      saveTasks()
      console.log('✅ Task undone:', taskId)
    }
  }

  // Delete task
  const deleteTask = (taskId: string) => {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index !== -1) {
      tasks.value.splice(index, 1)  // ✅ Use splice for better reactivity
      saveTasks()
      console.log('✅ Task deleted:', taskId)
    }
  }

  // ✅ Get tasks grouped by date (computed, reactive)
  const tasksByDate = computed(() => {
    const grouped: Record<string, FeedingTask[]> = {}

    // Sort by date first
    const sorted = [...tasks.value].sort((a, b) =>
      new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
    )

    // Group by date
    sorted.forEach(task => {
      if (!grouped[task.scheduledDate]) {
        grouped[task.scheduledDate] = []
      }
      grouped[task.scheduledDate].push(task)
    })

    console.log('📅 tasksByDate computed:', Object.keys(grouped).length, 'dates')
    return grouped
  })

  // Get upcoming tasks only (today and future)
  const upcomingTasks = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return tasks.value.filter(t => t.scheduledDate >= today)
  })

  // Get pending tasks count
  const pendingCount = computed(() =>
    tasks.value.filter(t => t.status === 'pending').length
  )

  // ✅ Watch for changes (debug)
  if (import.meta.client) {
    watch(tasks, (newTasks) => {
      console.log('👀 Tasks changed:', newTasks.length)
    }, { deep: true })
  }

  // Initialize on mount (client-side only)
  if (import.meta.client) {
    onMounted(loadTasks)
  }

  return {
    tasks,
    tasksByDate,
    upcomingTasks,
    pendingCount,
    createTask,
    completeTask,
    undoTask,
    deleteTask,
    loadTasks
  }
}
