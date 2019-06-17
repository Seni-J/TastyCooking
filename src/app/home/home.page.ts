import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavigationExtras, Router} from '@angular/router';
import {DataProvider} from '../provider/DataProvider';
import {Observable} from "rxjs";
import {Recipe} from "../models/Recipe";
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private router: Router
  public data: DataProvider
  public recipes: Array<Recipe> = [];
  private toastCtrl: ToastController

  constructor(router: Router,private storage: Storage, data : DataProvider, toastCtrl: ToastController){
    this.toastCtrl = toastCtrl
    this.router = router
    this.data = data
    this.load()
  }

  private load(): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      this.data.getAPIRecipes().then(() => {
        this.data.getRecipes().then(() =>{
          console.log('load.resolve');
          resolve('Ok')
        }).catch(() => {
          this.data.getRecipes()
          console.log('load.reject');
          reject('Ko')
        })
      })
    })
  }

  public goToCreateRecipe(){
    this.router.navigateByUrl('createrecipe')
  }

  public goToSelectedReceipe(id){
    this.router.navigateByUrl('recipe/' + id)
  }

  doRefresh(event) {
    this.load().then(() => {
      this.toastCtrl.create({ message: 'Les données ont été rechargées', duration: 1000 }).then((toastData)=>{ toastData.present() })
      event.target.complete();
      console.log('Success refresh');
    }).catch(() => {
      this.toastCtrl.create({ message: 'Pas de connexion', duration: 1000 }).then((toastData)=>{ toastData.present() })
      event.target.complete();
      console.log('Failed refresh');
    })
  }

}
