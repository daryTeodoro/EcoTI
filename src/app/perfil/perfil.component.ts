import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})


export class PerfilComponent implements OnInit {
  user$: Observable<User | null>;
  
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  fotoCapturada: string | null = null;
  camaraAbierta: boolean = false;
  stream: MediaStream | null = null;

  constructor(private readonly afs: AngularFirestore, private readonly storage: AngularFireStorage, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  async abrirCamara() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.camaraAbierta = true;
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  }

  capturarFoto() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.fotoCapturada = canvas.toDataURL('image/jpeg');
  }

  async enviarFoto() {
    if (!this.fotoCapturada) {
      return;
    }

    const fotoBlob = await this.dataURLtoBlob(this.fotoCapturada);

    const storageRef = this.storage.ref('fotos/' + Date.now() + '.jpg');
    const uploadTask = storageRef.put(fotoBlob);

    await uploadTask.then(uploadSnapshot => {
      // Subida completada
      uploadSnapshot.ref.getDownloadURL().then(url => {
        const collectionName = 'misFotos';
        const data = {
          url: url,
          fecha: Date.now()
        };

        this.afs.collection(collectionName).add(data);
      });
    }).catch(err => {
      // Manejar errores en la subida
      console.error('Error al subir la foto:', err);
    });
  }

  dataURLtoBlob(dataURL: string) {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: 'image/jpeg' });
  }

  cerrarCamara() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.camaraAbierta = false;
      //this.fotoCapturada = null;
    }
  }
}

