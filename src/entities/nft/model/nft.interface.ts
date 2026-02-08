import { ImageShape } from "@shared/model/types"

export interface INft {
    name: string
    image: ImageShape | null
    currentBid: number
    endAt: number

}