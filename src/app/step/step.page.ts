import { Component, OnInit } from '@angular/core';
import {DataProvider} from '../provider/DataProvider';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})
export class StepPage implements OnInit {

  data: DataProvider
  public recipe: Recipe
  private http: HttpClient
  private route: ActivatedRoute
  public currentStep: number

  constructor(private activatedRoute: ActivatedRoute, private router: Router, data: DataProvider, http: HttpClient) {
    this.route = activatedRoute
    this.data = data
    this.http = http
    this.currentStep = 0
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')

    this.data.find(id).then((recipe) =>{
      this.recipe = recipe
    })
  }

  nextStep(){
    if(this.currentStep == 4){
      this.currentStep = 0
      this.router.navigateByUrl('comment/' + this.recipe.id)
    }else{
      this.currentStep++
    }
  }
  modifyStep(rid: number, sid: number){
    this.router.navigateByUrl('editstep/' + rid + "/" + sid)
  }


}
