import React, { useState, useEffect } from 'react';
import styles from '../../scss/create/create.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { GETORDERBYUSER } from '../actions';
import axios from 'axios';
import { Reveal } from "react-awesome-reveal";
import stylesOrders from '../../scss/orders/orders.module.scss';

const OrdersUsers = () => {

    const dispatch = useDispatch()

    const emailUser = localStorage.getItem('Email')

    const nameUser = localStorage.getItem('UserName')

    let URL = 'http://localhost:5000';

    let orders = useSelector(state => state.Clothbea.ordersByUser)

    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        await dispatch(GETORDERBYUSER(emailUser))
        setLoading(false)
    }, [])

    if (typeof orders !== Array) {
        orders = [orders]
    }

    const handleChange = async (Id) => {
        await axios.post(URL + '/Orders/changestatus', {
            Id: Id,
            status: 'Canceled'
        })
            .then((response) => {
                toast.info(response.data)
            })
        await dispatch(GETORDERBYUSER(emailUser))
    }

    return (
        <div className={styles.containerCreate}>
            <div className={styles.sortCreate} >
                <ToastContainer />
                <Reveal className={styles.Effect} >
                    {loading ?
                        <div>
                            <div className={styles.loader} />
                        </div>
                        :
                        <div className={stylesOrders.createBox} >
                            <div className={styles.sortTitle} >
                                <p className={styles.titleCreate} >Orders of {nameUser}</p>
                            </div>
                            <div className={stylesOrders.sortOders}>
                                {orders && orders.map((item, index) => (
                                    <div className={stylesOrders.sortEachOrder}>
                                        <div className={stylesOrders.sortUpOrder}>
                                            <div className={stylesOrders.eachUpUser} >
                                                <p className={stylesOrders.pUp} >Id: {item.Id}</p>
                                            </div>
                                            <div className={stylesOrders.eachUpUser} >
                                                <p className={stylesOrders.pUp} >Date: {item.date.slice(0, 10)}</p>
                                            </div>
                                        </div>
                                        <div className={stylesOrders.sortProducts} >
                                            <div className={stylesOrders.sortTitleProducts} >
                                                <p className={stylesOrders.styleProducts} >Products</p>
                                            </div>
                                            {item.products.map((item, index) => (
                                                <div className={stylesOrders.sortEachProduct}>
                                                    <div className={stylesOrders.eachProduct} >
                                                        <p className={stylesOrders.pUp} >Name: {item.name}</p>
                                                    </div>
                                                    <div className={stylesOrders.eachProduct} >
                                                        <p className={stylesOrders.pUp} >Quantity: {item.quantity}</p>
                                                    </div>
                                                    <div className={stylesOrders.eachProduct} >
                                                        <p className={stylesOrders.pUp} >Price X unity: $ {item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className={stylesOrders.sortTitleProducts} >
                                                <p className={stylesOrders.styleProducts} >Total: ${item.total}</p>
                                            </div>
                                            <div className={stylesOrders.sortTitleProducts} >
                                                <p className={stylesOrders.styleProducts} >Status: {item.status}</p>
                                            </div>
                                        </div>
                                        <div className={stylesOrders.sortTitleProducts} >
                                            <p className={stylesOrders.styleProducts}>Change Status</p>
                                        </div>
                                        <div className={stylesOrders.sortButtons} >
                                            <div className={stylesOrders.eachButton} >
                                                {item.status !== 'Canceled' ?
                                                    <button onClick={() => handleChange(item.Id)} className={stylesOrders.buttons} >Cancel</button>
                                                    :
                                                    <button className={stylesOrders.buttonsDisabled} >Cancel</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </Reveal>
            </div>
        </div>
    )
}

export default OrdersUsers;