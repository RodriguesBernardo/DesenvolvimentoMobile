import { useState, useContext } from 'react';
import { Box, Button, FormControl, Input, Text, TextArea } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

export default function NewOrderScreen({ navigation }) {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const submitOrder = async () => {
    if (!description || !file) return;

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('file', {
        uri: file.uri,
        name: file.fileName || 'file.jpg',
        type: file.type || 'image/jpeg',
      });

      await api.post('/api/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} p={4}>
      <Text fontSize="xl" bold mb={4}>Novo Pedido</Text>
      
      <FormControl mb={4}>
        <TextArea
          placeholder="Descreva seu pedido"
          value={description}
          onChangeText={setDescription}
          h={100}
        />
      </FormControl>
      
      <Button onPress={pickFile} mb={4}>
        {file ? 'Arquivo Selecionado' : 'Selecionar Arquivo'}
      </Button>
      
      {file && <Text mb={4}>{file.fileName || file.uri.split('/').pop()}</Text>}
      
      <Button
        onPress={submitOrder}
        isLoading={isLoading}
        isDisabled={!description || !file}
      >
        Enviar Pedido
      </Button>
    </Box>
  );
}