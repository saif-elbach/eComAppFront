export class ProduitDetail {

     idProdDetail: number;
	 nomArticle: string;
	 revenueUnitaire: number;
	 coutAchatUnitaire: number;
	 prixVente: number;
	 coutLivraison: number;
	 coutUnitaireCom: number;
	 prixSansLivraison: number;
    

    constructor(
        idProdDetail: number,
        nomArticle: string,
        revenueUnitaire: number,
        coutAchatUnitaire: number,
        prixVente: number,
        coutLivraison: number,
        coutUnitaireCom: number,
        prixSansLivraison: number
        ){
        this.idProdDetail =idProdDetail;
        this.nomArticle =nomArticle;
        this.revenueUnitaire =revenueUnitaire;
        this.coutAchatUnitaire =coutAchatUnitaire;
        this.prixVente =prixVente;
        this.coutLivraison=coutLivraison;
        this.coutUnitaireCom=coutUnitaireCom;
        this.prixSansLivraison=prixSansLivraison;
    }
  }
  