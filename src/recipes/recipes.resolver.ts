import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRecipeInput } from "./dto/create.recipe.input";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./recipe.entity";
import { RecipesService } from "./recipes.service";

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => Recipe)
  async recipe(@Args("id") id: number): Promise<Recipe> {
    const recipe = await this.recipesService.findOneByIds([id]);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe[0];
  }

  @Query(() => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Args("input") newRecipeData: CreateRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args("id") id: number) {
    return this.recipesService.remove(id);
  }
}
