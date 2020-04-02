import React from "react";
import { NavigationAction, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Declaração do navegador de páginas
const stack = createStackNavigator();

//componentes
import Incidents from "./pages/incidents/index";
import Detail from "./pages/details/index";

export default function Router(){

    return(
        <NavigationContainer>
            <stack.Navigator screenOptions={ {headerShown: false} }>
                <stack.Screen name="Incidents" component={Incidents} />
                <stack.Screen name="Detail" component={Detail} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

