import { Caisse } from "./Caisse";

export class Depence {
    
    idDepence:number;
    dateDepence:Date;
    nomArticle:string;
    nomProduitAcheter:string;
    montant:number;
    nomMembre:string;
    caisse:Caisse;


    constructor(idDepence:number,dateDepence: Date, nomArticle: string, nomProduitAcheter: string, montant: number,nomMembre:string,caisse:Caisse) {
        this.idDepence = idDepence;
        this.dateDepence = dateDepence;
        this.nomArticle = nomArticle;
        this.nomProduitAcheter = nomProduitAcheter;
        this.montant = montant;
        this.nomMembre = nomMembre;
        this.caisse=caisse;
    }
}
