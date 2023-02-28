import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  //appId: 'py.com.sysasotigo.android.asociados', id para version android
  appId: 'py.com.sysasotigov1.asociados',//id para version ios
  appName: 'AsoTigo',
  webDir:'www',
  bundledWebRuntime: false,
  backgroundColor:'#001F5F',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    "SplashScreen": {
      "launchAutoHide": false,
      "showSpinner": false
    }
  }
  
};

export default config;
