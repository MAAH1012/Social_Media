import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/authService";
import { Recipe } from "./recipe.model";
import { AbstractCommonService } from "../auth/common.abstract.service";

@Injectable({
    providedIn: 'root'
  })
  export class RecipeHttpService extends AbstractCommonService{
    constructor(http: HttpClient) {
        super(http);
    }
  
    deleteRecipe(recipe: Recipe): Observable<Recipe[]> {
        debugger
      return this.http.delete<Recipe[]>(this.fullUrl + 'recipes/delete/' + recipe.id, { headers: this.getAuthHeaders() });
    }
  }
  