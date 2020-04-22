import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateRecipeInput } from "./dto/create.recipe.input";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./recipe.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(input: CreateRecipeInput): Promise<Recipe> {
    const recipe = this.recipeRepository.create(input);
    return this.recipeRepository.save(recipe);
  }

  async findOneByIds(ids: number[]): Promise<Recipe[]> {
    return this.recipeRepository.findByIds(ids);
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const { skip, take } = recipesArgs;
    return this.recipeRepository.find({ skip, take });
  }

  async remove(id: number): Promise<boolean> {
    this.recipeRepository.delete(id);
    return true;
  }
}
