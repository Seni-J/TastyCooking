import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';
import {Recipe} from '../models/Recipe';
import {Router} from '@angular/router';
import {DataProvider} from '../provider/DataProvider';
import {Step} from '../models/Step';

@Component({
  selector: 'app-createrecipe',
  templateUrl: './createrecipe.page.html',
  styleUrls: ['./createrecipe.page.scss'],
})
export class CreaterecipePage implements OnInit {

  private router:Router
  picture:any=''
  taken:boolean = false
  storage:Storage
  recipe:Recipe
  private data: DataProvider

  name:string
  calories:number
  time:number
  ingredients: string[]
  steps: Step[]



  constructor(router: Router, private camera: Camera, storage: Storage,data: DataProvider) {
    this.router = router
    this.storage = storage
    this.data = data
    this.steps = []
    // Data for testing steps on a created recipe.
    this.steps.push(new Step(1,'STEP 1'))
    this.steps.push(new Step(2,'STEP 2'))
    this.steps.push(new Step(3,'STEP 3'))
    this.steps.push(new Step(4,'STEP 4'))
    this.steps.push(new Step(5,'STEP 5'))
  }

  ngOnInit() {
  }

  openCam(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //alert(imageData)
      this.picture=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.taken = true;
    }, (err) => {
      // Handle error
      alert("error "+JSON.stringify(err))
    });

  }


  public addNewRecipe(){
    var r = new Recipe(this.data.recipes.length + 1,this.name,this.picture,this.calories,this.time,this.ingredients,this.steps)

    this.data.recipes.push(r)
    this.storage.set('recipes',this.data.recipes)


    this.name = ""
    this.picture = ""
    this.calories = null
    this.time = null
    this.ingredients = null


    console.log("Added a new recipe")

    this.router.navigateByUrl('home')
  }
}
