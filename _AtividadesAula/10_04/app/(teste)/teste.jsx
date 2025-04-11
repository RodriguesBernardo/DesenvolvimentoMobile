import {View, Text, Button} from 'react-native'
import { useRouter } from 'expo-router'

const App = () => {
    const router = useRouter()

    return (
        <View>
            <Text>Index!</Text>
            <Button title='VOltar'
            onPress={()=>router.navigate('/')}/>
        </View>
    )
}

export default App