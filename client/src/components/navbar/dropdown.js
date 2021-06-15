import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUTUSER } from '../actions/index';
import { UserMinus } from '@styled-icons/boxicons-regular/UserMinus';
import { LockOpen } from '@styled-icons/boxicons-regular/LockOpen';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import styles from '../../scss/navbar/dropdown.module.scss';
import { Link } from 'react-router-dom';
import {CategoryAlt} from '@styled-icons/boxicons-solid/CategoryAlt';
import { Create } from '@styled-icons/ionicons-outline/Create';
import { CreateNewFolder } from '@styled-icons/material-outlined/CreateNewFolder';
const DropUser = () => {

    const dispatch = useDispatch()

    const [levelUser, setLevelUser] = useState('')

    useEffect(() => {
        setLevelUser(localStorage.getItem('LevelUser'))
    }, [])

    const handleLogOut = async () => {
        await dispatch(LOGOUTUSER())
        setTimeout(() => window.location.href = 'http://localhost:3000/Home', 2000)
    }

    return (
        <div className={styles.ContainerDrop} >
            {levelUser === 'User' ?
                <div className={styles.BoxDrop} >
                    <div className={styles.SortEachDrop} >
                        <p onClick={handleLogOut} className={styles.StyleDrop}><UserMinus className={styles.IconDrop} />Log Out</p>
                    </div>
                    <Link style={{ textDecoration: 'none' }} to='/Reset'>
                        <div className={styles.SortEachDrop} >
                            <p className={styles.StyleDrop}><LockOpen className={styles.IconDrop} />Reset Password</p>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to='/Favorites'>
                        <div className={styles.SortEachDrop} >
                            <p className={styles.StyleDrop}><StarFill className={styles.IconDrop} />Wishlist</p>
                        </div>
                    </Link>
                </div>
                :
                <div className={styles.BoxDrop} >
                    <div className={styles.SortEachDrop} >
                        <p onClick={handleLogOut} className={styles.StyleDrop}><UserMinus className={styles.IconDrop} />Log Out</p>
                    </div>
                    <Link style={{ textDecoration: 'none' }} to='/Reset'>
                        <div className={styles.SortEachDrop} >
                            <p className={styles.StyleDrop}><Create className={styles.IconDrop} />Edit Product</p>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to='/Favorites'>
                        <div className={styles.SortEachDrop} >
                            <p className={styles.StyleDrop}><CategoryAlt className={styles.IconDrop} />Create Category</p>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to='/Favorites'>
                        <div className={styles.SortEachDrop} >
                            <p className={styles.StyleDrop}><CreateNewFolder className={styles.IconDrop} />Create Product</p>
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}

export default DropUser;