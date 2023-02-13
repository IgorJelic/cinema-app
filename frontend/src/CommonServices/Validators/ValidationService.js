
const ValidationService = {
    ValidateGenre,
    ValidateMovie,
    ValidateMovieScreening,
    ValidateRegisterUser,
    ValidateLoginUser
}

export function ValidateGenre(genre){
    if(genre.name === '')
            return false;
        
        return true;
}

export function ValidateMovie(movie){
    if(movie.name === '' || movie.originalName === '' || movie.duration === '')
            return false;
        
        return true;
}

export function ValidateMovieScreening(screening){
    if(screening.ticketPrice === '' || screening.screeningTime === '' || screening.movieId.length === 0)
            return false;
        
        return true;
}

export function ValidateRegisterUser(user){
    if(user.username === '' || user.password === '' || user.email === '' || user.name === '' || user.dateOfBirth === '' || user.role === '-1')
        return false;

    return true;
}

export function ValidateLoginUser(user){
    if(user.username === '' || user.password === '')
        return false;

    return true;
}



export default ValidationService;