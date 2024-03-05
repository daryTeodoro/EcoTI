import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [AuthService],
})
export class RegistroComponent {
  firebaseService = inject(AuthService);

  @ViewChild("registro_correo") registro_correo! : ElementRef;
  @ViewChild("registro_contrasena") registro_contrasena! : ElementRef;

 constructor() { }

 ngOnInit() {
 }

 async registrar() {
  var email = this.registro_correo.nativeElement.value;
  var psw = this.registro_contrasena.nativeElement.value;
  this.firebaseService.signUp(email,psw);
}
}
