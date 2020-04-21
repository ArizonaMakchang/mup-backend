import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecipesModule } from "./recipes/recipes.module";
import { typeOrmConfig } from "./config/typeorm.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
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
