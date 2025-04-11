import {Stack} from 'expo-router'

const LayoutPrincipal = () => {
    return (
<Stack>
    <Stack.Screen name="index" options={{headerShown:true}}/>
    <Stack.Screen name="categories" options={{headerShown:true}}/>
    <Stack.Screen 
        name="(teste)" 
        options={{
            headerShown:false, 
            title:"Teste - Outro título"
        }}/>
    <Stack.Screen name='+not-found'/>
</Stack>
    )
}

export default LayoutPrincipal