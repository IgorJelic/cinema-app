import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import ValidationService from "../CommonServices/Validators/ValidationService";
import ToastifyService from "../CommonServices/Toastify/ToastifyService";
import UserService from "../API/Services/UserService";
import styles from '../Layout/Styles/Form.module.css';

export default function Register(){
    let username = useRef(null);
    let password = useRef(null);
    let name = useRef(null);
    let email = useRef(null);
    let dateOfBirth = useRef(null);
    let role = useRef(null);

    const navigate = useNavigate();

    function submitForm(e){
        e.preventDefault();

        const user = {
            username: username.current.value,
            password: password.current.value,
            name: name.current.value,
            email: email.current.value,
            dateOfBirth: dateOfBirth.current.value,
            role: role.current.value
        }

        if(ValidationService.ValidateRegisterUser(user)){
            UserService.register(user)
                .then((data) => {
                    navigate('/login');
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
                <h3 className={styles.formHeader}>Register form</h3>
                <hr/>
                <div className={styles.formControl}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" ref={username}/>
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" ref={password}/>
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" ref={email}/>
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" ref={name}/>
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type='date' id="dateOfBirth" ref={dateOfBirth}/>
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="role">Role:</label>
                    <select className={styles.formSelect} id="role" ref={role}>
                        <option value={-1}></option>
                        <option value={0}>Admin</option>
                        <option value={1}>Customer</option>
                    </select>
                </div>
                <hr/>
                <div className={styles.btnWrapper}>
                    <button className={styles.formBtn} type="submit">Register</button>
                </div>
            </form>
        </>
    )
}