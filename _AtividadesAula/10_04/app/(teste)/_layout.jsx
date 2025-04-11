import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false
        }}>
<Tabs.Screen
    name="teste"
    options={{
        title:"Index",
        tabBarIcon:() => (
            <Ionicons name="checkmark-circle" size={24} color="blue" />
        )
    }}
            />
            <Tabs.Screen
                name="detalhes"
                options={{
                    title:"Detalhes"
                }}
            />
            <Tabs.Screen
                name="outra"
                options={{
                    title:"Outra"
                }}
            />
        </Tabs>
    )
}