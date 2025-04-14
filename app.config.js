export default {
  expo: {
    name: "sos",
    slug: "sos",
    version: "1.0.0",
    sdkVersion: "52.0.0",
    extra: {
      eas: {
        projectId: "54b5181b-4b86-4dea-9144-0c42ba40c75e"
      },
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID
    },
    ios: {
      bundleIdentifier: "com.reinaldodev.sos",
    },
    android: {
      package: "com.reinaldodev.sos",
    }
  },
};
