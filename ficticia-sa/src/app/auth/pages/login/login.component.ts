import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AESEncryptDecryptService from 'src/app/services/aesencrypt-decrypt-service.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public loginForm!: FormGroup;
  public user: string = '';
  public userSave: string = '';
  public password: string = '';
  public passSave: string = '';
  public inputCheckbox!: boolean;
  private AES = new AESEncryptDecryptService();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: [this.user, [Validators.required]],
      password: [this.password, [Validators.required]],
    });
    this.isLogged();
  }

  savePass(event: Event) {
    this.inputCheckbox = (event.target as HTMLInputElement).checked;
    if (this.inputCheckbox) {
      this.storage.saveStorageData(
        'userSave',
        this.AES.encrypt(this.loginForm.controls['user'].value)
      );
      this.storage.saveStorageData(
        'passSave',
        this.AES.encrypt(this.loginForm.controls['password'].value)
      );
    } else {
      localStorage.clear();
    }
  }

  isLogged() {
    if (this.storage.loadStorageData('userSave')) {
      let checkBox = document.getElementById(
        'checkbox_savePass'
      ) as HTMLInputElement;
      checkBox.checked = true;
      this.loginForm.controls['user'].setValue(
        this.AES.decrypt(this.storage.loadStorageData('userSave'))
      );
      this.loginForm.controls['password'].setValue(
        this.AES.decrypt(this.storage.loadStorageData('passSave'))
      );
    }
  }
  loginWithEnter(event: any) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (resp) => {
        console.log(resp)
        this.isLoading = false;
        this.router.navigateByUrl('/main');
      },
      (error) => {
        if (error.status == 403) {
          setTimeout(() => {
            Swal.fire('Error', `${error.error.message}`, 'error');
            this.isLoading = false;
          }, 1000);
        } else {
          setTimeout(() => {
            this.isLoading = false;
            Swal.fire('Error', 'Usuario y/o contraseña incorrecta', 'error');
          }, 1000);
        }
      }
    );
  }
}
