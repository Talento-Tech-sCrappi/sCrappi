import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js'; // 👈 Importar Chart.js

Chart.register(...registerables);

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('cumplimientoChart') cumplimientoChart!: ElementRef; // 👈 Referencia al canvas

  nombreUsuario = 'Jhon Mendoza';
  idUsuario = 'JMENDOTI-TUF';
  alertasPendientes = 2;
  hoy: Date = new Date();

  ngOnInit(): void {
    setInterval(() => { this.hoy = new Date(); }, 60000);
  }

  // Se ejecuta después de que la vista carga para poder dibujar el gráfico
  ngAfterViewInit(): void {
    this.renderChart();
  }

// En home-dashboard.component.ts
renderChart() {
  new Chart(this.cumplimientoChart.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
      datasets: [{
        label: '% de Cumplimiento',
        data: [100, 98, 100, 85, 100, 92, 100], // Datos de prueba
        backgroundColor: [
          '#0d6efd', '#0d6efd', '#0d6efd', '#fd7e14', '#0d6efd', '#0d6efd', '#0d6efd'
        ], // El jueves (incumplimiento) sale en naranja
        borderRadius: 8,
        barThickness: 25
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { 
          beginAtZero: true, 
          max: 100,
          grid: { display: false }
        },
        x: { grid: { display: false } }
      }
    }
  });
}
}