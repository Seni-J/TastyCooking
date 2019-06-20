import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';
import {Recipe} from '../models/Recipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createrecipe',
  templateUrl: './createrecipe.page.html',
  styleUrls: ['./createrecipe.page.scss'],
})
export class CreaterecipePage implements OnInit {

  private router:Router
  image:any=''
  taken:boolean = false
  storage:Storage
  recipe:Recipe

  name:string
  kcal:number
  time:number
  ingredients: string[]
  id:number = 1
  private recipes: Recipe[];


  constructor(router: Router, private camera: Camera, storage: Storage) {
    this.router = router
    this.storage = storage
    this.recipes = []
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
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.taken = true;
    }, (err) => {
      // Handle error
      alert("error "+JSON.stringify(err))
    });

  }


  public addNewRecipe(){
    console.log(this.image)
    var r = new Recipe(this.id,this.name,this.image,this.kcal,this.time,this.ingredients)
    this.recipes.push(r)
    this.storage.set('myRecipes',this.recipes)
    this.id++

    this.name = ""
    this.image = ""
    this.kcal = null
    this.time = null
    this.ingredients = null


    console.log("Added a new recipe")

    this.router.navigateByUrl('home')
  }
}
