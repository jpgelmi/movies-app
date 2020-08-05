//Hacemos las importaciones
import React, {useEffect, useState} from 'react'
import { StyleSheet, Image, View, ScrollView, Text} from 'react-native'
import {getMovieByIdApi} from "../api/movies"
import {BASE_PATH_IMG} from "../utils/constants"
import ModalVideo from "../components/ModalVideo"
import {Title, IconButton} from "react-native-paper"
import {map} from "lodash"
import {Rating} from "react-native-ratings"

import starDark from "../assets/png/starDark.png"
import starLight from "../assets/png/starLight.png"

import usePreferences from "../hooks/usePreferences"

//Función para la pelicula en sí
export default function Movie(props) {
    //Obtenemos la ruta mediante as props 
    const {route} = props
    //Creamos el 
    const [movie, setMovie] =useState(null)
    const {id} = route.params
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        getMovieByIdApi(id).then((response) => {
            setMovie(response)
        })
    }, [])

    if(!movie) return null

    return (
        <>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <MovieImage posterPath = {movie.poster_path}/>
                <MovieTrailer setShowVideo = {setShowVideo} idMovie = {id}/>
                <MovieTitle movie = {movie}/>
                <MovieRating voteAverage = {movie.vote_average} voteCount = {movie.vote_count}/>
                <Text style = {styles.overview}>{movie.overview}</Text>
                <Text style = {[styles.overview, {marginBottom: 30}]}>Fecha de lanzamiento: {movie.release_date} </Text>
            </ScrollView>
            <ModalVideo show = {showVideo} setShow = {setShowVideo}/>
        </>
    )
}

function MovieImage(props){
    const {posterPath} = props 

    return(
        <View style = {styles.viewPoster}>
            <Image
                style = {styles.poster}
                source = {{ uri : `${BASE_PATH_IMG}/w500${posterPath}`}}
            />
        </View>
    )
}

function MovieTrailer(props){
    const {setShowVideo} = props

    return(
        <View style = {styles.viewPlay}>
            <IconButton
                icon = "play"
                color = "#000"
                size = {30}
                style = {styles.play}
                onPress = {() => setShowVideo(true)}
            />
        </View>
    )
}

function MovieTitle(props){
    const {movie} = props

    return(
        <View style = {styles.viewInfo}>
            <Title>{movie.title}</Title>
            <View style = {styles.viewGenres}>
                {map(movie.genres, (genre) => (
                    <Text key = {genre.id} style = {styles.genre}>
                        {genre.name},
                    </Text>
                ))}
            </View>
        </View> 
    )
}

function MovieRating(props){
    const { voteCount, voteAverage } = props
    const media = voteAverage / 2;
    const { theme } = usePreferences();

    return(
        <View style = {styles.viewRating}>
            <Rating 
                type = "custom"
                ratingImage = {theme === "dark" ? starDark : starLight }
                ratingColor = "#ffc205"
                ratingBackgroundColor = {theme === "dark" ? "#192734" : "#f0f0f0"}
                startingValue = {media}
                imageSize = {20}
                style = {{marginRight: 15}}
            />
            <Text style = {{fontSize : 16, marginRight: 5, color: "#ffc205"}}>
                {media}
            </Text>
            <Text style = {{ fontSize: 12, color: "#8697a5"}}>
                {voteCount} votos
            </Text>
        </View>
        
    )

}

const styles = StyleSheet.create({
    viewPoster:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    poster:{
        width: "100%",
        height: 400,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30 

    },
    viewPlay:{
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    play: {
        backgroundColor: "#fff",
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100
    },
    viewInfo:{
        marginHorizontal:30
    },
    viewGenres:{
        flexDirection: "row"
    },
    genre:{
        marginRight: 10,
        color: "#8697a5"

    }, viewRating: {
        marginHorizontal: 30,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    }, overview:{
        marginHorizontal:30,
        marginTop: 20,
        textAlign: "justify",
        color: "#8697a5"
    }
})

 