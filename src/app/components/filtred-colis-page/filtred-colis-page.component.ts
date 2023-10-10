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
import { CreerColisService } from 'src/app/services/creer-colis.service';
import { CreerColis } from 'src/app/entitys/CreerColis';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-filtred-colis-page',
  templateUrl: './filtred-colis-page.component.html',
  styleUrls: ['./filtred-colis-page.component.css']
})
export class FiltredColisPageComponent {
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
  pageSlice2:any;

  startDate: any;
  endDate: any;
  filteredOrders:any;

  myGlobalColisArray:any;

  ss:any;

  selectedOrders: any[] = [];

  etat:any[] = [
    "EN COURS",
    "ANNULÉE",
    "LIVRÉ",
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


  downloadCsvFile(){
    var options = { 
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'excel Orders',
      useBom: true,
      headers: ["ID", "Etat","Date", "Prix", "Numero", "Client", "Adresse", "Gouvernorat", "Article", "Note","Livreur", "Imprimé"]
    };
   
    new ngxCsv(this.filteredOrders, 'excel Orders', options);
  }





  _filterText:any;
  filtredColis: CreerColis[]=[];

  get filterText(){
    return this._filterText;
  }

  set filterText(value:number){
    this._filterText = value;
  }


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
  @ViewChild('colisUptForm') form :any;

  @ViewChild('paginator') paginator:any;//MatPaginator
  //@ViewChild('content',{static:false}) el !:ElementRef;

  @ViewChild('selectedRowsContainer', { static: false }) selectedRowsContainer!: ElementRef;




  deleteRequestAppoint(){
    alert("oui");
  }





  ngOnInit() {
    this.applyDateFilter();

    this.ccs.getCreerColis().subscribe(d=>{
      d=JSON.parse(d)
      this.myCreerColis = d;
      this.myTotalCommandes = d.length;
      console.log("creer colis ",this.myCreerColis);
    }
    )      
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

deleteColis(){
  this.ccs.deleteCreerColis(this.idForDelete).subscribe(
    (Response)=>{
      console.log("valide request")
      this.hidePopup();
      this.refreshPage();
    },
    (error)=>{
      console.log('mauvaise requete')
    }
  )
  
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

  // pour la suppression ______________________________________________
  showPopup(p:any) {
    this.idForDelete = p;
console.log(this.idForDelete)

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

     console.log(p)

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


  applyDateFilter() {
    this.ss=false;
    if (this.startDate && this.endDate) {
      const formattedStartDate = parse(this.startDate, 'yyyy-MM-dd', new Date());
      const formattedEndDate = parse(this.endDate, 'yyyy-MM-dd', new Date());

      this.filteredOrders = this.myCreerColis.filter((order:any) => {
        const orderDate = parse(order.dateCreation, 'yyyy-MM-dd', new Date());
        console.log("order date : ",orderDate);
        this.ss = true;
        return orderDate >= formattedStartDate && orderDate <= formattedEndDate;
      });
    }
    console.log("this.filteredOrders inside : ",this.filteredOrders);
    
  }
  
  makePdf() {
    // Filter the orders based on selected checkboxes
    this.selectedOrders = this.filteredOrders.filter((order: any) => order.selected);

    if (this.selectedOrders.length === 0) {
      alert("No selected orders to generate PDF.");
      return;
    }

    // Create a new jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

      // Define the margins (in millimeters)
  const topMargin = 5;
  const leftMargin = 5;
  const rightMargin = 5;

    // Define the HTML element that you want to convert to PDF
    const elementToConvert = this.selectedRowsContainer.nativeElement;
    console.log("elementToConvert -- ",elementToConvert)

    setTimeout(() => {
        // Use html2canvas to convert the HTML element to an image
        html2canvas(elementToConvert, { scale: 4 }).then(canvas => {
              // Convert the canvas to a data URL
              const imgData = canvas.toDataURL('image/png');

              // Add the image to the PDF with specified dimensions
              const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - leftMargin - rightMargin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', leftMargin, topMargin, imgWidth, imgHeight);
              // Save the PDF with a specific file name
              pdf.save("Liste_Amir.pdf");
        });
    }, 1000);
  }
  
  
  
  
  

  
}
