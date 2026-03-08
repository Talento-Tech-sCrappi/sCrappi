// En reports.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  // Lista para alimentar el select de filtros
  listaEmpleados = [
    { codigo: 'JMENDOTI-TUF', nombre: 'Jhon Mendoza' }
  ];

  constructor() {}

  ngOnInit(): void {}
  
  // Función para el botón "Generar"
  generarReporte() {
    console.log('Generando reporte con los filtros seleccionados...');
  }
}