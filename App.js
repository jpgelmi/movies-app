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

export default function App() {
  const [theme, setTheme] = useState("dark")

  DefaultThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.accent = "#1ae1f2"

  DarkThemeNavigation.colors.background = "#192734"
  DarkThemeNavigation.colors.card = "#15212b"

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "ligth" : "dark")
  }

  const preferences = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  )

  return (

    <PreferencesContex.Provider value = {preferences}>
      <PaperProvider theme = {theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar barStyle = {theme === "dark" ? "light-content" : "dark-content" }/>
        <NavigationContainer theme = {theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation}>
          <NavigationNav/>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContex.Provider>
  )
}