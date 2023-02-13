import ToastifyService from "../../CommonServices/Toastify/ToastifyService";

const genresUrl = "/genres";

const GenreService = {
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
    let query = generateQuery(page, pageSize, search, letters);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${genresUrl}${query}`);

    if(response.status === 200) {
        return response.json();        
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function getById(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${genresUrl}/${id}`);
    if(response.status === 200){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function add(genre){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${genresUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    });
    if(response.status === 201){
        ToastifyService.notifySucc('Genre added succesfully!');
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function update(id, genre){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${genresUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    });
    if(response.status === 200){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function remove(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${genresUrl}/${id}`, {
        method: 'DELETE'
    });

    ToastifyService.notifySucc('Genre removed succesfully!');
}

export default GenreService;