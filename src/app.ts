import Fastify from 'fastify'
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import prismaPlugin from './plugins/prisma.plugin';

const app = Fastify({ logger: true })
  .withTypeProvider<ZodTypeProvider>()

// — Zod for request/response validation
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// — Core plugins
app.register(prismaPlugin);


// — Feature routes


export default app