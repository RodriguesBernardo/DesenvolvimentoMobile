import {View, Text, Button} from 'react-native'
import { useRouter } from 'expo-router'

const App = () => {
    const router = useRouter()

    return (
        <View>
            <Text>Categorias</Text>
            <Button title='Roupas' 
            onPress={() => router.navigate('/categories/roupas')}
            />
            <Button title='Sapatos' 
            onPress={() => router.navigate('/categories/sapatos')}
            />
        </View>
    )
}

export default App