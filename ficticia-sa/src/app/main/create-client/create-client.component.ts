import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent {
  public addUsers: boolean = false;
  public clients!: any[];
  public addClients!: FormGroup;

  constructor(
    private authService: AuthService,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addClients = this.formBuilder.group({
      nombreCompleto: [''],
      identificacion: [''],
      edad: [''],
      genero: [''],
      maneja: [''],
      usaLentes: [''],
      otraEnfermedad: [''],
      diabetico: [''],
      idPersona: [''],
    });
  }

  createClient() {
    console.log(this.addClients.value);
    this.clientsService.createClient(this.addClients.value).then(
      (resp) => {
        this.addUsers = !this.addUsers;
        Swal.fire({
          title: '¡Muchas gracias!',
          text: 'Cliente creado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
        }).then((resp) => {
          if (resp.isConfirmed) {
            this.router.navigateByUrl('main');
          }
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Intente nuevamente',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
    return;
  }
  back() {
    this.router.navigateByUrl('main');
  }
}
