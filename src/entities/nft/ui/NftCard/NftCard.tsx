import Image from "next/image"

import { INft } from "@entities/nft/model"
import { Button } from "@shared/ui/Button"
import { Countdown } from "@shared/ui/Countdown"

export type RawProps = INft & {
	currentBidLabel: string
	buttonText: string
}

type Props = React.HTMLAttributes<HTMLElement> & RawProps

export const NftCard = ({
	name,
	image,
	currentBid,
	endAt,
	currentBidLabel,
	buttonText,
	...props
}: Props) => {
	return (
		<article className="nft-card" {...props}>
			<Countdown className="nft-card__countdown" endAt={endAt} />
			{image && (
				<div className="nft-card__image">
					<Image
						className="nft-card__image-item"
						src={image.src}
						alt={image.alt ?? name}
						fill
					/>
				</div>
			)}

			<div className="nft-card__info">
				<h3 className="nft-card__title h3">{name}</h3>

				<div className="nft-card__bottom">
					<div className="nft-card__bottom-left">
						<span className="nft-card__current-bid-label text-xs">
							{currentBidLabel}
						</span>
						<span className="nft-card__current-bid">
							<span className="nft-card__current-bid-icon" />
							<span className="nft-card__current-bid-amount text-l">
								{currentBid}
							</span>
						</span>
					</div>

					<div className="nft-card__bottom-right">
						<Button className="nft-card__button" text={buttonText} />
					</div>
				</div>
			</div>
		</article>
	)
}
