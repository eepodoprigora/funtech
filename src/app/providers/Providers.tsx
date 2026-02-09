"use client"

import type { ReactNode } from "react"

import { domAnimation, LazyMotion } from "motion/react"
import { Provider } from "react-redux"

import { store } from "@app/store"

export function Providers({ children }: { children: ReactNode }) {
	return (
		<LazyMotion features={domAnimation} strict>
			<Provider store={store}>{children}</Provider>
		</LazyMotion>
	)
}
