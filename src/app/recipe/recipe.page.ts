import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {DataProvider} from "../provider/DataProvider";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../models/Recipe";
import { Storage} from '@ionic/storage';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, data: DataProvider, http: HttpClient) {
    this.route = activatedRoute
    this.data = data
    this.http = http

  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')

      this.data.find(id).then((recipe) =>{
        this.recipe = recipe
      })
  }

  public goToSteps(id){
    this.router.navigateByUrl('step/' + id)
  }

}
