import { useState } from 'react';
import styles from '../Layout/Styles/Reservation.module.css';


export default function SeatSelectGrid({
    seats,
    seatCount,
    rows,
    columns,
    seatClick
}){

    const content = seats.map((seat, index) => {
        const color = seat.available === false ? 'red' : 'green';

        return <button 
                    key={index} 
                    className={styles.seatBtn} 
                    onClick={(e) => {seatClick(e, seat)}}
                    style={{backgroundColor: color}}>
                        {seat.label}
                </button>
    })


    return(
        <>
            <div className={styles.seatWrapper} style={{display:'flex', flexWrap:'wrap', width:`${columns*55}px`}}>
                {content}
            </div>
        </>
    )
}