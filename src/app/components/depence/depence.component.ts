import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Depence } from 'src/app/entitys/Depence';
import { CaisseService } from 'src/app/services/caisse.service';
import { DepenceService } from 'src/app/services/depence.service';
import { ProdDetailService } from 'src/app/services/prod-detail.service';

@Component({
  selector: 'app-depence',
  templateUrl: './depence.component.html',
  styleUrls: ['./depence.component.css']
})
export class DepenceComponent implements OnInit{
  idForDelete:any;
  myDepence:any;
  mySecondProd:any;
  myThirdProd:any;
  myPd:any;
  myCs:any;
  validateRequest:any;
  myProd:any;

  constructor(
    private renderer: Renderer2,
    private depence:DepenceService,
    private prod:ProdDetailService,
    private cs:CaisseService,
    private dep:DepenceService
    ){}

  @ViewChild('navigationItems') navigationItems!: ElementRef;

  @ViewChild('popupDel') popupDel: any;
  @ViewChild('popupCrea') popupCrea: any;
  @ViewChild('popupUpd') popupUpd: any;
  @ViewChild('depenceUptForm') form :any;


  refreshPage() {
    // Refresh the page
    window.location.reload();
  }

  ngOnInit() {
    this.depence.getDepence().subscribe(d=>{
      d=JSON.parse(d)
      this.myDepence=d;
      console.log(this.myDepence);
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

    })
  }


  getDepences(dat: any) {
    dat.idCaisse = parseInt(dat.idCaisse, 10);
    dat.idProdDetail = parseInt(dat.idProdDetail, 10);

        this.cs.getCaisse().subscribe((d) => {
          d=JSON.parse(d)
          for (let i = 0; i < d.length; i++) {
            if (dat.productName == d[i].productName) {
              this.myCs = d[i];
            }
          }
  
        const myDep = new Depence(
          0,
          dat.dateDepence,
          dat.nomArticle,
          dat.nomProduitAcheter,
          dat.montant,
          dat.nomMembre,
          this.myCs,
      );
      console.log("myDep : ", myDep);
          
      this.depence.ajoutDepence(myDep).subscribe(
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
  
  
  }
  deleteDepence() {
    console.log("this.idForDelete ; ",this.idForDelete)
    this.dep.deleteDepence(this.idForDelete).subscribe(
      (Response) => {
        this.hidePopup();
        this.refreshPage();
      },
      (error) => {
        console.log('mauvaise requete')
      }
    )

  }

  updateDepence(dat:any){
        this.cs.getCaisse().subscribe((d) => {
          d=JSON.parse(d)
          for (let i = 0; i < d.length; i++) {
            if (dat.productName == d[i].productName) {
              this.myCs = d[i];
            }
          }
          console.log("id : ",dat.idDepence)
  
        const myDep = new Depence(
          dat.idDepence,
          dat.dateDepence,
          dat.nomArticle,
          dat.nomProduitAcheter,
          dat.montant,
          dat.nomMembre,
          this.myCs,
      );
      console.log("myDep : ", myDep);

      this.depence.updateDepence(myDep).subscribe(
        (response)=>{
          console.log('updated successfult !')
          this.hidePopupUpd();
          this.refreshPage();
      })

  })
}

  // pour la suppression ______________________________________________
  showPopup(i:any) {
    this.idForDelete=i.idDepence;
    console.log("my i :: ",i.idDepence)
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

    const popupElement3 = this.popupUpd.nativeElement;
    setTimeout(() => {
      this.renderer.setStyle(popupElement3, 'display', 'flex');
    }, 100);
    this.renderer.setStyle(popupElement3, 'transition', '0.9s');

    let ss = this.myDepence.find((pa:any)=>{return pa.idDepence === p.idDepence}) 
    console.log("ss : ",ss);

    this.form.setValue({ 
     idDepence:ss.idDepence,
     dateDepence:ss.dateDepence,
     nomArticle:ss.nomArticle,
     nomProduitAcheter:ss.nomProduitAcheter,
     montant:ss.montant,
     nomMembre:ss.nomMembre,
     productName:ss.caisse,
    })

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
