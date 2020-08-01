import React from "react"
import {createStackNavigator} from "@react-navigation/stack"

import {IconButton} from "react-native-paper"
import Home from "../screens/Home"
import Movie from "../screens/Movie"
import News from "../screens/News"
import Popular from "../screens/Popular"
import Search from "../screens/Search"

const Stack = createStackNavigator()

export default function StackNavigator(props){
    console.log(props)
    const{navigation} = props

    const buttonLeft = (screen) => {

        switch(screen){
            case "search" :
            case "movie" :
                return(
                <IconButton
                    icon = "arrow-left"
                    onPress = {() => navigation.goBack()}/>
                )
            default:
                return(
                <IconButton
                    icon = "menu"
                    onPress = {() => navigation.openDrawer()}/>
                )
        }
    }

    const buttonRigth = () => {
        return(
            <IconButton
                icon = "magnify"
                onPress = {() => navigation.navigate("search")}
            />
        )
    }

    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "home"
                component = {Home}
                options = {{title:
                        "TheMovieApp",
                        headerLeft: ()=> buttonLeft("home"),
                        headerRight: () =>buttonRigth()}}
                />
        <Stack.Screen
                name = "movie"
                component = {Movie}
                options = {{title: "",
                        headerLeft: ()=> buttonLeft("movie"),
                        headerRight: () =>buttonRigth(),
                        headerTransparent: true }}
                />
        <Stack.Screen
                name = "news"
                component = {News}
                options = {{title: "Nuevas Peliculas",
                        headerLeft: ()=> buttonLeft("news"),
                        headerRight: () =>buttonRigth()}}
                /> 
        <Stack.Screen
                name = "popular"
                component = {Popular}
                options = {{title: "Peliculas Populares",
                        headerLeft: ()=> buttonLeft("popular"),
                        headerRight: () =>buttonRigth()}}
                />
        <Stack.Screen
                name = "search"
                component = {Search}
                options = {{title: "",
                        headerLeft: ()=> buttonLeft("search")}}/>
        </Stack.Navigator>
    )
}