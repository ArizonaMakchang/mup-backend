import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 3000;

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT).then(() => console.log("SERVER START!"));
})();
