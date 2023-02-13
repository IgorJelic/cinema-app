import ToastifyService from "../../CommonServices/Toastify/ToastifyService";

const reservationsUrl = "/reservations";

const ReservationService = {
    getAll,
    getById,
    add,
    remove
}

async function getAll(){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${reservationsUrl}`);

    if(response.status === 200) {
        return response.json();        
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function getById(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${reservationsUrl}/${id}`);
    if(response.status === 200){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function add(reservation){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${reservationsUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });
    if(response.status === 201){
        return response.json();
    }
    else{
        return response.json().then(obj => {throw new Error(obj.error)});
    }
}

async function remove(id){
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${reservationsUrl}/${id}`, {
        method: 'DELETE'
    });

    ToastifyService.notifySucc('Reservation cancelled succesfully!');
}


export default ReservationService;
