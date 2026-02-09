"use client"

import { m } from "motion/react"
import { useRef, useState } from "react"

import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { useMediaQuery } from "usehooks-ts"

import { useBodyClass, useHeaderScrolled } from "@shared/lib/hooks"
import { HeaderConfig } from "@shared/model"

export type RawProps = HeaderConfig

type Props = React.HTMLAttributes<HTMLElement> & RawProps

export const Header = ({
	logo,
	links,
	logoText,
	className,
	...props
}: Props) => {
	const sentinelRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	const isScrolled = useHeaderScrolled(sentinelRef, {
		rootMargin: "0px 0px 0px 0px",
		threshold: 0,
	})
	const isMobile = useMediaQuery(
		"(max-width: 767px), (max-width: 900px) and (orientation: landscape)",
	)
	useBodyClass("scroll-lock", isOpen && isMobile)

	return (
		<>
			<div ref={sentinelRef} className="header-sentinel" />
			<header
				{...props}
				className={classNames("header", className, {
					"header--moved": isScrolled,
					"burger--opened": isOpen,
				})}
			>
				<div className="wrapper header__wrapper">
					<div className="header__left">
						<Link href="/" className="header__logo">
							<span className="header__logo-img-container">
								<Image
									src={logo.src}
									alt={logo.alt ?? logoText ?? ""}
									title={logo.title}
									fill
									className="header__logo-img"
								/>
							</span>

							{logoText && (
								<span className="header__logo-text text-xl">{logoText}</span>
							)}
						</Link>
					</div>
					<button
						type="button"
						aria-label="Open Menu"
						className={classNames("header__burger", { "is-open": isOpen })}
						onClick={() => setIsOpen((v) => !v)}
					>
						<span className="header__burger-lines" />
					</button>
					{links && links.length > 0 && (
						<nav className="header__nav">
							<ul className="list-unstyled header__nav-list">
								{links?.map((link, i) => (
									<m.li
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.6,
											ease: [0.25, 1, 0.5, 1],
											delay: 0.1 * i,
										}}
										key={link.name}
										className="header__nav-item"
									>
										<Link
											key={link.name}
											href={link.href}
											className="header__nav-link text-default link"
										>
											{link.name}
										</Link>
									</m.li>
								))}
							</ul>
						</nav>
					)}
				</div>
			</header>
		</>
	)
}
