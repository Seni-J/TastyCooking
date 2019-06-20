export class Recipe{
    public id: number;
    public title: string;
    public pic: string;
    public kcal: number;
    public time: number;
    public ingredients: string[];


    constructor(id: number, title: string, pic: string, kcal: number, time: number, ingredients: string[]) {
        this.id = id;
        this.title = title;
        this.pic = pic;
        this.kcal = kcal;
        this.time = time;
        this.ingredients = ingredients;
    }
}
