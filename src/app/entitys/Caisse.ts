export class Caisse {
    
    productName: string;
    idCaisse: number;
    revenueTotale: number;

    constructor(productName: string, idCaisse: number, revenueTotale: number) {
        this.productName = productName;
        this.idCaisse = idCaisse;
        this.revenueTotale = revenueTotale;
    }
}
