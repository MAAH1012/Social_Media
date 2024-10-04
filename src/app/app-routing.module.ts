import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGaurd } from "./auth/auth.gaurd";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { DisplayComponent } from "./display/display.component";
import { PostFormComponent } from "./posts/post-form/post-form.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";
import { ContestCreateComponent } from "./contest/contest-create/contest-create.component";
import { ContestListComponent } from "./contest/contest-list/contest-list.component";
import { ContestPostCreateComponent } from "./contest/contest-post/contest-post-create/contest-post-create.component";
import { ContestPostListComponent } from "./contest/contest-post/contest-post-list/contest-post-list.component";
import { ContestDisplayComponent } from "./contest-display/contest-display.component";

const appRoutes: Routes = [
    //{ path:'', redirectTo: '/recipes', pathMatch:'full'},
    { path: 'recipes' , component: RecipesComponent, canActivate: [AuthGaurd], children:[
        {path: '', component:RecipeStartComponent},
        {path: 'new',component: RecipeEditComponent},
        {path: ':id', component:RecipeDetailComponent, resolve:[RecipeResolverService]},
        {path: ':id/edit',component: RecipeEditComponent, resolve:[RecipeResolverService]}
    ]},
    { path: 'shopping-list' , component: ShoppingListComponent},
    { path: 'auth', component: AuthComponent },


    { path: 'posts', component: PostListComponent },
    { path: 'display', component: DisplayComponent },
    { path: 'posts-forms', component: PostFormComponent},
    { path: 'posts-list', component: PostListComponent},
    { path: 'post-edit', component: PostEditComponent},
    { path: 'contest-create', component: ContestCreateComponent},
    { path: 'contest-list', component: ContestListComponent},
    { path: 'contest-post', component: ContestPostCreateComponent},
    { path: 'contest-display', component: ContestDisplayComponent},
    { path: 'contest/:id/posts', component: ContestPostListComponent },
    { path: '', redirectTo: '/display', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}