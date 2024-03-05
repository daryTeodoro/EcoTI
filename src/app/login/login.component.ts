import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})


export class LoginComponent {
  firebaseService = inject(AuthService);

  @ViewChild("login_correo") login_correo! : ElementRef;
  @ViewChild("login_contrasena") login_contrasena! : ElementRef;
  

  constructor() { }

  ngOnInit() {
  }

  async ingresar() {
    var email = this.login_correo.nativeElement.value;
    var psw = this.login_contrasena.nativeElement.value;
    this.firebaseService.signIn(email,psw);
  }
}
