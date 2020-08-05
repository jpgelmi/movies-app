//Importamos lo necesario
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Title} from "react-native-paper" 
import {getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi} from "../api/movies"
import CarouselVertical from "../components/CarouselVertical"
import {map} from "lodash"
import CarouselMulti from "../components/CarouselMulti"

//Creamos la función general de la home
export default function Home(props) {
    //Obtenemos las props de la navegación
    const{navigation} = props
    //creamos el useState para las nuevas peliculas 
    const [newMovies, setNewMovies] = useState(null)
    //useState para la lista de generos
    const [genreList, setGenreList] = useState([])
    //useState para el genero seleccionado
    //Parta en default cómo el genero 28
    const [genreSelect, setGenreSelect] = useState(28)
    //useState para el genero de la pelicula
    const [genreMovies, setGenreMovies] = useState(null)

    //creamos el useEffect para obtener los resultados
    //De la Api de las peliculas nuevas
    useEffect(async() => {
        getNewsMoviesApi().then((response) => {
            setNewMovies(response.results)
        })
    }, [])

    //Creamos el useEffect para obtener la info de todos los generos
    useEffect(() => {
        getAllGenresApi().then((response) => {
            setGenreList(response.genres) 
        })
    }, [])
    //Creamos el useeffect para obtener los generos de las peliculas
    useEffect(() => {
        getGenreMoviesApi(genreSelect).then((response) => {
            setGenreMovies(response.results)    
        })
        //Se actualiza cuando cambiamos el genero seleccionado
    }, [genreSelect])

    //Creamos la función que cambia el id del genero selecionado
    const onChangeGenre = (newGenreId) => { 
        setGenreSelect(newGenreId)
    }
    //Retornamos...
    return (
        //Ponemos un scrolview que saca el inicador de posición vertical
        <ScrollView showsVerticalScrollIndicator = {false}>
            {/*Si esq hay peliculas.. */}
            {newMovies && (
                <View style = {styles.news}>
                    <Title style = {styles.newsTitle}>Nuevas peliculas</Title>
                    {/*Usamos el carrusel para las peliculas horizontales*/}
                    <CarouselVertical data = {newMovies} navigation = {navigation}/>
                </View>
            )}

            {/*Carrusel menor abajo */}
            <View style = {styles.genres}>
                <Title style = {styles.genresTitle}>Peliculas por genero</Title>
                {/* Horizontal*/}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    style = {styles.genreList}>
                    {/*Hacemos un map donde por cada genero en el array...*/}
                    {map(genreList,(genre) => (
                        <Text
                            key = {genre.id}
                            style = {[styles.genre,
                                //Estilos
                                {color: genre.id !== genreSelect ? "#8697a5": "#fff"}]}
                                //Al apretarlo... ejecutamos la función
                            onPress = {() => onChangeGenre(genre.id)}>
                            {genre.name}
                        </Text>
                    ))}
                </ScrollView>
                {genreMovies && (
                    <CarouselMulti data = {genreMovies} navigation = {navigation}/>
                )}
            </View>
        </ScrollView>
    )
}

//Hoja de estilos
const styles = StyleSheet.create({ 
    news:{ 
        marginVertical: 10,
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22
    },genres: {
        marginTop:20,
        marginBottom: 50,
    },
    genresTitle:{
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22,
    },genreList:{
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        paddingHorizontal: 20,
    },
    genre:{
        marginRight: 20,
        fontSize: 20
    }

})
 