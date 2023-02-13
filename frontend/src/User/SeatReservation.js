import { useEffect, useState } from "react";
import ToastifyService from "../CommonServices/Toastify/ToastifyService";
import SeatSelectGrid from "./SeatSelectGrid";
import styles from '../Layout/Styles/Reservation.module.css'

export default function SeatReservation({
    price,
    seats,
    rows,
    columns,
    incTicketCount,
    decTicketCount,
    ticketCount,
    seatClick
}){
    // const[ticketCount, setTicketCount] = useState(1);
    const finalPrice = localStorage.getItem('token') === null ? price : price - Math.round(price * 0.05);
    const discountMessage = localStorage.getItem('token') === null ? <></> : <code className={styles.discountMessage}><i>5% discount</i></code>;

    // function incTicketCount(){
    //     if(ticketCount < 5) setTicketCount(ticketCount + 1);
    //     else ToastifyService.notifyInfo("Max tickets reached.");
    // }
    // function decTicketCount(){
    //     if(ticketCount > 1) setTicketCount(ticketCount - 1);
    //     else ToastifyService.notifyInfo("Min tickets reached.");
    // }

    return(
        <>
            <p style={{position:'relative'}}>{discountMessage}<i>Price = </i>{finalPrice * ticketCount} din</p>

            <div className={styles.seatCountWrap}>
                <input className={styles.ticketCountInput} type="text" readOnly={true} value={ticketCount}/>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <button className={styles.btnSeatCount} style={{marginBottom:'6px'}} onClick={incTicketCount}>+</button>
                    <button className={styles.btnSeatCount} onClick={decTicketCount}>-</button>
                </div>
            </div>
            <SeatSelectGrid seats={seats} seatCount={ticketCount} rows={rows} columns={columns} seatClick={seatClick}/>
        </>
    )
}