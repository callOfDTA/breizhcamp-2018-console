class Session {

    constructor(private _nom:string, private _speaker:string) {
    }

    get nom() {
        return this._nom;
    }

    set nom(newNom) {
        this._nom = newNom;
    }

    get speaker() {
        return this._speaker;
    }

    set speaker(newSpeaker) {
        this._speaker = newSpeaker;
    }
}

export { Session };

class Presentateur {
    constructor(private _presentateur:string) {
    }

    get presentateur() {
        return this._presentateur;
    }
}

export { Presentateur };