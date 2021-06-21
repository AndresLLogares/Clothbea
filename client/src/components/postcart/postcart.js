import React, { useState, useEffect } from 'react';
import styles from '../../scss/postcart/postcart.module.scss';
import { Zoom } from "react-awesome-reveal";
import { CURRENTUSER, GETCART } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { TruckMonster } from '@styled-icons/fa-solid/TruckMonster';
import { Mailbox } from '@styled-icons/bootstrap/Mailbox';
import { City } from '@styled-icons/boxicons-solid/City';
import { Flag } from '@styled-icons/boxicons-regular/Flag';
import { Mail } from '@styled-icons/entypo/Mail';
import { Address } from '@styled-icons/entypo/Address';
import { DocumentOnePage } from '@styled-icons/fluentui-system-filled/DocumentOnePage';
import { RealEstate } from '@styled-icons/fluentui-system-filled/RealEstate';

const PostCart = (props) => {

    const search = props.location.search;

    const params = new URLSearchParams(search);

    const totalBuy = params.get('Total');

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.Clothbea.currentuser)

    const userCart = useSelector(state => state.Clothbea.cart)

    const emailUser = localStorage.getItem('Email')

    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        await dispatch(CURRENTUSER(emailUser))
        await dispatch(GETCART(emailUser))
        !userCart ? setLoading(true) : setLoading(false);
    }, [])

    const [dataUser, setDataUser] = useState({
        email: '',
        name: '',
        lastname: '',
        city: '',
        state:'',
        address: '',
        country: '',
        ZIP: ''
    })

    console.log(currentUser)

    return (
        <div className={styles.ContainerPost} >
            <div className={styles.sortPost} >
                {loading ?
                    <div>
                        <div className={styles.loader} />
                    </div>
                    :
                    <Zoom className={styles.zoom} >
                        <div className={styles.boxPost} >
                            <div className={styles.sortTitle} >
                                <p className={styles.titlePost} >Shipping Information <TruckMonster className={styles.truck} /> </p>
                            </div>
                            <div className={styles.sortForm} >
                                <form className={styles.form} >
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <DocumentOnePage className={styles.iconLabel} />
                                            Name
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <DocumentOnePage className={styles.iconLabel} />
                                            Last Name
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <Mail className={styles.iconLabel} />
                                            Email
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='email'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <Flag className={styles.iconLabel} />
                                            Country
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <City className={styles.iconLabel} />
                                            City
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <RealEstate className={styles.iconLabel} />
                                            State
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <Address className={styles.iconLabel} />
                                            Address
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <Mailbox className={styles.iconLabel} />
                                            ZIP
                                        </label>
                                        <input
                                            className={styles.input}
                                            required={true}
                                            type='number'
                                        />
                                    </div>
                                    <div className={styles.productsBox}>
                                        {userCart && userCart.map((item, index) => (
                                            <div className={styles.eachProduct} >
                                                <div className={styles.itemProduct} >
                                                    <p className={styles.pProduct} >{item.name}</p>
                                                </div>
                                                <div className={styles.itemProduct} >
                                                    <p className={styles.pProduct}>X {item.quantity}</p>
                                                </div>
                                                <div className={styles.itemProduct} >
                                                   <p className={styles.pProduct}>$ {item.newPrice}</p> 
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.sortTotal}>
                                        <p className={styles.TotalStyle} >Total: $ {totalBuy}</p>
                                    </div>
                                    <div className={styles.sortButton} >
                                        <button type='submit' className={styles.buttonSend} >Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Zoom>
                }
            </div>
        </div>
    )
}

export default PostCart;