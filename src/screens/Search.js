import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native'
import { searchMoviesApi, getVideoMovieApi } from "../api/movies"
import {Searchbar} from "react-native-paper"
import {size, map} from "lodash"
import {BASE_PATH_IMG}from "../utils/constants"

const{width} = Dimensions.get("window")

export default function Search(props) {
    const {navigation} = props
    const [movies, setMovies] = useState(null)
    const [search, setSearch] = useState("")
    console.log(movies)

    useEffect(() => {
        if(size(search) > 2){
            searchMoviesApi(search).then((response) => {
                setMovies(response.results)
            })
        }
    }, [search])

    return (
        <SafeAreaView>
            <Searchbar
            placeholder = "Busca tu pelicula"
            iconColor = {Platform.OS === "ios" && "transparent"}
            icon = "arrow-left"
            style = {styles.input}
            onChangeText = {(e) => setSearch(e)}
            />
            <ScrollView>
                <View style = {styles.container}>
                    {map(movies, (movie, index) => (
                        <Movie key = {index} movie = {movie} navigation = {navigation}/>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView> 
    )
}

function Movie(props){
    const {movie, navigation} = props
    const {poster_path, title, id} = movie

    const goMovie = () => {
        navigation.navigate("movie", {id})
    }

    return(
        <TouchableWithoutFeedback on onPress = {goMovie}>
            <View style = {styles.movie}>
                {poster_path ? (
                    <Image style = {styles.image} source = {{uri:`${BASE_PATH_IMG}/w500${poster_path}`}}/>
                ):(
                    <Text>{title}</Text>
                )}

                
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: -3,
        backgroundColor: "#15212b"
    },
    container:{
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    movie:{
        width: width / 2,
        height: 300,
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: "100%",
        height: "100%"
    }
}) 
