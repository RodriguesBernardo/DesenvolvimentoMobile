import {View, Text, Button} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

const App = () => {
    const {id} = useLocalSearchParams()
    const router = useRouter()

    return (
        <View>
            <Text>{id}</Text>
            <Button title='VOltar'
            onPress={()=>router.navigate('/')}/>
        </View>
    )
}

export default App