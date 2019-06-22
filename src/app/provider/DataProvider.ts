import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/Recipe";

@Injectable()
export class DataProvider{
    public url = "http://127.0.0.1:8000/api/sjm/recipes"
    private storage: Storage;
    private http: HttpClient;
    public recipes: Recipe[];

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
        this.recipes = [];
    }

    public getAPIRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get(this.url).subscribe(data => {
                if(this.recipes.length == 0){
                    this.storage.set('recipes', data['data']).then(() => {
                        resolve('Ok')
                    })
                }else {
                    let myRecipe = false

                    for(let r of this.recipes){
                        if(myRecipe){

                        }else{
                            if (r.id != data['data'].pop().id){
                                r = new Recipe(r.id,data['data'].title,data['data'].picture,data['data'].kcal,data['data'].time,data['data'].ingredients)
                            }else{
                                myRecipe = true
                            }
                        }
                    }
                    console.log(this.recipes)
                    resolve('Ok')
                }
            },
                err => {
                    console.log('Load from API failed with error ' + err.message)
                    reject('Ko')
                })
        });
    }

    public getRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.recipes = []
            this.storage.get('recipes').then((data) => {
                data.forEach((value) => {
                    console.log(value)
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
