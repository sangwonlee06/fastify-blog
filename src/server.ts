import app from './app'

const PORT = Number(process.env.PORT) || 3000
const HOST = '0.0.0.0'

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST })
    app.log.info(`Server listening at http://${HOST}:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()