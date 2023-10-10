import { Caisse } from "./Caisse";
import { ProduitDetail } from "./ProdDetail";

export class Produit {

    idProduit : number;
	societeLivraison : string;
	mois : Date;
	colisImprimer : number ;
	colisPayer : number ;
	retour : number;
	com : number;
	coutAchat : number;
	//pourcentageRetour : number ;
	//revenue : number;
    produitDetail : ProduitDetail | null;
    caisse:Caisse | null;


    constructor(
            mois: Date, 
            societeLivraison: string, 
            idProduit: number, 
            colisImprimer: number, 
            colisPayer: number, 
            retour: number, 
            com: number, 
            coutAchat: number, 
            //pourcentageRetour: number, 
            //revenue: number,
            produitDetail: ProduitDetail | null,
            caisse:Caisse | null,
        ) 
        {
        this.mois = mois;
        this.societeLivraison = societeLivraison;
        this.idProduit = idProduit;
        this.colisImprimer = colisImprimer;
        this.colisPayer = colisPayer;
        this.retour = retour;
        this.com = com;
        this.coutAchat = coutAchat;
        //this.pourcentageRetour = pourcentageRetour;
        //this.revenue = revenue;
        this.produitDetail=produitDetail;
        this.caisse=caisse;
    }
}
