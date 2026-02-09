import { tp } from "@shared/lib/formatting"


export const getIndexGeneralInfo = async () => {
    return {
        title: tp('DiveSea - Home'),
        sectionHeader: tp('Weekly - Top NFT'),
        currentBidLabel: tp('Current Bid'),
        buttonText: tp('Place bid')
    }
}

