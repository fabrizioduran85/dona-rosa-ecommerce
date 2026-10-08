import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_KEY = 'usuario_dona_rosa';

  // Guardar en LocalStorage al iniciar sesión
  login(email: string, nombre: string): void {
    const usuario = { email, nombre, fechaLogin: new Date() };
    localStorage.setItem(this.USER_KEY, JSON.stringify(usuario));
  }

  // Borrar de LocalStorage al cerrar sesión
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Verificar si hay usuario activo
  isLoggedIn(): boolean {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  // Obtener los datos del usuario logueado
  getUser(): any {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}