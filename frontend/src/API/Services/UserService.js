import ToastifyService from "../../CommonServices/Toastify/ToastifyService";

const usersUrl = "/users";

const UserService = {
    getAll,
    getById,
    register,
    login,
    update,
    logout
}

async function getAll(){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${usersUrl}`);

    if(response.status === 200) {
        return response.json();        
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function getById(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${usersUrl}/${id}`);
    if(response.status === 200){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function register(user){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${usersUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(response.status === 201){
        ToastifyService.notifySucc('User registered succesfully!');
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function login(login){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${usersUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    });
    if(response.status === 200){
        ToastifyService.notifySucc('User logged in succesfully!');
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function update(id, user){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${usersUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(response.status === 200){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

function logout(){
    localStorage.removeItem('token');

    return;
}


export default UserService;