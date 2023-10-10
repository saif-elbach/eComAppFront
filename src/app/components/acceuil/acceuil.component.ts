import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProdDetailService } from 'src/app/services/prod-detail.service';
import { ProduitService } from 'src/app/services/produit.service';
import { Location } from '@angular/common';
import { ProduitDetail } from 'src/app/entitys/ProdDetail';
import { DepenceService } from 'src/app/services/depence.service';
import { CreerColisService } from 'src/app/services/creer-colis.service';
import { CreerColis } from 'src/app/entitys/CreerColis';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  idForDelete: any;
  myProd: any;
  mySecondProd: any;
  obj: any;
  objUpdate: any;
  myThirdProd: any;
  myPd: any;
  myCs: any;
  validateRequest: any;
  currentId: any;

  myColisPaye: any;
  myColisImprime: any;
  myTotalCom: any;
  myTotalCoutAchat: any;
  myTotalRetour: any;
  myRevenueTotal: any;
  myNbrArticle: any;
  myNbrCaisse: any;
  myTotalDepence: any;

  myCreerColis: any;
  myTotalCommandes: any;
  pageSlice: any;

  startDate: any;
  endDate: any;
  ss: any;

  livree: any;
  enCours: any;
  annuler: any;
  paye:any

  imprimerTrue: any;

  etat: any[] = [
    "EN COURS",
    "ANNULÉE",
    "Colis livré",
    "PAYÉ",
  ];
  model = {
    etat: "EN COURS"
  };

  livreur:any[] = [
    "droppex",
    "amir",
    "autre",
  ];

  colors: string[] = [
    "orange",
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
    "cyan",
    "magenta",
    "violet",
    "indigo",
    "gold",
    "silver",
    "teal",
    "lime",
    "olive",
    "navy",
    "maroon",
    "fuchsia",
    "aquamarine",
    "turquoise",
    "lavender",
    "salmon",
    "coral",
    "sienna",
  ];


  gouvernorats: any[] = [
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

  _filterText: any;
  filtredColis: CreerColis[] = [];

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filtredColis = this.filterColisByNumber(value);
  }


  constructor(
    private renderer: Renderer2,
    private prod: ProduitService,
    private cs: CaisseService,
    private pd: ProdDetailService,
    private location: Location,
    private dp: DepenceService,
    private ccs: CreerColisService,
    private router: Router,
  ) { }

  @ViewChild('navigationItems') navigationItems!: ElementRef;

  @ViewChild('popupDel') popupDel: any;
  @ViewChild('popupCrea') popupCrea: any;
  @ViewChild('popupPlus') popupPlus: any;
  @ViewChild('popupUpd') popupUpd: any;
  @ViewChild('colisUptForm') form: any;

  @ViewChild('paginator') paginator: any;//MatPaginator


  deleteRequestAppoint() {
    alert("oui");
  }


  navigateToImprimerBrdr(p: any) {
    const url = this.router.createUrlTree(['/app-imprimer-brdr'], {
      queryParams: { p: JSON.stringify(p) }
    }).toString();

    window.open(url, '_blank');
    this.refreshPage();

    const updtMyColis = new CreerColis(
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
      true
    );

    this.ccs.updateCreerColis(updtMyColis).subscribe(
      (Response) => {
        console.log("response after update colis :", Response);
      }, (error) => {
        console.log("error in updating colis : ", error);
      }
    )
  }


  // getBackgroundColor(p: any): string {
  //   return p.nomProduit === 'germancare' ? 'green' : '';
  // }

  getBackgroundColor(p: any) {

    if (p.livreur === 'amir') {
      return this.colors[0];
    }
    else if (p.livreur === 'droppex') {
      return this.colors[3];
    }
    else {
      return this.colors[8];
    }

  }

  ngOnInit() {






    this.ccs.getCreerColis().subscribe(d => {
      d=JSON.parse(d)
      this.myCreerColis = d;
      for (let i of this.myCreerColis) {
        if (i.imprimer == true) {
          i.imprimer = 'imprimé';
        } else {
          i.imprimer = ' ';
        }
      }



      this.myTotalCommandes = d.length;

      this.filtredColis = this.myCreerColis;


      // affichage inverse dans la page dacceuil
      this.pageSlice = this.myCreerColis.reverse().slice(0, 6);

      // home page cards
      this.enCours = d.filter((item: any) => item.etat === "EN COURS");
      console.log("this.enCours", this.enCours.length)

      this.livree = d.filter((item: any) => item.etat === "Colis livré");
      console.log("this.livree", this.livree.length)

      this.annuler = d.filter((item: any) => item.etat === "ANNULÉE");
      console.log("this.annuler", this.annuler.length)

      this.paye = d.filter((item: any) => item.etat === "PAYÉ");
      console.log("this.paye", this.paye.length)
    }
    )

    this.validateRequest = false;

    this.prod.getProduct().subscribe(
      (data) => {
        data=JSON.parse(data);
        this.myProd = data;

        // home page cards
        this.myColisPaye = data.reduce((acc: any, currentItem: any) => acc + currentItem.colisPayer, 0);

        this.myColisImprime = data.reduce((acc: any, currentItem: any) => acc + currentItem.colisImprimer, 0);

        this.myTotalCom = data.reduce((acc: any, currentItem: any) => acc + currentItem.com, 0).toFixed(2);

        this.myTotalCoutAchat = data.reduce((acc: any, currentItem: any) => acc + currentItem.coutAchat, 0);

        this.myTotalRetour = data.reduce((acc: any, currentItem: any) => acc + currentItem.retour, 0);

        this.myRevenueTotal = data.reduce((acc: any, currentItem: any) => acc + currentItem.revenue, 0).toFixed(2);

        this.myNbrArticle = data.length;
      }, (error) => {
        console.log('Error', error);
      })

    this.prod.getProdDetaille().subscribe(d => {
      d=JSON.parse(d);
      this.mySecondProd = d;
      console.log("prod detaille : ", this.mySecondProd)
    })

    this.cs.getCaisse().subscribe(d => {
      d=JSON.parse(d);
      this.myThirdProd = d;
      this.myNbrCaisse = d.length;

    })

    this.dp.getDepence().subscribe(p => {

      this.myTotalDepence = JSON.parse(p).reduce((acc: any, currentItem: any) => acc + currentItem.montant, 0).toFixed(2);
    })
  }

  refreshPage() {
    // Refresh the page
    window.location.reload();
  }

  deleteColis() {
    this.ccs.deleteCreerColis(this.idForDelete).subscribe(
      (Response) => {
        this.hidePopup();
        this.refreshPage();
      },
      (error) => {
        console.log('mauvaise requete')
      }
    )

  }

  // UpdateColis est la methode correcte pour la mise a jour
  UpdateColis(p: any) {

    console.log("p : ", p);
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
      false
    );
    console.log("mycolis lel update ",myColis);

    this.ccs.updateCreerColis(myColis).subscribe(
      (Response) => {
        this.hidePopup();
        this.refreshPage();

      },
      (error) => {
        console.log(error)
        alert("Erreur lors de l'enregistrement du Colis ! ")
      }
    )

  }

  // pour la suppression ______________________________________________
  showPopup(p: any) {
    this.idForDelete = p;

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
  showPopupUpd(p: any) {

    let ss = this.myCreerColis.find((pa: any) => { return pa.idCreerColis === p.idCreerColis })

    this.form.setValue({
      idCreerColis: ss.idCreerColis,//cbon
      dateCreation: ss.dateCreation,//cbon
      nomProduit: ss.nomProduit,
      nomComplet: ss.nomComplet,
      adresse: ss.adresse,
      gouvernorat: ss.gouvernorat,
      numeroPortable: ss.numeroPortable,//cbon
      prix: ss.prix,//cbon
      notes: ss.notes,
      etat: ss.etat, 
      livreur: ss.livreur,
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


  filterColisByNumber(filterTerm: string | undefined) {

    if (this.myCreerColis.length === 0 || filterTerm === undefined || filterTerm === null || filterTerm === '') {
      this.pageSlice = this.myCreerColis.slice(0, 6);
      return this.pageSlice;
    } else {
      this.pageSlice = this.myCreerColis.filter((c: any) => {
        return c.numeroPortable === Number(filterTerm) || c.livreur === filterTerm || c.nomProduit === filterTerm || c.etat === filterTerm;
      })
    }
  }

  onPageChange(p: PageEvent) {
    const startIndex = p.pageIndex * p.pageSize;
    let endIndex = startIndex + p.pageSize;
    if (endIndex > this.myCreerColis.length) {
      endIndex = this.myCreerColis.length;
    }
    this.pageSlice = this.myCreerColis.slice(startIndex, endIndex);
  }



}


