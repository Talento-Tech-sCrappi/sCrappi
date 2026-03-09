import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 👈 Asegúrate de importar Router aquí
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Veo que usas componentes standalone
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isMenuCollapsed = true;
  horaActual: Date = new Date();
  ubicacion: string = 'Esperando acción...';

  // 1. Inyectamos el Router en el constructor
  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.horaActual = new Date();
    }, 1000);
  }

  // 2. Añadimos la función de cerrar sesión
  logout() {
    // Borramos la sesión para que el AuthGuard nos bloquee
    localStorage.removeItem('usuarioSesion'); 
    
    // Limpiamos todo el almacenamiento por seguridad
    localStorage.clear(); 

    // Redirigimos al Login bloqueando el botón "Atrás"
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  marcarAsistencia() {
    if (navigator.geolocation) {
      this.ubicacion = 'Capturando ubicación GPS...';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.ubicacion = `Marcado en: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          alert(`¡Marcaje exitoso a las ${this.horaActual.toLocaleTimeString()}!`);
        },
        (err) => {
          this.ubicacion = 'Error: Por favor activa el GPS.';
          console.error('Error de ubicación:', err);
        },
      );
    }
  }
}