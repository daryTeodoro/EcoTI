import { Component, OnInit } from '@angular/core';
import { MercadoLibreService } from './mercado-libre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  productos: any[];

  constructor(private mercadoLibreService: MercadoLibreService) { }

  ngOnInit(): void {
    this.mercadoLibreService.getProductos().subscribe((data: any) => {
      // Aquí procesa los datos obtenidos de la API
      this.productos = data.results;
    });
  }
}
