export default class Session{
    constructor(private _nom:string,private _speaker:string) {
    }
    get nom(){
        return this._nom;
    }
    set nom(nom){
        this._nom = nom;
    }
    get speaker(){
        return this._speaker;
    }
    set speaker(speaker){
        this._speaker = speaker;
    }

}
export class Presentateur{
    constructor(private _nom:string) {
    }

    get nom(){
        return this._nom;
    }
    set nom(nom){
        this._nom = nom;
    }
}