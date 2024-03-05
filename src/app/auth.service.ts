import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

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

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log('Inicio de sesión exitoso');
      // Puedes realizar otras acciones después de un inicio de sesión exitoso si es necesario
    } catch (error) {
      console.error('Error al iniciar sesión', error.message);
      // Puedes manejar el error o mostrar un mensaje al usuario
    }
  }

  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      console.log('Registro exitoso');
      // Puedes realizar otras acciones después de un registro exitoso si es necesario
    } catch (error) {
      console.error('Error al registrarse', error.message);
      // Puedes manejar el error o mostrar un mensaje al usuario
    }
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.routerlink('/auth');
  }

  routerlink(url: any) {
    this.router.navigateByUrl(url);
  }
}
