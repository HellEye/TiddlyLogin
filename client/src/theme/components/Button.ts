import { ButtonProps } from "@chakra-ui/react"

const Button = {
	defaultProps: {
		colorScheme: "interact",
	},
	baseStyle: {
		px: "1rem",
		py: "1rem",
		border: "1px solid",
		borderColor: "accent.500",
		borderRadius: "0.5em",
		transition: "background-color 0.2s ease, box-shadow 0.2s ease",
		boxShadow: "5px 5px 6px #222222",
		outline: "none",
		_focus: {
			outline: "none",
			boxShadow: "none",
		},
		_active: {
			outline: "none",
		},
		_hover: {
			outline: "none",
		},
	},
}

export { Button }
