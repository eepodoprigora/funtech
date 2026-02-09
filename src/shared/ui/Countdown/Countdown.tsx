import { useEffect, useState } from "react"

import classNames from "classnames"

import { formatEndsIn } from "@shared/lib/time"

type RawProps = {
	endAt: number
}

type Props = React.HTMLAttributes<HTMLElement> & RawProps

export const Countdown = ({ endAt, className, ...props }: Props) => {
	const [text, setText] = useState(() => formatEndsIn(endAt))

	useEffect(() => {
		const id = setInterval(() => {
			setText(formatEndsIn(endAt))
		}, 1000)

		return () => clearInterval(id)
	}, [endAt])

	return (
		<div {...props} className={classNames("countdown text-m", className)}>
			{text}
		</div>
	)
}
