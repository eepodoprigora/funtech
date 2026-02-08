"use client"

import { useEffect } from "react"

export const useBodyClass = (className: string, enabled: boolean) => {
    useEffect(() => {
        if (!enabled) return

        document.body.classList.add(className)
        return () => document.body.classList.remove(className)
    }, [className, enabled])
}
