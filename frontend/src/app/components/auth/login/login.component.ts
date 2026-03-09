import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service'; // 👈 Necesario para validar en DB
import { AuthService } from '../../../services/auth/auth.service'; // 👈 Necesario para guardar sesión

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorLogin: string = '';
  loginExitoso: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // Documento es numérico según tu estructura de pgAdmin
      document: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Ajustado a 6 para pruebas
      remember: [false],
    });
  }

onLogin(): void {
  this.errorLogin = '';
  this.loginExitoso = '';

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { document, password } = this.loginForm.value;

  this.userService.getUsers().subscribe({
    next: (users) => {
      const user = users.find(u =>
        String(u.document).trim() === String(document).trim() && 
        String(u.password) === String(password)
      );

      if (user) {
        this.loginExitoso = `¡Hola ${user.name}! Entrando... a ScrAppi`;
        
        // --- 💡 INTEGRACIÓN AQUÍ ---
        // 1. Guardamos en el servicio (como ya lo hacías)
        this.authService.setSession(user); 
        
        // 2. FORZAMOS el guardado en localStorage para el AuthGuard
        // Asegúrate de que el nombre 'usuarioSesion' coincida con el que pusiste en el guard.
        localStorage.setItem('usuarioSesion', JSON.stringify(user)); 
        // ---------------------------

        this.cdr.detectChanges();

        setTimeout(() => {
          // Usamos { replaceUrl: true } para que no puedan volver atrás al login
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        }, 2000);

      } else {
        this.errorLogin = 'Documento o contraseña incorrectos.';
        this.cdr.detectChanges();
        setTimeout(() => { this.errorLogin = ''; this.cdr.detectChanges(); }, 5000);
      }
    },
    error: (err) => {
      this.errorLogin = 'Error de comunicación con el servidor.';
      this.cdr.detectChanges();
    }
  });
}
}
