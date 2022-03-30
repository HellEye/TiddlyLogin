import React, { useState } from "react"
import DivisiblePage from "../../Layout/DivisiblePage"

type Props = {}

const TestPage = (props: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<div className="page alignRight">
			<button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
			<DivisiblePage
				left="Left from top"
				right="Right from top"
				open={open}
				rightWidth="200%"
			/>
		</div>
	)
}

export default TestPage
