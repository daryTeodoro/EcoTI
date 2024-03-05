import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistroComponent} from './registro/registro.component';
import { HomeComponent } from './home/home.component';
//import { ErrorpageComponent } from './errorpage/errorpage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    //{ path: '**', component: ErrorpageComponent },
];
