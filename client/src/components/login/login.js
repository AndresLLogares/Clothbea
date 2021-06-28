import React, { useState, useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
import styles from '../../scss/login/login.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { DriveFileRenameOutline } from '@styled-icons/material/DriveFileRenameOutline';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { Mail } from '@styled-icons/entypo/Mail';
import { SETCURRENTUSER } from '../actions/index.js';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import setAuthToken from '../Utils/SethAuthToken.js';
import { GOOGLEID } from '../Secret/secret.js'

const Login = () => {

    const dispatch = useDispatch()

    let URL = 'https://clothbea.herokuapp.com';

    const [infoUser, setInfoUser] = useState({
        username: '',
        email: '',
        password: '',
        controlpassword: '',
    })

    const [handleLogin, setHandleLogin] = useState(true)

    const handleInputChange = (event) => {
        setInfoUser({ ...infoUser, [event.target.name]: event.target.value })
    }

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        await axios.post(URL + '/Users/login', {
            password: infoUser.password,
            email: infoUser.email.toLocaleLowerCase()
        })
            .then(async (response) => {
                console.log(response)
                if (!response.data.token) {
                    return toast.error('Error in Login')
                }
                else {
                    toast.success(`Hello ${response.data.username}`)
                    setTimeout(() => window.location.href = 'https://clothbea.netlify.app/Home', 1000)
                }
                const { token } = response.data;
                const { username } = response.data;
                const { email } = response.data;
                const { level } = response.data;
                await localStorage.setItem("jwtToken", token);
                await localStorage.setItem("UserName", username);
                await localStorage.setItem("Email", email);
                await localStorage.setItem('LevelUser', level)
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(SETCURRENTUSER(decoded));
            })
            .catch(err =>
                console.log(err)
            );
        setInfoUser({
            username: '',
            email: '',
            password: '',
            controlpassword: ''
        })
    }

    const handleSubmitSignIn = async (event) => {
        event.preventDefault()
        if (infoUser.password !== infoUser.controlpassword) {
            return toast.error("Passwords dosn't match")
        }
        await axios.post(URL + '/Users/signup', {
            username: infoUser.username,
            password: infoUser.password,
            email: infoUser.email.toLocaleLowerCase(),
        })
            .then((response) => response.data)
            .then(data => {
                toast.info(data)
            })

        setInfoUser({
            username: '',
            email: '',
            password: '',
            controlpassword: ''
        })
    }

    const handleLoginFunction = () => {
        setHandleLogin(!handleLogin)
    }

    const handleGoogleSucces = async (response) => {

        let name = response.profileObj.givenName;

        let email = response.profileObj.email;

        let googleId = response.profileObj.googleId;

        let token = response.tokenId;

        await axios.post(URL + '/Users/google', {
            email: email,
            username: name,
            googleId: googleId,
            token: token
        })
            .then(async (response) => {
                console.log(response.data)
                if (!response.data.token) {
                    return toast.error('Error in Login')
                }
                else {
                    toast.success(`Hello ${response.data.username}`)
                    setTimeout(() => window.location.href = 'https://clothbea.netlify.app/Home', 1000)
                }
                const { token } = response.data;
                const { username } = response.data;
                const { email } = response.data;
                const { level } = response.data;
                const { googleId } = response.data
                await localStorage.setItem("jwtToken", token);
                await localStorage.setItem("UserName", username);
                await localStorage.setItem("Email", email);
                await localStorage.setItem('LevelUser', level);
                await localStorage.setItem("googleId", googleId)
            })
        setInfoUser({
            username: '',
            email: '',
            password: '',
            controlpassword: ''
        })
    }

    const handleGoogleError = (response) => {
        toast.error("Error with Google")
        console.log(response)
    }

    const handleAdmin = () => {
        setInfoUser({ email: 'adminClothbea@hotmail.com', password: '123456' })
    }

    return (
        <div className={styles.containerLogin} >
            <div className={styles.sortLogin} >
                <ToastContainer
                    autoClose={800}
                />
                <Reveal className={styles.sortZoom}>
                    <div className={styles.boxLogin} >
                        <div className={styles.sortTitle} >
                            <p className={styles.fontTitle} >Introduce your information</p>
                        </div>
                        {handleLogin ?
                            <div className={styles.sortForm}>
                                <div className={styles.addInfo}>
                                    <div className={styles.titleAdd}>
                                        <p className={styles.pInfo} >If you want to see the administrator privileges you can use the following data:</p>
                                    </div>
                                    <div className={styles.littleBox} >
                                        <button onClick={handleAdmin} className={styles.buttonInfo}>adminClothbea@hotmail.com</button>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmitLogin} className={styles.form}>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><Mail className={styles.iconsLogin} /> Email</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.email}
                                            type='email'
                                            className={styles.input}
                                            name='email'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><LockPassword className={styles.iconsLogin} /> Password</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.password}
                                            minLength={5}
                                            maxLength={10}
                                            type='password'
                                            className={styles.input}
                                            name='password'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.sortButtons} >
                                        <div className={styles.eachButtonLogin}>
                                            <button type='submit' className={styles.buttonLogin} >Login</button>
                                        </div>
                                        <div className={styles.eachButtonLogin}>
                                            <button className={styles.buttonLogin} onClick={handleLoginFunction} >Create Account</button>
                                        </div>
                                    </div>
                                </form>
                                <div className={styles.sortGoogle} >
                                    <div className={styles.buttonGoogle} >
                                        <GoogleLogin
                                            clientId={GOOGLEID}
                                            className={styles.google}
                                            buttonText="Login with Google"
                                            onSuccess={handleGoogleSucces}
                                            onFailure={handleGoogleError}
                                            cookiePolicy={'single_host_origin'}
                                        />,
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={styles.sortForm}>
                                <form onSubmit={handleSubmitSignIn} className={styles.form}>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><Mail className={styles.iconsLogin} />Email</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.email}
                                            type='email'
                                            className={styles.input}
                                            name='email'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><LockPassword className={styles.iconsLogin} />Password</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.password}
                                            minLength={5}
                                            maxLength={10}
                                            type='password'
                                            className={styles.input}
                                            name='password'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><LockPassword className={styles.iconsLogin} />Repeat Password</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.controlpassword}
                                            minLength={5}
                                            maxLength={10}
                                            type='password'
                                            className={styles.input}
                                            name='controlpassword'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><DriveFileRenameOutline className={styles.iconsLogin} />Username</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.username}
                                            type='text'
                                            className={styles.input}
                                            name='username'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.sortButtons} >
                                        <div className={styles.eachButtonLogin}>
                                            <button type='submit' className={styles.buttonLogin} >Create</button>
                                        </div>
                                        <div className={styles.eachButtonLogin}>
                                            <button className={styles.buttonLogin} onClick={handleLoginFunction} >Do you have an account?</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </Reveal>
            </div>
        </div>
    )
}

export default Login