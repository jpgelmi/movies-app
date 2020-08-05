//Importamos lo necesario
import {createContext} from "react"

//Generamos la función para cabiar de color las app
//Generamos el hook
const PreferencesContext = createContext({
    theme: "",
    toggleTheme: () => {}
})

export default PreferencesContext