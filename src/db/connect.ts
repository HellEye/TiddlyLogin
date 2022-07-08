import { connect, set } from "mongoose"
import { createClient } from "redis"
const MONGO_PORT =27017
const connectToMongo = () => {
	connect(`mongodb://db:${MONGO_PORT}/wikiUsers`)
		.then(() => {
			console.log(`Connected to mongo container on ${MONGO_PORT}`)
		})
		.catch((err) => {
			console.error(`Connection to mongo container on ${MONGO_PORT} failed`)
			console.error(err)
		})
}

export {connectToMongo}
