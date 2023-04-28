import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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
    this.getAllClients();
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

  logout() {
    this.authService.logout();
  }

  addClient() {
    this.router.navigateByUrl('main/createClient');
    // this.addUsers = !this.addUsers;
  }

  createClient() {
    console.log(this.addClients.value);
    this.clientsService.createClient(this.addClients.value).then(
      (resp) => {
        this.addUsers = !this.addUsers;
        this.getAllClients();
      },
      (error) => {
        console.log(error);
      }
    );
    return;
  }

  deleteClient(idPersona: number) {
    Swal.fire({
      title: 'Dar de baja Cliente',
      text: '¿Esta seguro?',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.clientsService.deleteClient(idPersona).then(
          (resp) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Cliente dado de baja',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            this.getAllClients();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo dar de baja el cliente',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    });
  }
  bool(esActivo: boolean) {
    if (esActivo) {
      return 'Si';
    } else {
      return 'No';
    }
  }
  editClient(idPersona: any) {
    this.router.navigateByUrl(`main/editClient/${idPersona}`);
  }

  getAllClients() {
    this.clientsService
      .GetUserInfo()
      .subscribe((resp) => (this.clients = resp.response));
  }
}
