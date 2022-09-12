import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { PopoverController } from '@ionic/angular';

import { PopoverInfoComponent } from 'src/app/components/popover-info/popover-info.component';
import { PopoverItem, TiposSolicitud } from 'src/app/interfaces/interface';
import { CreaTicketService } from 'src/app/services/crea-ticket.service';
import { StorageService } from 'src/app/services/storage.service';


declare var window: any;

@Component({
  selector: 'app-crea-ticket',
  templateUrl: './crea-ticket.page.html',
  styleUrls: ['./crea-ticket.page.scss'],
})
export class CreaTicketPage implements OnInit {


  tiposSolicitud: TiposSolicitud[] = [];
  fotos: string[] = [];
  file: string = "";
  items: PopoverItem[] = [{
    id: 1,
    title: 'Cámara',
    route: '',
    icon: 'camera'
  },
  {
    id: 2,
    title: 'Documento',
    route: '',
    icon: 'document-attach'
  }
  ];
  nuevaSolicitud = {
    file: '',
    documento: 0,
    tipoSolicitud: 0,
    asunto: '',
    rol: '',
    codUsuario: '',
    comentario: ''
  };
  constructor(private creaTicketSrv: CreaTicketService,
             private archivo:File,
             private popoverCtrl: PopoverController,
             private storageSrv: StorageService) { }

  ngOnInit() {
    this.init();
  }

  async enviarSolicitud(fSolicitud: NgForm) {

    const usuario = await this.storageSrv.getUsuario();
    if (!usuario) {
      return;
    }

    this.nuevaSolicitud = {
      file: this.file,
      documento: usuario.documento,
      tipoSolicitud: fSolicitud.value.tiposSolicitud,
      asunto: fSolicitud.value.asunto,
      rol: usuario.rol.roles[0],
      codUsuario: usuario.nroSocio,
      comentario: fSolicitud.value.comentario
    }

    console.log(this.nuevaSolicitud);

  }

  adjuntarDocumento(){
    /* this.archivo.checkDir(this.archivo.dataDirectory, 'files').then((dir) => {
      console.log('Directorio: ', dir);
      
    }); */

  }
  async tomarFoto() {
    /* const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log('base64Image', base64Image);
     
    }, (err) => {

    }); */

      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        saveToGallery:true,
        promptLabelHeader: 'Fotos:',
        promptLabelPhoto: 'Galería de imágenes',
        promptLabelPicture: 'Tomar Fotografía',
        presentationStyle: 'fullscreen'
      }).catch(err => {});

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

      if(!image)return;

      const img = window.Ionic.WebView.convertFileSrc(image.path);
      this.file = img;

      console.log('IMAGE: ', image);

      this.fotos.push(img);

      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
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
    if(id === 2){//opcion 2 selecciona documento
      this.adjuntarDocumento();
    }
  }

  seleccionarTicket() {

  }

  async init() {
    this.tiposSolicitud = (await this.creaTicketSrv.listarTipoSolicitud()).tiposSolicitud;
  }

}
