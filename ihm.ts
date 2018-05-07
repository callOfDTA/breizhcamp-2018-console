import readline from 'readline';
import Service from './service';

export default class Ihm {
    r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    serv = new Service();
    

    start() {
        this.rafraichirDonnees();
        this.menu();
    }
    
    menu() {
        this.r1.question(
            `
            *************************
            1. Rafraichir les données
            2. Lister les sessions
            3. Lister les présentateurs
            99. Quitter`, saisie => {     
            if(saisie == '1'){
                this.rafraichirDonnees();
            
            }
            else if(saisie == '2'){
                this.listerLesSessions();
            
            }
            else if(saisie == '3'){
                this.listerLesPresentateurs();
            
            }    
            else if(saisie == '99'){
                this.r1.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
            }
            else{
                console.log('Votre saisie est incorrecte');
                this.menu();
            }   
        });
    }       
    
    rafraichirDonnees(){
        this.serv.init().then(nb => {
            console.log('[init]', nb, `... Données mises à jour`);
            this.menu();
        })
    }
    
    listerLesSessions(){
        let talks = this.serv.listerSessions();
            
        talks.forEach(value => {
                console.log(`* ${value.name} (${value.speakers})`);
        });
        this.menu();    
    }
    
    listerLesPresentateurs(){
        let presentateurs = this.serv.listerPresentateurs(); 
            
        presentateurs.forEach(value => {
            console.log(value);
        });
        this.menu();    
    }
}
