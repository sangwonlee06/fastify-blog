import Fastify from 'fastify';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import prismaPlugin from './plugins/prisma.plugin';
import userRoutes from './modules/user/user.route';
import securityPlugin from './plugins/security.plugin';

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

// app.addHook('onRoute', (opts) => {
//   app.log.info(`Route registered: ${opts.method} ${opts.url}`);
// });

// — Zod for request/response validation
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// — Core plugins
app.register(prismaPlugin);
app.register(securityPlugin);

// — Feature routes
app.register(userRoutes, { prefix: '/api/users' });

export default app;
