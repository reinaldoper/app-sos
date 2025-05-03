
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock do Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock do Alert
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    Alert: { alert: jest.fn() },
  };
});

// Mock do signOut e auth
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(() => Promise.resolve()),
}));
jest.mock('../constants/firebaseConfig', () => ({
  auth: {},
}));

// Mock do useRouter e useNavigation do expo-router
const replaceMock = jest.fn();
const goBackMock = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: replaceMock }),
  useNavigation: () => ({ goBack: goBackMock }),
}));

// Mock das cores
jest.mock('../constants/Colors', () => ({
  primary: '#123',
  secondary: '#456',
  backGroundContainer: '#fff',
}));

import Logout from '../../app/Logout';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';

describe('Logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza corretamente', () => {
    const { getByText } = render(<Logout />);
    expect(getByText('👋 Deseja sair da sua conta?')).toBeTruthy();
    expect(getByText('Sair')).toBeTruthy();
  });

  it('chama signOut e navega para login ao pressionar "Sair"', async () => {
    const { getByText } = render(<Logout />);
    const button = getByText('Sair');
    await fireEvent.press(button);
    expect(signOut).toHaveBeenCalled();
    // Aguarda o signOut resolver e verifica navegação
    await Promise.resolve();
    expect(replaceMock).toHaveBeenCalledWith('/screens/Login');
  });

  it('mostra alerta em caso de erro no logout', async () => {
    signOut.mockImplementationOnce(() => Promise.reject(new Error('Erro de teste')));
    const { getByText } = render(<Logout />);
    const button = getByText('Sair');
    await fireEvent.press(button);
    // Aguarda o signOut rejeitar
    await Promise.resolve();
    expect(Alert.alert).toHaveBeenCalledWith('Erro ao sair', 'Erro de teste');
  });

  it('volta para tela anterior ao pressionar o botão de voltar', () => {
    const { getByTestId } = render(<Logout />);
    const backButton = getByTestId('back-pressable');
    fireEvent.press(backButton);
    expect(goBackMock).toHaveBeenCalled();
  });
});
