
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { safetyTips } from '../../constants/safetyTips';
import LogoutButton from "../../components/LogoutButton";



/**
 * Tela de Dicas de Seguran a, que renderiza uma lista de dicas
 * de seguran a para o usu rio.
 *
 * A lista de dicas  gerenciada pelo array `safetyTips` no arquivo
 * `constants/safetyTips`.
 *
 * A tela tamb m renderiza um bot o de Logout na parte inferior.
 */
export default function TipsScreen() {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>💡 Dicas de Segurança</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {safetyTips.map((tip, index) => (
          <View key={index} style={styles.tipBox}>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    <LogoutButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#00ffc6',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scroll: {
    paddingBottom: 40,
  },
  tipBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00ffc6',
  },
  tipText: {
    color: '#fff',
    fontSize: 16,
  },
});
