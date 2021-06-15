import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../scss/navbar/navbar.module.scss';
import { ReactComponent as CloseMenu } from '../assets/x.svg';
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import Logo from '../images/Logo.png'
import { Cart3 } from '@styled-icons/bootstrap/Cart3';
import DropDown from './dropdown.js';

const NavigationBar = () => {

    const [click, setClick] = useState(false)

    const closeMobileMenu = () => setClick(false);

    const handleClick = () => setClick(!click);

    const [nameUser, setNameUser] = useState('')

    const [changeDrop, setChangeDrop] = useState(false)

    useEffect(() => {
        setNameUser(localStorage.getItem('UserName'));
    })

    const handleDrop = () => {
        setChangeDrop(!changeDrop)
    }

    return (
        <div className={styles.header}>
            <div className={styles.PContainer}>
                <Link
                    style={{ textDecoration: 'none' }}
                    to='/' >
                    <div className={styles.PLink} ><img className={styles.logoNav} src={Logo} alt='' /> Clothbea</div>
                </Link>
            </div>
            <ul className={click ? styles.nav_options_active : styles.nav_options}>
                <li className={styles.SortNav} onClick={closeMobileMenu} >
                    <div className={styles.Links}><Cart3 className={styles.iconCart} /> 0</div>
                </li>
                <li className={styles.SortNav} onClick={closeMobileMenu} >
                    <Link
                        style={{ textDecoration: 'none' }}
                        to='/Home' >
                        <div className={styles.Links}>Home</div>
                    </Link>
                </li>
                {nameUser ?
                    <li className={styles.SortNav} onClick={closeMobileMenu} >
                        <div onClick={handleDrop} className={styles.Links}>{nameUser}</div>
                        {changeDrop ?
                            <DropDown />
                            :
                            null
                        }
                    </li>
                    :
                    <li className={styles.SortNav} onClick={closeMobileMenu} >
                        <Link
                            style={{ textDecoration: 'none' }}
                            to='/Login' >
                            <div className={styles.Links}>Login</div>
                        </Link>
                    </li>
                }

            </ul>
            <div className={styles.mobile_menu} onClick={handleClick}>
                {click ? (
                    <CloseMenu className={styles.MenuIcon} />
                ) : (
                    <MenuIcon className={styles.MenuIcon} />
                )}
            </div>
        </div>
    )
}

export default NavigationBar;