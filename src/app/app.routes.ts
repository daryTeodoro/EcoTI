import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistroComponent} from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './authGuard/space-user.guard';
import { PublicGuard } from './authGuard/space-public.guard';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { PerfilComponent } from './perfil/perfil.component';
//import { ErrorpageComponent } from './errorpage/errorpage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/splash', pathMatch: 'full' },
    { path: 'splash', component: SplashScreenComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
    { path: 'registro', component: RegistroComponent, canActivate: [PublicGuard] },
    { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    //{ path: '**', component: ErrorpageComponent },
];
