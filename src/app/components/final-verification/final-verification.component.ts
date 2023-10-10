import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { Produit } from 'src/app/entitys/Produit';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProdDetailService } from 'src/app/services/prod-detail.service';
import { ProduitService } from 'src/app/services/produit.service';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { ProduitDetail } from 'src/app/entitys/ProdDetail';
import { Caisse } from 'src/app/entitys/Caisse';
import { DepenceService } from 'src/app/services/depence.service';
import { CreerColisService } from 'src/app/services/creer-colis.service';
import { CreerColis } from 'src/app/entitys/CreerColis';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'date-fns';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-final-verification',
  templateUrl: './final-verification.component.html',
  styleUrls: ['./final-verification.component.css']
})
export class FinalVerificationComponent {
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

  myCreerColis:any;
  myTotalCommandes:any;
  pageSlice:any;

  startDate: any;
  endDate: any;
  ss:any;

  livree:any;
  enCours:any;
  annuler:any;


  isPresent:any;

  verifiedPeople: any[] = [];
  notVerifiedPeople: any[] = [];



  etat:any[] = [
    "EN COURS",
    "ANNULÉE",
    "LIVRÉ",
  ];
  model = {
    etat: "EN COURS"
  };

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

  _filterText:any;
  filtredColis: CreerColis[]=[];

  get filterText(){
    return this._filterText;
  }

  set filterText(value:number){
    this._filterText = value;
    this.filtredColis = this.filterColisByNumber(value);
  }


  constructor(
    private renderer: Renderer2,
    private prod:ProduitService, 
    private cs:CaisseService,
    private pd:ProdDetailService,
    private location: Location,
    private dp:DepenceService,
    private ccs:CreerColisService, 
    private el: ElementRef,
    private route: ActivatedRoute
    ){}

  @ViewChild('navigationItems') navigationItems!: ElementRef;

  @ViewChild('popupDel') popupDel: any;
  @ViewChild('popupCrea') popupCrea: any;
  @ViewChild('popupPlus') popupPlus: any;
  @ViewChild('popupUpd') popupUpd: any;
  @ViewChild('colisUptForm') form :any;

  @ViewChild('paginator') paginator:any;//MatPaginator

  
  // dataSource:MatTableDataSource<CreerColis>;
  // ngAfterViewInit(){
  //   this.dataSource = new MatTableDataSource(this.filtredColis);
  //   this.dataSource.paginator=this.paginator;
  // }

  deleteRequestAppoint(){
    alert("oui");
  }


  ngOnInit() {




    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['verifiedPeople']) {
        this.verifiedPeople = JSON.parse(queryParams['verifiedPeople']);
      }
      if (queryParams['notVerifiedPeople']) {
        this.notVerifiedPeople = JSON.parse(queryParams['notVerifiedPeople']);
      }
    });






    this.ccs.getCreerColis().subscribe(d=>{
      this.myCreerColis = d;
      this.myTotalCommandes = d.length;
      console.log("creer colis ",this.myCreerColis);
      this.filtredColis = this.myCreerColis;
      this.pageSlice = this.myCreerColis;

      this.enCours = d.filter((item:any) => item.etat === "EN COURS");
      console.log("this.enCours",this.enCours.length)

      this.livree = d.filter((item:any) => item.etat === "LIVRÉ");
      console.log("this.livree",this.livree.length)

      this.annuler = d.filter((item:any) => item.etat === "ANNULÉE");
      console.log("this.annuler",this.annuler.length)
    }
    )      

  }

  refreshPage() {
    window.location.reload();
  }




// UpdateColis est la methode correcte pour la mise a jour
UpdateColis(p :any){

    console.log("p : ",p);
    const myColis = new CreerColis(
      p.idCreerColis,
      p.dateCreation,
      p.prix,
      p.numeroPortable,
      p.nomComplet,
      p.adresse,
      p.gouvernorat,
      p.nomProduit,
      p.notes,
      p.etat,
      p.livreur,
      p.imprimer
  );
console.log("my colis : ",myColis)

this.ccs.updateCreerColis(myColis).subscribe(
  (Response)=>{
    console.log("valide request")
    this.hidePopup();
    this.refreshPage();
  },
  (error)=>{
    alert ("Erreur lors de l'enregistrement du Colis ! ")
  }
)

  }


  hidePopup() {
    const popupElement = this.popupDel.nativeElement;
    this.renderer.setStyle(popupElement, 'transition', '0.9s');
    setTimeout(() => {
      this.renderer.setStyle(popupElement, 'display', 'none');
    }, 100);
  }

    // pour plus de detaille __________________________________________
    showPopupPlus() {
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
    
    let ss = this.myCreerColis.find((pa:any)=>{return pa.idCreerColis === p.idCreerColis}) 

     this.form.setValue({ 
      idCreerColis:ss.idCreerColis,//cbon
      dateCreation :ss.dateCreation,//cbon
      nomProduit :ss.nomProduit,
      nomComplet :ss.nomComplet,
      adresse :ss.adresse,
      gouvernorat:ss.gouvernorat,
      numeroPortable:ss.numeroPortable,//cbon
      prix:ss.prix,//cbon
      notes:ss.notes,
      etat:ss.etat,
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


  filterColisByNumber(filterTerm:number | undefined){

    if(this.myCreerColis.length === 0 || filterTerm === undefined || filterTerm === null){
      console.log("elle est null")
      this.pageSlice = this.myCreerColis;
      return this.pageSlice;
    }else{
      this.pageSlice = this.myCreerColis.filter((c:any)=>{
        return c.numeroPortable === this.filterText ; 
      })
    }
  }

  

  
}
