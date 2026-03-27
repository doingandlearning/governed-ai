import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./nest/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`Nest backend listening on http://localhost:${port}`);
}

void bootstrap();
