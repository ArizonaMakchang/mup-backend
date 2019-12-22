import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./model/recipe.entity";
import { RecipesService } from "./recipes.service";


@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => Recipe)
  async recipe(@Args("id") id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(() => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Args("newRecipeData") newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args("id") id: string) {
    return this.recipesService.remove(id);
  }
}
