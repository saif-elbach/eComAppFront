import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Produit } from 'src/app/entitys/Produit';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProdDetailService } from 'src/app/services/prod-detail.service';
import { ProduitService } from 'src/app/services/produit.service';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { ProduitDetail } from 'src/app/entitys/ProdDetail';
import { Caisse } from 'src/app/entitys/Caisse';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.component.html',
  styleUrls: ['./prod-detail.component.css']
})
export class ProdDetailComponent {
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

  constructor(
    private renderer: Renderer2,
    private prod:ProduitService, 
    private cs:CaisseService,
    private pd:ProdDetailService,
    private location: Location
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

  ngOnInit() {

    this.prod.getProdDetaille().subscribe(d=>{
      d=JSON.parse(d);
      this.mySecondProd = d;
      console.log("prod detaille my scd : ",this.mySecondProd)
    })

  }

  refreshPage() {
    // Refresh the page
    window.location.reload();
  }

  
addProdDetail(dat: any) {

console.log("my prod d : ",dat)

      const myProd = new ProduitDetail(
        0,
        dat.nomArticle,
        0,
        dat.coutAchatUnitaire,
        dat.prixVente,
        dat.coutLivraison,
        dat.coutUnitaireCom,
        0,
    );
    console.log("myProd : ", myProd);

    this.pd.ajoutProdDetaille(myProd).subscribe(
      (rslt) => {
        this.validateRequest=true;
        setTimeout(() => {
          this.validateRequest = false;
          this.refreshPage();
        }, 3000);
        console.log("Bonne requête");
        this.hidePopupCrea();
      },
      (error) => {
        console.log("Mauvaise requête");
        console.error(error);
      }
    );
 
  console.log("validate request : ",this.validateRequest)


}

// getProdUpt est la methode correcte pour la mise a jour
getProdDetUpt(p :any){

    

    const myProd = new ProduitDetail(
      p.idProdDetail, 
      p.nomArticle, 
      p.revenueUnitaire,
      p.coutAchatUnitaire, 
      p.prixVente, 
      p.coutLivraison, 
      p.coutUnitaireCom, 
      p.prixSansLivraison, 

  );

  console.log("p : ",myProd);
  
      this.pd.updateProdDetaille(myProd).subscribe(d=>{
        console.log("cbon");
            this.refreshPage();
          console.log("Bonne requête");
          this.hidePopupUpd();
      })

  }

  // pour la suppression ______________________________________________
  showPopup(p:any) {
    

    const myProd = new Produit(
      p.mois, 
      p.societeLivraison, 
      p.idProduit,
      p.colisImprimer, 
      p.colisPayer, 
      p.retour, 
      p.com, 
      p.coutAchat, 
      null,
      null,
  );
  console.log("produit dt d : ",this.mySecondProd[0])
  console.log("caisse d : ",this.myThirdProd[0])
  console.log("myProd d : ",myProd)

  this.prod.updateProduit(myProd).subscribe(
     (response) => {
       console.log("Updated Produit for delete.");
     });

  //     this.prod.deleteProduit(p.idProduit).subscribe(
  //       (deleteResponse) => {
  //         console.log("Deleted Produit successfully.");

  //       },
  //       (deleteError) => {
  //         console.error("Error deleting Produit:", deleteError);
  //       }
  //     );
  //   },
  //   (updateError) => {
  //     console.error("Error updating Produit:", updateError);
  //   }
  // );

  // this.prod.deleteProduit(myProd.idProduit).subscribe(d=>{
  //   console.log('deleted');
  // })


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

    let ss = this.mySecondProd.find((pa:any)=>{return pa.idProdDetail === p.idProdDetail}) 
     console.log("ss : ",ss);

     this.form.setValue({ 
      idProdDetail:ss.idProdDetail,
      nomArticle :ss.nomArticle,
      revenueUnitaire :ss.revenueUnitaire,
      coutAchatUnitaire :ss.coutAchatUnitaire,
      prixVente :ss.prixVente,
      coutLivraison:ss.coutLivraison,
      coutUnitaireCom:ss.coutUnitaireCom,
      prixSansLivraison:ss.prixSansLivraison,
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
