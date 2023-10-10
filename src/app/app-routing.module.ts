import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGCComponent } from 'src/app/components/dashboard-gc/dashboard-gc.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { StockComponent } from 'src/app/components/stock/stock.component';
import { DepenceComponent } from 'src/app/components/depence/depence.component';
import { FournisseurComponent } from 'src/app/components/fournisseur/fournisseur.component';
import { LivraisonComponent } from 'src/app/components/livraison/livraison.component';
import { StatComponent } from 'src/app/components/stat/stat.component';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { CaisseComponent } from 'src/app/components/caisse/caisse.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { ProdDetailComponent } from './components/prod-detail/prod-detail.component';
import { CreeColisComponent } from './components/cree-colis/cree-colis.component';
import { FiltredColisPageComponent } from './components/filtred-colis-page/filtred-colis-page.component';
import { CompareCommandesComponent } from './components/compare-commandes/compare-commandes.component';
import { FinalVerificationComponent } from './components/final-verification/final-verification.component';
import { ImprimerBrdrComponent } from './components/imprimer-brdr/imprimer-brdr.component';
import { AuthGuard } from './AuthGard/AuthGuard';
import { LoginCaisseComponent } from './components/login-caisse/login-caisse.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard-gc',component:DashboardGCComponent,canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'app-stock',component:StockComponent,canActivate: [AuthGuard]},
  {path:'app-depence',component:DepenceComponent,canActivate: [AuthGuard]},
  {path:'app-fournisseur',component:FournisseurComponent,canActivate: [AuthGuard]},
  {path:'app-livraison',component:LivraisonComponent,canActivate: [AuthGuard]},
  {path:'app-stat',component:StatComponent,canActivate: [AuthGuard]},
  {path:'app-nav',component:NavComponent,canActivate: [AuthGuard]},
  {path:'app-caisse',component:CaisseComponent,canActivate: [AuthGuard]},
  {path:'app-acceuil',component:AcceuilComponent,canActivate: [AuthGuard] },
  {path:'app-prod-detail',component:ProdDetailComponent,canActivate: [AuthGuard]},
  {path:'app-cree-colis',component:CreeColisComponent,canActivate: [AuthGuard]},
  {path:'app-filtred-colis-page',component:FiltredColisPageComponent,canActivate: [AuthGuard]},
  {path:'app-compare-commandes',component:CompareCommandesComponent,canActivate: [AuthGuard]},
  {path:'app-final-verification',component:FinalVerificationComponent,canActivate: [AuthGuard]},
  {path:'app-login-caisse',component:LoginCaisseComponent,canActivate: [AuthGuard]},
  {path:'app-imprimer-brdr',component:ImprimerBrdrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const tableComponents = 
[
  DashboardGCComponent,
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
]
