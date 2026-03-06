import { ref, onMounted } from 'vue'
import type { Animal } from '~/types'

export const useAnimals = () => {
  const animals = ref<Animal[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchAnimals = async (): Promise<Animal[]> => {
    loading.value = true
    error.value = null
    try {
      animals.value = await $fetch<Animal[]>('/api/animals')
      return animals.value
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch animals')
      console.error('Fetch error:', error.value)
      return []
    } finally {
      loading.value = false
    }
  }

  // Only register onMounted on the client
  if (import.meta.client) {
    onMounted(fetchAnimals)
  }

  return {
    animals,
    loading,
    error,
    fetchAnimals,
  }
}
