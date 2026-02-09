import { ImageShape } from "@shared/model"

export interface INft {
    name: string
    image: ImageShape | null
    currentBid: number
    endAt: number

}