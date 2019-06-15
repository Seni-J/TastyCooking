export class Recipe{
    public id: number;
    public title: string;
    public pic: string;
    public kcal: number;


    constructor(id: number, title: string, pic: string, kcal: number) {
        this.id = id;
        this.title = title;
        this.pic = pic;
        this.kcal = kcal;
    }
}