import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  GetUserInfo(): Observable<any> {
    const url = 'https://localhost:7121/api/persona/true';
    return this.http.get<any>(url);
  }

  GetUserById(idPersona: number): Observable<any> {
    const url = `https://localhost:7121/api/persona/${idPersona}`;
    return this.http.get<any>(url);
  }

  createClient(client: any) {
    const url = 'https://localhost:7121/api/persona';
    return new Promise((resolve, reject) => {
      this.http.post<any>(url, client).subscribe(
        (resp) => {
          console.log(resp);
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteClient(idPersona: number) {
    const url = `https://localhost:7121/api/persona/BajaLogica/${idPersona}`;
    return new Promise((resolve, reject) => {
      this.http.patch<any>(url, null).subscribe(
        (resp) => {
          console.log(resp);
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  editClient(client: any) {
    const url = 'https://localhost:7121/api/persona';
    return new Promise((resolve, reject) => {
      this.http.patch<any>(url, client).subscribe(
        (resp) => {
          console.log(resp);
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
