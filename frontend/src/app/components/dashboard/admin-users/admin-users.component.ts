import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // 👈 AGREGADO: Para validación
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // 👈 AGREGADO: ReactiveFormsModule
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent implements OnInit {
  
  // 👈 AGREGADO: Control del formulario
  empleadoForm: FormGroup;

  listaOriginal = [
    {
      id: 1,
      codigo: 'JMENDOTI-TUF',
      nombre: 'Jhon Mendoza',
      puesto: 'Observability Engineer',
      lat: 6.1440018,
      lon: -75.6150279,
      radio: 110,
      estado: 'Activo',
    },
  ];

  listaFiltrada = [...this.listaOriginal];

  // 👈 AGREGADO: Historial dinámico para que el buscador también lo afecte
  historialOriginal = [
    { fecha: '08/03/2026 07:13:22', nombre: 'Natalia Taborda', evento: 'ENTRADA', coords: '6.1440, -75.6150', validacion: true },
    { fecha: '08/03/2026 08:05:45', nombre: 'Jhon Mendoza', evento: 'RECHAZADO', coords: '6.1520, -75.6200', validacion: false }
  ];
  historialFiltrado = [...this.historialOriginal];

  totalEmpleados: number = 0;
  alertasGeovalla: number = 0;

  // 👈 CAMBIO: Inyectar FormBuilder
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    // Definición de validaciones del formulario
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      lat: [null, [Validators.required]],
      lon: [null, [Validators.required]],
      radio: [110, Validators.required]
    });
  }

  ngOnInit(): void {
    this.totalEmpleados = this.listaOriginal.length;
    this.alertasGeovalla = 2;
  }

  // 👈 ACTUALIZADO: Filtra ambas tablas al mismo tiempo
  filtrarEmpleados(event: any) {
    const valor = event.target.value.toLowerCase();
    
    this.listaFiltrada = this.listaOriginal.filter(emp => 
      emp.nombre.toLowerCase().includes(valor) || emp.codigo.toLowerCase().includes(valor)
    );

    this.historialFiltrado = this.historialOriginal.filter(hist => 
      hist.nombre.toLowerCase().includes(valor)
    );
  }

  abrirModalNuevo(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  // 👈 AGREGADO: Lógica para guardar el nuevo empleado en la lista
  guardarNuevoEmpleado() {
    if (this.empleadoForm.valid) {
      const nuevo = {
        id: this.listaOriginal.length + 1,
        ...this.empleadoForm.value,
        estado: 'Activo',
        puesto: 'Nuevo Ingreso'
      };

      this.listaOriginal.push(nuevo);
      this.listaFiltrada = [...this.listaOriginal];
      this.totalEmpleados = this.listaOriginal.length;

      this.modalService.dismissAll();
      this.empleadoForm.reset({ radio: 110 });
    }
  }

  gestionarGeovalla(empleado: any) {
    console.log(`Configurando Geovalla para ${empleado.codigo}`);
  }
}