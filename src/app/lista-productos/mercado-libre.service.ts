// mercado-libre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q=biodegradables&limit=18';
    return this.http.get(url);
  }
}
