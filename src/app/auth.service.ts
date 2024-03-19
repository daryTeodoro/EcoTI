import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  getAuth() {
    return getAuth();
  }

  getUser(): Observable<User | null> {
    return this.afAuth.authState;
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      //console.log('Inicio de sesión exitoso');
      this.router.navigateByUrl('/inicio');
    } catch (error) {
      //console.error('Error al iniciar sesión', error.message);
      alert("Correo o Contraseña Incorrectos")
    }
  }

  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      //console.log('Registro exitoso');
      this.router.navigateByUrl('/inicio');
    } catch (error) {
      //console.error('Error al registrarse', error.message);
      alert("No se pudo registrar el usuario")
    }
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
}
