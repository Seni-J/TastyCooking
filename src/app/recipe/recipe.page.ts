import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {DataProvider} from "../provider/DataProvider";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../models/Recipe";
import { Storage} from '@ionic/storage';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  data: DataProvider
  public recipe: Recipe
  private http: HttpClient
  private route: ActivatedRoute
  private isMyRecipe: boolean

  constructor(private activatedRoute: ActivatedRoute, private router: Router, data: DataProvider, http: HttpClient) {
    this.route = activatedRoute
    this.data = data
    this.http = http

    // We need to check if we need the storage MyRecipe or not.
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.isMyRecipe = this.router.getCurrentNavigation().extras.state.MyRecipe;
      }
    });
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')

    if(!this.isMyRecipe){
      this.data.find(id).then((recipe) =>{
        this.recipe = recipe
      })
    }else{
      console.log('test')
      this.data.findMyRecipe(id).then((recipe) =>{
        console.log(recipe)
        this.recipe = recipe
      })
    }
  }

}
