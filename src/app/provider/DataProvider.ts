import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/Recipe";
import {forEach} from '@angular-devkit/schematics';

@Injectable()
export class DataProvider{
    private url = "http://127.0.0.1:8000/api/sjm/recipes"
    private storage: Storage;
    private http: HttpClient;
    public recipes: Recipe[];

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
        this.recipes = [];
    }

    getAPIRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get(this.url).subscribe(data => {

                if(this.recipes.length == 0){
                    this.storage.set('recipes', data['data']).then(() => {
                        console.log('hello')
                        resolve('Ok')
                    })
                }else {
                    let myRecipe = false

                    for(let r of this.recipes){
                        if (r.id != data['data'].pop().id){
                            console.log(r.title)
                            r = new Recipe(r.id,data['data'].title,data['data'].picture,data['data'].calories,data['data'].time,data['data'].ingredients)
                        }else{
                            myRecipe = true
                        }

                        if(myRecipe){
                            console.log('my recipe!!!')
                        }
                    }

                    console.log(this.recipes)
                    resolve('Ok')
                }

            },
                err => {
                    console.log('Load from API failed with error ' + err.message)
                    reject('API is not working')
                })
        });
    }

    public getRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.recipes = []
            this.storage.get('recipes').then((data) => {
                data.forEach((value) => {
                    var f = new Recipe(value.id, value.title, value.picture, value.calories,value.time,value.ingredients)
                    this.recipes.push(f)
                })
                console.log('Load for storage');
                resolve('Ok')
            }).catch(() => {
                console.log('Error to load storage');
                reject('Ko')
            })
        })
    }


    public find(id) {
        return new Promise<any>((resolve, reject) => {
            this.recipes.forEach((recipe) => {
                if (recipe.id == id) {
                    resolve(recipe)
                }
            })
            reject('Recipe' + id + ' not found')
        })
    }

}
