export const formatDate = (date: string | Date): string => {
  return new Date(date).toISOString().split("T")[0]
}

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' })
}
