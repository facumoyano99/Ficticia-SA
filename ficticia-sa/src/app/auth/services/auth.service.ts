import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { MenuItem } from 'primeng/api';
import AESEncryptDecryptService from 'src/app/services/aesencrypt-decrypt-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _jwt: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
  ) {}

  login(formData: any) {
    const urlApi = `https://localhost:7121/api/usuario/login`;
    return this.http.post(urlApi, formData).pipe(
      map((resp: any) => {
        const AES = new AESEncryptDecryptService();
        this._jwt = resp.response.token.token;
        this.storage.saveStorageData('token', this._jwt, true);
        return resp;
      }),
    );
  }

  getMenu() {
    return this.storage.loadStorageData('menu');
  }

  changePassword(mail: string, currentPassword: string, newPassword: string) {

  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  getCredentials(admin?: string): string {
    let token = '';

    token = this.storage.loadStorageData('token');
    if (token == '' || token == undefined)
      token = this.storage.loadStorageData('tokenAdmin');

    return token;
  }

  resetPassword(mail: string) {
  }
}
