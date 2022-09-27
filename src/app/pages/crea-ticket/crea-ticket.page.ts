import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';

import { PopoverInfoComponent } from 'src/app/components/popover-info/popover-info.component';
import { CrearTicket, PopoverItem, TiposSolicitud } from 'src/app/interfaces/interface';
import { CreaTicketService } from 'src/app/services/crea-ticket.service';
import { StorageService } from 'src/app/services/storage.service';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';


declare var window: any;

@Component({
  selector: 'app-crea-ticket',
  templateUrl: './crea-ticket.page.html',
  styleUrls: ['./crea-ticket.page.scss'],
})
export class CreaTicketPage implements OnInit {



  tiposSolicitud: TiposSolicitud[] = [];
  fotos: string[] = [];
  image: Photo;

  items: PopoverItem[] = [{
    id: 1,
    title: 'Cámara',
    route: '',
    icon: 'camera',
    enabled: true
  },
  {
    id: 2,
    title: 'Documento',
    route: '',
    icon: 'document-attach',
    enabled: false
  }
  ];
  nuevaSolicitud: CrearTicket = {
    documento: '',
    tipoSolicitud: 0,
    asunto: '',
    rol: '',
    codUsuario: '',
    comentario: ''
  };
  constructor(private creaTicketSrv: CreaTicketService,
    private archivo: File,
    private fileOpener: FileOpener,
    private popoverCtrl: PopoverController,
    private storageSrv: StorageService,
    private alertController: AlertController,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    this.init();
  }

  async enviarSolicitud(fSolicitud: NgForm) {

    const usuario = await this.storageSrv.getUsuario();
    if (!usuario) {
      return;
    }

    if(this.fotos.length === 0){
      this.presentAlert('Atención', 'No hay archivos adjuntos. ¡Favor verifique!', '');
      return;
    }

    this.archivo.resolveLocalFilesystemUrl(this.image.path).then((fileEntry: FileEntry) => {
      fileEntry.file(file => {

        const reader = new FileReader();
        /**
         * se crea un realReader para que se ejecute el onloadend
         * ver: no funciona con plugins de capatictor/camera
         */
        const realReader = (reader as any)._realReader;
        realReader.onloadend = (res:any) => {

          const blob = new Blob([new Uint8Array(res.target.result)], { type: file.type });
          const formData = new FormData();
          formData.append('file', blob, file.name);
          formData.append('documento', usuario.documento.toString());
          formData.append('tipoSolicitud', fSolicitud.value.tipoSolicitud);
          formData.append('asunto', fSolicitud.value.asunto);
          formData.append('rol', usuario.rol.roles[0]);
          formData.append('codUsuario', usuario.nroSocio);
          formData.append('comentario', fSolicitud.value.comentario);
          this.uploadFile(formData);//envia el form data al servidor
        }
        reader.readAsArrayBuffer(file);
      })
    });
  }

  /**
   * envia los datos del archivo y el ticket al servidor
   * @param formData valores de los datos
   */
  uploadFile(formData: FormData) {
    this.creaTicketSrv.enviarSolicitud(formData).then(resp =>{
      if(resp.status === 'success'){
        this.presentarModal('Información', resp.mensaje, true);
      }else if(resp.status === 'failure'){
        this.presentarModal('Error', resp.mensaje, false);
      }
    }).catch(err =>{
      this.presentarModal('ERROR', JSON.stringify(err), false)
      console.log(JSON.stringify(err));
    });
    
  }

  limpiarCampos(){

    this.nuevaSolicitud = {
      documento: '',
      tipoSolicitud: null,
      asunto: '',
      rol: '',
      codUsuario: '',
      comentario: ''
    };
    this.fotos = [];
    this.tiposSolicitud = [];

  }

  async presentarModal(title:string, descripcion:string, isCss:boolean){
    const modal = await this.modalCtrl.create({
      component:ModalInfoComponent,
      componentProps:{
        descripcion,
        title,
        isCss
      }
    });

    await modal.present();

    const {role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      this.limpiarCampos(); //limpia los campos del formulario
      this.init();//inicializa tipos de solicitud
    }
  }

  async presentAlert(header:string, mensaje: string, status: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: [{
        text:'Aceptar',
        role:'confirm',
        handler:()=> {
        },
      }
    ]
    });

     await alert.present();
  }
  
  adjuntarDocumento() {
    /* this.archivo.checkDir(this.archivo.dataDirectory, 'files').then((dir) => {
      console.log('Directorio: ', dir);
      
    }); */


    this.fileOpener.showOpenWithDialog('Documentos', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));

  }
  async tomarFoto() {

    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      promptLabelHeader: 'Fotos:',
      promptLabelPhoto: 'Galería de imágenes',
      promptLabelPicture: 'Tomar Fotografía',
      presentationStyle: 'fullscreen',

    }).catch(err => {
      console.log('Sin imagen seleccionada: ', JSON.stringify(err));
    });
    
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    if (!image) { return };

    const img = window.Ionic.WebView.convertFileSrc(image.path);
    this.image = image;//actualiza la referencia a image

    this.fotos.push(img);

  }

  async presentPopover(e: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverInfoComponent,
      event: e,
      componentProps: {
        items: this.items
      },
      cssClass: 'ion-popover',
      animated: true
    });

    await popover.present();

    const id = await (await popover.onWillDismiss()).data?.id;
    if (id === 1) {//opcion 1 selecciona camara
      this.tomarFoto();
    }
    if (id === 2) {//opcion 2 selecciona documento
      this.adjuntarDocumento();
    }
  }

  async init() {
    this.tiposSolicitud = (await this.creaTicketSrv.listarTipoSolicitud()).tiposSolicitud;
  }
}
