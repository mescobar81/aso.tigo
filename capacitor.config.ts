import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  //appId: 'py.com.sysasotigo.android.asociados', id para version android
  appId: 'py.com.sysasotigo.asociados',//id para version ios
  appName: 'AsoTigo',
  webDir:'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    SplashScreen: {
      launchAutoHide: true,
      showSpinner:true
    }
  }
};

export default config;
