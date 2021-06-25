import React, { useState, useEffect } from 'react';
import styles from '../../scss/reset/reset.module.scss';
import { LockPassword } from '@styled-icons/remix-fill/LockPassword';
import { Mail } from '@styled-icons/entypo/Mail';
import { Reveal } from 'react-awesome-reveal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Reset = () => {

    const [dataUser, setDataUser] = useState({
        email: '',
        oldpassword: '',
        newpassword: ''
    })

    let URL = 'http://localhost:5000';

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
            <div className={styles.sortReset} >
                <ToastContainer />
                <Reveal className={styles.Zoom} >
                    <div className={styles.boxReset} >
                        <div className={styles.sortTitle} >
                            <p className={styles.fontTitle} >Reset Password</p>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form} >
                            <div className={styles.eachInput} >
                                <label className={styles.label} >
                                    <Mail className={styles.iconsLogin} />
                                    Email
                                </label>
                                <input
                                    onChange={handleInput}
                                    value={dataUser.email}
                                    type='email'
                                    className={styles.input}
                                    name='email'
                                    required={true}
                                />
                            </div>
                            <div className={styles.eachInput} >
                                <label className={styles.label} >
                                    <LockPassword className={styles.iconsLogin} />
                                    Old Password
                                </label>
                                <input
                                    onChange={handleInput}
                                    value={dataUser.oldpassword}
                                    type='password'
                                    className={styles.input}
                                    name='oldpassword'
                                    required={true}
                                />
                            </div>
                            <div className={styles.eachInput} >
                                <label className={styles.label} >
                                    <LockPassword className={styles.iconsLogin} />
                                    New Password
                                </label>
                                <input
                                    onChange={handleInput}
                                    value={dataUser.newpassword}
                                    type='password'
                                    className={styles.input}
                                    name='newpassword'
                                    required={true}
                                />
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