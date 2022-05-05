import { Flex, FlexProps, useTheme } from "@chakra-ui/react"
import React from "react"

type Props = {
	children?: React.ReactNode
	alignRight?: boolean
	noPadding?: boolean
} & FlexProps

const Page = ({ children, alignRight, ...other }: Props) => {
	const {
		components: { Page },
	}: any = useTheme()
	const newProps = {
		...Page.defaultProps,
		...other,
	}
	return (
		<Flex alignItems={alignRight ? "flex-start" : "center"} {...newProps}>
			{children}
		</Flex>
	)
}

export default Page
