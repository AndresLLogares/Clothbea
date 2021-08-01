import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Reveal } from "react-awesome-reveal";
import styles from '../../scss/create/create.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { GETORDERBYID, GETCART } from '../actions';
import { Mail } from '@styled-icons/entypo/Mail';
import { Address } from '@styled-icons/entypo/Address';
import { City } from '@styled-icons/boxicons-solid/City';
import { DocumentOnePage } from '@styled-icons/fluentui-system-filled/DocumentOnePage';
import { RealEstate } from '@styled-icons/fluentui-system-filled/RealEstate';
import { Mailbox } from '@styled-icons/bootstrap/Mailbox';
import Canvas from '../canvas/canvas';
import axios from 'axios';
import '../../scss/login/login.scss';

const Payment = (props) => {

    let URL = 'https://clothbea.herokuapp.com';

    const search = props.location.search;

    const params = new URLSearchParams(search);

    const emailUser = localStorage.getItem('Email')

    const Id = params.get('Id');

    const stripeCall = useStripe();

    const elementsStripe = useElements()

    const dispatch = useDispatch();

    const [dataPayment, setDataPayment] = useState({
        name: '',
        email: '',
    })

    let userCart = useSelector(state => state.Clothbea.cart)

    console.log(userCart)

    const [city, setCity] = useState('')

    const [line1, setLine1] = useState('')

    const [state, setState] = useState('')

    const [postal_code, setPostalCode] = useState('')

    const [processing, setProccesing] = useState(true)

    const order = useSelector(state => state.Clothbea.ordersById)

    useEffect(async () => {
        await dispatch(GETCART(emailUser))
        await dispatch(GETORDERBYID(Id))
    }, [])

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
                email: emailUser,
                products: userCart
            })
                .then((response) => {
                    if (response.data === "Payment succesful") {
                        toast.success(response.data)
                        setTimeout(() => window.location.href = 'https://clothbea.netlify.app/Home', 1000)
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
        setDataPayment({ name: '', email: '' })
        setState('')
        setLine1('')
        setProccesing(true)
    }

    const iframeStyles = {
        base: {
            color: "#231B1B",
            fontSize: "15px",
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
            <Canvas />
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
                                    <label class="input">
                                        <input
                                            name='name'
                                            class="input__field"
                                            type='text'
                                            placeholder=" "
                                            onChange={handleInputChange}
                                            value={dataPayment.name}
                                            autoComplete={false}
                                            required={true}
                                        />
                                        <span class="input__label"><DocumentOnePage className={styles.iconsLogin} />Name</span>
                                    </label>
                                </div>
                                <div className={styles.eachInput} >
                                    <label class="input">
                                        <input
                                            name='email'
                                            class="input__field"
                                            type='email'
                                            placeholder=" "
                                            onChange={handleInputChange}
                                            value={dataPayment.email}
                                            autoComplete={false}
                                            required={true}
                                        />
                                        <span class="input__label"><Mail className={styles.iconsLogin} />E-Mail</span>
                                    </label>
                                </div>
                                <div className={styles.eachInput} >
                                    <label class="input">
                                        <input
                                            name='city'
                                            class="input__field"
                                            type='text'
                                            placeholder=" "
                                            onChange={handleInputChangeCity}
                                            value={city}
                                            autoComplete={false}
                                            required={true}
                                        />
                                        <span class="input__label"><City className={styles.iconsLogin} />City</span>
                                    </label>
                                </div>
                                <div className={styles.eachInput} >
                                    <label class="input">
                                        <input
                                            name='line1'
                                            class="input__field"
                                            type='text'
                                            placeholder=" "
                                            onChange={handleInputChangeLine}
                                            value={line1}
                                            autoComplete={false}
                                            required={true}
                                        />
                                        <span class="input__label"><Address className={styles.iconsLogin} />Address</span>
                                    </label>
                                </div>
                                <div className={styles.eachInput} >
                                    <label class="input">
                                        <input
                                            name='state'
                                            class="input__field"
                                            type='text'
                                            placeholder=" "
                                            onChange={handleInputChangeState}
                                            value={state}
                                            autoComplete={false}
                                            required={true}
                                        />
                                        <span class="input__label"><RealEstate className={styles.iconsLogin} />State</span>
                                    </label>
                                </div>
                                <div className={styles.eachInput} >
                                    <label class="input">
                                        <input
                                            name='postal_code'
                                            class="input__field"
                                            type='number'
                                            placeholder=" "
                                            onChange={handleInputChangeState}
                                            value={postal_code}
                                            autoComplete={false}
                                            required={true}
                                        />
                                        <span class="input__label"><Mailbox className={styles.iconsLogin} />ZIP</span>
                                    </label>
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