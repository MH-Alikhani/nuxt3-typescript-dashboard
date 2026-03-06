export type Gender = 'male' | 'female' | 'unknown'
export type Fruit = 'banana' | 'apple' | 'cherry'
export type TaskStatus = 'pending' | 'completed' | 'cancelled'

export interface Animal {
  id: string
  name: string
  species: string
  gender: Gender
  birthdate: string | Date
  favouriteFruit: Fruit
  height: number
  weight: number
}

export interface FeedingTask {
  id: string                    // UUID
  animalId: string              // Reference to Animal.id
  animalName: string            // Denormalized for display
  scheduledDate: string         // ISO date (YYYY-MM-DD)
  fruit: Fruit
  amountKg: number              // Pre-calculated at task creation
  status: TaskStatus
  createdAt: string             // ISO timestamp
  completedAt?: string          // ISO timestamp (when marked done)
}
