"use client"

import { m, useInView } from "motion/react"
import { ReactNode, useRef } from "react"

import classNames from "classnames"

type Props = {
	children: ReactNode
	className?: string
	as?: "div" | "span" | "p" | "h1" | "h2" | "h3"
	delay?: number
}

const transition = {
	duration: 0.6,
	ease: [0.25, 1, 0.5, 1] as const,
}

export const Reveal = ({
	children,
	className,
	as = "div",
	delay = 0,
}: Props) => {
	const ref = useRef<HTMLElement | null>(null)
	const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })

	const Tag = m[as]

	return (
		<Tag
			ref={ref as never}
			className={classNames(className)}
			initial={{ opacity: 0, y: 10 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
			transition={{ ...transition, delay }}
		>
			{children}
		</Tag>
	)
}
