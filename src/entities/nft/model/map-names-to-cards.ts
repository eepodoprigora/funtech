import { INft } from "./nft.interface"

const toSeed = (s: string) => {
    let sum = 0
    for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i)
    return sum
}

const pickImage = (seed: number) => {
    const n = (seed % 5) + 1
    return { src: `/static/images/cards/card-${n}.jpg`, alt: `Card ${n}`, }
}

export const mapNamesToCards = (names: string[], now = Date.now()): INft[] => {
    return names.map((name) => {
        const seed = toSeed(name)

        const currentBid = Number((0.2 + (seed % 1200) / 100).toFixed(2))
        const endAt = now + (10 + (seed % (48 * 60))) * 60 * 1000

        return {
            name,
            image: pickImage(seed),
            currentBid,
            endAt,
        }
    })
}
