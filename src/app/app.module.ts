import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { Device } from '@awesome-cordova-plugins/device/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { SeparadorMilesDirective } from './directives/separador-miles.directive';

@NgModule({
  declarations: [
    AppComponent,
    SeparadorMilesDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule
    ],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
     },
     Device,
     File,
     FileOpener,
     InAppBrowser
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
