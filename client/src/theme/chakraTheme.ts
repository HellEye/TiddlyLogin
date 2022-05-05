import { extendTheme } from "@chakra-ui/react"
import components from "./components"
const getColor = (hue: number, saturation: number, lightness: number) =>
	`hsl(${hue}, ${saturation}%, ${lightness}%)`
const getColorRange = (
	step: number,
	colorFunc: (current: number) => string
) => {
	const out: Record<string, string> = {}
	const colorRangeValues: number[] = Array.from(Array(1000 / step).keys()).map(
		(v) => v * step
	)
	colorRangeValues
		.map((v) => ({
			key: v,
			value: colorFunc(v),
		}))
		.forEach((v) => (out[v.key.toString()] = v.value))
	return out
}

type ColorRangeOptions = {
	step?: number
	min?: number
	max?: number
}

const calcValueInRange = (x: number, min: number, max: number) => {
	// =($C$6-$C$5)*(A2)/(1000) + $C$5
	return ((max - min) * x) / 1000 + min
}

const colorRange = {
	lightness: (hue: number, saturation: number, options?: ColorRangeOptions) => {
		const newOptions = {
			step: 100,
			min: 0,
			max: 100,
			...options,
		}
		return getColorRange(newOptions.step, (v) =>
			getColor(
				hue,
				saturation,
				calcValueInRange(v, newOptions.min, newOptions.max)
			)
		)
	},
}

const chakraTheme = extendTheme({
	colors: {
		fg: "#cccccc",
		bg: colorRange.lightness(220, 13, { max: 40 }),
		accent: colorRange.lightness(40, 70),
		interact: colorRange.lightness(240, 60, { step: 50, max: 50 }),
		confirm: colorRange.lightness(120, 80, { max: 50 }),
		warning: colorRange.lightness(69, 68, { max: 50 }),
		error: colorRange.lightness(0, 80, { max: 50 }),
	},
	styles: {
		global: {
			html: {
				boxSizing: "border-box",
				maxHeight: "100vh",
				overflow: "hidden",
			},
			".App": {
				textAlign: "center",
				backgroundColor: "bg.400",
				minHeight: "100vh",
				color: "fg",
				display: "flex",
				flexDirection: "column",
			},
			".App .content": {
				display: "flex",
				flexDirection: "row",
				minHeight: " 100vh",
				width: "100%",
			},
		},
	},

	components: {
		...components,
	},
})

export { chakraTheme }
