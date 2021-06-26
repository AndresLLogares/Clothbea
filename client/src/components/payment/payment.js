import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Reveal } from "react-awesome-reveal";
import styles from '../../scss/create/create.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { GETORDERBYID } from '../actions';
import { Mail } from '@styled-icons/entypo/Mail';
import { Address } from '@styled-icons/entypo/Address';
import { City } from '@styled-icons/boxicons-solid/City';
import { DocumentOnePage } from '@styled-icons/fluentui-system-filled/DocumentOnePage';
import { RealEstate } from '@styled-icons/fluentui-system-filled/RealEstate';
import { Mailbox } from '@styled-icons/bootstrap/Mailbox';

import axios from 'axios';


const Payment = (props) => {

    let URL = 'http://localhost:5000';

    const search = props.location.search;

    const params = new URLSearchParams(search);

    const Id = params.get('Id');

    const stripeCall = useStripe();

    const elementsStripe = useElements()

    const dispatch = useDispatch();

    const [dataPayment, setDataPayment] = useState({
        name: '',
        email: '',
    })

    const [city, setCity] = useState(' ')

    const [line1, setLine1] = useState(' ')

    const [state, setState] = useState(' ')

    const [postal_code, setPostalCode] = useState(' ')

    const [processing, setProccesing] = useState(true)

    const order = useSelector(state => state.Clothbea.ordersById)

    useEffect(() => {
        dispatch(GETORDERBYID(Id))
    }, [])

    console.log(order)

    const handleInputChange = (event) => {
        setDataPayment({ ...dataPayment, [event.target.name]: event.target.value })
    }

    const handleInputChangeCity = (event) => {
        setCity(event.target.value)
    }

    const handleInputChangeState = (event) => {
        setState(event.target.value)
    }

    const handleInputChangeLine = (event) => {
        setLine1(event.target.value)
    }

    const handleInputChangePostal = (event) => {
        setPostalCode(event.target.value)
    }

    const handleProccesing = () => {
        setProccesing(false)
    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        console.log(elementsStripe.getElement(CardElement))

        const { error, paymentMethod } = await stripeCall.createPaymentMethod({
            type: 'card',
            card: elementsStripe.getElement(CardElement),
            billing_details: {
                name: dataPayment.name,
                email: dataPayment.email,
                address: {
                    city: city,
                    line1: line1,
                    state: state,
                    postal_code: postal_code
                }
            }
        })
        if (!error) {
            await axios.post(URL + '/Orders/paymentcheckout', {
                Id: Id,
                stripeId: paymentMethod.id,
                amount: order.total * 10,
                email: order.email
            })
                .then((response) => {
                    if (response.data === "Payment succesful") {
                        toast.success(response.data)
                        setTimeout(() => window.location.href = 'http://localhost:3000/Home', 2000)
                    }
                    else {
                        return toast.error(response.data)
                    }
                })
        }
        else {
            setProccesing(true)
            return toast.error(error.code.toLocaleUpperCase().replace('_', ' '))
        }
        setCity('')
        setPostalCode('')
        setDataPayment({name:'', email:''})
        setState('')
        setLine1('')
        setProccesing(true)
    }

    const iframeStyles = {
        base: {
            color: "#231B1B",
            fontSize: "25px",
            iconColor: "#0C637F",
            "::placeholder": {
                color: "#231B1B"
            }
        },
        invalid: {
            iconColor: "#EF476F",
            color: "#EF476F"
        },
        complete: {
            iconColor: "#06D6A0"
        }
    };

    const cardElementOpts = {
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
    };

    return (
        <div className={styles.containerCreateCat} >
            <div className={styles.sortCreate} >
                <ToastContainer />
                <Reveal className={styles.Effect} >
                    <div className={styles.createBoxCat} >
                        <div className={styles.sortTitle} >
                            <p className={styles.titleCreate} >Introduce your information</p>
                        </div>
                        <div className={styles.sortForm} >
                            <form onSubmit={handleSubmit} className={styles.form} >
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><DocumentOnePage className={styles.iconsLogin} /> Name</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={dataPayment.name}
                                        type='text'
                                        className={styles.input}
                                        name='name'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Mail className={styles.iconsLogin} /> E-Mail</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={dataPayment.email}
                                        type='email'
                                        className={styles.input}
                                        name='email'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><City className={styles.iconsLogin} /> City</label>
                                    <input
                                        onChange={handleInputChangeCity}
                                        value={city}
                                        type='text'
                                        className={styles.input}
                                        name='city'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Address className={styles.iconsLogin} /> Address</label>
                                    <input
                                        onChange={handleInputChangeLine}
                                        value={line1}
                                        type='text'
                                        className={styles.input}
                                        name='line1'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><RealEstate className={styles.iconsLogin} /> State</label>
                                    <input
                                        onChange={handleInputChangeState}
                                        value={state}
                                        type='text'
                                        className={styles.input}
                                        name='state'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Mailbox className={styles.iconsLogin} /> ZIP</label>
                                    <input
                                        onChange={handleInputChangePostal}
                                        value={postal_code}
                                        type='number'
                                        className={styles.input}
                                        name='postal_code'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.Card} >
                                    <div className={styles.divLabel} >
                                        <label className={styles.labelCard} > Credit Card </label>
                                        <label className={styles.labelCardExample} >Example: 4242 4242 4242 4242 || 12/21 || 123 </label>
                                    </div>
                                    <CardElement
                                        options={cardElementOpts}
                                    />
                                </div>
                                <div className={styles.sortButtons} >
                                    {processing ?
                                        <button onClick={handleProccesing} type='submit' className={styles.buttonCreate} >Buy</button>
                                        :
                                        <button className={styles.buttonCreateDisabled} >Buy</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    )
}

export default Payment;