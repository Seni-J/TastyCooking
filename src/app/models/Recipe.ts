import {Step} from './Step';

export class Recipe{
    public id: number;
    public title: string;
    public picture: string;
    public calories: number;
    public time: number;
    public ingredients: string[];
    public steps: Step[];



    constructor(id: number, title: string, picture: string, calories: number, time: number, ingredients: string[], steps: Step[]) {
        this.id = id;
        this.title = title;
        this.picture = picture;
        this.calories = calories;
        this.time = time;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}
