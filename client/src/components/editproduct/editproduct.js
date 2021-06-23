import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Zoom } from "react-awesome-reveal";
import { ToastContainer, toast } from 'react-toastify';
import { GETPRODUCTS, GETCATEGORIES } from '../actions';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../scss/editproduct/editproduct.module.scss';
import { Rename } from '@styled-icons/boxicons-regular/Rename';
import { DriveFileRenameOutline } from '@styled-icons/material/DriveFileRenameOutline';
import { Pricetag } from '@styled-icons/ionicons-sharp/Pricetag';
import { Image } from '@styled-icons/boxicons-regular/Image';
import { Stock } from '@styled-icons/remix-fill/Stock';
import { CategoryAlt } from '@styled-icons/boxicons-solid/CategoryAlt'
import { Category } from '@styled-icons/material-rounded/Category';
import axios from 'axios';

const EditProduct = () => {

    let URL = 'http://localhost:5000';

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const [productToEdit, setProductToEdit] = useState({
        Id: '',
        name: '',
        brand: '',
        stock: '',
        image: '',
        price: ''
    })

    const [changeCategory, setChangeCategory] = useState("Dresses")

    const [genre, setGenre] = useState('Men');

    const [subCategory, setSubCategory] = useState('T-Shirt')

    const products = useSelector(state => state.Clothbea.products);

    const categories = useSelector(state => state.Clothbea.categories);

    useEffect(async () => {
        await dispatch(GETPRODUCTS())
        await dispatch(GETCATEGORIES())
        setLoading(false)
    }, [])

    const handleProducts = (Id, name, brand, price, image, stock) => {
        setProductToEdit({ Id: Id, name: name, brand: brand, stock: stock, price: price, image: image })
    }

    const handleInputChange = (event) => {
        setProductToEdit({ ...productToEdit, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(URL + '/Products/editproduct', {
            Id: productToEdit.Id,
            name: productToEdit.name,
            category: genre,
            image: productToEdit.image,
            subcategory: subCategory,
            brand: productToEdit.brand,
            price: parseInt(productToEdit.price),
            stock: parseInt(productToEdit.stock),
        })
            .then((response) => {
                console.log(response)
                toast.info(response.data)
            })
        await dispatch(GETPRODUCTS())

        setProductToEdit({
            Id: '',
            name: '',
            brand: '',
            stock: '',
            image: '',
            price: ''
        })
    }

    const handleSelectGenre = (event) => {
        setGenre(event)
        genre !== "Men" ? setChangeCategory("Dresses") : setChangeCategory("Shirts")
    }

    const handleSelectSub = (event) => {
        setSubCategory(event)
    }

    return (
        <div className={styles.containerEdit} >
            <div className={styles.sortEdit} >
                <ToastContainer />
                <Zoom className={styles.Jack} >
                    {loading ?
                        <div>
                            <div className={styles.loader} />
                        </div>
                        :
                        <div className={styles.boxEdit} >
                            <div className={styles.sortTitle} >
                                <p className={styles.titleEdit} >Select a product</p>
                            </div>
                            <div className={styles.sortCards} >
                                {products && products.map((item, index) => (
                                    <div className={styles.boxEachProduct} >
                                        <div className={styles.titleCard} >
                                            <p className={styles.titlecardStyle}>{item.name}</p>
                                        </div>
                                        <div className={styles.imageCardsize} >
                                            <img className={styles.imageCard} src={item.image} alt='' />
                                        </div>
                                        <div className={styles.sortButtonCard} >
                                            <button
                                                onClick={() => handleProducts(item.Id, item.name, item.brand, item.price, item.image, item.stock)}
                                                className={styles.buttonSelect} >Select</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.sortForm}>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><Rename className={styles.iconsLogin} /> Name</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={productToEdit.name}
                                            type='text'
                                            className={styles.input}
                                            name='name'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><DriveFileRenameOutline className={styles.iconsLogin} /> Brand</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={productToEdit.brand}
                                            type='text'
                                            className={styles.input}
                                            name='brand'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><Pricetag className={styles.iconsLogin} /> Price</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={productToEdit.price}
                                            type='text'
                                            className={styles.input}
                                            name='price'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><Image className={styles.iconsLogin} /> Image</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={productToEdit.image}
                                            type='text'
                                            className={styles.input}
                                            name='image'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><Stock className={styles.iconsLogin} /> Stock</label>
                                        <input
                                            onChange={handleInputChange}
                                            value={productToEdit.stock}
                                            type='text'
                                            className={styles.input}
                                            name='stock'
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><CategoryAlt className={styles.iconsLogin} /> Category</label>
                                        <select
                                            onChange={(event) => handleSelectGenre(event.target.value)}
                                            className={styles.select} >
                                            <option value='Men' >Men</option>
                                            <option value='Women' >Women</option>
                                        </select>
                                    </div>
                                    <div className={styles.eachInput} >
                                        <label className={styles.label} ><Category className={styles.iconsLogin} /> SubCategory</label>
                                        <select
                                            onChange={(event) => handleSelectSub(event.target.value)}
                                            className={styles.select} >
                                            {categories && categories.filter(item => item.name !== changeCategory).map((item, index) => (
                                                <option value={item.name} >{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.sortButtons} >
                                        <button type='submit' className={styles.buttonCreate} >Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </Zoom>
            </div>
        </div>
    )
}


export default EditProduct;