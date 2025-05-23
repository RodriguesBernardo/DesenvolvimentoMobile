import { StyleSheet } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const styles = StyleSheet.create({
  container: {
    ...s.container,
    ...s.bgLight,
    padding: 20,
    flex: 1,
  },
  btnPrimary: {
    ...s.btn,
    ...s.btnPrimary,
    ...s.mt3,
  },
  formControl: {
    ...s.formControl,
    ...s.mb3,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
  },
  textCenter: {
    ...s.textCenter,
  },
  card: {
    ...s.card,
    ...s.mb3,
  },
  cardBody: {
    ...s.cardBody,
  },
  textMuted: {
    ...s.textMuted,
  },
  // Adicione mais estilos conforme necessário
});

export const bootstrap = {
  s: s,
  c: c,
  styles: styles,
};