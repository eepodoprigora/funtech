"use client"

import { AnimatePresence, m } from "motion/react"
import { useEffect } from "react"

import { mapNamesToCards, nftActions } from "@entities/nft"
import { getNftNames } from "@entities/nft/api"
import { API_STATE } from "@shared/api/const"
import { useAppDispatch, useAppSelector } from "@shared/model/hooks"
import { Bids, BidsRawProps } from "@widgets/Bids"

type RawProps = {
	h1: string
	sectionTitle: string
	bidsSectionData: Omit<BidsRawProps, "cards">
}

const transition = {
	duration: 0.6,
	ease: [0.25, 1, 0.5, 1] as const,
}

const variants = {
	visible: { opacity: 1, y: 0, transition },
	hidden: { opacity: 0, y: 10, transition },
}

const HomePage = ({ h1, bidsSectionData }: RawProps) => {
	const dispatch = useAppDispatch()
	const { names, status, error } = useAppSelector((s) => s.nft)

	useEffect(() => {
		let cancelled = false

		const load = async () => {
			try {
				dispatch(nftActions.loading())
				const data = await getNftNames(12)
				if (!cancelled) dispatch(nftActions.success(data))
			} catch (e) {
				const message = e instanceof Error ? e.message : "Unknown error"
				if (!cancelled) dispatch(nftActions.failed(message))
			}
		}

		load()

		return () => {
			cancelled = true
		}
	}, [dispatch])

	const bidsProps = {
		...bidsSectionData,
		cards: mapNamesToCards(names),
	}

	return (
		<div className="home-page">
			<h1 className="visually-hidden">{h1}</h1>

			<AnimatePresence mode="wait">
				{status === API_STATE.LOADING && (
					<m.div
						key="loading"
						className="loading text-l"
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						Loading...
					</m.div>
				)}

				{status === API_STATE.ERROR && (
					<m.div
						key="error"
						className="error text-l"
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{error}
					</m.div>
				)}

				{status === API_STATE.SUCCESS && (
					<m.div
						key="success"
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<Bids {...bidsProps} />
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default HomePage
