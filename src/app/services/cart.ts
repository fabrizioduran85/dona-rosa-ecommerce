import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './producto';

export interface CartItem extends Producto {
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  public cartOpen$ = this.cartOpenSubject.asObservable();

  addToCart(product: Producto): void {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      this.items.push({ ...product, cantidad: 1 });
    }
    this.cartSubject.next([...this.items]);
    
    // Forzar la apertura del drawer lateral
    this.cartOpenSubject.next(true);
  }

  removeFromCart(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.cartSubject.next([...this.items]);
  }

  clearCart(): void {
    this.items = [];
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  getCount(): number {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  getItems(): CartItem[] {
    return this.items;
  }
}