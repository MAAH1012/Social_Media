import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayComponent } from './display/display.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostService } from './posts/posts.service';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { ContestCreateComponent } from './contest/contest-create/contest-create.component';
import { ContestListComponent } from './contest/contest-list/contest-list.component';
import { ContestPostCreateComponent } from './contest/contest-post/contest-post-create/contest-post-create.component';
import { ContestPostListComponent } from './contest/contest-post/contest-post-list/contest-post-list.component';
import { ContestEditComponent } from './contest/contest-edit/contest-edit.component';
import { ContestPostEditComponent } from './contest/contest-post/contest-post-edit/contest-post-edit.component';
import { ContestDisplayComponent } from './contest-display/contest-display.component';
import { WinnerImagesComponent } from './winner-images/winner-images.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    DashboardComponent,
    DisplayComponent,
    PostListComponent,
    PostFormComponent,
    PostEditComponent,
    ContestCreateComponent,
    ContestListComponent,
    ContestPostCreateComponent,
    ContestPostListComponent,
    ContestEditComponent,
    ContestPostEditComponent,
    ContestDisplayComponent,
    WinnerImagesComponent,
    MainDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ShoppingListService, RecipeService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
