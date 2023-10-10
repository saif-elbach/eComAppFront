export class CreerColis {
    
    etat:string;
    idCreerColis: number;
	dateCreation:Date;
	prix: number;
	numeroPortable: number;
	nomComplet: string;
	adresse: string;
	gouvernorat: string;
	nomProduit: string;
	notes: string;
    livreur:string;
    imprimer:boolean;

    constructor(
        idCreerColis: number,
        dateCreation:Date,
        prix: number,
        numeroPortable: number,
        nomComplet: string,
        adresse: string,
        gouvernorat: string,
        nomProduit: string,
        notes: string,
        etat:string,
        livreur:string,
        imprimer:boolean
        ) {
            
        this.idCreerColis = idCreerColis;
        this.dateCreation = dateCreation;
        this.prix = prix;
        this.numeroPortable = numeroPortable;
        this.nomComplet = nomComplet;
        this.adresse = adresse;
        this.gouvernorat = gouvernorat;
        this.nomProduit = nomProduit;
        this.notes = notes;
        this.etat = etat;
        this.livreur = livreur;
        this.imprimer=imprimer;
    }
}
