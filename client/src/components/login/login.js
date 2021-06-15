import React, { useState, useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import styles from '../../scss/login/login.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { DriveFileRenameOutline } from '@styled-icons/material/DriveFileRenameOutline';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { Mailbox } from '@styled-icons/bootstrap/Mailbox';
import { City } from '@styled-icons/boxicons-solid/City';
import { Flag } from '@styled-icons/boxicons-regular/Flag';
import { Mail } from '@styled-icons/entypo/Mail';
import { Address } from '@styled-icons/entypo/Address';
import { SIGNUPACTION, LOGINACTION } from '../actions/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const dispatch = useDispatch()

    const [infoUser, setInfoUser] = useState({
        username: '',
        email: '',
        password: '',
        controlpassword: '',
        country: '',
        city: '',
        address: '',
        ZIP: ''
    })

    const [handleLogin, setHandleLogin] = useState(true)

    const handleInputChange = (event) => {
        setInfoUser({ ...infoUser, [event.target.name]: event.target.value })
    }

    const handleSubmitLogin = async (event) => {
        await localStorage.removeItem('UserName')
        event.preventDefault()
        await dispatch(LOGINACTION({
            email: infoUser.email.toLocaleLowerCase(),
            password: infoUser.password.toString()
        }))
        const userName = await localStorage.getItem('UserName')
        if (userName === 'undefined') {
            toast.error('Error in Login')
        }
        else {
            toast.success(`Welcome ${userName}`)
        }
        setInfoUser({
            username: '',
            email: '',
            password: '',
            controlpassword: '',
            country: '',
            city: '',
            address: '',
            ZIP: ''
        })
        setTimeout(() => window.location.href = 'http://localhost:3000/Home', 2000)
    }

    const handleSubmitSignIn = async (event) => {
        await localStorage.removeItem('SignInOK')
        event.preventDefault()
        if (infoUser.password !== infoUser.controlpassword) {
            return toast.error("Passwords dosn't match")
        }
        await dispatch(SIGNUPACTION({
            username: infoUser.username,
            email: infoUser.email.toLocaleLowerCase(),
            password: infoUser.password.toString(),
            address: infoUser.address,
            city: infoUser.city,
            country: infoUser.country,
            ZIP: infoUser.ZIP
        }))
        const controlSignIn = await localStorage.getItem('SignInOK')

        controlSignIn === 'Email already exists' ? toast.error('Email already exists') : toast.success('Now you can Login')
        setInfoUser({
            username: '',
            email: '',
            password: '',
            controlpassword: '',
            country: '',
            city: '',
            address: '',
            ZIP: ''
        })
    }

    const handleLoginFunction = () => {
        setHandleLogin(!handleLogin)
    }

    return (
        <div className={styles.containerLogin} >
            <div className={styles.sortLogin} >
                <ToastContainer />
                <Zoom className={styles.sortZoom}>
                    <div className={styles.boxLogin} >
                        <div className={styles.sortTitle} >
                            <p className={styles.fontTitle} >Introduce your information</p>
                        </div>
                        {handleLogin ?
                            <div className={styles.sortForm}>
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
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><City className={styles.iconsLogin} />City</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.city}
                                            type='text'
                                            className={styles.input}
                                            name='city'
                                            required={false}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><Flag className={styles.iconsLogin} />Country</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.country}
                                            type='text'
                                            className={styles.input}
                                            name='country'
                                            required={false}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><Address className={styles.iconsLogin} />Address</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.address}
                                            type='text'
                                            className={styles.input}
                                            name='address'
                                            required={false}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label}><Mailbox className={styles.iconsLogin} />ZIP</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={infoUser.ZIP}
                                            type='text'
                                            className={styles.input}
                                            name='ZIP'
                                            required={false}
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
                </Zoom>
            </div>
        </div>
    )
}

export default Login