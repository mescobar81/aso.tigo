import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ResponseAdherente,
  ResponseGrupoFamiliar,
  ResponseSolicitudPlan,
  ResponseStatusConsultaBeneficio,
  ResponseStatusMessage,
  ResponseValidaInscripcion,
  ResponseRecuperarAdjuntos
} from '../interfaces/interface';

const urlBase = environment.urlBase;

@Injectable({
  providedIn: 'root'
})
export class CoberturaMedicaService {

  constructor(private http: HttpClient) { }

  solicitarBeneficio(nroSocio: number, nombre: string): Promise<ResponseStatusConsultaBeneficio> {
    return new Promise<ResponseStatusConsultaBeneficio>((resolve, reject) => {
      this.http.post(`${urlBase}/consultaBeneficio`, {
        nroSocio: nroSocio,
        nombre: nombre
      }).subscribe({
        next: (resp: ResponseStatusConsultaBeneficio) => {
          if (resp.status === 'success') {
            resolve(resp);
          } else {
            resolve(resp);
          }
        },
        error: (err: any) => {
          console.log(JSON.stringify(err));

          reject(err);
        }
      });
    });
  }

  validaInsrcipcion(nroSocio: string): Promise<ResponseValidaInscripcion> {

    return new Promise<ResponseValidaInscripcion>((resolve, reject) => {
      this.http.get(`${urlBase}/validarInscripcion?nroSocio=${nroSocio}`).
        subscribe({
          next: (resp: ResponseValidaInscripcion) => {
            if (resp.status === 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));

            reject(err);
          }
        });
    });
  }

  listarPlanes(): Promise<ResponseSolicitudPlan> {

    return new Promise<ResponseSolicitudPlan>((resolve, reject) => {
      this.http.get(`${urlBase}/planes`).
        subscribe({
          next: (resp: ResponseSolicitudPlan) => {
            if (resp.status === 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));

            reject(err);
          }
        });
    });
  }

  listarGrupoFamiliarByPlan(beneficio: string, idPlan: string): Promise<ResponseGrupoFamiliar> {

    return new Promise<ResponseGrupoFamiliar>((resolve, reject) => {

      this.http.get<ResponseGrupoFamiliar>(`${urlBase}/consultaGrupoFamilia?Pbeneficio='${beneficio}'&idplan='${idPlan}'`).
        subscribe();
    });
  }

  listarAdherentes(plan: string): Promise<ResponseAdherente> {
    return new Promise<ResponseAdherente>((resolve, reject) => {
      this.http.get(`${urlBase}/consultaAdherente?idplan='${plan}'`)
        .subscribe({
          next: (resp: ResponseAdherente) => {
            if (resp.status === 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));

            reject(err);
          }
        });
    });
  }

  enviarCotizacion(cotizar: any): Promise<ResponseStatusMessage> {

    return new Promise<ResponseStatusMessage>((resolve, reject) => {
      this.http.post(`${urlBase}/cotizar`, cotizar)
        .subscribe({
          next: (resp: ResponseStatusMessage) => {
            if (resp.status === 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));

            reject(err);
          }
        });
    });
  }

  subirAdjunto(formData: FormData): Promise<ResponseStatusMessage> {
    return new Promise<ResponseStatusMessage>((resolve, reject) => {
      this.http.post(`${urlBase}/adjuntarDocumento`, formData)
        .subscribe({
          next: (resp: ResponseStatusMessage) => {
            if (resp.status === 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));

            reject(err);
          }
        });
    });
  }

  enviarAsismed(dato: any): Promise<ResponseStatusMessage> {
    return new Promise<ResponseStatusMessage>((resolve, reject) => {
      this.http.post(`${urlBase}/enviarAsisMed?nroSolicitud=${dato.nroSolicitud}&nombre=${dato.nombre}`, {})
        .subscribe({
          next: (resp: ResponseStatusMessage) => {
            if (resp.status === 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          },
          error: (err: any) => {
            console.log(JSON.stringify(err));

            reject(err);
          }
        });
    });
  }

  recuperarAdjuntos(nroSolicitud: number): Promise<ResponseRecuperarAdjuntos> {

    return new Promise<ResponseRecuperarAdjuntos>((resolve, reject) => {
      this.http.get(`${urlBase}/recuperarAdjunto?nroSolicitud=${nroSolicitud}`)
        .subscribe((resp: ResponseRecuperarAdjuntos) => {
          if (resp.status == 'success') {
            resolve(resp);
          } else {
            resolve(resp);
          }
        }, err => {

          console.log(JSON.stringify(err));

          reject(err);
        });
    });
  }
  async getBlobFromUrl(url: string) {
    console.log(url);
    
    const headers = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "*"
    );
    return new Promise<any>(async (resolve, reject) => {
       fetch(url, {
        headers:new Headers({
          "Access-Control-Allow-Origin": "*"
        })
      }).then(response =>{
        console.log(response);
        
      }).catch(err => {
        console.log(err);
        
      });
    });
    /* const response = await fetch(url);
    const data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    return new File([data], 'JPEG_20221029_164700_8709833261284334121.jpg', {
      type: metadata.type
    }); */

    //return new Promise((resolve, reject) => {

    /* let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = reject;
    request.send();
  }); */
    //}
  }
}
