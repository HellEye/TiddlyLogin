import { Button } from "@chakra-ui/react"
import React, { useState } from "react"
import DivisiblePage from "../../components/Layout/DivisiblePage"
import Page from "../../components/Page/Page"

type Props = {}

const TestPage = (props: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<Page alignRight>
			<Button onClick={() => setOpen((prev) => !prev)}>Toggle</Button>
			<DivisiblePage
				left="Left from top"
				right="Right from top"
				open={open}
				rightWidth="200%"
			/>
		</Page>
	)
}

export default TestPage
