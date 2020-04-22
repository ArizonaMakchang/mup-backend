import { EntityRepository, Repository } from "typeorm";
import { Recipe } from "./recipe.entity";

@EntityRepository(Recipe)
export class RecipesRepository extends Repository<Recipe> {
  async getRecipes(): Promise<Recipe[]> {
    const query = this.createQueryBuilder("recipe");

    const recipes = await query.getMany();
    return recipes;
  }
}
