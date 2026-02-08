"use client"

import { RefObject, useEffect, useState } from "react"

type Options = {
    rootMargin?: string
    threshold?: number | number[]
}

export const useHeaderScrolled = (
    targetRef: RefObject<Element>,
    options: Options = {},
) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const el = targetRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                // если target НЕ пересекается с viewport -> считаем "проскроллено"
                setIsScrolled(!entry.isIntersecting)
            },
            {
                root: null,
                threshold: options.threshold ?? 0,
                rootMargin: options.rootMargin ?? "0px 0px 0px 0px",
            },
        )

        observer.observe(el)

        return () => observer.disconnect()
    }, [targetRef, options.rootMargin, options.threshold])

    return isScrolled
}
