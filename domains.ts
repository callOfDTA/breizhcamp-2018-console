export class Session {
    constructor(private _name:string, private _speakers:Presentateur[]) {
    }
    get name() {
        return this._name;
    }
    get speakers() {
        return this._speakers;
    }
}

export class Presentateur {
    constructor(private _name:string) {   
    }

    get name() {
        return this._name;
    }
}