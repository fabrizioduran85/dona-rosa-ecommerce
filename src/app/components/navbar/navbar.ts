import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, CurrencyPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  mensajesTicker: string[] = [
    'Bienvenido a Broaster & Hamburguesas Doña Rosa 🍗🍔',
    'Hoy: 2x1 en papas fritas después de las 9pm',
    'Nuevo: Hamburguesa Doña Rosa con salsa secreta de la casa',
    'Delivery gratis en pedidos mayores a S/ 50',
    'Atendemos de 5:00 p.m. a 11:00 p.m., todos los días'
  ];
  mensajeActualIndex: number = 0;
  tickerInterval: any;

  // Control Menú Responsive
  isMenuCollapsed: boolean = true;

  // Carrito Drawer
  isCartOpen: boolean = false;
  cartItems: CartItem[] = [];
  cartCount: number = 0;
  cartTotal: number = 0;

  // Formulario Checkout
  coNombre: string = '';
  coTelefono: string = '';
  coEntrega: string = 'delivery';

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Ticker Rotativo
    this.tickerInterval = setInterval(() => {
      this.mensajeActualIndex = (this.mensajeActualIndex + 1) % this.mensajesTicker.length;
      this.cdr.detectChanges();
    }, 4000);

    // Escuchar cambios en los items del Carrito
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartCount = this.cartService.getCount();
      this.cartTotal = this.cartService.getTotal();
      this.cdr.detectChanges(); // Actualización inmediata en UI
    });

    // Escuchar la señal de apertura automática
    this.cartService.cartOpen$.subscribe(isOpen => {
      if (isOpen) {
        this.isCartOpen = true;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tickerInterval) clearInterval(this.tickerInterval);
  }

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  closeMenu(): void {
    this.isMenuCollapsed = true;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  eliminarDelCarrito(id: number): void {
    this.cartService.removeFromCart(id);
  }

  confirmarPedido(): void {
    if (this.cartItems.length === 0) {
      alert('Agrega productos al carrito antes de confirmar tu pedido.');
      return;
    }
    if (!this.coNombre.trim() || !this.coTelefono.trim()) {
      alert('Por favor completa tu nombre y número de teléfono.');
      return;
    }

    let notaEntrega = '';
    if (this.coEntrega === 'delivery') {
      notaEntrega = this.cartTotal >= 50 
        ? '¡Tu pedido supera S/ 50, el delivery es GRATIS!' 
        : 'Te llamaremos para confirmar la dirección de entrega.';
    } else {
      notaEntrega = 'Puedes recogerlo en tienda de 5:00 p.m. a 11:00 p.m.';
    }

    const detalle = this.cartItems
      .map(item => `• ${item.cantidad}x ${item.nombre} - S/ ${(item.precio * item.cantidad).toFixed(2)}`)
      .join('\n');

    const mensaje = `Hola, soy ${this.coNombre} (${this.coTelefono}).\nQuiero pedir:\n${detalle}\n\nTotal: S/ ${this.cartTotal.toFixed(2)}\n${notaEntrega}\n¡Gracias!`;

    alert(mensaje);
    const url = `https://wa.me/51987654321?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    this.cartService.clearCart();
    this.isCartOpen = false;
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.closeMenu();
  }
}