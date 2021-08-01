import React, { useState, useEffect } from 'react';
import styles from '../../scss/reset/reset.module.scss';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { Mail } from '@styled-icons/entypo/Mail';
import { Reveal } from 'react-awesome-reveal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Canvas from '../canvas/canvas';
import '../../scss/login/login.scss';

const Reset = () => {

    const [dataUser, setDataUser] = useState({
        email: '',
        oldpassword: '',
        newpassword: ''
    })

    let URL = 'https://clothbea.herokuapp.com';

    const handleInput = (event) => {
        setDataUser({ ...dataUser, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(URL + '/Users/reset', {
            email: dataUser.email.toLocaleLowerCase(),
            password: dataUser.oldpassword,
            newpassword: dataUser.newpassword
        })
            .then((response) => {
                console.log(response)
                if (response.data !== 'Reset Password Correct') {
                    return toast.error(response.data)
                }
                else {
                    toast.success(response.data)
                }
            })
        setDataUser({ email: '', oldpassword: '', newpassword: '' })
    }

    return (
        <div className={styles.containerReset} >
            <Canvas />
            <div className={styles.sortReset} >
                <ToastContainer
                    autoClose={800}
                />
                <Reveal className={styles.Zoom} >
                    <div className={styles.boxReset} >
                        <div className={styles.sortTitle} >
                            <p className={styles.fontTitle} >Reset Password</p>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form} >
                            <div className={styles.eachInput} >
                                <label class="input">
                                    <input
                                        class="input__field"
                                        type='email'
                                        placeholder=" "
                                        onChange={handleInput}
                                        value={dataUser.email}
                                        autoComplete={false}
                                        required={true}
                                        name='email'
                                    />
                                    <span class="input__label"><Mail className={styles.iconsLogin} /> E-Mail</span>
                                </label>
                            </div>
                            <div className={styles.eachInput} >
                                <label class="input">
                                    <input
                                        class="input__field"
                                        type='password'
                                        placeholder=" "
                                        onChange={handleInput}
                                        value={dataUser.oldpassword}
                                        autoComplete={false}
                                        required={true}
                                        name='oldpassword'
                                    />
                                    <span class="input__label"><LockPassword className={styles.iconsLogin} /> Old Password</span>
                                </label>
                            </div>
                            <div className={styles.eachInput} >
                                <label class="input">
                                    <input
                                        class="input__field"
                                        type='password'
                                        placeholder=" "
                                        onChange={handleInput}
                                    value={dataUser.newpassword}
                                        autoComplete={false}
                                        required={true}
                                        name='newpassword'
                                    />
                                    <span class="input__label"><LockPassword className={styles.iconsLogin} />New Password</span>
                                </label>
                            </div>
                            <div className={styles.sortButton} >
                                <button className={styles.buttonReset} type='submit' >Reset Password</button>
                            </div>
                        </form>
                    </div>
                </Reveal>
            </div>
        </div>
    )
}

export default Reset;