import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavigationExtras, Router} from '@angular/router';
import {DataProvider} from '../provider/DataProvider';
import {Observable} from "rxjs";
import {Recipe} from "../models/Recipe";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private router: Router
  public data: DataProvider
  public recipes: Array<Recipe> = [];

  constructor(router: Router,private storage: Storage, data : DataProvider){
    this.router = router
    this.data = data

    this.data.getRecipes().then((recipes) => {
      recipes['data'].forEach(recipe => {
        this.recipes.push({
          id: recipe.id,
          title: recipe.title,
          pic: recipe.picture,
          kcal: recipe.calories,
        });
      });
    });
  }
  public gotocontact(){
    this.router.navigateByUrl('contact')
  }
  public goToSelectedReceipe(id){
    let navigationExtras: NavigationExtras ={
      state: {
        recipe: id
      }
    };
    this.router.navigate(['recipe'] , navigationExtras);
  }

}
