import styles from '../../Layout/Styles/Search.module.css';

export default function Filter({selectedLetters, letterClick}){
    const allLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let content1 = allLetters.map((letter, index) => {
        const color = selectedLetters.includes(letter) ? 'yellowgreen' : '#fff';
    
        return <button
                    key={index}
                    className={styles.letter}
                    onClick={(e) => {letterClick(e, letter)}}
                    style={{backgroundColor: color}}
                    >
                        {letter}
                    </button>
    })

    return(
        <div className={styles.letterWrapper}>
            {content1}
        </div>
    )
}