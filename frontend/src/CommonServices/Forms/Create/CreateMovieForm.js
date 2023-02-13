import { useState, useRef, useEffect } from "react";
import GenresSelect from "../../../Admin/Genres/GenresSelect";
import GenreService from "../../../API/Services/GenreService";
import ToastifyService from "../../Toastify/ToastifyService";
import { DEFAULT_IMG } from "../../../API/Common";
import ValidationService from "../../Validators/ValidationService";

export default function CreateMovieForm({onSubmitClick}){
    let name = useRef(null);
    let originalName = useRef(null);
    let duration = useRef(null);
    let file = useRef(null);
    
    const[movieGenres, setMovieGenres] = useState([]);
    const[selectedGenres, setSelectedGenres] = useState([]);
    const[selectedFile, setSelectedFile] = useState(null);
    const[selectedFileSrc, setSelectedFileSrc] = useState(null);

    const imgSrc = selectedFileSrc? selectedFileSrc : `${process.env.REACT_APP_RESOURCES_URL}${DEFAULT_IMG}`;


    const selectedGenresList = selectedGenres.map((genre, index) => {
        return(
            <code 
                className="selected-genre-card" 
                key={index} 
                onClick={() => {removeSelectedGenre(genre)}}>
                    {genre.name}
            </code>
        )
    }) 

    useEffect(() => {
        GenreService.getAll({})
            .then(data => {
                setMovieGenres(data.genres);
            })
            .catch(err => ToastifyService.notifyErr(`${err}`));
    }, []);

    function selectGenre(genre){
        setSelectedGenres([...selectedGenres, genre]);
    }

    function removeSelectedGenre(genre){
        setSelectedGenres(selectedGenres.filter((g) => {
            return g !== genre;
        }))
    }

    function fileSelectedHandler(e){
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];

            const reader = new FileReader();
            reader.onload = x => {
                setSelectedFile(imageFile);
                setSelectedFileSrc(x.target.result)
            }
            reader.readAsDataURL(imageFile);
        }
    };

    function onSubmit(e){
        e.preventDefault();
        
        let fd = new FormData();
        fd.append('image', selectedFile);
        fd.append('name', name.current.value);
        fd.append('originalName', originalName.current.value);
        fd.append('duration', duration.current.value);
        for(let g of selectedGenres){
            fd.append('genres', g.id);
        }

        const movie = {
            name: name.current.value,
            originalName: originalName.current.value,
            duration: duration.current.value,
        }

        if(ValidationService.ValidateMovie(movie) && selectedFile !== null){
            onSubmitClick(fd);
        }
        else{
            ToastifyService.notifyErr('Invalid form!');
        }
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <input style={{display: 'none'}} type="file" accept="image/*" onChange={fileSelectedHandler} ref={file}/>
                <img style={{float: 'right', marginRight:'20px', border: '1px solid gray', borderRadius: '4px'}} src={imgSrc} width="80" height="120" />
                <br/>
                <button className="btn-add-form" onClick={(e) => {e.preventDefault();file.current.click()}}>Add Poster</button>
                <br/>
                <hr style={{marginTop:'30px'}}/>

                <label htmlFor="name">Movie Name: </label>
                <input style={{float: 'right', marginRight: '20px'}} id="name" type="text" ref={name}/>
                <br/>
                <label htmlFor="originalName">Movie Original Name: </label>
                <input style={{float: 'right', marginRight: '20px'}} id="originalName" type="text" ref={originalName}/>
                <br/>
                <label htmlFor="duration">Duration: </label>
                <input style={{float: 'right', marginRight: '20px'}} id="duration" type="number" ref={duration}/>
                <br/>
                <label style={{display: selectedGenres.length > 0 ? "block" : "none"}} htmlFor="duration">Genres: </label>
                <div className="genres">
                    {selectedGenresList}
                </div>
                <hr/>
                <button className="btn-add-form" type="submit">Add</button>
            </form>
            <div>
                <GenresSelect data={movieGenres} selected={selectedGenres} onSelect={selectGenre}/>
            </div>
        </>
    )
}