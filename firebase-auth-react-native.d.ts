declare module 'firebase/auth/react-native' {
  import { Persistence } from 'firebase/auth';
  const getReactNativePersistence: (storage: any) => Persistence;
  export { getReactNativePersistence };
}
