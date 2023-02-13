import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import MovieScreeningService from "../API/Services/MovieScreeningService";
import ToastifyService from "../CommonServices/Toastify/ToastifyService";
import styles from '../Layout/Styles/Reservation.module.css';
import SeatReservation from "./SeatReservation";
import ReservationService from "../API/Services/ReservationService";


export default function Reservation(){
    const routeParams = useParams();
    const[screening, setScreening] = useState({});
    const[screeningImg, setScreeningImg] = useState('');
    const[movieName, setMovieName] = useState('');
    const[seats, setSeats]=useState([]);

    const[selectedSeats, setSelectedSeats] = useState([]);
    const[ticketCount, setTicketCount] = useState(1);

    const navigate = useNavigate();

    let emailInput = useRef(null);

    const isGuest = localStorage.getItem('token')===null;
    const emailStyle = isGuest? 'initial' : 'none';

    useEffect(() => {
        MovieScreeningService.getById(routeParams.screeningId)
            .then(data => {
                
                const imgSrc = `${process.env.REACT_APP_RESOURCES_URL}/${data.movie.posterImage}`;
                const mName = data.movie.name;

                setSeats(data.seats);

                setScreening(data);
                setScreeningImg(imgSrc);
                setMovieName(mName);
            })
            .catch(err => {
                ToastifyService.notifyErr(`${err}`);
            })
    }, [])

    function createReservation(){
        if(ticketCount > selectedSeats.length){
            ToastifyService.notifyInfo(`Select ${ticketCount - selectedSeats.length} more seats.`)
        }
        else{
            const movieScreeningId = screening.id;
            let seatIds = [];

            selectedSeats.forEach(seat => {
                seatIds.push(seat.id);
            });

            const reservationDto = {
                userEmail: emailInput.current.value,
                totalPrice: screening.ticketPrice * ticketCount,
                movieScreening: movieScreeningId,
                chosenSeats: seatIds
            }

            ReservationService.add(reservationDto)
            .then((data) => {
                ToastifyService.notifySucc('Reservation added succesfully!');
                navigate('/');
            })
            .catch(error => {
                ToastifyService.notifyErr(`${error}`);
            })            
        }        
    }

    function incTicketCount(){
        if(ticketCount < 5) setTicketCount(ticketCount + 1);
        else ToastifyService.notifyInfo("Max tickets reached.");
    }
    function decTicketCount(){
        if(ticketCount <= 1) ToastifyService.notifyInfo("Min tickets reached.");
        else if(ticketCount === selectedSeats.length) ToastifyService.notifyInfo("Unselect seats first.");
        else setTicketCount(ticketCount - 1);
    }

    function seatClick(e, seat){
        const tempColor = seat.available === false ? 'red' : 'green';
        if(!selectedSeats.includes(seat)){
            if(seat.available === false){
                ToastifyService.notifyErr("Seat not available.");
            }
            else{
                if(selectedSeats.length === ticketCount){
                    ToastifyService.notifyInfo("Max seat count reached.");
                }
                else{
                    setSelectedSeats([...selectedSeats, seat]);
                    e.target.style.backgroundColor = 'blue';
                }
            }
        }
        else{
            setSelectedSeats(selectedSeats.filter(s => seat !== s));
            e.target.style.backgroundColor = tempColor;
        }
    }

    const content = <div className={styles.reservationCard} style={{backgroundImage:`url("${screeningImg}")`}}>
        <div className={styles.darkCard}>
            <div className={styles.cardHeading}>
                <h1>"{movieName}"</h1>
                <h3><i>{convertDate(screening.screeningTime)}h</i></h3>
            </div>
            <div className={styles.cardSeats}>
                <SeatReservation 
                    price={screening.ticketPrice} 
                    seats={seats} rows={screening.rows} 
                    columns={screening.columns} 
                    incTicketCount={incTicketCount}
                    decTicketCount={decTicketCount}
                    ticketCount={ticketCount}
                    seatClick={seatClick}
                    />
                <div style={{marginTop:'20px'}}>
                    <input style={{display:emailStyle}} className={styles.emailInput} type='email' placeholder="E-mail" ref={emailInput}/>
                    <button onClick={createReservation}>Create</button>
                </div>
            </div>
        </div>
    </div>

    return(
        <>
            {content}
        </>
    )

    function convertDate(date){
        return new Date(date)
                .toLocaleString('en-GB', 
                    { 
                        day:'numeric',  
                        month:'long', 
                        hour: '2-digit', 
                        minute: '2-digit'
                    });
    }
}