import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import Livros from './screens/Livros'

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        
        <Stack.Screen 
        name="Home" component={Livros} options={{title: 'Bem-vindo(a)'}}/>
        
       

      </Stack.Navigator>
   </NavigationContainer>
  );
}
