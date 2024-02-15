import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ResponseAdherente,
  ResponseGrupoFamiliar,
  ResponseSolicitudPlan,
  ResponseStatusConsultaBeneficio,
  ResponseStatusMessage,
  ResponseValidaInscripcion,
  ResponseRecuperarAdjuntos,
  ResponseBeneficiarioAdherente,
  ResponseNuevoGrupoFamiliar,
  ResponseStatusCotizaAdherente,
  ResponseValidarBaja,
  ResponseStatusBajaParcial
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
          if (resp.status == 'success') {
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
            if (resp.status == 'success') {
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
            if (resp.status == 'success') {
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
        subscribe({
            next: (resp: ResponseGrupoFamiliar) => {
              if (resp.status == 'success') {
                resolve(resp);
              } else {
                resolve(resp);
              }
            },
            error: (err: any) => {
              console.log(JSON.stringify(err));
  
              reject(err);
            }
          }
        );
    });
  }

  listarAdherentes(plan: string): Promise<ResponseAdherente> {
    return new Promise<ResponseAdherente>((resolve, reject) => {
      this.http.get(`${urlBase}/consultaAdherente?idplan='${plan}'`)
        .subscribe({
          next: (resp: ResponseAdherente) => {
            if (resp.status == 'success') {
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
        .subscribe((resp:ResponseStatusMessage) => {
            if (resp.status == 'success') {
              resolve(resp);
            } else {
              resolve(resp);
            }
          }, err => {
            console.log(JSON.stringify(err));
            reject(err);
          })
    });
  }

  enviarCotizacionAdhrente(cotizacion:any):Promise<ResponseStatusCotizaAdherente> {
    return new Promise<ResponseStatusCotizaAdherente>((resolve, reject) => {
      this.http.post(`${urlBase}/cotizarAdherente`, cotizacion).subscribe((resp:ResponseStatusCotizaAdherente) =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, (err) =>{
        console.log(JSON.stringify(err));
        
        reject(err);
      });
    });
  }

  subirAdjunto(formData: FormData): Promise<ResponseStatusMessage> {
    return new Promise<ResponseStatusMessage>((resolve, reject) => {
      this.http.post<ResponseStatusMessage>(`${urlBase}/adjuntarDocumento`, formData)
        .subscribe((resp:ResponseStatusMessage) => {
          if(resp.status == 'success'){
            resolve(resp);
          } else {
            resolve(resp);
          }
        }, (err) =>{
          console.log(JSON.stringify(err));
          
          reject(err);
        });
    });
  }

  enviarAsismed(dato: any): Promise<ResponseStatusMessage> {
    return new Promise<ResponseStatusMessage>((resolve, reject) => {
      this.http.post(`${urlBase}/enviarAsisMed?nroSolicitud=${dato.nroSolicitud}&nombre=${dato.nombre}`, {})
        .subscribe({
          next: (resp: ResponseStatusMessage) => {
            if (resp.status == 'success') {
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

  getSolicitudBeneficiarioAdherente(nroSocio:String):Promise<ResponseBeneficiarioAdherente>{
    return new Promise<ResponseBeneficiarioAdherente>((resolve, reject) =>{
      this.http.get(`${urlBase}/validaAgregaAdherente?nroSocio=${nroSocio}`)
      .subscribe((resp: ResponseBeneficiarioAdherente)=>{
        if(resp.status == 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, err =>{
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  getNuevoGrupoFamiliar(codigo:string, codSegmento:string, idPlan:string, beneficio:string, pOpcion:string):Promise<ResponseNuevoGrupoFamiliar>{
    return new Promise<ResponseNuevoGrupoFamiliar>((resolve, reject) =>{
      this.http.get(`${urlBase}/seleccionarNuevoGrupoFamilaS?Pcodigo=${codigo}&Pcodsegemento=${codSegmento}&idplan=${idPlan}&Pbeneficio=${beneficio}&Popcion=${pOpcion}`)
      .subscribe((resp:ResponseNuevoGrupoFamiliar)=>{
        if(resp.status == 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err)
      });
    })
  }

  obtenerAdherentes(idPlan:string):Promise<ResponseAdherente>{
    return new Promise<ResponseAdherente>((resolve, reject) => {
      this.http.get(`${urlBase}/consultaAdherente?idplan='${idPlan}'`)
      .subscribe((res:ResponseAdherente) => {
        if(res.status == 'success'){
          resolve(res);
        }else{
          resolve(res);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  validarBaja(nroSocio:string):Promise<ResponseValidarBaja>{

    return new Promise<ResponseValidarBaja>((resolve, reject) => {
      this.http.get(`${urlBase}/validaBaja?nroSocio=${nroSocio}`).
      subscribe((resp:ResponseValidarBaja) => {
        if(resp.status === 'success') {
          console.log(resp);
          
          resolve(resp);
        }else {
          resolve(resp);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });

  }

  enviarSolicitudBajaTotal(formData:FormData):Promise<ResponseStatusMessage>{
    return new Promise<ResponseStatusMessage>((resolve, reject) =>{
      this.http.post(`${urlBase}/enviarBajaTotal`, formData).
      subscribe((resp: ResponseStatusMessage) =>{
        if(resp.status == 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, (err) =>{
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

   enviarSolicitudBajaParcial(formData: FormData){

    return new Promise<ResponseStatusBajaParcial>((resolve, reject) =>{
      this.http.post(`${urlBase}/enviarBajaParcial`, formData)
      .subscribe({
        next: (resp: ResponseStatusBajaParcial) => {
          if (resp.status == 'success') {
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
    })
  }

  listarAdherenteBySocio(nroSocio:string):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${urlBase}/consultaCoberturaMedica?nroSocio=${nroSocio}`).
      subscribe((resp:any) => {
        resolve(resp);
      }, (err) => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });

  }
  
  /**
   * convierte la representacion de cadena en formato file a partir de una url
   */
  /* async getBlobFromUrl(url: string) {

    return new Promise((resolve, reject) => {

      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'blob';
      request.onload = () => {
        resolve(request.response);
      };
      request.onerror = reject;
      request.send();
    });

  } */
}
