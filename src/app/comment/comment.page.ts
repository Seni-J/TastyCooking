import { Component, OnInit } from '@angular/core';
import {DataProvider} from '../provider/DataProvider';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

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

}
