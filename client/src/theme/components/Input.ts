const Input = {
	defaultProps: {
		variant: "base",
	},
	baseStyle: {
		field: {
			bg: "bg.300",
			backgroundColor: "bg.300",
			_hover: {
				background: "bg.400",
				backgroundColor: "bg.400",
			},
			_focus: {
				background: "bg.500",
				backgroundColor: "bg.500",
				outline: "none",
			},

			border: "1px solid",
			borderColor: "accent.300",
			borderRadius: "0.5em",

			fontSize: "1rem",
			boxShadow: "5px 5px 6px #222222",
		},
	},
}
const Textarea = {
	defaultProps: {
		variant: "base",
	},
	baseStyle: {
		...Input.baseStyle.field,
	},
}

const Select = {
	...Input,
}

const Menu = {
	defaultProps: {
		variant: "base",
	},
	variants: {
		base: {
			list: {
				border: "1px solid",
				borderColor: "accent.500",
				bgColor: "bg.500",
			},
			item: {
				bg: "bg.500",
				bgColor: "bg.500",
				_hover: {
					bgColor: "bg.600",
				},
				_active: {
					bgColor: "bg.700",
				},
			},
		},
		headerDropdown: {
			item: {
				border: "none",
				shadow: "none",
				fontWeight: "bold",
				_hover: {
					bgColor: "bg.400",
				},
				_active: {
					bgColor: "bg.300",
				},
				_focus: {
					bgColor: "bg.500",
				},
				px: "5",
				py: "2",
			},
		},
	},
}



export { Input, Select, Textarea, Menu }
