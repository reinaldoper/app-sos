# 🛡️ Aplicativo SOS

Um aplicativo mobile desenvolvido com **React Native**, **Expo Router** e **Firebase** com foco em **segurança pessoal**, oferecendo funcionalidades como envio de **sinais de SOS**, **check-ins de localização**, **contatos de emergência** e **dicas de segurança** além do **histórico dos locais**.

---

## Politica de privacidade:

[politica](./politica.md)


---


## 📱 Funcionalidades

- 🚨 **SOS:** Envia uma mensagem de emergência por WhatsApp e e-mail para contatos previamente cadastrados.
- 📍 **Check-in:** Salva a localização atual no Firestore e envia o link por WhatsApp e e-mail.
- 👥 **Contatos:** Exibe contatos cadastrados (em breve: sincronização com os contatos do celular).
- 💡 **Dicas de Segurança:** Mostra recomendações importantes para manter a segurança pessoal em diferentes situações.

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [Firebase (Firestore)](https://firebase.google.com/)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/)
- [Expo Mail Composer (opcional)](https://docs.expo.dev/versions/latest/sdk/mail-composer/)

---

## 📂 Estrutura de Pastas

```bash
.
├── app/
│   ├── index.tsx             
│   └── screens/
│       ├── SOSScreen.tsx
│       ├── CheckInScreen.tsx
│       ├── ContactsScreen.tsx
│       ├── HistoryScreen.tsx
│       └── TipsScreen.tsx
├── constants/firebaseConfig.ts          
├── assets/
├── politica.md                   
└── README.md
```

## 🔥 Firebase Setup
1. Acesse console.firebase.google.com

2. Crie um projeto e adicione um app Web

3. Copie as configurações e coloque no arquivo constants/firebaseConfig.ts:


```bash
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const FIREBASE_APP = initializeApp({
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
});

const FIREBASE_APP = initializeApp(firebaseConfig);
const auth = initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage)
});

```

## ⚙️ Instalação e Execução

```bash

git clone https://github.com/seu-usuario/app-sos.git


cd app-sos


npm install


npx expo start
```


## 🔐 Permissões

- A aplicação pede permissão de localização ao realizar um check-in.

- Também utiliza Linking para abrir o WhatsApp e o cliente de e-mail padrão.


## 🛠️ Funcionalidades Futuras


1. Login com Firebase Auth

2. Envio de alertas silenciosos



## 🤝 Contribuições

- Contribuições são bem-vindas! Basta abrir uma issue ou enviar um pull request com suas melhorias.