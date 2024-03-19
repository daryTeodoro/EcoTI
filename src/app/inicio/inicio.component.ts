import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '@firebase/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from "../lista-productos/lista-productos.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css',
    imports: [CommonModule,
        ListaProductosComponent,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,]
})
export class InicioComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  logout() {
    this.authService.signOut();
  }
}
