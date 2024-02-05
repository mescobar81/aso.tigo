import { Http, HttpDownloadFileOptions, HttpDownloadFileResult } from '@capacitor-community/http';
import { Injectable } from '@angular/core';
import { Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class LeerArchivoFromURLService {

  constructor() { }

  /**
  * convierte la representacion de cadena en formato file a partir de una url
  */
  async getBlobFromUrl(url: string) {
    return new Promise((resolve, reject) => {

      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'blob';
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.onload = () => {
        resolve(request.response); 
      };
      request.onerror = reject;
      request.send();
    });
  }

  async downloadFile(url: string, nameFile: string):Promise<HttpDownloadFileResult> {

    const options: HttpDownloadFileOptions = {
      url: url,
      filePath: nameFile,
      fileDirectory: Directory.Documents,
      method: 'GET',
    };

    //return Http.downloadFile(options);

   return new Promise((resolve, reject) => {
         Http.downloadFile(options).then(response =>{
          resolve(response);
         }).catch(err =>{
          console.log('ERROR:', err);
          reject(err);
         });

    });

  }

  convertBlobToBase64(blob: any): Promise<any>{
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
