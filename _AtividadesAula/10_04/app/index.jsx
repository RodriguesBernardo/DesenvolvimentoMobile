import {View, Text, Button} from 'react-native'
import { useRouter } from 'expo-router'

const App = () => {
    const router = useRouter()

    return (
        <View>
            <Text>Hello World!</Text>
            <Button title='Teste' 
            onPress={() => router.navigate('/teste')}
            />
             <Button title='Categorias' 
            onPress={() => router.navigate('/categories')}
            />
        </View>
    )
}

export default App