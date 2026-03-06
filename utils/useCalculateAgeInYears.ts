export default (birthDate: Date): number => {
  const now = new Date()

  const differenceInMilliseconds = now.getTime() - birthDate.getTime()

  const ageInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)

  return Math.max(1, Math.ceil(ageInYears))
}
