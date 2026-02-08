import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

import { FooterConfig } from "@shared/model/types"
import { Reveal } from "@shared/ui/Reveal"

export type RawProps = FooterConfig

type Props = React.HTMLAttributes<HTMLElement> & RawProps

export const Footer = ({
	logo,
	links,
	logoText,
	rights,
	rightsAdditional,
	className,
	...props
}: Props) => {
	return (
		<footer {...props} className={classNames("footer", className)}>
			<div className="wrapper footer__wrapper">
				<div className="footer__top">
					<Reveal>
						<Link href="/" className="footer__logo">
							<div className="footer__logo-img-wrapper">
								<Image
									src={logo.src}
									alt={logo.alt ?? logoText ?? ""}
									title={logo.title}
									fill
									className="footer__logo-img"
								/>
							</div>

							{logoText && (
								<span className="footer__logo-text text-xl">{logoText}</span>
							)}
						</Link>
					</Reveal>

					{links && links.length > 0 && (
						<nav className="footer__nav">
							<ul className="list-unstyled footer__nav-list">
								{links?.map((link, i) => (
									<li key={link.name} className="footer__nav-item">
										<Reveal delay={0.1 * i}>
											<Link
												key={link.name}
												href={link.href}
												className="footer__nav-link text-default-b link"
											>
												{link.name}
											</Link>
										</Reveal>
									</li>
								))}
							</ul>
						</nav>
					)}
				</div>
				{rights && (
					<div className="footer__rights text-default-b">
						{rights}
						<span className="footer__rights-add">{rightsAdditional}</span>
					</div>
				)}
			</div>
		</footer>
	)
}
