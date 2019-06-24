import { Component, OnInit } from '@angular/core';
import {DataProvider} from '../provider/DataProvider';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Step} from '../models/Step';

@Component({
  selector: 'app-editstep',
  templateUrl: './editstep.page.html',
  styleUrls: ['./editstep.page.scss'],
})
export class EditstepPage implements OnInit {

  data: DataProvider
  public recipe: Recipe
  private http: HttpClient
  private route: ActivatedRoute
  public currentStep: string
  public newStep: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, data: DataProvider, http: HttpClient,  public alertCtrl: AlertController) {
    this.route = activatedRoute
    this.data = data
    this.http = http
  }

  ngOnInit() {
    var rid = this.route.snapshot.paramMap.get('rid')
    var sid = this.route.snapshot.paramMap.get('sid')

    this.currentStep = sid

    this.data.find(rid).then((recipe) =>{
      this.recipe = recipe
    })
  }

  async modifiedAlert() {
    var cs = Number(this.currentStep) + 1
    const alert = await this.alertCtrl.create({
      header: "Modification d'une étape",
      message: "Vous avez modifié avec succès l'étape n°" + cs,
      buttons: ['OK']
    });

    await alert.present();
  }

  public sendModifiedStep(){
    var s = new Step(this.recipe.steps[this.currentStep].order, this.newStep)
    this.recipe.steps[this.currentStep] = s
    this.modifiedAlert()
  }

}
