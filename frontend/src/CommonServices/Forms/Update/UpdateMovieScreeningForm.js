import { useRef, useState, useEffect } from "react"
import MovieService from "../../../API/Services/MovieService";
import MovieScreeningService from "../../../API/Services/MovieScreeningService";
import ToastifyService from "../../Toastify/ToastifyService";
import { DEFAULT_IMG } from "../../../API/Common";
import MoviesSelect from "../../../Admin/Movies/MoviesSelect";
import ValidationService from "../../Validators/ValidationService";


export default function UpdateMovieScreeningForm({id, onSubmitClick}){
    let screeningTime = useRef(null);
    let ticketPrice = useRef(null);

    const[movies, setMovies] = useState([]);
    const[selectedMovie, setSelectedMovie] = useState({});

    const imgSrc = Object.keys(selectedMovie).length > 0 ? `${process.env.REACT_APP_RESOURCES_URL}/${selectedMovie.posterImage}` : `${process.env.REACT_APP_RESOURCES_URL}${DEFAULT_IMG}`;

    useEffect(() => {
        MovieService.getAll({})
            .then(data => {
                setMovies(data.movies);
            })
            .catch(err => ToastifyService.notifyErr(`${err}`));

        MovieScreeningService.getById(id)
            .then(screening => {
                setSelectedMovie(screening.movie);

                screeningTime.current.value = screening.screeningTime;
                ticketPrice.current.value = screening.ticketPrice;
            });
    }, []);

    function selectMovie(movie){
        setSelectedMovie(movie);
    }

    function onSubmit(e){
        e.preventDefault();

        const screening = {
            screeningTime: screeningTime.current.value,
            ticketPrice: ticketPrice.current.value,
            movieId: selectedMovie.id
        }

        if(ValidationService.ValidateMovieScreening(screening)){
            onSubmitClick(id, screening);
        }
        else{
            ToastifyService.notifyErr('Invalid form!');
        }
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'space-around'}}>
                    <label htmlFor="screeningTime">Screening Time: </label>
                    <input style={{float: 'right', marginRight: '20px'}} id="screeningTime" type="datetime-local" ref={screeningTime}/>
                </div>
                <div style={{marginTop:'8px', display:'flex', width:'100%', alignItems:'center', justifyContent:'space-around'}}>
                    <label htmlFor="ticketPrice">Ticket Price: </label>
                    <input style={{float: 'right', marginRight: '20px'}} id="ticketPrice" type="number" ref={ticketPrice}/>
                </div>
                <hr/>
                <div className="selected-movie" style={{marginTop:'20px', display:'flex', width:'100%', alignItems:'center', justifyContent:'space-around'}}>
                    <p style={{marginTop:'20px'}}>Movie: <b><i>{selectedMovie ? selectedMovie.name : "title"}</i></b></p>
                    <img 
                        style={{ marginRight:'20px', border: '1px solid gray', borderRadius: '4px'}} 
                        src={imgSrc} 
                        height='120px' 
                        width='80px'
                    />
                </div>
                <hr/>
                <button className="btn-add-form" type="submit">Add</button>
            </form>
            <div>
                <MoviesSelect data={movies} selected={selectedMovie} onSelect={selectMovie}/>
            </div>
        </>
    )
}