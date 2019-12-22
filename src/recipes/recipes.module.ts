import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DateScalar } from "../common/graphqlScalar/date.scalar";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./model/recipe.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}
