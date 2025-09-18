export const getCalendarDays = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)
    for (let i = 0; i < 42; i++) {
        days.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }
    return days
}

export const getEventsForDay = (day, events) => {
    return events.filter(event => {
        const start = new Date(event.startDate)
        const end = new Date(event.endDate)
        const dayNormalized = new Date(day.getFullYear(), day.getMonth(), day.getDate())
        const startNormalized = new Date(start.getFullYear(), start.getMonth(), start.getDate())
        const endNormalized = new Date(end.getFullYear(), end.getMonth(), end.getDate())
        return dayNormalized >= startNormalized && dayNormalized <= endNormalized
    })
}

export const getSpanningEvents = (days, events, eventType) => {
    const spanningEvents = []
    const processedEvents = new Set()

    events.forEach(event => {
        if (processedEvents.has(event.id)) return

        const startDate = new Date(event.startDate)
        const endDate = new Date(event.endDate)

        const eventDays = days.filter(day => {
            const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate())
            const eventStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
            const eventEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
            return dayStart >= eventStart && dayStart <= eventEnd
        })

        if (eventDays.length >= 1) {
            let currentWeekEvents = []
            let currentWeekStart = -1
            let currentWeekRow = -1

            eventDays.forEach(eventDay => {
                const dayIndex = days.findIndex(day => day.getTime() === eventDay.getTime())
                const weekRow = Math.floor(dayIndex / 7)

                if (currentWeekRow !== weekRow) {
                    if (currentWeekEvents.length > 0) {
                        spanningEvents.push({
                            ...event,
                            startIndex: currentWeekStart,
                            span: currentWeekEvents.length,
                            eventType,
                            weekRow: currentWeekRow,
                            id: `${event.id}-week-${currentWeekRow}`,
                        })
                    }
                    currentWeekEvents = [eventDay]
                    currentWeekStart = dayIndex
                    currentWeekRow = weekRow
                } else {
                    currentWeekEvents.push(eventDay)
                }
            })

            if (currentWeekEvents.length > 0) {
                spanningEvents.push({
                    ...event,
                    startIndex: currentWeekStart,
                    span: currentWeekEvents.length,
                    eventType,
                    weekRow: currentWeekRow,
                    id: `${event.id}-week-${currentWeekRow}`,
                })
            }
            processedEvents.add(event.id)
        }
    })

    return spanningEvents
}

export const getLimitedSpanningEvents = (spanningEvents) => {
    const groupedByWeek: Record<number, typeof spanningEvents> = {}

    spanningEvents.forEach(event => {
        if (!groupedByWeek[event.weekRow]) {
            groupedByWeek[event.weekRow] = []
        }
        groupedByWeek[event.weekRow].push(event)
    })

    const limitedEvents = []
    Object.values(groupedByWeek).forEach((weekEvents) => {
        limitedEvents.push(...weekEvents.slice(0, 2))
    })

    return limitedEvents
}

export const getGroupedSpanningEvents = (spanningEvents: any[]) => {
    const groupedByWeek: { [key: number]: any[] } = {}

    spanningEvents.forEach((event) => {
      if (!groupedByWeek[event.weekRow]) {
        groupedByWeek[event.weekRow] = []
      }
      groupedByWeek[event.weekRow].push(event)
    })

    const limitedEvents: any[] = []

    Object.keys(groupedByWeek).forEach((weekRowStr) => {
      const weekRow = Number.parseInt(weekRowStr)
      const weekEvents = groupedByWeek[weekRow]

      if (weekEvents.length <= 2) {
        limitedEvents.push(...weekEvents)
      } else {
        limitedEvents.push(...weekEvents.slice(0, 2))
      }
    })

    return { limitedEvents }
}

