import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import * as dotEnv from "dotenv";
import * as passport from "passport";
import * as session from "express-session";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./prisma-client-exception.filter";

dotEnv.config();
const { PORT } = process.env;
const port = PORT || "3000";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(
    session({
      secret: "keyboard",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app
    .listen(port)
    // eslint-disable-next-line no-console
    .then(() => console.log(`👌  API listening at localhost: ${port}.`))
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
}
bootstrap();
