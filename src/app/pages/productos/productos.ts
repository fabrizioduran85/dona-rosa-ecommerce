import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../../services/producto';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, UpperCasePipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit { // <-- DEBE DECIR "export class Productos"
  productos: Producto[] = [];
  busqueda: string = '';
  categoriaActiva: string = 'todos';

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  filtrarCategoria(cat: string): void {
    this.categoriaActiva = cat.toLowerCase();
  }

  agregarAlCarrito(producto: Producto): void {
    this.cartService.addToCart(producto);
  }

  get productosFiltrados(): Producto[] {
    const busquedaClean = (this.busqueda || '').trim().toLowerCase();
    const catClean = (this.categoriaActiva || 'todos').trim().toLowerCase();

    return this.productos.filter(p => {
      const coincideNombre = (p.nombre || '').toLowerCase().includes(busquedaClean);
      const prodCatClean = (p.categoria || '').trim().toLowerCase();
      
      const coincideCategoria = catClean === 'todos' || prodCatClean === catClean;

      return coincideNombre && coincideCategoria;
    });
  }
}