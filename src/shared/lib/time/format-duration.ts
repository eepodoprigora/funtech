
type FormatDurationOptions = {
    includeHours?: boolean
}

const pad2 = (n: number) => String(n).padStart(2, "0")


export const formatDurationMs = (ms: number, options: FormatDurationOptions = {}) => {
    const diff = Math.max(0, ms)
    const totalSec = Math.floor(diff / 1000)

    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60

    const includeHours = options.includeHours ?? true

    if (!includeHours) {
        const totalMin = Math.floor(totalSec / 60)
        const sec = totalSec % 60
        return `${pad2(totalMin)}m ${pad2(sec)}s`
    }

    return `${pad2(h)}h ${pad2(m)}m ${pad2(s)}s`
}

export const formatEndsIn = (endAt: number) => formatDurationMs(endAt - Date.now())
