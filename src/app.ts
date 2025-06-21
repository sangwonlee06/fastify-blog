import Fastify from 'fastify';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import prismaPlugin from './plugins/prisma.plugin';
import userRoutes from './modules/user/user.route';
import securityPlugin from './plugins/security.plugin';
import authRoutes from './modules/auth/auth.route';
import authPlugin from './plugins/auth.plugin';
import healthPlugin from './plugins/health.plugin';

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
app.register(authPlugin);
app.register(healthPlugin);

// — Feature routes
app.register(userRoutes, { prefix: '/api/users' });
app.register(authRoutes, { prefix: '/api/auth' });

export default app;
