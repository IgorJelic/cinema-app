import ToastifyService from "../../CommonServices/Toastify/ToastifyService";

const moviesUrl = "/movies";

const MovieService = {
    getAll,
    getById,
    add,
    update,
    remove
}

function generateQuery(page, pageSize, search, letters){
    let query = '?';
    let lettersText = letters === '' ? '' : 'letters=' + letters + '&';
    query += lettersText;

    let searchText = search === '' ? '' : 'search=' + search + '&';

    query += searchText;
    if(page !== null & pageSize !== null){
        query += `page=${page}&pageSize=${pageSize}`;
    }
    return query;
}

async function getAll({page = null, pageSize = null, search = '', letters = ''}){
    const query = generateQuery(page, pageSize, search, letters);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${moviesUrl}${query}`);

    if(response.status === 200) {
        return response.json();        
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function getById(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${moviesUrl}/${id}`);
    if(response.status === 200){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function add(movie){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${moviesUrl}`, {
        method: 'POST',
        body: movie
    });
    if(response.status === 201){
        ToastifyService.notifySucc('Movie added succesfully!');
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function update(id, movie){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${moviesUrl}/${id}`, {
        method: 'PUT',
        body: movie
    });
    if(response.status === 200){
        ToastifyService.notifySucc('Movie updated succesfully!');
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function remove(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${moviesUrl}/${id}`, {
        method: 'DELETE'
    });

    ToastifyService.notifySucc('Movie removed succesfully!');
}


export default MovieService;