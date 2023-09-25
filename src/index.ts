import 'dotenv/config'
import RedisStore from 'connect-redis'
import redis from 'ioredis'

import { REDIS_OPTIONS } from "./config"
import { PORT } from './config'
import AppDataSource from "./config/db"

import createApp from './app'

(async () => {
  const redisClient = redis.createClient()
  const redisStore = new (RedisStore as any)({
    client: redisClient,
    ...REDIS_OPTIONS
  })

  AppDataSource.initialize()
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })

    const app = createApp(redisStore)

  app.listen(PORT, () => console.log(`The API is running on port: ${PORT}`))
})()
