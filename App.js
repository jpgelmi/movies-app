
//Hacemos las importaciones necesarias 
import React, {useMemo, useState} from 'react'
import {StatusBar} from "react-native"
import{Provider as PaperProvider,
      DarkTheme as DarkThemePaper,
      DefaultTheme as DefaultThemePaper}
from "react-native-paper"
import {NavigationContainer,
        DefaultTheme as DefaultThemeNavigation,
        DarkTheme as DarkThemeNavigation}
from "@react-navigation/native"
import NavigationNav from "./src/navigationFolder/NavigationNav.js"
import PreferencesContex from "./src/context/PreferencesContex"

//Decleramos la función App que va a tener todo el contenido 
export default function App() {
  //Creamos el useState para controlar el color de la App
  const [theme, setTheme] = useState("dark")

  //Importamos los colores del fichero
  DefaultThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.accent = "#1ae1f2"

  DarkThemeNavigation.colors.background = "#192734"
  DarkThemeNavigation.colors.card = "#15212b"

  //Creamos la función toggleTheme para setear el color de las letras para
  //que halla un contraste
  const toggleTheme = () => {
    //Si theme el color es negro, renderiza el blanco
    setTheme(theme === "dark" ? "ligth" : "dark")
  }

  //usamos el useEfect 
  const preferences = useMemo(
    () => ({
      //actualiza toggletheme y theme
      toggleTheme,
      theme,
    }),
    //Cuando theme sea cambiado
    [theme]
  )

  //Lo que retornamos
  return (
    //Componente para el color, le pasamos por props las preferencias (el useEffect)
    <PreferencesContex.Provider value = {preferences}>
      {/*Usamos react-native-paper*/}
      <PaperProvider theme = {theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
        {/* Hacemos la condición de si el fondo es oscuro, rendericsamos lo contrario*/}
        <StatusBar barStyle = {theme === "dark" ? "light-content" : "dark-content" }/>
        {/*Ahora la condición de el "cajón de la navigación"*/}
        <NavigationContainer theme = {theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation}>
          {/*La navegación en sí*/}
          <NavigationNav/>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContex.Provider>
  )
}