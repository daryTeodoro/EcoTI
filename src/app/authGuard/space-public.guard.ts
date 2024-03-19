import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // <-- Importa el AuthService
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.getUser().pipe(
      take(1),
      map(user => {
        if (user) {
          this.router.navigateByUrl('/inicio');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
