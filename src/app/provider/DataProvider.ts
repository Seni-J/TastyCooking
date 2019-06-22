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
    public lastUpdatedDate: Date

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
        this.recipes = [];
        this.lastUpdatedDate = new Date()
    }

    public getAPIRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get(this.url).subscribe(data => {
                if(this.recipes.length == 0) {
                    this.storage.set('recipes', data['data']).then(() => {
                        this.lastUpdatedDate = new Date()
                        resolve('Ok')
                    })
                }else{
                    for(let d of data['data']){
                        for(let r of this.recipes){
                            if(r.id == d.id){
                                //Update data with API
                                this.recipes[r.id - 1].title = d.title
                                this.recipes[r.id - 1].kcal = d.calories
                                this.recipes[r.id - 1].pic = d.picture
                                this.recipes[r.id - 1].time = d.time
                            }
                        }
                    }
                    this.lastUpdatedDate = new Date()
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
            this.storage.get('recipes').then((data) => {
                if(this.recipes.length == 0){
                    data.forEach((value) => {
                        var f = new Recipe(value.id, value.title, value.picture, value.calories,value.time,value.ingredients)
                        this.recipes.push(f)
                    })
                }
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
