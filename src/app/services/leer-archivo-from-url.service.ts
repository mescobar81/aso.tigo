import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeerArchivoFromURLService {

  constructor(private http:HttpClient) { }

   /**
   * convierte la representacion de cadena en formato file a partir de una url
   */
  async getBlobFromUrl(url: string):Promise<Blob> {
    /* const headers = new HttpHeaders({
      'Acces-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }); */
    return new Promise((resolve, reject) => {
      this.http.get(url, {responseType: 'blob'}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

    
    /* return new Promise((resolve, reject) => {

      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'blob';
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.onload = () => {
        resolve(request.response); 
      };
      request.onerror = reject;
      request.send();
    }); */

  }

  convertBlobToBase64(blob: Blob){
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
}
