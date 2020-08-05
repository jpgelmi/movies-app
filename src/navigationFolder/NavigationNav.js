//Importamos lo necesario
import React from 'react'
import {createDrawerNavigator} from "@react-navigation/drawer"
import StackNavigation from "./StackNavigation"
import DrawerContent from "./DrawerContent"

//Creamos el drawer
const Drawer = createDrawerNavigator()

//hacemos la funcion de la navegación 
export default function NavigationNav(){
    //Retornamos
    return(
    //Creamos el navegador para las opciones
    <Drawer.Navigator
        //La ruta por defecto es el componente app
        initialRouteName = "app"
        //Obtenemos mediante las props y hacemos una copia para renderizar el componente
        drawerContent = {(props) => <DrawerContent {...props}/>}>
        {/*El componente que se rendirizará*/}
        <Drawer.Screen name = "app" component = {StackNavigation}/>
    </Drawer.Navigator>
    )
} 