import React, { useState, useEffect } from 'react';
import styles from '../../scss/shoppingcart/shoppingcart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { GETCART, CLEANCART, LESSMORE, ADDMORE, REMOVECART } from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash } from '@styled-icons/bootstrap/Trash';
import { SquaredCross } from '@styled-icons/entypo/SquaredCross';
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';
import { MinusCircle } from '@styled-icons/boxicons-regular/MinusCircle';
import { Reveal } from "react-awesome-reveal";
import { CashRegister } from '@styled-icons/fa-solid/CashRegister';
import Sad from '../images/Sad.gif';

const ShoppingCart = () => {

    const dispatch = useDispatch()

    let cartUser = useSelector(state => state.Clothbea.cart)

    const emailUser = localStorage.getItem('Email')

    const nameUser = localStorage.getItem('UserName')

    const [update, setUpdate] = useState(true)

    const [loading, setLoading] = useState(true)

    const [disabled, setDisabled] = useState(true)

    let index = 0


    useEffect(async () => {
        await dispatch(GETCART(emailUser))
        !cartUser ? setLoading(true) : setLoading(false);
    }, [update])

    const handleCLean = async () => {
        await dispatch(CLEANCART(emailUser))
        toast.success('Cart cleaned')
        setTimeout(async () => await dispatch(GETCART(emailUser)), 1000)
    }

    let totalProducts = 0

    if (cartUser.length > 0) {
        totalProducts = cartUser.reduce((a, b) => a + b.newPrice, 0)
    }

    const handlePlus = async (Id) => {
        index = await cartUser.findIndex(item => item.Id === Id)
        if (cartUser[index].quantity >= cartUser[index].stock) {
            return toast.error('Sorry no more stock')
        }
        setDisabled(false)
        let newCart = cartUser.map((item) => {
            if (item.Id === Id) {
                item.quantity = item.quantity + 1
                item.newPrice = item.price * item.quantity
            }
            return item
        })
        await dispatch(ADDMORE({
            email: emailUser,
            cart: newCart
        }))
        setTimeout(async () => await dispatch(GETCART(emailUser)), 1000)
        setDisabled(true)
    }

    const handleMinus = async (Id) => {
        index = await cartUser.findIndex(item => item.Id === Id)
        if (cartUser[index].quantity <= 1) {
            return toast.error('Sorry the value can´t be less of 1')
        }
        setDisabled(false)
        let newCart = cartUser.map((item) => {
            if (item.Id === Id) {
                item.quantity = item.quantity - 1
                item.newPrice = item.price * item.quantity
            }
            return item
        })
        await dispatch(LESSMORE({
            cart: newCart,
            email: emailUser
        }))
        setTimeout(async () => await dispatch(GETCART(emailUser)), 1000)
        setDisabled(true)
    }

    const removeProduct = async (id) => {
        await dispatch(REMOVECART({
            email: emailUser,
            Id: id,
        }))
        toast.success('Product removed')
        setTimeout(async () => await dispatch(GETCART(emailUser)), 1000)
    }

    const handeLinkToPost = () => {
        cartUser.length === 0 ? toast.error("Your cart is empty") : window.location.href = `http://localhost:3000/Shipments?Total=${totalProducts}`;
    }

    return (
        <div className={styles.containerShopping} >
            <div className={styles.sortShopping} >
                <ToastContainer />
                {loading ?
                    <div>
                        <div className={styles.loader} />
                    </div>
                    :
                    <Reveal className={styles.zoom} >
                        <div className={styles.boxShopping} >
                            <div className={styles.sortTitleShopping}>
                                <p className={styles.styleTitle} >These are your products {nameUser}</p>
                            </div>
                            <div className={styles.sortButtonClean} >
                                <button className={styles.buttonClean} onClick={handleCLean} ><Trash className={styles.Trash} /> Clean cart</button>
                            </div>
                            <div className={styles.sortCarts}>
                                {cartUser.length !== 0 ? cartUser.map((item, index) => (
                                    <div className={styles.eachCart} >
                                        <div className={styles.sortElementCartsName} >
                                            <p className={styles.pCart} >{item.name}</p>
                                        </div>
                                        <div className={styles.sortElementCartsSize} >
                                            <p className={styles.pCart} >{item.size}</p>
                                        </div>
                                        <div className={styles.sortElementCartsButton} >
                                            <button onClick={() => removeProduct(item.Id)} className={styles.buttonDelete} > Delete product <SquaredCross className={styles.cross} /></button>
                                        </div>
                                        <div className={styles.sortElementCartsImage} >
                                            <img className={styles.imageCart} src={item.image} alt='' />
                                        </div>
                                        <div className={styles.sortElementCartsPrice} >
                                            <p className={styles.pCart}  >${item.newPrice}</p>
                                        </div>
                                        <div className={styles.sortBotton} >
                                            {disabled ?
                                                <div className={styles.eachBotton}>
                                                    <button onClick={() => handlePlus(item.Id)} className={styles.bottonBot} ><PlusCircle className={styles.plus} /></button>
                                                </div>
                                                :
                                                <div className={styles.eachBottonDisabeld}>
                                                    <button className={styles.bottonBot} ><PlusCircle className={styles.plus} /></button>
                                                </div>
                                            }
                                            <div className={styles.eachBotton}>
                                                <p className={styles.pCart}>{item.quantity}</p>
                                            </div>
                                            {disabled ?
                                                <div className={styles.eachBotton}>
                                                    <button onClick={() => handleMinus(item.Id)} className={styles.bottonBot} ><MinusCircle className={styles.plus} /></button>
                                                </div>
                                                :
                                                <div className={styles.eachBottonDisabeld}>
                                                    <button className={styles.bottonBot} ><MinusCircle className={styles.plus} /></button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )) :
                                    <div className={styles.sortSad} >
                                        <div className={styles.sortEachSad} >
                                            <p className={styles.pSad} >You have not added products yet</p>
                                        </div>
                                        <div className={styles.sortEachSad} >
                                            <img className={styles.imageSad} src={Sad} alt='' />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={styles.insideBox} >
                                <div className={styles.eachInside} >
                                    <p className={styles.pCart} >Total</p>
                                </div>
                                <hr className={styles.hr} />
                                <div className={styles.eachInside} >
                                    <p className={styles.pCart} >$ {totalProducts}</p>
                                </div>
                                <hr className={styles.hr} />
                                <div className={styles.eachInside} >
                                    <button onClick={handeLinkToPost} className={styles.bottonBuy}>BUY <CashRegister className={styles.cash} /></button>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                }
            </div>
        </div>
    )
}

export default ShoppingCart