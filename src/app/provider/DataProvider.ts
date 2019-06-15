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

    constructor(storage: Storage, http: HttpClient) {
        this.storage = storage;
        this.http = http;
        this.recipes = [];
    }

    getAPIRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get(this.url).subscribe(data => {
                this.storage.set('recipes', data).then(() => {
                    resolve('Ok')
                });
            });
        });
    }

    public getRecipes(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.recipes = []
            this.storage.get('recipes').then((data) => {
                data.data.forEach((value) => {
                    var f = new Recipe(value.id, value.title, value.picture, value.calories)
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

    /*public recipes = {
        "result": {
            "resources": [
                {
                    "uri": "riz-cantonnais-facile",
                    "name": "Riz cantonnais facile",
                    "wecook_url": "https://www.wecook.fr/recette/riz-cantonnais-facile",
                    "portions": 4,
                    "kcal": 950,
                    "ingredients_count": 10,
                    "picture_url": "https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/521f132a9e765.jpeg",
                    "time": {
                        "total": 50
                    },
                    "tags": {
                        "meals": ["meal_dinner", "meal_lunch"],
                        "course": ["course_main_dish"]
                    }
                },
                {
                    "uri": "boeuf-au-paprika-riz",
                    "name": "Boeuf au paprika, riz",
                    "wecook_url": "https://www.wecook.fr/recette/boeuf-au-paprika-riz",
                    "portions": 4,
                    "kcal": 1584,
                    "ingredients_count": 8,
                    "picture_url": "https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/52a6e6e42425b.jpeg",
                    "time": {
                        "total": 35
                    },
                    "tags": {
                        "meals": ["meal_dinner", "meal_lunch"],
                        "course": ["course_main_dish"]
                    }
                }
            ],
            "metadata": {
                "total_count": 765,
                "current_count": 20,
                "page_number": 1
            }
        }
    }*/
}
