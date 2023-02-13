import { useRef, useState, useEffect } from "react"
import MovieService from "../../../API/Services/MovieService";
import ToastifyService from "../../Toastify/ToastifyService";
import { DEFAULT_IMG } from "../../../API/Common";
import MoviesSelect from "../../../Admin/Movies/MoviesSelect";
import Grid from "../../../Admin/Seats/Grid";
import ValidationService from "../../Validators/ValidationService";


export default function CreateMovieScreeningForm({onSubmitClick}){
    let screeningTime = useRef(null);
    let ticketPrice = useRef(null);

    const[movies, setMovies] = useState([]);
    const[selectedMovie, setSelectedMovie] = useState({});
    // sedista rows[3-5], columns[5-8]
    const[rows, setRows] = useState(3);
    const[columns, setColumns] = useState(5);

    const imgSrc = Object.keys(selectedMovie).length > 0 ? `${process.env.REACT_APP_RESOURCES_URL}/${selectedMovie.posterImage}` : `${process.env.REACT_APP_RESOURCES_URL}${DEFAULT_IMG}`;

    function rowInc(){
        if(rows < 5) setRows(rows + 1);
        else ToastifyService.notifyInfo("Max rows reached.");
    }
    function rowDec(){
        if(rows > 3) setRows(rows - 1);
        else ToastifyService.notifyInfo("Min rows reached.");
    }
    function colInc(){
        if(columns < 8) setColumns(columns + 1);
        else ToastifyService.notifyInfo("Max columns reached.");
    }
    function colDec(){
        if(columns > 5) setColumns(columns - 1);
        else ToastifyService.notifyInfo("Min columns reached.");
    }

    useEffect(() => {
        MovieService.getAll({})
            .then(data => {
                setMovies(data.movies);
            })
            .catch(err => ToastifyService.notifyErr(`${err}`));
    }, []);

    function selectMovie(movie){
        setSelectedMovie(movie);
    }

    function onSubmit(e){
        e.preventDefault();

        const screening = {
            screeningTime: screeningTime.current.value,
            ticketPrice: ticketPrice.current.value,
            rows: rows,
            columns: columns,
            movieId: selectedMovie.id
        }

        if(ValidationService.ValidateMovieScreening(screening)){
            onSubmitClick(screening);
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
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                <div style={{marginBottom: '40px'}}>
                    <p>Rows: {rows}</p>
                    <p>Columns: {columns}</p>
                    <button onClick={rowInc}>Row +</button>
                    <button onClick={rowDec}>Row -</button>
                    <button onClick={colInc}>Col +</button>
                    <button onClick={colDec}>Col -</button>
                </div>
                <div>
                    <Grid rows={rows} cols={columns}/>
                </div>
            </div>
        </>
    )
}