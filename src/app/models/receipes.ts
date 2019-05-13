export class Receipes {
    constructor(private _id: number, public _title: string, public _picture: string, public _calories: number, public _ingredients: any[]) {
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get picture(): string {
        return this._picture;
    }

    get calories(): number {
        return this._calories;
    }

    get ingredients(): any[] {
        return this._ingredients;
    }

    set title(value: string) {
        this._title = value;
    }

    set picture(value: string) {
        this._picture = value;
    }

    set ingredients(value: any[]) {
        this._ingredients = value;
    }
}
