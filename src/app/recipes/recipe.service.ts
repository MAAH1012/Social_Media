import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeHttpService } from "./recipehttp.service";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //         'This is simply a Test',
    //         'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Holubtsi.jpg/640px-Holubtsi.jpg',
    //         [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French fries', 20),
    //     ]),
    //     new Recipe('Another Test Recipe',
    //          'This is simply a Test',
    //          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Crawfish_Etouffee_at_Fleur_de_Lis.jpg/640px-Crawfish_Etouffee_at_Fleur_de_Lis.jpg',
    //         [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1),
    //         ])
    
    // ];

    private recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService, private recipeHttp: RecipeHttpService){}

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngrdientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe){
        debugger
        this.recipes[index]= newRecipe;
        newRecipe.id = index +1;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(recipe: Recipe){
        debugger
        this.recipeHttp.deleteRecipe(recipe).subscribe(recipes =>{
            debugger
            this.recipes = recipes;
            this.recipes.splice(recipe.id,1);
            this.recipesChanged.next(this.recipes.slice());
        })
        
    }
}

