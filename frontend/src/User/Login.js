import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import ToastifyService from "../CommonServices/Toastify/ToastifyService"
import UserService from "../API/Services/UserService"
import ValidationService from "../CommonServices/Validators/ValidationService"
import styles from '../Layout/Styles/Form.module.css'

export default function Login(){
    let username = useRef(null);
    let password = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        username.current.focus();
    }, [])

    function submitForm(e){
        e.preventDefault();

        const login = {
            username: username.current.value,
            password: password.current.value
        }

        if(ValidationService.ValidateLoginUser(login)){
            UserService.login(login)
                .then((data) => {
                    localStorage.setItem('token', data.token);
                    navigate('/');
                })
                .catch(error => {
                    ToastifyService.notifyErr(`${error}`);
                })
        }
        else{
            ToastifyService.notifyErr('Invalid form!');
        }
    }

    return(
        <>
            <form className={styles.myForm} onSubmit={submitForm}>
                <h3 className={styles.formHeader}>Login form</h3>
                <hr/>
                <div className={styles.formControl}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" ref={username}/>
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" ref={password}/>
                </div>
                <div>
                    <a className={styles.forgotPassword} href="#"><code>Forgot password?</code></a>
                </div>
                <hr/>
                <div className={styles.btnWrapper}>
                    <button className={styles.formBtn} type="submit">Login</button>
                </div>
            </form>
        </>
    )
}