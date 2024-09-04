import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredients.model";
import { ActivatedRoute, Router } from "@angular/router";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/authService";
import { AbstractCommonService } from "../auth/common.abstract.service";

@Injectable({providedIn:'root'})
export class DataStorageService extends AbstractCommonService{
    constructor(http: HttpClient, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private authService: AuthService){
        super(http);
    }

    private baseurl = "http://localhost:8080/api/v1/employees";
    private recipesUrl = "http://localhost:8080/api/v1/recipes";
    storeRecipes(){
        debugger
        const recipes = this.recipeService.getRecipes();
        return this.http.post(this.fullUrl + "recipes/update", recipes, {headers: this.getAuthHeaders()}).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        debugger
        const authuih = localStorage.getItem('token');
        return this.http.get<Recipe[]>(this.fullUrl + "recipes", {headers: this.getAuthHeaders()}).pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []};
            });
        }),tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}