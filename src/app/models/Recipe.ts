export class Recipe{
    public id: number;
    public title: string;
    public pic: string;
    public kcal: number;
    public time: number;


    constructor(id: number, title: string, pic: string, kcal: number, time: number) {
        this.id = id;
        this.title = title;
        this.pic = pic;
        this.kcal = kcal;
        this.time = time;
    }
}
