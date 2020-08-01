import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Title} from "react-native-paper" 
import {getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi} from "../api/movies"
import CarouselVertical from "../components/CarouselVertical"
import {map} from "lodash"
import CarouselMulti from "../components/CarouselMulti"

export default function Home(props) {
    const{navigation} = props
    const [newMovies, setNewMovies] = useState(null)
    const [genreList, setGenreList] = useState([])
    const [genreSelect, setGenreSelect] = useState(28)
    const [genreMovies, setGenreMovies] = useState(null)
    

    useEffect(async() => {
        getNewsMoviesApi().then((response) => {
            setNewMovies(response.results)
        })
    }, [])

    useEffect(() => {
        getAllGenresApi().then((response) => {
            setGenreList(response.genres) 
        })
    }, [])

    useEffect(() => {
        getGenreMoviesApi(genreSelect).then((response) => {
            setGenreMovies(response.results)    
        })
    }, [genreSelect])

    const onChangeGenre = (newGenreId) => { 
        setGenreSelect(newGenreId)
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            {newMovies && (
                <View style = {styles.news}>
                    <Title style = {styles.newsTitle}>Nuevas peliculas</Title>
                    <CarouselVertical data = {newMovies} navigation = {navigation}/>
                </View>
            )}

            <View style = {styles.genres}>
                <Title style = {styles.genresTitle}>Peliculas por genero</Title>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    style = {styles.genreList}>
                    {map(genreList,(genre) => (
                        <Text
                            key = {genre.id}
                            style = {[styles.genre,
                                {color: genre.id !== genreSelect ? "#8697a5": "#fff"}]}
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
 