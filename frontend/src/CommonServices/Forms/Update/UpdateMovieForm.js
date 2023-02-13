import { useEffect, useRef, useState } from "react";
import MovieService from "../../../API/Services/MovieService";
import GenreService from "../../../API/Services/GenreService";
import ToastifyService from "../../Toastify/ToastifyService";
import GenresSelect from '../../../Admin/Genres/GenresSelect';

export default function UpdateMovieForm({id, onSubmitClick}){
    let name = useRef(null);
    let originalName = useRef(null);
    let duration = useRef(null);
    let file = useRef(null);


    const[movieGenres, setMovieGenres] = useState([]);
    const[selectedGenres, setSelectedGenres] = useState([]);
    const[selectedFile, setSelectedFile] = useState(null);
    const[selectedFileSrc, setSelectedFileSrc] = useState('');

    useEffect(() => {
        GenreService.getAll({})
            .then(data => {
                setMovieGenres(data.genres);
            })
            .catch(err => ToastifyService.notifyErr(err));

        MovieService.getById(id)
            .then(data => {
                const imgSrc = `${process.env.REACT_APP_RESOURCES_URL}/${data.posterImage}`;

                name.current.value = data.name;
                originalName.current.value = data.originalName;
                duration.current.value = data.duration;
                
                setSelectedGenres(data.genres);
                setSelectedFileSrc(imgSrc);
            })
            .catch(err => ToastifyService.notifyErr(err));

    },[]);

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

        const genreIds = selectedGenres.map(g => {
            return g.id;
        })

        let fd = new FormData();
        if(selectedFile){
            fd.append('image', selectedFile);
        }
        else{
            fd.append('image', false);
        }
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

        if(ValidForm(movie)){
            onSubmitClick(id, fd);
        }
        else{
            ToastifyService.notifyErr('Invalid form!');
        }
    }

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


    return(
        <>
            <form onSubmit={onSubmit}>
                <input style={{display: 'none'}} type="file" accept="image/*" onChange={fileSelectedHandler} ref={file}/>
                <img style={{float: 'right', marginRight:'20px'}} src={selectedFileSrc} width="80" height="120" />
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
                <br/>
                <button className="btn-add-form" type="submit">Update</button>
            </form>
            <div>
                <GenresSelect data={movieGenres} selected={selectedGenres} onSelect={selectGenre}/>
            </div>
        </>
    )


    function ValidForm(movie){
        if(movie.name === '' || movie.originalName === '' || movie.duration === '')
            return false;
        
        return true;
    }
}