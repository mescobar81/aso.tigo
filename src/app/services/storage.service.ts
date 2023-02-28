import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DetalleTicket, Ticket, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario:Usuario;
  token:string = '';
  nroSolicitud:string;
  constructor(private storage:Storage) { 
    this.init();
  }

  async getUsuario(){
    this.usuario = await this.storage.get('usuario') || null;
    return this.usuario;
  }

  async getToken(){
    this.token = await this.storage.get('tokenFirebase');
    return this.token;
  }

  async getNroSolicitud(){
    this.nroSolicitud = await this.storage.get('nroSolicitud');
    return this.nroSolicitud;
  }

  async init(){   
    await this.storage.create();
  }

  /**
   * graba usuario en el local storage
   * @param usuario 
   */
  async guardarUsuario(usuario:Usuario){
    await this.storage.set('usuario', usuario);
  }

  async guardarToken(token:string){
    await this.storage.set('tokenFirebase', token);
  }

  async guardarNroSolicitud(nroSolicitud:Number){
    await this.storage.set('nroSolicitud', nroSolicitud);
  }

  async guardarDatosDeBeneficiarioAdherente(beneficiario:any){
    await this.storage.set('beneficiario', beneficiario);
  }

  async guardarValidacionBaja(validacionBaja:any){
    await this.storage.set('baja', validacionBaja);
  }
  
  async getValidacionBaja(){
    return this.storage.get('baja');
  }
  async getDatoBeneficiarioAdherente(){
    return this.storage.get('beneficiario');
  }

  async guardarTicket(ticket:Ticket){
    await this.storage.set('ticket', ticket);
  }

  async guardarDetalleTicket(detalle:DetalleTicket){
    await this.storage.set('detalleTicket', detalle);
  }

  async getTicket(){
    return await this.storage.get('ticket');
  }

  async getDetalleTicket(){
    return await this.storage.get('detalleTicket');
  }

  /**
   * limpia el local storage
   */
  clear(){
    this.storage.clear();
  }
}
