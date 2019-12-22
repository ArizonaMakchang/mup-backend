import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecipesModule } from "./recipes/recipes.module";
import { Recipe } from "./recipes/model/recipe.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT!) || 5432,
      username: process.env.DB_USERNAME! || "hongjinho",
      password: process.env.DB_PASSWORD! || "password",
      database: process.env.DB_DATABASE! || "mup",
      entities: [Recipe],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
      include: [RecipesModule],
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
