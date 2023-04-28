import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  public editClients!: FormGroup;

  public id: any;
  constructor(
    private clientsService: ClientsService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = activatedRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.editClients = this.formBuilder.group({
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
    this.getClient(this.id);
  }

  getClient(idPersona: any) {
    this.clientsService.GetUserById(idPersona).subscribe((resp) => {
      console.log(resp);

      this.editClients = this.formBuilder.group({
        nombreCompleto: [resp.response.nombreCompleto],
        identificacion: [resp.response.identificacion],
        edad: [resp.response.edad],
        genero: [resp.response.genero],
        maneja: [resp.response.maneja],
        usaLentes: [resp.response.usaLentes],
        otraEnfermedad: [resp.response.otraEnfermedad],
        diabetico: [resp.response.diabetico],
        idPersona: [idPersona],
      });
    });
  }

  editClient() {
    this.clientsService.editClient(this.editClients.value).then(
      (resp) => {
        Swal.fire({
          title: '¡Muchas gracias!',
          text: 'Cliente actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
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
