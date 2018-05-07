export class Session {
  presentateurs: Presentateur[];

  constructor(public titre: string, public description: string) {
    this.presentateurs = []
  }

}

export class Presentateur {
  constructor(public nom: string) {}

  
}
