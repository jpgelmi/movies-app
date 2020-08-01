import React, {useEffect, useState} from 'react'
import { StyleSheet, Image, View, ScrollView} from 'react-native'
import {getMovieByIdApi} from "../api/movies"
import {BASE_PATH_IMG} from "../utils/constants"


export default function Movie(props) {
    const {route} = props
    const [movie, setMovie] =useState(null)
    const {id} = route.params

    useEffect(() => {
        getMovieByIdApi(id).then((response) => {
            setMovie(response)
        })
    }, [])

    return (
        <>
            <ScrollView>
                <MovieImage posterPath = {movie.poster_path}/>
            </ScrollView>
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

const styles = StyleSheet.create({
    viewPoster:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 100
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    poster:{
        width: "100%",
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30 

    }
})

