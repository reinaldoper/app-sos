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

3. Crie um arquivo .env na raiz e adiciona as credenciais do firebase

4. Copie as configurações e coloque no arquivo constants/firebaseConfig.ts:


```bash
import Constants from 'expo-constants';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.MEASUREMENT_ID
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const auth = getAuth(FIREBASE_APP);

export { FIREBASE_APP, auth };


```

## ⚙️ Instalação e Execução

```bash

git clone https://github.com/seu-usuario/app-sos.git


cd app-sos


npm install


npx expo start

#ou

npm run android
```


## 🔐 Permissões

- A aplicação pede permissão de localização ao realizar um check-in.

- Também utiliza Linking para abrir o WhatsApp e o cliente de e-mail padrão.


## 🛠️ Funcionalidades Futuras


1. Envio de alertas silenciosos

2. Logout com firebase



## 🤝 Contribuições

- Contribuições são bem-vindas! Basta abrir uma issue ou enviar um pull request com suas melhorias.