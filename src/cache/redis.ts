import {createClient} from "redis"

const redis = createClient({
  url: `redis://redis:6379`
})

redis.connect()

export default redis
