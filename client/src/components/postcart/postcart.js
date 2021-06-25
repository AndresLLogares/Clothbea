import React, { useState, useEffect } from 'react';
import styles from '../../scss/postcart/postcart.module.scss';
import { Reveal } from "react-awesome-reveal";
import { CURRENTUSER, GETCART, GETORDERS } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { TruckMonster } from '@styled-icons/fa-solid/TruckMonster';
import { Mailbox } from '@styled-icons/bootstrap/Mailbox';
import { City } from '@styled-icons/boxicons-solid/City';
import { Flag } from '@styled-icons/boxicons-regular/Flag';
import { Address } from '@styled-icons/entypo/Address';
import { DocumentOnePage } from '@styled-icons/fluentui-system-filled/DocumentOnePage';
import { RealEstate } from '@styled-icons/fluentui-system-filled/RealEstate';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const PostCart = (props) => {

    let URL = 'http://localhost:5000';

    const search = props.location.search;

    const params = new URLSearchParams(search);

    const totalBuy = params.get('Total');

    const dispatch = useDispatch()

    let Id = 0

    const currentUser = useSelector(state => state.Clothbea.currentuser)

    const orders = useSelector(state => state.Clothbea.orders)

    const userCart = useSelector(state => state.Clothbea.cart)

    const emailUser = localStorage.getItem('Email')

    const [loading, setLoading] = useState(true)

    const [dataUser, setDataUser] = useState({
        name: '',
        lastname: '',
        city: '',
        state: '',
        address: '',
        country: '',
        ZIP: ''
    })

    if (orders.length > 0) {
        let aux = orders.map(item => item.Id)
        Id = Math.max.apply(null, aux) + 1
    }

    useEffect(async () => {
        await dispatch(CURRENTUSER(emailUser))
        await dispatch(GETCART(emailUser))
        await dispatch(GETORDERS())
        !userCart ? setLoading(true) : setLoading(false);
    }, [])

    const handleInputChange = (event) => {
        setDataUser({ ...dataUser, [event.target.name]: event.target.value })
    }

    console.log(orders)

    const handleSubmitChange = async (event) => {
        event.preventDefault()
        await axios.post(URL + '/Orders/createorder', {
            Id: Id,
            name: dataUser.name,
            lastname: dataUser.lastname,
            products: userCart,
            city: dataUser.city,
            country: dataUser.country,
            state: dataUser.state,
            address: dataUser.address,
            ZIP: parseInt(dataUser.ZIP),
            email: emailUser.toLocaleLowerCase(),
            total: totalBuy
        })
            .then(response => {
                if (response.data === 'Order created') {
                    toast.info(response.data)
                    setTimeout(() => window.location.href = `http://localhost:3000/Payment?Id=${Id}`, 2000)
                }
                else {
                    toast.error(response.data)
                }
            })
        setDataUser({
            email: '',
            name: '',
            lastname: '',
            city: '',
            state: '',
            address: '',
            country: '',
            ZIP: ''
        })
    }

    return (
        <div className={styles.ContainerPost} >
            <ToastContainer />
            <div className={styles.sortPost} >
                {loading ?
                    <div>
                        <div className={styles.loader} />
                    </div>
                    :
                    <Reveal className={styles.zoom} >
                        <div className={styles.boxPost} >
                            <div className={styles.sortTitle} >
                                <p className={styles.titlePost} >Shipping Information <TruckMonster className={styles.truck} /> </p>
                            </div>
                            <div className={styles.sortForm} >
                                <form onSubmit={handleSubmitChange} className={styles.form} >
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <DocumentOnePage className={styles.iconLabel} />
                                            Name
                                        </label>
                                        <input
                                            onChange={handleInputChange}
                                            name='name'
                                            value={dataUser.name}
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
                                            onChange={handleInputChange}
                                            name='lastname'
                                            value={dataUser.lastname}
                                            className={styles.input}
                                            required={true}
                                            type='text'
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} >
                                            <Flag className={styles.iconLabel} />
                                            Country
                                        </label>
                                        <input
                                            onChange={handleInputChange}
                                            name='country'
                                            value={dataUser.country}
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
                                            onChange={handleInputChange}
                                            name='city'
                                            value={dataUser.city}
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
                                            onChange={handleInputChange}
                                            name='state'
                                            value={dataUser.state}
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
                                            onChange={handleInputChange}
                                            name='address'
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
                                            onChange={handleInputChange}
                                            name='ZIP'
                                            value={dataUser.ZIP}
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
                    </Reveal>
                }
            </div>
        </div>
    )
}

export default PostCart;