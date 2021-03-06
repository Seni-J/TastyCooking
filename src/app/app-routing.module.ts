import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


//rid stands for RecipeID and sid for StepID.
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'recipe/:id', loadChildren: './recipe/recipe.module#RecipePageModule' },
  { path: 'createrecipe', loadChildren: './createrecipe/createrecipe.module#CreaterecipePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'step/:id', loadChildren: './step/step.module#StepPageModule' },
  { path: 'comment/:id', loadChildren: './comment/comment.module#CommentPageModule' },
  { path: 'editstep/:rid/:sid', loadChildren: './editstep/editstep.module#EditstepPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
