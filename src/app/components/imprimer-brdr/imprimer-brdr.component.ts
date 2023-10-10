import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-imprimer-brdr',
  templateUrl: './imprimer-brdr.component.html',
  styleUrls: ['./imprimer-brdr.component.css']
})

export class ImprimerBrdrComponent {

  printedColis:any
  
  constructor(private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    ) { }


    ngOnInit() {

      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams['p']) {
          this.printedColis = JSON.parse(queryParams['p']);
          console.log("my parameter : ", this.printedColis);
        }
      });

    }


}
