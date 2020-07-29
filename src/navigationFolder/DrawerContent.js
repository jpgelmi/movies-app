import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {DrawerContentScrollView} from "@react-navigation/drawer"
import {Drawer, Switch, TouchableRipple} from "react-native-paper"
import usePreferences from "../hooks/usePreferences"

export default function DrawerContent(props){
    const{navigation} = props
    const[active, setActive] = useState("home")
    const {theme, toggleTheme}= usePreferences();

    const onChangeScreen = (screen) => {
        setActive(screen)
        navigation.navigate(screen)
        console.log(screen)
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label = "Inicio"
                    active = {active === "home"}
                    onPress = {() => onChangeScreen("home")}/>
                <Drawer.Item
                    label = "Peliculas populares"
                    active = {active === "popular"}
                    onPress = {() => onChangeScreen("popular")}/>
                <Drawer.Item
                    label = "Nuevas Peliculas"
                    active = {active === "news"}
                    onPress = {() => onChangeScreen("news")}/>
            </Drawer.Section>
            <Drawer.Section title = "Opciones">
                <TouchableRipple>
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

const styles = StyleSheet.create({
    preferences: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
