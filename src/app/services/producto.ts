import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  private apiUrl = 'https://my-json-server.typicode.com/fabrizioduran85/dona-rosa-ecommerce/productos';

  // Productos de respaldo por si falla el servidor externo
  private productosFallback: Producto[] = [
    {
      id: 1,
      nombre: "Combo Familiar Broaster",
      imagen: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500",
      categoria: "Combos",
      precio: 45.00,
      stock: 15,
      descripcion: "8 piezas de pollo broaster crujiente + Papas familiares + Chicha de 1L"
    },
    {
      id: 2,
      nombre: "Hamburguesa Doña Rosa Especial",
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      categoria: "Hamburguesas",
      precio: 18.50,
      stock: 20,
      descripcion: "Carne artesanal 180g, queso edam, tocino, huevo y cremas de la casa"
    },
    {
      id: 3,
      nombre: "Combo Dúo Broaster",
      imagen: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=500",
      categoria: "Combos",
      precio: 28.00,
      stock: 10,
      descripcion: "4 piezas de pollo + Papas medianas + 2 Gaseosas de 500ml"
    },
    {
      id: 4,
      nombre: "Hamburguesa Royal",
      imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500",
      categoria: "Hamburguesas",
      precio: 15.00,
      stock: 25,
      descripcion: "Carne artesanal, queso, huevo frito, lechuga y tomate"
    },
    {
      id: 5,
      nombre: "Chicha Morada 1L",
      imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500",
      categoria: "Bebidas",
      precio: 8.00,
      stock: 30,
      descripcion: "Refresco natural de maíz morado con piña y canela"
    },
    {
      id: 6,
      nombre: "Inca Kola 1.5L",
      imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
      categoria: "Bebidas",
      precio: 9.50,
      stock: 40,
      descripcion: "Gaseosa helada de 1.5 litros"
    }
  ];

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('Servidor externo no disponible. Usando datos de respaldo.');
        return of(this.productosFallback);
      })
    );
  }
}