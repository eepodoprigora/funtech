import classNames from "classnames"

export type Props = React.HTMLAttributes<HTMLElement> & {
	ref?: React.Ref<HTMLElement>
	name: "arrow"
}

const Icon = ({ ref, name, ...props }: Props) => {
	return (
		<i
			{...props}
			ref={ref}
			className={classNames("icon", props.className)}
			style={
				{
					...props.style,
					"--path": `url('/static/images/svg/${name}.svg')`,
				} as React.CSSProperties
			}
		/>
	)
}

export default Icon
