import type { Animal } from '~/types'

export const useFoodCalculator = () => {
  // Calculate age in years from birthdate
  const calculateAge = (birthdate: string | Date): number => {
    const birth = birthdate instanceof Date ? birthdate : new Date(birthdate)
    const ageDiff = Date.now() - birth.getTime()
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25))
  }

  // Calculate daily food requirement for a single animal in kg
  const calculateDailyFood = (animal: Animal): number => {
    // Step 5: Fish eat 0 kg (check first as exception)
    if (animal.species.toLowerCase().includes('fish')) {
      return 0
    }

    // Step 1: Base calculation
    let food = (animal.height + animal.weight) / 250

    // Step 2: Age modifier
    const age = calculateAge(animal.birthdate)
    if (age > 20) {
      food = food * 0.5  // Half food for seniors
    } else if (age < 2) {
      food = food * 2    // Double food for babies
    }

    // Step 3: Cherry modifier (add 28 kg)
    if (animal.favouriteFruit === 'cherry') {
      food += 28
    }

    // Step 4: Male modifier (add 20%)
    if (animal.gender === 'male') {
      food = food * 1.2
    }

    return food
  }

  // Get number of days in a given month (0-indexed)
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Calculate food for next calendar month
  const calculateMonthlyFood = (animals: Animal[]): {
    total: number
    perAnimal: Array<{
      name: string
      species: string
      daily: number
      monthly: number
      age: number
    }>
    daysInMonth: number
    monthName: string
    year: number
  } => {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const daysInMonth = getDaysInMonth(nextMonth.getFullYear(), nextMonth.getMonth())
    const monthName = nextMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

    const perAnimal = animals.map(animal => {
      const daily = calculateDailyFood(animal)
      const monthly = daily * daysInMonth

      return {
        name: animal.name,
        species: animal.species,
        daily: Math.round(daily * 100) / 100,
        monthly: Math.round(monthly * 100) / 100,
        age: calculateAge(animal.birthdate)
      }
    })

    const total = perAnimal.reduce((sum, a) => sum + a.monthly, 0)

    return {
      total: Math.round(total * 100) / 100,
      perAnimal,
      daysInMonth,
      monthName,
      year: nextMonth.getFullYear()
    }
  }

  return {
    calculateDailyFood,
    calculateMonthlyFood,
    calculateAge
  }
}
