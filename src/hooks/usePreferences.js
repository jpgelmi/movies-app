import {useContext} from "react";
import PreferencesContext from "../context/PreferencesContex";

//Le pasamos la info al hook
export default () => useContext(PreferencesContext);

