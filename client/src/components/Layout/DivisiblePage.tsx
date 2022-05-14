import { Box, Flex } from "@chakra-ui/react"
import { ReactNode, useEffect, useRef, useState } from "react"
type Props = {
	left?: ReactNode
	right?: ReactNode
	open?: boolean
	rightWidth?: string
	closeOnOffClick?: boolean
	onClose?: () => void
}

const DivisiblePage = ({
	left,
	right,
	open,
	rightWidth = "100%",
	// closeOnOffClick,
	onClose,
}: Props) => {
	const [isClosing, setIsClosing] = useState(false)
	const closingTimeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (!open) {
			closingTimeout.current = setTimeout(() => {
				setIsClosing(false)
				if (onClose) onClose()
			}, 200)
			// if (openingTimeout.current)
			// window.clearTimeout(openingTimeout.current)
			setIsClosing(true)
		} else {
			if (closingTimeout.current) window.clearTimeout(closingTimeout.current)
			setIsClosing(false)
		}
	}, [onClose, open])

	useEffect(() => {
		setIsClosing(false)
	}, [])
	return (
		<Flex
			direction="row"
			padding="1em"
			height="100%"
			width="100%"
			justify="stretch"
			align="stretch"
			gap="1em"
		>
			<Box
				flexGrow={1}
				flexBasis="100%"
				padding="1em"
				height="85%"
				overflowY="scroll"
				bg="bg.500"
				border="1px solid"
				borderColor="accent.500"
			>
				{left}
			</Box>
			<Box
				flexGrow={1}
				position={open || isClosing ? "relative" : "absolute"}
				overflow={open ? "visible" : "hidden"}
				visibility={open || isClosing ? "visible" : "hidden"}
				height="85%"
				padding="1em"
				backgroundColor="bg.500"
				border="1px solid"
				borderColor="accent.500"
				// className={getRightClasses(isOpen || false, isClosing)}
				sx={{
					flexBasis: open ? rightWidth : 0,
					transition: "flex-basis 0.2s ease",
				}}
			>
				<Box minW="10rem">{right}</Box>
			</Box>
		</Flex>
	)
}

export default DivisiblePage
