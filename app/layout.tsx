import type { Metadata } from "next"
import type { ReactNode } from "react"

import { getCommonPageProps } from "@app/get-common-page-props"
import { Providers } from "@app/providers"
import { Footer } from "@widgets/Footer"
import { Header } from "@widgets/Header"

import "@app/css/app.scss"

export const metadata: Metadata = {
	title: "DiveSea",
	description: "DiveSea - description",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const commonPageProps = await getCommonPageProps()
	return (
		<html lang="en">
			<body>
				<Providers>
					<Header {...commonPageProps.headerData} />
					{children}
					<Footer {...commonPageProps.footerData} />
				</Providers>
			</body>
		</html>
	)
}
