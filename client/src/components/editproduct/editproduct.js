import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Hinge } from "react-awesome-reveal";
import { ToastContainer, toast } from 'react-toastify';
import { EDITPRODUCT, GETPRODUCTS } from '../actions';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../scss/editproduct/editproduct.module.scss';

const EditProduct = () => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const [productToEdit, setProductToEdit] = useState({
        id: '',
        name: '',
        brand: '',
        stock: '',
        image: '',
        category: '',
        subcategory: '',
        price: ''
    })

    const products = useSelector(state => state.Clothbea.products);

    useEffect(async () => {
        await dispatch(GETPRODUCTS())
        setLoading(false)
    }, [])

    const handleProducts = () => {

    }

    const handleSubmit = (event) => {
        event.preventDefault()

    }

    return (
        <div>
            <div>
                <Hinge>
                    {loading ?
                        <div>
                            <div className={styles.loader} />
                        </div>
                        :
                        <div>

                        </div>
                    }
                </Hinge>
            </div>
        </div>
    )
}


export default EditProduct;