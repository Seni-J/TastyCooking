import { Component, OnInit } from '@angular/core';
import {DataProvider} from '../provider/DataProvider';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '../models/Comment';
import {AlertController} from '@ionic/angular';
import {Step} from '../models/Step';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  data: DataProvider
  public recipe: Recipe
  private http: HttpClient
  private route: ActivatedRoute
  public comment: string
  private idComment: number

  constructor(private activatedRoute: ActivatedRoute, private router: Router, data: DataProvider, http: HttpClient,public alertCtrl: AlertController) {
    this.route = activatedRoute
    this.data = data
    this.http = http
    this.idComment = 1
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')

    this.data.find(id).then((recipe) =>{
      this.recipe = recipe
    })
  }

  async addedAlert() {
    const alert = await this.alertCtrl.create({
      header: "Ajout d'un commentaire",
      message: "Votre commentaire a été ajouté avec succès!",
      buttons: ['OK']
    });

    await alert.present();
  }

  addComment(){
    if(this.recipe.comments.length > 0){
    this.idComment = this.recipe.comments.pop().id + 1
    }
    this.recipe.comments.push(new Comment(this.idComment,this.comment))
    this.addedAlert()
    this.router.navigateByUrl('/')
  }

}
