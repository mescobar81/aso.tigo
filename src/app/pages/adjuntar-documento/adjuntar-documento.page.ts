import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';

declare var window: any;

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-documento.page.html',
  styleUrls: ['./adjuntar-documento.page.scss'],
})
export class AdjuntarDocumentoPage implements OnInit {

  image: Photo;
  adjuntos: any[] = [];
  adjuntados: string[] = [];
  file: File;
  dato = {
    nroSolicitud:0,
    nombre:''
  }
  constructor(private archivo: File,
    private modalCtrl: ModalController,
    private coberturaMedicaSrv: CoberturaMedicaService,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private storageSrv: StorageService) { }

  async ngOnInit() {
    const codigoRetorno = this.activatedRoute.snapshot.params.codigoRetorno;
    const nroSolicitud = await this.storageSrv.getNroSolicitud();
    if(codigoRetorno == 94){
      const {ArchivoAdjunto} = await this.coberturaMedicaSrv.recuperarAdjuntos(Number(nroSolicitud));

      try {
        this.coberturaMedicaSrv.getBlobFromUrl(ArchivoAdjunto[1].adjunto);
      } catch (error) {
        console.log(error);
        
      }
      
    }

   /*  const {nombre} = await this.storageSrv.getUsuario();
    this.dato.nroSolicitud = Number(nroSolicitud);
    this.dato.nombre = nombre; */
  }

  seleccionarArchivo(event: any) {
    console.log(event.target.files[0]);
    
    this.file = event.target.files[0];
    this.adjuntados.push(event.target.files[0].name);//para mostrar en la vista de ususario los nombres
    this.adjuntos.push({
      blob: this.file,
      name: event.target.files[0].name
    });//para el envio de archivos blob al servicio

  }

  async tomarFoto() {

    const image = await Camera.getPhoto({
      quality: 90,
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
    this.adjuntados.push(image.path.substring(54));

    //TO DO: pones validacion para verificar si es dispositivo o web
    this.archivo.resolveLocalFilesystemUrl(this.image.path).then((fileEntry: FileEntry) => {
      fileEntry.file(file => {
        const reader = new FileReader();
        /**
         * se crea un realReader para que se ejecute el onloadend
         * ver: no funciona con plugins de capatictor/camera
         */
        const realReader = (reader as any)._realReader;
        realReader.onloadend = (res: any) => {

          let blob = new Blob([new Uint8Array(res.target.result)], { type: file.type });

          this.adjuntos.push({
            blob: blob,
            name: file.name
          });
        }

        reader.readAsArrayBuffer(file);
      });
    });
  }


  async enviarAsismed() {

    if(this.adjuntados.length === 0) {
      this.presentToast('bottom', 'Favor ingrsar archivos adjuntos');
      return;
    }

    
    //llamamos a este metodo para enviar un archivo adjunto
    //en caso que el usuario haya presionado enviar a asismed
    this.subirAdjunto();

    const {status, mensaje} = await this.coberturaMedicaSrv.enviarAsismed(this.dato);

    if(status === 'success'){
      this.presentarModal('Solicitud Asismed', mensaje, true);
    }
    //limpia los datos del envio a asismed
    this.dato = {
      nroSolicitud:0,
      nombre:''
    };
  }

//envia adjuntos sin guardar
  subirAdjunto() {

    if(this.adjuntados.length === 0) {
      this.presentToast('bottom', 'Favor ingresar archivos adjuntos');
      return;
    }

    
    try {
      this.adjuntos.forEach(async (file: any) => {
        
        let formData = new FormData();
        formData.append('file', file.blob, file.name);
        formData.append('nroSolicitud', this.dato.nroSolicitud.toString().trim());
        
        const { status, mensaje } = await this.coberturaMedicaSrv.subirAdjunto(formData);

        if (status == 'success') {
          this.presentToast('bottom', mensaje);
        } 
      });

    } catch (error) {
      console.log(JSON.stringify(error));
      this.presentarModal('Archivos adjuntos', error, false);
    }

    this.limpiarDatos();
  }

  eliminarAdjunto(index:number){
    this.adjuntados.splice(index, 1);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2200,
      position: position,
      icon:'information-circle',
      cssClass:'custom-toast'
    });

    await toast.present();
  }

  async presentarModal(title: string, descripcion: string, isCss: boolean) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      componentProps: {
        descripcion,
        title,
        isCss
      }
    });

    await modal.present();
  }

  limpiarDatos(){
    this.adjuntados = [];
    this.adjuntos = [];
  }
}
