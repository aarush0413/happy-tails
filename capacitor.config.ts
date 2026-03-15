import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.happytails.app",
  appName: "Happy Tails",
  webDir: "public",
  server: {
    androidScheme: "https",
    url: "https://happytails.vercel.app",
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0096DB",
      showSpinner: false,
    },
  },
};

export default config;
