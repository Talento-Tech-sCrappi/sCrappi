import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core'; // 👈 Añadido OnDestroy
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

import { AuthService } from '../../../services/auth/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cumplimientoChart') cumplimientoChart!: ElementRef;

  nombreUsuario = '';
  lastEvent = 'Cargando...';
  locationStatus = 'Localizando...';
  alertasPendientes = 0;
  isInside = false;
  hoy: Date = new Date();

  private intervalId: any; // 👈 Para limpiar el reloj al salir

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.nombreUsuario = user.name;
      // Forzamos que el ID sea numérico para evitar errores en la URL
      this.cargarResumen(Number(user.id));
    }

    // Guardamos el ID del intervalo para poder destruirlo después
    this.intervalId = setInterval(() => {
      this.hoy = new Date();
    }, 60000);
  }

  ngOnDestroy(): void {
    // 👈 Evita fugas de memoria si el usuario navega a otra página
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarResumen(userId: number) {
    this.http.get<any>(`http://localhost:8080/api/worklogs/summary/${userId}`).subscribe({
      next: (data) => {
        // 1. Mapeo seguro de variables
        this.lastEvent = data.lastEvent || data.lastevent || 'Sin registros';
        this.locationStatus = data.locationStatus || data.locationstatus || 'Desconocido';

        // Manejo de alertas (priorizando camelCase)
        this.alertasPendientes =
          data.alertsToday !== undefined ? data.alertsToday : data.alertstoday || 0;

        // Manejo de estado de jornada (priorizando el que se vio en  consola: 'inside')
        this.isInside = data.inside !== undefined ? data.inside : data.isInside || false;

        // 2. Renderizado del gráfico (solo si hay datos nuevos)
        // Nota: Si el array viene vacío o no viene, dejamos los datos estáticos por ahora
        if (
          data.weeklyProgress &&
          Array.isArray(data.weeklyProgress) &&
          data.weeklyProgress.length > 0
        ) {
          this.renderChart(data.weeklyProgress);
        } else {
          // Opcional: Si quieres datos por defecto cuando no hay registros reales:
          // this.renderChart([0, 0, 0, 0, 0, 0, 0]);
        }

        // 3. Un solo renderizado para actualizar la vista completa
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando resumen', err);
        this.lastEvent = 'Error de conexión';
        this.locationStatus = 'Servidor Offline';
        this.cdr.detectChanges();
      },
    });
  }

  //Renderchar
  ngAfterViewInit(): void {
    this.renderChart();
  }

  // Declaramos la instancia del chart para poder actualizarla
  chartInstance: any;

  renderChart(datosData: number[] = [0, 0, 0, 0, 0, 0, 0]) {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Evita duplicados al recargar
    }

    this.chartInstance = new Chart(this.cumplimientoChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [
          {
            label: '% de Cumplimiento',
            data: datosData, // USAMOS LOS DATOS REALES
            backgroundColor: datosData.map((val) => (val < 90 ? '#fd7e14' : '#0d6efd')), // Naranja si es bajo
            borderRadius: 8,
            barThickness: 25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { display: false },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }
}
