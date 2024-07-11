import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateStoreAppService {

  constructor(private http:HttpClient) { }

  getAppVersionStore(urlStore:string){
    try {
      this.http.get('https://play.google.com/store/apps/details?id=py.sysasotigo.asociados').subscribe(data => {
      console.log('Store App:', data);
      
    });
    } catch (error) {
      console.log(error);
      
    }
  }
}
