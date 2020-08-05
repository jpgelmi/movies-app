//Hacemos las importaciones
import React from "react"
import {createStackNavigator} from "@react-navigation/stack"

import {IconButton} from "react-native-paper"
import Home from "../screens/Home"
import Movie from "../screens/Movie"
import News from "../screens/News"
import Popular from "../screens/Popular"
import Search from "../screens/Search"

//Creamos el stack
const Stack = createStackNavigator()

//Creamos la función del stack navigator
export default function StackNavigator(props){
    
    //Obtenemos navigation de las props
    const{navigation} = props

    //hacemos la opcion de tener un boton a la izquierda
    const buttonLeft = (screen) => {

        //Dependiendo de la screen renderizamos el botón search o movie
        switch(screen){
            //En el caso de que sea el componente search o movie...
            case "search" :
            case "movie" :
                //Retorna lo siguente
                return(
                    //El icono de la flecha 
                <IconButton
                    icon = "arrow-left"
                    //Al apretar vuelva en la navegación
                    onPress = {() => navigation.goBack()}/>
                )
                //Si no...
            default:
                //Retorna el botón del drawer
                return(
                <IconButton
                    icon = "menu"
                    //Al apretarlo se abraa el drawer
                    onPress = {() => navigation.openDrawer()}/>
                )
        }
    }

    //En ciertas screens habrá el botón de la lupa
    const buttonRigth = () => {
        return(
            <IconButton
                icon = "magnify"
                //Al apretarlo renderizará el componente search
                onPress = {() => navigation.navigate("search")}
            />
        )
    }
    //Retornar...
    return(
        <Stack.Navigator>

        {/*Stack de la casa*/}
        <Stack.Screen
                name = "home"
                //Componente Home
                component = {Home}
                //Titulo, botones
                options = {{title:
                        "TheMovieApp",
                        headerLeft: ()=> buttonLeft("home"),
                        headerRight: () =>buttonRigth()}}
                />
        {/*Stack de la pelicula*/}
        <Stack.Screen
                name = "movie"
                //Componente Movie
                component = {Movie}
                //options...
                options = {{title: "",
                        headerLeft: ()=> buttonLeft("movie"),
                        headerRight: () =>buttonRigth(),
                        headerTransparent: true }}
                />
        {/*Stack de las peliculas nuevas*/}
        <Stack.Screen
                name = "news"
                component = {News}
                options = {{title: "Nuevas Peliculas",
                        headerLeft: ()=> buttonLeft("news"),
                        headerRight: () =>buttonRigth()}}
                /> 
        {/*Stack de las peliculas populares*/}
        <Stack.Screen
                name = "popular"
                component = {Popular}
                options = {{title: "Peliculas Populares",
                        headerLeft: ()=> buttonLeft("popular"),
                        headerRight: () =>buttonRigth()}}
                />
        {/*Satck del buscador*/}
        <Stack.Screen
                name = "search"
                component = {Search}
                options = {{
                    title: "",
                    headerTransparent: true,
                    headerLeft: ()=> buttonLeft("search")}}/>
        </Stack.Navigator>
    )
}