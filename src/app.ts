import Fastify from 'fastify'
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

const app = Fastify({ logger: true })
  .withTypeProvider<ZodTypeProvider>()

// — Zod for request/response validation
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// — Core plugins


// — Feature routes


export default app