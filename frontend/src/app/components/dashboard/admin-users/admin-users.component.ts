import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Importación del servicio actualizado a la carpeta 'user'
import { UserService, User } from '../../../services/user/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent implements OnInit {
  // Ajuste: Definición de la variable del formulario como userForm
  userForm: FormGroup;
  listaOriginal: User[] = [];
  listaFiltrada: User[] = [];
  isLoading: boolean = true;

  // Historial estático (se mantiene nombre como propiedad visual del log)
  historialOriginal = [
    {
      fecha: '08/03/2026 07:13:22',
      nombre: 'Natalia Taborda',
      evento: 'ENTRADA',
      coords: '6.1440, -75.6150',
      validacion: true,
    },
    {
      fecha: '08/03/2026 08:05:45',
      nombre: 'Jhon Mendoza',
      evento: 'RECHAZADO',
      coords: '6.1520, -75.6200',
      validacion: false,
    },
  ];
  historialFiltrado = [...this.historialOriginal];

  totalUsuarios: number = 0; // Ajustado de totalUsuarios
  alertasGeovalla: number = 0;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef, // 👈 Inyectar el detector de cambios
  ) {
    // Definición de validaciones según los campos exactos de User.java
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      document: [null, Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['EMPLOYED', Validators.required],
      // 👈 LOS QUE FALTAN:
      phone: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.alertasGeovalla = 2;
  }

  cargarUsuarios(): void {
    this.isLoading = true; // Iniciamos el spinner
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.listaOriginal = data;
        this.listaFiltrada = [...this.listaOriginal];
        this.totalUsuarios = this.listaOriginal.length;
        this.isLoading = false; // 👈 ESTO DEBE EJECUTARSE AQUÍ PARA APAGAR EL SPINNER
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false; // También lo apagamos si hay error para no bloquear la pantalla
        this.cdr.detectChanges();
      },
    });
  }

  // Ajustado: Filtra la lista de usuarios
  filtrarUsuarios(event: any) {
    const valor = event.target.value.toLowerCase();
    this.listaFiltrada = this.listaOriginal.filter(
      (user) =>
        user.name.toLowerCase().includes(valor) || user.userName.toLowerCase().includes(valor),
    );

    this.historialFiltrado = this.historialOriginal.filter((hist) =>
      hist.nombre.toLowerCase().includes(valor),
    );
  }

  abrirModalNuevo(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  // Ajustado: Envía el nuevo User al Backend
guardarNuevoUsuario() {
  if (this.userForm.valid) {
    // Mapeamos los campos del formulario a los nombres de la base de datos
    const payload = {
      ...this.userForm.value,
      last_name: this.userForm.value.lastName,
      user_name: this.userForm.value.userName,
      // Los timestamps que tu DB marca como obligatorios
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString()
    };

    this.userService.createUser(payload).subscribe({
      next: (res) => {
        this.cargarUsuarios(); 
        this.modalService.dismissAll();
        this.userForm.reset({ role: 'EMPLOYED', status: true });
        this.cdr.detectChanges(); // Forzamos que se vea el cambio de inmediato
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error: Revisa que todos los campos obligatorios estén llenos.');
      }
    });
  }
}
  gestionarGeovalla(user: User) {
    console.log(`Configurando Geovalla para: ${user.userName}`);
  }
}
