import { useEffect, useState } from 'react';
import styles from '../Layout/Styles/Home.module.css'
import { useNavigate } from 'react-router-dom';
import ToastifyService from '../CommonServices/Toastify/ToastifyService';

export default function ScreeningCard({
    screenings
}){
    const navigate = useNavigate();

    function goToReserePage(screening){
        let screeningTime = new Date(screening.screeningTime);
        if(screeningTime < new Date()){
            ToastifyService.notifyInfo('Too late! Screening already started.')
        }
        else{
            navigate('/reservation/' + screening.id);
        }
    }

    let content = screenings.map((screening, index) => {
        if(screening !== null){
            const dateTime = new Date(screening.screeningTime)
            .toLocaleString('en-GB', 
                { 
                    day:'numeric',  
                    month:'short', 
                    hour: '2-digit', 
                    minute: '2-digit'
                });
        
            return(
                <div key={index} className={styles.screening} onClick={() => {goToReserePage(screening)}}>
                    <p className={styles.screeningP}><b>Time:</b> {dateTime}</p>
                    <p className={styles.screeningP}><i>Price: </i>{screening.ticketPrice}din</p>
                </div>
            )
        }
        else{
            return null;
        }
        
    })

    return(
        <>
            <h4>Screenings: </h4>
            {content}
        </>
    )

}