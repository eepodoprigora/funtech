import { HomePage } from "@pages/HomePage"
import { getIndexGeneralInfo } from "@shared/api/get-index-general"

export default async function Home() {
	const generalInfo = await getIndexGeneralInfo()

	const bidsSectionData = {
		title: generalInfo.sectionHeader,
		currentBidLabel: generalInfo.currentBidLabel,
		buttonText: generalInfo.buttonText,
	}
	return (
		<main className="main">
			<HomePage
				h1={generalInfo.title}
				sectionTitle={generalInfo.sectionHeader}
				bidsSectionData={bidsSectionData}
			/>
		</main>
	)
}
