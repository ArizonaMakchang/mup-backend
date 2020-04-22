import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

const PORT = process.env.PORT || 3000;

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(<number>PORT).then(() => console.log("SERVER START!"));
})();
