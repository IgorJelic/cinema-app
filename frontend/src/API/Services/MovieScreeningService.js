import ToastifyService from "../../CommonServices/Toastify/ToastifyService";
import { DATE_REPLACE_CHARS } from "../Common";

const movieScreeningsUrl = "/movie-screenings";

const MovieScreeningService = {
    getAll,
    getById,
    add,
    update,
    remove
}

function generateDateUrl(date){
    return date.replaceAll(':', DATE_REPLACE_CHARS.colon).replaceAll('+', DATE_REPLACE_CHARS.plus);
}

function generateQuery(page, pageSize, search, letters, day, genreFilter, sortBy){
    // NE OBRADJUJEM SEARCH I LETTERS jer nije obradjeno na bekendu pa nmg da saljem query sa searchom i letterima
    let query = '?';
    
    if(day !== null){
        query += `day=${day.toDateString("yyyyMMdd")}&`;
        // query += `day=${generateDateUrl(day.toDateString("yyyyMMdd"))}&`;
    }

    if(genreFilter !== null){
        query += `genreFilter=${genreFilter}&`;
    }

    if(sortBy !== null){
        query += `sortBy=${sortBy}&`;
    }

    if(page !== null & pageSize !== null){
        query += `page=${page}&pageSize=${pageSize}&`;
    }

    return query.slice(0, -1);
}

async function getAll({page = null, pageSize = null, search = "", letters = "", day = null, genreFilter = null, sortBy = null}){
    const query = generateQuery(page, pageSize, search, letters, day, genreFilter, sortBy);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${movieScreeningsUrl}${query}`);

    if(response.status === 200) {
        return response.json();        
    }
    else{
        // ToastifyService.notifyErr('Error occurred while getting all movie screenings.');
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function getById(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${movieScreeningsUrl}/${id}`);
    if(response.status === 200){
        return response.json();
    }
    else{
        // ToastifyService.notifyErr(`Error occurred while getting movie screening with id: ${id}.`);
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function add(movieScreening){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${movieScreeningsUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieScreening)
    });
    if(response.status === 201){
        ToastifyService.notifySucc('Movie screening added succesfully!');
        return response.json();
    }
    else{
        // ToastifyService.notifyErr(`Error occurred while adding movie screening.`);
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function update(id, movieScreening){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${movieScreeningsUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieScreening)
    });
    if(response.status === 200){
        ToastifyService.notifySucc('Movie screening updated succesfully!');
        return response.json();
    }
    else{
        // ToastifyService.notifyErr(`Error occurred while updating movie screening.`);
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function remove(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${movieScreeningsUrl}/${id}`, {
        method: 'DELETE'
    });

    ToastifyService.notifySucc('Movie screening removed succesfully!');
}

export default MovieScreeningService;