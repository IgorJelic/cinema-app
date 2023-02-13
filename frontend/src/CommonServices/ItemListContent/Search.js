import { useRef, useState } from "react"
import { PAGE_SIZE } from "../../API/Common";
import Filter from "./Filter";
import styles from '../../Layout/Styles/Search.module.css'

export default function Search({
    onSearch
}){
    const[letters, setLetters] = useState([]);

    let search = useRef(null);

    function click(e, letter){
        if(!letters.includes(letter)){
            setLetters([...letters, letter]);
            e.target.style.backgroundColor = 'green';
        }
        else{
            setLetters(letters.filter(l => letter !== l));
            e.target.style.backgroundColor = null;
        }
    }

    function searchClick(){
        const lettersString = letters.join('');
        onSearch(1, PAGE_SIZE, search.current.value, lettersString);
    }

    function clearClick(){
        search.current.value = '';
        setLetters([]);
        onSearch(1, PAGE_SIZE, '', '');
    }


    return(
        <>
        <div className={styles.searchBox} style={{display:'flex', flexDirection:'column', width:'180px'}}>
            <input type='text' id="search" ref={search} placeholder='Search'/>
            <Filter selectedLetters={letters} letterClick={click}/>
            <button onClick={() => {clearClick()}}>Clear</button>
            <button onClick={() => {searchClick()}}>Search</button>
        </div>
        </>
    )
}