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

  private productosFallback: Producto[] = [
    {
      id: 1,
      nombre: "Combo Familiar Broaster",
      imagen: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop&q=80",
      categoria: "Combos",
      precio: 45.00,
      stock: 15,
      descripcion: "8 piezas de pollo broaster crujiente + Papas familiares + Chicha Morada de 1.5L"
    },
    {
      id: 2,
      nombre: "Combo Dúo Broaster",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbEW76wlbTWA5NFL_kO_KtubkZaWEb9kvKbrk0BjqN2X3bm7m9Cjr0dzw&s=10",
      categoria: "Combos",
      precio: 28.00,
      stock: 20,
      descripcion: "4 piezas de pollo broaster + Papas medianas + 2 Gaseosas Personal"
    },
    {
      id: 3,
      nombre: "Combo Personal Broaster",
      imagen: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
      categoria: "Combos",
      precio: 16.50,
      stock: 25,
      descripcion: "2 piezas de pollo broaster + Papas fritas + Gaseosa 500ml"
    },
    {
      id: 4,
      nombre: "Combo HamburBroaster",
      imagen: "https://tofuu.getjusto.com/orioneat-local/resized2/4Zg3b29e8fYXFT9ww-2400-x.webp",
      categoria: "Combos",
      precio: 32.00,
      stock: 18,
      descripcion: "1 Hamburguesa Clásica + 2 piezas de pollo broaster + Papas + Bebida"
    },
    {
      id: 5,
      nombre: "Hamburguesa Doña Rosa Especial",
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
      categoria: "Hamburguesas",
      precio: 18.50,
      stock: 20,
      descripcion: "Carne artesanal 180g, queso edam, tocino, huevo frito y cremas de la casa"
    },
    {
      id: 6,
      nombre: "Hamburguesa Royal",
      imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
      categoria: "Hamburguesas",
      precio: 15.00,
      stock: 22,
      descripcion: "Carne artesanal, queso fundido, huevo frito, lechuga y tomate"
    },
    {
      id: 7,
      nombre: "Hamburguesa Doble Carne",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9J9N1_bHsrppcNbUxbExtml617LsGffYkiAJn213Iyw5VI5ccWLckFc&s=10",
      categoria: "Hamburguesas",
      precio: 22.00,
      stock: 12,
      descripcion: "Doble carne artesanal de 150g, doble cheddar, tocino ahumado y salsa BBQ"
    },
    {
      id: 8,
      nombre: "Hamburguesa de Pollo Crujiente",
      imagen: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80",
      categoria: "Hamburguesas",
      precio: 16.00,
      stock: 18,
      descripcion: "Filete de pechuga empanizado estilo broaster, col, pepinillos y mayonesa"
    },
    {
      id: 9,
      nombre: "Porción de Papas Nativas Fritas",
      imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
      categoria: "Porciones",
      precio: 9.00,
      stock: 30,
      descripcion: "Porción generosa de papas nativas crocantes con sal marina"
    },
    {
      id: 10,
      nombre: "Porción de Camote Frito",
      imagen: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80",
      categoria: "Porciones",
      precio: 8.50,
      stock: 25,
      descripcion: "Crujientes rodajas de camote frito ideal para acompañar tu broaster"
    },
    {
      id: 11,
      nombre: "Porción de Salchipapa Clásica",
      imagen: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80",
      categoria: "Porciones",
      precio: 12.00,
      stock: 20,
      descripcion: "Papas fritas con salchicha de primera calidad y todas las cremas"
    },
    {
      id: 12,
      nombre: "Tequeños de Queso (6 und)",
      imagen: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&auto=format&fit=crop&q=80",
      categoria: "Porciones",
      precio: 11.00,
      stock: 15,
      descripcion: "Tequeños doraditos rellenos de queso edam acompañados de palta o salsa guacamole"
    },
    {
      id: 13,
      nombre: "Chicha Morada Artesanal 1L",
      imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&auto=format&fit=crop&q=80",
      categoria: "Bebidas",
      precio: 8.00,
      stock: 35,
      descripcion: "Refresco natural hervido con maíz morado, piña, manzana y canela"
    },
    {
      id: 14,
      nombre: "Limonada Frozen 1L",
      imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
      categoria: "Bebidas",
      precio: 9.00,
      stock: 30,
      descripcion: "Refrescante limonada granizada recién hecha"
    },
    {
      id: 15,
      nombre: "Inca Kola 1.5L",
      imagen: "https://www.papajohns.com.pe/media/catalog/product/1/4/14940_1.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
      categoria: "Bebidas",
      precio: 9.50,
      stock: 40,
      descripcion: "Gaseosa helada de 1.5 litros"
    },
    {
      id: 16,
      nombre: "Coca Cola Sin Azúcar 1.5L",
      imagen: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80",
      categoria: "Bebidas",
      precio: 9.50,
      stock: 35,
      descripcion: "Gaseosa helada sabor original sin azúcar de 1.5L"
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