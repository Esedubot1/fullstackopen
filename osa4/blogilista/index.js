const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

/* const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
app.use('/api/blogs', blogRouter)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json()) */

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})