//Importamos las constantes
import {API_KEY, API_HOST, LANG} from "../utils/constants"

//Función para obtener las peliculas nuevas
export function getNewsMoviesApi(page = 1){
    const url = `${API_HOST}/movie/now_playing/?api_key=${API_KEY}&language=${LANG}&page=${page}`
    
    //Mediante las promesas obtenmos la url y obtenemos la respuesata
    return fetch(url).then((response) =>{
        //Retornamos el response
        return response.json()
        //Mostramos el result
    }).then((result) => {
        return result
    })
}
// Obtenemos los generos de las peliculas
export function getGenreMovieApi(idGenres){
    //obteenmos el url
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`
    //Mediante las promesas obtenemos la url
    return fetch(url)
        .then((response)=> {
            //trasnformamos a json
            return response.json()
        })
        .then((result) => {
            //Creamos el array de los generos
            const arrayGenres = []
            //Para cada genero
            idGenres.forEach((id) => {
                //Optenemos cada unidad
                result.genres.forEach((item) => {
                    //si los id son iguales... Metemos la unidad en el array
                    if(item.id === id) arrayGenres.push(item.name)
                })
            });
            //retornamos el array
            return arrayGenres 
        })
}
//Obtenemos los generos
export function getAllGenresApi(){
    //Obtenemos la url
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`

    //Medainte las props obteenmos el url
    return fetch(url)
        .then((response) => {
            //Trasnformamos a json
            return response.json()
        })
        .then((result) =>{
            //retornamos el result
            return result 
        } )
}
//Obtenemos los generos
export function getGenreMoviesApi(idGenres){
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`

    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result
        })
} 
//Obtenemos las id de cada pelicula
export function getMovieByIdApi(idMovie){
    const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result
        })
} 
//Obtenemos la película
export function getVideoMovieApi(idMovie){
    const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result
        }) 
}
//Obtenemos la pelicula popular
//Con la primera pagina 
export function getPopularMovieApi(page = 1){
    const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}` 
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result
        }) 
}
//Obtenemos el search de la api
//Usamos el metodo GET
export function searchMoviesApi(search){
    const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result
        }) 
}