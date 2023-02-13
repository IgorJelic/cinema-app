import { useEffect, useState } from "react"
import { SORT_BY } from "../API/Common";
import MovieScreeningService from '../API/Services/MovieScreeningService'
import styles from '../Layout/Styles/Home.module.css'
import ScreeningCard from "./ScreeningCard";
import Heading from "./Repertoire/Heading";

export default function Home(){
    const[screenings, setScreenings] = useState([]);
    const[movies, setMovies] = useState([]);
    const[dateOfScreenings, setDateOfScreenings] = useState(new Date());
    const[genre, setGenre] = useState("");
    const[sort, setSort] = useState(SORT_BY.time);

    let moviesArr = [];

    useEffect(() => {
        MovieScreeningService.getAll({day: dateOfScreenings, genreFilter:genre, sortBy: sort})
            .then((data) => {
                setMoviesArr(data.screenings);
                setMovies(moviesArr);
                setScreenings(data.screenings);
            })
    }, [dateOfScreenings, genre, sort]);

    function setMoviesArr(data){
        data.forEach(screening => {
            if(moviesArr.some(m => m.id === screening.movie.id)){}
            else{
                moviesArr.push({
                    id: screening.movie.id,
                    name: screening.movie.name,
                    duration: screening.movie.duration,
                    posterImage: screening.movie.posterImage,
                    genres: screening.movie.genres
                })
            }
        });
    }

    function movieGenres(genres){
        return genres.map((genre, index) => {
            return(
                <code 
                    className={styles.genreCard} 
                    key={index} 
                    >
                        {genre.name}
                </code>
            )
        })
    }   

    const content = movies.map((movie, index) => {
        const imgSrc = `${process.env.REACT_APP_RESOURCES_URL}/${movie.posterImage}`;

        const propScreenings = screenings.filter(s => {
            if(s.movie.id === movie.id) return s;
            else return null;
        }) 
        
        return(
            <div key={index} className={styles.screeningCard}>
                <div className={styles.imgWrapper}>
                    <img src={imgSrc}/>
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.left}>
                        <h2><b>Title: "{movie.name}"</b></h2>
                        <h4 style={{color: '#d6d6d6'}}><i>Duration: {movie.duration}min</i></h4>
                        <div>
                            {movieGenres(movie.genres)}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <ScreeningCard screenings={propScreenings}/>
                    </div>
                </div>
            </div>
        )
    })

    function changeGenre(genreId){
        setGenre(genreId);
    }
    function changeDate(e){
        const newDate = new Date(e.target.value);
        setDateOfScreenings(newDate);
    }
    function changeSort(e){
        const newSort = e.target.value;
        setSort(newSort);
    }

    return(
        <div className={styles.homeContent}>
            <div className={styles.heading}>
                <Heading onDateChange={changeDate} onGenreChange={changeGenre} onSortChange={changeSort}/>
            </div>
            {content}
        </div>
    )
}
