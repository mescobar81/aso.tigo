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
      launchShowDuration: 0,
      backgroundColor: '#ffffffff',
      launchAutoHide: false,
    }
  }
  
};

export default config;
