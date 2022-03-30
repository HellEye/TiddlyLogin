import React, { ReactNode, useEffect, useRef, useState } from "react"
import "./DivisiblePage.css"
type Props = {
	left?: ReactNode
	right?: ReactNode
	open?: boolean
	rightWidth?: string
}

const getRightClasses = (open: boolean, isClosing: boolean) => {
	return `right ${open ? "open" : ""} ${isClosing ? "closing" : ""}`
}

const DivisiblePage = ({ left, right, open, rightWidth="100%" }: Props) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const [isOpening, setIsOpening] = useState(false)
  // const openingTimeout = useRef<NodeJS.Timeout | null>(null)
	const closingTimeout = useRef<NodeJS.Timeout | null>(null)
	useEffect(() => {
		if (!open) {
			closingTimeout.current = setTimeout(() => {
				setIsClosing(false)
      }, 200)
      // if (openingTimeout.current) 
        // window.clearTimeout(openingTimeout.current)
      setIsOpen(false)
			setIsClosing(true)
		} else {
			if (closingTimeout.current) 
				window.clearTimeout(closingTimeout.current)
      setIsClosing(false)
      setIsOpen(true)
			
		}
	}, [open])
	return (
		<div className=" divisiblePage">
			<div className="left">
				<h1>Left</h1>
				{left}
			</div>
      <div className={getRightClasses(isOpen || false, isClosing)} style={{
        flexBasis:isOpen ? rightWidth : undefined
      }}>
				<h1>Right</h1>
				{right}
			</div>
		</div>
	)
}

export default DivisiblePage
