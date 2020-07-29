import React from 'react'
import {createDrawerNavigator} from "@react-navigation/drawer"
import StackNavigation from "./StackNavigation"
import DraweContent from "./DrawerContent"

const Drawer = createDrawerNavigator()

export default function NavigationNav(){
    return(
    <Drawer.Navigator
        initialRouteName = "app"
        drawerContent = {(props) => <DraweContent {...props}/>}>
        <Drawer.Screen name = "app" component = {StackNavigation}/>
    </Drawer.Navigator>
    )
} 