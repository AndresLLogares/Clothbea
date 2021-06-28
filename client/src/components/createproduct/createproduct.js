import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../scss/create/create.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { GETCATEGORIES, GETPRODUCTS } from '../actions';
import { Rename } from '@styled-icons/boxicons-regular/Rename';
import { DriveFileRenameOutline } from '@styled-icons/material/DriveFileRenameOutline';
import { Pricetag } from '@styled-icons/ionicons-sharp/Pricetag';
import { Image } from '@styled-icons/boxicons-regular/Image';
import { Stock } from '@styled-icons/remix-fill/Stock';
import { CategoryAlt } from '@styled-icons/boxicons-solid/CategoryAlt'
import { Category } from '@styled-icons/material-rounded/Category';
import { ToastContainer, toast } from 'react-toastify';
import { CLOUDINARY_URL } from '../Secret/secret.js';
import { CLOUDINARY_UPLOAD_PRESET } from '../Secret/secret.js';
import { Reveal } from "react-awesome-reveal";

const CreateProduct = () => {

    const [newProduct, setNewProduct] = useState({
        Id: '',
        name: '',
        brand: '',
        stock: '',
        image: '',
        price: ''
    })

    let URL = 'https://clothbea.herokuapp.com';

    const dispatch = useDispatch()

    const [changeCategory, setChangeCategory] = useState("Dresses")

    const [genre, setGenre] = useState('Men');

    const [subCategory, setSubCategory] = useState('T-Shirt')

    const products = useSelector(state => state.Clothbea.products);

    const categories = useSelector(state => state.Clothbea.categories);

    let Id = 0

    if (products.length > 0) {
        let aux = products.map(item => item.Id)
        Id = Math.max.apply(null, aux)
    }

    useEffect(async () => {
        await dispatch(GETPRODUCTS())
        await dispatch(GETCATEGORIES())
    }, [])



    const imageHandler = async (event) => {
        const file = event?.currentTarget?.files[0];

        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        const res = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        setNewProduct({ ...newProduct, image: res.data.url });
    }

    const handleInputChange = (event) => {
        setNewProduct({ ...newProduct, [event.target.name]: event.target.value })
    }

    console.log(newProduct.image)

    const handleSubmitChange = async (event) => {
        event.preventDefault()
        await axios.post(URL + '/Products/createproduct', {
            Id: Id + 1,
            name: newProduct.name,
            image: newProduct.image,
            category: genre,
            subcategory: subCategory,
            brand: newProduct.brand,
            price: parseInt(newProduct.price),
            stock: parseInt(newProduct.stock),
        })
            .then((response) => {
                toast.info(response.data)
            })
        await dispatch(GETPRODUCTS())

        setNewProduct({
            Id: '',
            name: '',
            image: '',
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
        <div className={styles.containerCreate} >
            <div className={styles.sortCreate} >
                <ToastContainer />
                <Reveal className={styles.Effect} >
                    <div className={styles.createBox} >
                        <div className={styles.sortTitle} >
                            <p className={styles.titleCreate} >Create Product</p>
                        </div>
                        <div className={styles.sortForm}>
                            <form onSubmit={handleSubmitChange} className={styles.form}>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Rename className={styles.iconsLogin} /> Name</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={newProduct.name}
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
                                        value={newProduct.brand}
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
                                        value={newProduct.price}
                                        type='text'
                                        className={styles.input}
                                        name='price'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Image className={styles.iconsLogin} /> Image</label>
                                    <img
                                        className={styles.imageCreate}
                                        alt='' src={newProduct.image} />
                                    <input
                                        type='file'
                                        accept='image/png'
                                        onChange={imageHandler}
                                        required={true}
                                        className={styles.inputImage}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Stock className={styles.iconsLogin} /> Stock</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={newProduct.stock}
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
                                    <button type='submit' className={styles.buttonCreate} >Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    )
}

export default CreateProduct;