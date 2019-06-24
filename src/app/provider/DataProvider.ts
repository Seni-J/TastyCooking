import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Recipe} from "../models/Recipe";
import {Step} from '../models/Step';
import {Comment} from '../models/Comment';

@Injectable()
export class DataProvider{
    public url = "http://127.0.0.1:8000/api/sjm/recipes"
    private storage: Storage;
    private http: HttpClient;
    public recipes: Recipe[];
    public steps: Step[]
    public comments: Comment[]
    public lastUpdatedDate: Date

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
        this.recipes = [];
        this.comments = []
        this.steps = []
        // Data for testing steps on a created recipe.
        this.steps.push(new Step(1,'STEP 1'))
        this.steps.push(new Step(2,'STEP 2'))
        this.steps.push(new Step(3,'STEP 3'))
        this.steps.push(new Step(4,'STEP 4'))
        this.steps.push(new Step(5,'STEP 5'))

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
                                this.recipes[r.id - 1].calories = d.calories
                                this.recipes[r.id - 1].picture = d.picture
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
                        var f = new Recipe(value.id, value.title, value.picture, value.calories,value.time,value.ingredients,this.steps,this.comments)
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
