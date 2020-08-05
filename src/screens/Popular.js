import React, {useEffect, useState} from 'react'
import { StyleSheet,View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native'
import {getPopularMovieApi} from "../api/movies"
import { Text, Title, Button} from "react-native-paper"
import { map } from "lodash"
import {Rating} from "react-native-ratings"
import { BASE_PATH_IMG } from '../utils/constants'
import noImage from "../assets/png/default-image.png"
import usePreferences from "../hooks/usePreferences"
import starDark from "../assets/png/starDark.png"
import starLight from "../assets/png/starLight.png"


export default function Popular(props) {
    const {navigation} = props 
    const [movies, setMovies] = useState()
    const [showBtnMore, setShowBtnMore] = useState(true)
    const [page, setPage] = useState(1)
    const {theme} = usePreferences()

    useEffect(() => {
      getPopularMovieApi(page).then(response => {
          const totalPages = response.total_pages;
          if(page < totalPages){
            if(!movies){
                setMovies(response.results)
            }else{
                setMovies([...movies, ...response.results])
            }
          }else{
              setShowBtnMore(false)
          }

      })
    }, [page])

    return (
        <ScrollView>
            {map(movies, (movie, index) => (
                <Movies key = {index} movie = {movie} theme = {theme} navigation = {navigation}/>
            ))}
            {showBtnMore && (
                <Button
                    mode = "contained"
                    contentStyle = {styles.loadMoreContainer}
                    style = {styles.loadMore}
                    labelStyle = {{color: theme === "dark" ? "#fff" : "#000"}}
                    onPress = {() => setPage(page + 1)}
                >
                   Cargar más 
                </Button>
            )}
        </ScrollView>
    )
}


function Movies(props){
    
    const {movie, theme, navigation} = props
    const{id, poster_path, title, release_date, vote_count, vote_average} = movie
    
    const goMovie = () => {
    navigation.navigate("movie" , {id})
    }

    return(
        <TouchableWithoutFeedback onPress = {goMovie}>
        <View style = {styles.movie}>
            <View style = {styles.left}>
                <Image
                    style = {styles.image}
                    source = {
                        poster_path
                        ? {uri: `${BASE_PATH_IMG}/w500/${poster_path}`}
                        : noImage
                    }
                />
            </View>
            <View>
                <Title>{title}</Title>
                <Text>{release_date}</Text>
                <MovieRaiting theme = {theme} voteCount = {vote_count} voteAverage = {vote_average} />
            </View>
        </View>
    </TouchableWithoutFeedback>
    )
}

function MovieRaiting(props){
    const {theme, voteCount, voteAverage} = props
    const media = voteAverage / 2
    return(
        <View style = {styles.viewRating}>
            <Rating
                type = "custom"
                ratingImage = {theme === "dark" ? starDark : starLight}
                ratingColor = "#ffc205"
                ratingBackgroundColor ={ theme === "dark" ? "#192734": "#f0f0f0" }
                startingValue = {media}
                imageSize = {20}
                style ={{marginRight: 15}}
            />
            <Text style = {{fontSize: 12, color: "#8697a5", marginTop: 5}}>
                {voteCount} votos
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    movie: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    left: {
        marginRight: 20,
    },
    image:{
        height: 150,
        width: 100
    },
    viewRating:{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 10

    },loadMoreContainer:{
        paddingTop: 10,
        paddingBottom: 30
    },loadMore:{
        backgroundColor: "transparent"
    }
})
