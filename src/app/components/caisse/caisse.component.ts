import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Caisse } from 'src/app/entitys/Caisse';
import { CaisseService } from 'src/app/services/caisse.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit{
  idForDelete:any;
  maCaisse:any;
  validateRequest:any;
  myIdForDelete:any;

  constructor(private renderer: Renderer2,private caisse : CaisseService){}





  @ViewChild('navigationItems') navigationItems!: ElementRef;

  @ViewChild('popupDel') popupDel: any;
  @ViewChild('popupCrea') popupCrea: any;
  @ViewChild('popupUpd') popupUpd: any;
  @ViewChild('caisseUptForm') form :any;

  deleteRequestAppoint(){
    alert("oui");
  }

  
  refreshPage() {
    // Refresh the page
    window.location.reload();
  }
  

  ngOnInit() {

      this.caisse.getCaisse().subscribe(data=>
        {
          data=JSON.parse(data)
          this.maCaisse = data;
        }
      )
    
  }

  addCaisse(c:any){
    console.log("c",c)
    const cs = new Caisse(
      c.productName,
      0,
      0,
    );
    console.log("ma caisse : ",cs)
    this.caisse.ajoutCaisse(cs).subscribe(
      (Response)=>{
      console.log("caisse ajouté avec succée")
      this.validateRequest=true;
      setTimeout(() => {
        this.validateRequest = false;
        this.refreshPage();
      }, 3000);
      this.hidePopupCrea();
    })
  }

  deleteCaisse(){
    this.caisse.deleteCaisse(this.myIdForDelete).subscribe(
      (Response)=>{
        console.log(Response,"caisse supprimé avec succée")
        this.hidePopup();
        this.refreshPage();
      }
    ,(error)=>{
      console.log(error)
    })
  }
  
  // pour la suppression ______________________________________________
  showPopup(i:any) {
    this.myIdForDelete = i;
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

  
  updateCaisse(p:any){
    
    const myCaisse = new Caisse(p.productName,p.idCaisse,p.revenueTotale);
    console.log('confirmed caisse : ',myCaisse)

    this.caisse.updateCaisse(myCaisse).subscribe(
      (Response)=>{
        console.log("response", Response );
        this.hidePopupUpd();
        this.refreshPage();
    }, (error)=>{
      console.log ("erreur de modification");
    }
    )

  }


  // pour la modification ______________________________________________
  showPopupUpd(p:any) {

    let ss = this.maCaisse.find((pa:any)=>{return pa.idCaisse === p.idCaisse}) 
     console.log("caisse : ",ss);

     this.form.setValue({ 
      idCaisse:ss.idCaisse,
      productName :ss.productName,
      revenueTotale :ss.revenueTotale,
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
