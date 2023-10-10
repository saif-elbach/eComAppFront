import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Produit } from 'src/app/entitys/Produit';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProdDetailService } from 'src/app/services/prod-detail.service';
import { ProduitService } from 'src/app/services/produit.service';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { ProduitDetail } from 'src/app/entitys/ProdDetail';
import { Caisse } from 'src/app/entitys/Caisse';
import { DepenceService } from 'src/app/services/depence.service';
import { CreerColis } from 'src/app/entitys/CreerColis';
import { CreerColisService } from 'src/app/services/creer-colis.service';

@Component({
  selector: 'app-cree-colis',
  templateUrl: './cree-colis.component.html',
  styleUrls: ['./cree-colis.component.css']
})
export class CreeColisComponent {
  idForDelete:any;
  myProd:any;
  mySecondProd:any;
  obj: any;
  objUpdate:any;
  myThirdProd:any;
  myPd:any;
  myCs:any;
  validateRequest:any;
  currentId:any;

  myColisPaye:any;
  myColisImprime:any;
  myTotalCom:any;
  myTotalCoutAchat:any;
  myTotalRetour:any;
  myRevenueTotal:any;
  myNbrArticle:any;
  myNbrCaisse:any;
  myTotalDepence:any;

  etat:any[] = [
    "EN COURS",
    "ANNULÉE",
    "LIVRÉ",
  ];

  livreurs:any[] = [
    "droppex",
    "amir",
    "autre",
  ];

  gouvernorats:any[]=[
    "Tunis",
    "Ariana",
    "Ben Arous",
    "La Manouba",
    "Nabeul",
    "Zaghouan",
    "Bizerte",
    "Béja",
    "Jendouba",
    "Le Kef",
    "Siliana",
    "Kairouan",
    "Kasserine",
    "Sidi Bouzid",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Sfax",
    "Gafsa",
    "Tozeur",
    "Kébili",
    "Tataouine",
    "Médenine",
    "Gabès",
  ];


  constructor(
    private renderer: Renderer2,
    private prod:ProduitService, 
    private cs:CaisseService,
    private pd:ProdDetailService,
    private location: Location,
    private dp:DepenceService,
    private ccs:CreerColisService
    ){}

  @ViewChild('navigationItems') navigationItems!: ElementRef;

  @ViewChild('popupDel') popupDel: any;
  @ViewChild('popupCrea') popupCrea: any;
  @ViewChild('popupPlus') popupPlus: any;
  @ViewChild('popupUpd') popupUpd: any;
  @ViewChild('productUptForm') form :any;

  deleteRequestAppoint(){
    alert("oui");
  }


  creerColis(p:any){
    const myColis = new CreerColis(
      0,
      p.dateCreation,
      p.prix,
      p.numeroPortable,
      p.nomComplet,
      p.adresse,
      p.gouvernorat,
      p.nomProduit,
      p.notes,
      "EN COURS",
      p.livreur,
      p.imprimer
    )
    console.log("test : ",myColis)

    this.ccs.ajoutCreerColis(myColis).subscribe(
      (Response)=>{
        this.validateRequest=true;
        console.log("valide response : "+ Response);
        setTimeout(() => {
          this.validateRequest = false;
          this.refreshPage();
        }, 2000);
      },
      (error)=>{
        console.log("Error :"+ error );
      }
    )
  }


  ngOnInit() {
    this.validateRequest=false;
    this.prod.getProduct().subscribe(data=>{
      data=JSON.parse(data)
      this.myProd = data;
      console.log("produit",this.myProd);

      this.myColisPaye = data.reduce((acc:any, currentItem:any) => acc + currentItem.colisPayer, 0);
      console.log("this.myColisPaye : ",this.myColisPaye);

      this.myColisImprime = data.reduce((acc:any, currentItem:any) => acc + currentItem.colisImprimer, 0);
      console.log("this.myColisImprime : ",this.myColisImprime);

      this.myTotalCom = data.reduce((acc:any, currentItem:any) => acc + currentItem.com, 0).toFixed(2);
      console.log("this.myTotalCom : ",this.myTotalCom);
      
      this.myTotalCoutAchat = data.reduce((acc:any, currentItem:any) => acc + currentItem.coutAchat, 0);
      console.log("this.myTotalCoutAchat : ",this.myTotalCoutAchat);

      this.myTotalRetour = data.reduce((acc:any, currentItem:any) => acc + currentItem.retour, 0);
      console.log("this.myTotalRetour : ",this.myTotalRetour);

      this.myRevenueTotal = data.reduce((acc:any, currentItem:any) => acc + currentItem.revenue, 0).toFixed(2);
      console.log("myRevenueTotal : ",this.myRevenueTotal)

      this.myNbrArticle = data.length;
      console.log("myNbrArticle : ",this.myNbrArticle)
    })

    this.prod.getProdDetaille().subscribe(d=>{
      d=JSON.parse(d)
      this.mySecondProd = d;
      console.log("prod detaille : ",this.mySecondProd)
    })

    this.cs.getCaisse().subscribe(d=>{
      d=JSON.parse(d)
      this.myThirdProd = d;
      console.log("caisse : ",this.myThirdProd)
      this.myNbrCaisse = d.length;
      console.log("myNbrCaisse : ",this.myNbrCaisse)

    })

    this.dp.getDepence().subscribe(p=>{
      p=JSON.parse(p)
      console.log("dep:",p);

      this.myTotalDepence = p.reduce((acc:any, currentItem:any) => acc + currentItem.montant, 0).toFixed(2);
      console.log("myTotalDepence : ",this.myTotalDepence)
    })
  }




















  refreshPage() {
    // Refresh the page
    window.location.reload();
  }

  
getProducts(dat: any) {
  dat.idCaisse = parseInt(dat.idCaisse, 10);
  dat.idProdDetail = parseInt(dat.idProdDetail, 10);

  // Use forkJoin to wait for both observables to complete
  forkJoin([
    this.pd.getProdDetaille(),
    this.cs.getCaisse(),
  ]).subscribe(([prodDetailData, caisseData]) => {
      // Handle prodDetailData and caisseData as needed
      for (let i = 0; i < prodDetailData.length; i++) {
        if (dat.nomArticle == prodDetailData[i].nomArticle) {
          this.myPd = prodDetailData[i];
        }
      }

      for (let i = 0; i < caisseData.length; i++) {
        if (dat.productName == caisseData[i].productName) {
          this.myCs = caisseData[i];
        }
      }

      const myProd = new Produit(
        dat.mois, 
        dat.societeLivraison, 
        0,
        dat.colisImprimer, 
        dat.colisPayer, 
        dat.retour, 
        dat.com, 
        dat.coutAchat, 
        //dat.pourcentageRetour, 
        //dat.revenue,
        this.myPd,
        this.myCs,
    );
    console.log("myProd : ", myProd);
    this.prod.ajoutProdui(myProd).subscribe(
      (rslt) => {
        this.validateRequest=true;
        setTimeout(() => {
          this.validateRequest = false;
          this.refreshPage();
        }, 3000);
        console.log("Bonne requête");
        console.warn(rslt);
        this.hidePopupCrea();
      },
      (error) => {
        console.log("Mauvaise requête");
        console.error(error);
      }
    );
    
  });
  console.log("validate request : ",this.validateRequest)


}

// getProdUpt est la methode correcte pour la mise a jour
  getProdUpt(p :any){
    p.idCaisse = parseInt(p.idCaisse, 10);
    p.idProdDetail = parseInt(p.idProdDetail, 10);
    forkJoin([
      this.pd.getProdDetaille(),
      this.cs.getCaisse(),
    ]).subscribe(([prodDetailData, caisseData]) => {
        // Handle prodDetailData and caisseData as needed
        for (let i = 0; i < prodDetailData.length; i++) {
          if (p.nomArticle == prodDetailData[i].nomArticle) {
            this.myPd = prodDetailData[i];
            
          }
        }
        console.log("this.myPd ",this.myPd)
        for (let i = 0; i < caisseData.length; i++) {
          if (p.productName == caisseData[i].productName) {
            this.myCs = caisseData[i];
          }
        }

    console.log("p : ",p);
    const myProd = new Produit(
      p.mois, 
      p.societeLivraison, 
      p.idProduit,
      p.colisImprimer, 
      p.colisPayer, 
      p.retour, 
      p.com, 
      p.coutAchat, 
      this.myPd,
      this.myCs,
  );

      this.prod.updateProduit(myProd).subscribe(d=>{
        console.log("cbon");
            this.refreshPage();
          console.log("Bonne requête");
          this.hidePopupUpd();
      })

    })
  }

  // pour la suppression ______________________________________________
  showPopup(p:any) {
    
console.log(p)


    const popupElement = this.popupDel.nativeElement;
    setTimeout(() => {
      this.renderer.setStyle(popupElement, 'display', 'flex');
    }, 100);
    this.renderer.setStyle(popupElement, 'transition', '0.9s');

  }

  hidePopup() {
    const popupElement = this.popupDel.nativeElement;
    this.renderer.setStyle(popupElement, 'transition', '0.9s');
    setTimeout(() => {
      this.renderer.setStyle(popupElement, 'display', 'none');
    }, 100);
  }

    // pour plus de detaille __________________________________________
    showPopupPlus(p:any) {
      this.obj = p;
      console.log('my obj : ' ,this.obj);
      const popupElement = this.popupPlus.nativeElement;
      setTimeout(() => {
        this.renderer.setStyle(popupElement, 'display', 'flex');
      }, 100);
      this.renderer.setStyle(popupElement, 'transition', '0.9s');
  
    }
    hidePopupPlus() {
      const popupElement = this.popupPlus.nativeElement;
      this.renderer.setStyle(popupElement, 'transition', '0.9s');
      setTimeout(() => {
        this.renderer.setStyle(popupElement, 'display', 'none');
      }, 100);
    }

  // pour la creation ______________________________________________
  showPopupCrea() {
    const popupElement1 = this.popupCrea.nativeElement;
    setTimeout(() => {
      this.renderer.setStyle(popupElement1, 'display', 'flex');
    }, 100);
    this.renderer.setStyle(popupElement1, 'transition', '0.9s');

  }
  hidePopupCrea() {
    const popupElement2 = this.popupCrea.nativeElement;
    this.renderer.setStyle(popupElement2, 'transition', '0.9s');
    setTimeout(() => {
      this.renderer.setStyle(popupElement2, 'display', 'none');
    }, 100);
  }

  // pour la modification ______________________________________________
  showPopupUpd(p:any) {

    this.currentId = p.idProduit;
    let ss = this.myProd.find((pa:any)=>{return pa.idProduit === p.idProduit}) 
     console.log("ss : ",ss);
     console.log("current id : ",this.currentId);

     this.form.setValue({ 
      idProduit:ss.idProduit,
      colisImprimer :ss.colisImprimer,
      colisPayer :ss.colisPayer,
      com :ss.com,
      coutAchat :ss.coutAchat,
      mois:ss.mois,
      nomArticle:ss.produitDetail,//this.myPd
      productName:ss.caisse,//this.myCs
      retour:ss.retour,
      societeLivraison:ss.societeLivraison,
     })

    const popupElement3 = this.popupUpd.nativeElement;
    setTimeout(() => {
      this.renderer.setStyle(popupElement3, 'display', 'flex');
    }, 100);
    this.renderer.setStyle(popupElement3, 'transition', '0.9s');

  }


  hidePopupUpd() {
    const popupElement3 = this.popupUpd.nativeElement;
    this.renderer.setStyle(popupElement3, 'transition', '0.9s');
    setTimeout(() => {
      this.renderer.setStyle(popupElement3, 'display', 'none');
    }, 100);
  }



  activeLink(event: MouseEvent): void {
    const listItems = this.navigationItems.nativeElement.querySelectorAll("li");
    listItems.forEach((item: Element) => {
      item.classList.remove("hovered");
    });

    const targetElement = event.currentTarget as HTMLElement;
    targetElement.classList.add("hovered");
  }

  toggleMenu(): void {
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");
    navigation?.classList.toggle("active");
    main?.classList.toggle("active");
  }
}
