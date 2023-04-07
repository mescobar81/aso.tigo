import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
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
  mostrarAdjuntos: any[] = [];
  file: File;
  mensaje: string = '';
  status: string = '';
  dato = {
    nroSolicitud: '',
    nombre: ''
  }
  backButton = null;
  constructor(private archivo: File,
    private coberturaMedicaSrv: CoberturaMedicaService,
    private platform:Platform,
    private modalCtrl: ModalController,
    private storageSrv: StorageService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,){}

  async ngOnInit() {
    const codigoRetorno = this.activatedRoute.snapshot.params.codigoRetorno;
    const nroSolicitud = await this.storageSrv.getNroSolicitud();
    this.dato.nroSolicitud = nroSolicitud;
    //ver: codigo 94 para saber si la solicitud es rechazada por la clinica medica
    //solo para recuperacion de documentos adjuntos
    if (codigoRetorno == 94) {
      const { status, mensaje, ArchivoAdjunto } = await this.coberturaMedicaSrv.recuperarAdjuntos(Number(nroSolicitud));

      if (status === 'success') {
        try {
          if (ArchivoAdjunto.length > 0) {
            ArchivoAdjunto.forEach(async a => {
              const cadenaExtraidaInicial = a.adjunto.substring(7);
              let arregloCadena = cadenaExtraidaInicial.split('/');

              this.mostrarAdjuntos.push(arregloCadena[4]);//en la posicion 4 cargamos el nombre del archivo

            });
          } else {
            this.presentToast('bottom', 'Sin archivos adjuntos');
          }

        } catch (error) {
          console.log(JSON.stringify(error));
          this.presentarModal('Recuperación de adjuntos', JSON.stringify(JSON.stringify(error)), false);
        }
      } else {
        this.presentarModal('Recuperación de adjuntos', mensaje, false);
      }

    }
  }

  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribeWithPriority(9999, () => {
    });
    }

    /**
     * desactiva la navegacion del boton atras fisico del dispositivo
     */
    ionViewWillLeave() {
        this.backButton.unsubscribe();
    }

  seleccionarArchivo(event:any) {
    const fileSeleccionado:any = event.target.files[0];
    
    const reader = new FileReader();
    const realReader = (reader as any)._realReader;
    realReader.onloadend = (res:any) => {
      console.log(res.target.result);
      
      let blob = new Blob([new Uint8Array(res.target.result)], {type:fileSeleccionado.type});
      this.adjuntos.push({
        blob: blob,
        name: fileSeleccionado.name
      });//para el envio de archivos blob al servicio

    }
    
    reader.readAsArrayBuffer(fileSeleccionado);

    console.log('Adjuntos', this.adjuntos);
    this.mostrarAdjuntos.push(fileSeleccionado.name);//para mostrar los nombres de archivo al usuario en la vista
    console.log('Mostrar adjuntos', this.mostrarAdjuntos);
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

          //array de archivos adjuntados para enviar al servicio web
          this.adjuntos.push({
            blob: blob,
            name: file.name
          });
        }

        reader.readAsArrayBuffer(file);
      });
    });

    const nameFile = image.path.substr(image.path.lastIndexOf('/') + 1);
    this.mostrarAdjuntos.push(nameFile);
  }


  async enviarAsismed() {

    if (this.adjuntos.length == 0) {
      this.presentToast('bottom', 'Favor ingrsar archivos adjuntos antes de enviar');
      return;
    }

    this.dato.nombre = (await this.storageSrv.getUsuario()).nombre;

    try {

      const { status, mensaje } = await this.coberturaMedicaSrv.enviarAsismed(this.dato);

      if (status === 'success') {
        
        await this.presentarModal('Solicitud Asismed', mensaje, true);
      } else {
        await this.presentarModal('Solicitud Asismed', mensaje, false);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      this.presentarModal('Solicitud de envio', JSON.stringify(error), false);

    }
  }

  //no envia ningun dato al servidor, nave a la pantalla menu cobertura si 
  //no hay ningun adjunto
  async subirAdjunto() {

    if (this.adjuntos.length == 0) {
      this.navCtrl.navigateRoot('inicio/menu-cobertura');
      return;
    }
    console.log(this.adjuntos);
    
    try {
      this.showLoading('Espere. Enviando archivos adjuntos...');
      //para indicar cuantas peticiones se hace al servidor para mostrar el mensaje satisfactorio una vez 
      //que haya culminado la cantidad llamadas.
      let contadorDeAdjuntos = 0;

      for(let i = 0; i < this.adjuntos.length; i++) {
        ++contadorDeAdjuntos;
        let formData = new FormData();
        let blob = this.adjuntos[i].blob;
        let fileName = this.adjuntos[i].name;

        formData.append('file', blob, fileName);
        formData.append('nroSolicitud', this.dato.nroSolicitud);
        const { status, mensaje} = await this.coberturaMedicaSrv.subirAdjunto(formData);

        if(contadorDeAdjuntos == this.adjuntos.length){
          if (status == 'success') {
            this.presentAlert('Envío de archivos', '', mensaje, ['Aceptar'], false);
          } else {
            this.presentAlert('Envío de archivos', '', mensaje, ['Aceptar'], true);
          }
          break;
        }
      }
    } catch (error) {
      this.loadingCtrl.dismiss();
      console.log(JSON.stringify(error));
      this.presentarModal('Archivos adjuntos', error, false);
    }
    this.loadingCtrl.dismiss();
  }


  eliminarAdjunto(index: number) {
    this.mostrarAdjuntos.splice(index, 1);
    this.adjuntos.splice(index, 1);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2200,
      position: position,
      icon: 'information-circle',
      cssClass: 'custom-toast'
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
    const { role } = await modal.onWillDismiss();
    if (role == 'confirm' && isCss) {
      //llamamos a este metodo para enviar archivos adjuntos
      this.subirAdjunto();
    }
  }

  async showLoading(mensaje: string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      //duration: 4000,
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async presentAlert(header:string,subHeader:string, message:string, buttons:string[], isError:boolean) {
    this.loadingCtrl.dismiss();
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: buttons[0],
          role:'confirm',
          handler: () => {
            if(!isError){
              this.navCtrl.navigateRoot('inicio/menu-cobertura');
            }
          }
        }
      ],
    });

    await alert.present();  
  }
}
