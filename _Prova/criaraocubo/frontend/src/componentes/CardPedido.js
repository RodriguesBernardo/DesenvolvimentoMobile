import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { bootstrap } from '../estilos/bootstrapStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const statusCores = {
  'Recebido': '#17a2b8',
  'Em análise': '#ffc107',
  'Em produção': '#fd7e14',
  'Finalizado': '#28a745',
  'Entregue': '#6c757d',
  'Cancelado': '#dc3545'
};

const CardPedido = ({ pedido, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[bootstrap.styles.card, { marginBottom: 15 }]}>
        <View style={bootstrap.styles.cardBody}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{pedido.nomeProjeto}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusCores[pedido.status] }]}>
              <Text style={styles.statusText}>{pedido.status}</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Icon name="widgets" size={16} color="#6c757d" style={{ marginRight: 5 }} />
            <Text style={bootstrap.styles.textMuted}>{pedido.material}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Icon name="palette" size={16} color="#6c757d" style={{ marginRight: 5 }} />
            <Text style={bootstrap.styles.textMuted}>{pedido.cor}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={bootstrap.styles.textMuted}>
              {new Date(pedido.dataPedido).toLocaleDateString()}
            </Text>
            {pedido.preco && (
              <Text style={{ fontWeight: 'bold' }}>R$ {pedido.preco.toFixed(2)}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  statusText: {
    color: 'white',
    fontSize: 12
  }
});

export default CardPedido;