import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Cambiamos localhost por la URL pública de My JSON Server
  private apiUrl = 'https://my-json-server.typicode.com/fabrizioduran85/dona-rosa-ecommerce/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}