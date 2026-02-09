"use client"

import { m, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { INft, NftCard } from "@entities/nft"
import { useSlider } from "@shared/lib/hooks"
import { Button } from "@shared/ui/Button"
import Icon from "@shared/ui/Icon"

export type RawProps = {
	title: string
	cards: INft[]
	currentBidLabel: string
	buttonText: string
}

const ease = [0.25, 1, 0.5, 1] as const

export const Bids = ({
	title,
	cards,
	currentBidLabel,
	buttonText,
}: RawProps) => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const isInView = useInView(sectionRef, {
		once: true,
		margin: "0px 0px -10% 0px",
	})

	const viewportElRef = useRef<HTMLDivElement | null>(null)
	const containerElRef = useRef<HTMLDivElement | null>(null)

	const [showControls, setShowControls] = useState(false)

	const { viewportRef, emblaApi, canPrev, canNext, scrollPrev, scrollNext } =
		useSlider({
			skipSnaps: true,
		})

	useEffect(() => {
		const node = viewportElRef.current
		if (!node) return
		viewportRef(node)
		emblaApi?.reInit()
	}, [viewportRef, emblaApi])

	useEffect(() => {
		const viewport = viewportElRef.current
		const container = containerElRef.current
		if (!viewport || !container) return

		const check = () => {
			const hasOverflow = container.scrollWidth > viewport.clientWidth + 1
			setShowControls(hasOverflow && cards.length > 1)
		}

		check()

		const ro = new ResizeObserver(check)
		ro.observe(viewport)
		ro.observe(container)

		return () => ro.disconnect()
	}, [cards.length])

	return (
		<section className="bids" ref={sectionRef}>
			<div className="wrapper">
				<h2 className="bids__title h2">{title}</h2>
			</div>

			<m.div
				className="bids__slider"
				initial={{ opacity: 0, x: 100, y: 10 }}
				animate={
					isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 100, y: 10 }
				}
				transition={{ duration: 0.8, ease }}
			>
				<div className="bids__viewport" ref={viewportElRef}>
					<div className="bids__container" ref={containerElRef}>
						{cards.map((card) => (
							<div className="bids__slide" key={card.name}>
								<NftCard
									{...card}
									currentBidLabel={currentBidLabel}
									buttonText={buttonText}
								/>
							</div>
						))}
					</div>
				</div>

				{showControls && (
					<div className="bids__nav">
						<div className="bids__nav-wrapper">
							<Button
								onClick={scrollPrev}
								disabled={!canPrev}
								aria-label="Previous"
								iconDirection="left"
								icon={<Icon name="arrow" />}
							/>
							<Button
								onClick={scrollNext}
								disabled={!canNext}
								aria-label="Next"
								iconDirection="right"
								icon={<Icon name="arrow" />}
							/>
						</div>
					</div>
				)}
			</m.div>
		</section>
	)
}
