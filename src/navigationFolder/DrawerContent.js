//Importamos lo necesario
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {DrawerContentScrollView} from "@react-navigation/drawer"
import {Drawer, Switch, TouchableRipple} from "react-native-paper"
import usePreferences from "../hooks/usePreferences"

//Creaos la función que se renderiza el contenido del drawer
export default function DrawerContent(props){
    //Obtenemos las props
    const{navigation} = props
    //Creamos los estados del theme y si está activado
    //Por default es home
    const[active, setActive] = useState("home")
    const {theme, toggleTheme}= usePreferences();

    //Cuando cambia la pantalla
    const onChangeScreen = (screen) => {
        setActive(screen)
        //Navegamos a esa pantalla
        navigation.navigate(screen)
    }

    return (
        //Tres "grandes" items que hay en en el drawer
        <DrawerContentScrollView>
            <Drawer.Section>
                {/*El inicio o home*/}
                <Drawer.Item
                    label = "Inicio"
                    active = {active === "home"}
                    onPress = {() => onChangeScreen("home")}/>
                {/*Peliculas populares*/}
                <Drawer.Item
                    label = "Peliculas populares"
                    active = {active === "popular"}
                    onPress = {() => onChangeScreen("popular")}/>
                {/*Nuevas peliculas*/}
                <Drawer.Item
                    label = "Nuevas Peliculas"
                    active = {active === "news"}
                    onPress = {() => onChangeScreen("news")}/>
            </Drawer.Section>
            {/*Opciones de la app*/}
            <Drawer.Section title = "Opciones">
                <TouchableRipple>
                    {/*Teemos el swicht que cambia el color de la app entera*/}
                    <View style = {styles.preferences}>
                        <Text style = {{color: "grey"}}>Tema Oscuro</Text>
                        <Switch
                            value = {theme === "dark" ? true : false}
                            onValueChange = {toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
} 

//Estilos
const styles = StyleSheet.create({
    preferences: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
