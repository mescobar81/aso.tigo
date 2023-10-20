import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'py.sysasotigo.asociados',
  appName: 'AsoTigo Asociados',
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
