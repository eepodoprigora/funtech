
import { useCallback, useEffect, useState } from "react"
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

type UseSliderResult = {
    viewportRef: (node: HTMLElement | null) => void
    emblaApi: EmblaCarouselType | undefined

    selectedIndex: number
    snapCount: number

    canPrev: boolean
    canNext: boolean

    scrollPrev: () => void
    scrollNext: () => void
    scrollTo: (index: number) => void
}

export const useSlider = (options?: EmblaOptionsType): UseSliderResult => {
    const [viewportRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: "trimSnaps",
        ...options,
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [snapCount, setSnapCount] = useState(0)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(false)

    const update = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setSnapCount(emblaApi.scrollSnapList().length)
        setCanPrev(emblaApi.canScrollPrev())
        setCanNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on("select", update)
        emblaApi.on("reInit", update)
        update()

        return () => {
            emblaApi.off("select", update)
            emblaApi.off("reInit", update)
        }
    }, [emblaApi, update])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

    return {
        viewportRef,
        emblaApi,
        selectedIndex,
        snapCount,
        canPrev,
        canNext,
        scrollPrev,
        scrollNext,
        scrollTo,
    }
}
