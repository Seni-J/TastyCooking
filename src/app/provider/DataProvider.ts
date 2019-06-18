import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/Recipe";

@Injectable()
export class DataProvider{
    private url = "http://127.0.0.1:8000/api/sjm/recipes"
    private storage: Storage;
    private http: HttpClient;
    private recipes: Recipe[];
    private myRecipes: Recipe[];

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
        this.recipes = [];
        this.myRecipes = [];
    }

    getAPIRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get(this.url).subscribe(data => {
                this.storage.set('recipes', data).then(() => {
                    resolve('Ok')
                })
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
                data.data.forEach((value) => {
                    var f = new Recipe(value.id, value.title, value.picture, value.calories,value.time)
                    this.recipes.push(f)
                })
                console.log('loadFromStorage.resolve');
                resolve('Ok')
            }).catch(() => {
                console.log('loadFromStorage.reject');
                reject('Ko')
            })
        })
    }

    public getMyRecipes(): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            this.myRecipes = []
            this.storage.get('myRecipes').then((data) => {
                data.forEach((value) => {
                    var f = new Recipe(value.id, value.title, value.picture, value.calories,value.time)
                    this.myRecipes.push(f)
                })
                console.log('loadFromStorage.myRecipes.resolve');
                resolve('Ok')
            }).catch(() => {
                console.log('loadFromStorage.myRecipes.reject');
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

    public findMyRecipe(id){
        return new Promise<any>((resolve, reject) => {
            this.myRecipes.forEach((recipe) => {
                if (recipe.id == id) {
                    resolve(recipe)
                }
            })
            reject('Recipe' + id + ' not found')
        })
    }
}
