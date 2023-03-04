import { HttpClient } from '@angular/common/http';
import { Http, HttpDownloadFileResult } from '@capacitor-community/http';
import { Injectable } from '@angular/core';
import { Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class LeerArchivoFromURLService {

  constructor(private http: HttpClient) { }

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

    const options = {
      url: url,
      filePath: nameFile,
      fileDirectory: Directory.Documents,

      method: 'GET',
    };

    return Http.downloadFile(options);
   /*  return new Promise(async (resolve, reject) => {
      try {
        const response: HttpDownloadFileResult = await Http.downloadFile(options);
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }); */

  }

  convertBlobToBase64(blob: Blob): Promise<any>{
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
