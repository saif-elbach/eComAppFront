import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, tableComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardGCComponent } from 'src/app/components/dashboard-gc/dashboard-gc.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { StockComponent } from 'src/app/components/stock/stock.component';
import { DepenceComponent } from 'src/app/components/depence/depence.component';
import { FournisseurComponent } from 'src/app/components/fournisseur/fournisseur.component';
import { LivraisonComponent } from 'src/app/components/livraison/livraison.component';
import { StatComponent } from 'src/app/components/stat/stat.component';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { CaisseComponent } from 'src/app/components/caisse/caisse.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { ProdDetailComponent } from './components/prod-detail/prod-detail.component';
import { CreeColisComponent } from './components/cree-colis/cree-colis.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FiltredColisPageComponent } from './components/filtred-colis-page/filtred-colis-page.component';
import { CompareCommandesComponent } from './components/compare-commandes/compare-commandes.component';
import { FinalVerificationComponent } from './components/final-verification/final-verification.component';
import { ImprimerBrdrComponent } from './components/imprimer-brdr/imprimer-brdr.component';
import { RestApiService } from './services/rest-api.service';
import { HttpInterceptorService } from './services/httpInterceptorService';
import { LoginCaisseComponent } from './components/login-caisse/login-caisse.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGCComponent,
    tableComponents,
    LoginComponent,
    StockComponent,
    DepenceComponent,
    FournisseurComponent,
    LivraisonComponent,
    StatComponent,
    NavComponent,
    CaisseComponent,
    AcceuilComponent,
    ProdDetailComponent,
    CreeColisComponent,
    FiltredColisPageComponent,
    CompareCommandesComponent,
    FinalVerificationComponent,
    ImprimerBrdrComponent,
    LoginCaisseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [RestApiService, 
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: HttpInterceptorService,
  //   multi: true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
