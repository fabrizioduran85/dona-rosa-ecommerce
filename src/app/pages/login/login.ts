import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  nombre: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.nombre) {
      this.errorMsg = 'Por favor ingresa tu correo y nombre completo.';
      return;
    }

    this.authService.login(this.email, this.nombre);
    this.router.navigate(['/dashboard']);
  }
}