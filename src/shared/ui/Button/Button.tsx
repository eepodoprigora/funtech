import classNames from "classnames"

type RawProps = {
	text?: string
	icon?: React.ReactNode
	iconDirection?: "left" | "right"
	type?: "button" | "submit" | "reset"
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & RawProps

export const Button = ({
	text,
	icon,
	iconDirection = "left",
	type = "button",
	className,
	...props
}: Props) => {
	return (
		<button
			{...props}
			className={classNames("button", className, {
				"button--icon-only": icon && !text,
				"button--text-only": text && !icon,
				"button--icon-right": icon && iconDirection === "right",
			})}
		>
			{icon && <span className="button__icon">{icon}</span>}
			{text && <span className="button__text text-m">{text}</span>}
		</button>
	)
}
