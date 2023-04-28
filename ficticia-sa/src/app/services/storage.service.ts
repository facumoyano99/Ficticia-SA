import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveStorageData(itemName: string, data: any, session?: boolean) {
    if (session) sessionStorage.setItem(itemName, JSON.stringify(data));
    else localStorage.setItem(itemName, JSON.stringify(data));
  }

  loadStorageData(itemName: string): any {
    let data = undefined;

    if (localStorage.getItem(itemName)) {
      const stringData = localStorage.getItem(itemName) || '';
      data = JSON.parse(stringData);
    } else if (sessionStorage.getItem(itemName)) {
      const stringData = sessionStorage.getItem(itemName) || '';
      data = JSON.parse(stringData);
    }

    return data;
  }

  removeStorageData(itemName: string) {
    if (localStorage.getItem(itemName)) localStorage.removeItem(itemName);
    if (sessionStorage.getItem(itemName)) sessionStorage.removeItem(itemName);
  }
}