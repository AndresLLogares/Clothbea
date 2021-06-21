import React, { useState, useEffect } from 'react';
import styles from '../../scss/home/home.module.scss'
import { Zoom } from "react-awesome-reveal";
import { GETPRODUCTS, GETCATEGORIES, ADDCART, GETWISH, REMOVECART, GETCART, ADDWISH, REMOVEWISH } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Women } from '@styled-icons/remix-line/Women';
import { Men } from '@styled-icons/remix-line/Men';
import { CartPlusFill } from '@styled-icons/bootstrap/CartPlusFill';
import { Link } from 'react-router-dom';
import { CancelPresentation } from '@styled-icons/material-outlined/CancelPresentation';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { Star } from '@styled-icons/bootstrap/Star';
import { ToastContainer, toast } from 'react-toastify';
import { CartDashFill } from '@styled-icons/bootstrap/CartDashFill';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const dispatch = useDispatch();

    const [animation, setAnimation] = useState(false);

    const [loading, setLoading] = useState(true)

    const [categorieFilter, setCategorieFilter] = useState('T-Shirt')

    const [genre, setGenre] = useState('Men');

    const [filtredStock, setFiltredStock] = useState([]);

    const [changeCategory, setChangeCategory] = useState("Dresses")

    const products = useSelector(state => state.Clothbea.products);

    const categories = useSelector(state => state.Clothbea.categories);

    const [limits, setLimits] = useState({
        base: 0,
        top: 9
    })

    const [sizeHome, setSizeHome] = useState({
        size: 'S',
        id: ''
    })

    const [emailUser, setEmailUser] = useState('')

    const emailUserToGet = localStorage.getItem('Email')

    const userCart = useSelector(state => state.Clothbea.cart)

    const wishes = useSelector(state => state.Clothbea.wishlist)

    useEffect(async () => {
        await setEmailUser(localStorage.getItem('Email'));
        await dispatch(GETPRODUCTS())
        await dispatch(GETCATEGORIES())
        !products ? setLoading(true) : setLoading(false);
        await dispatch(GETCART(emailUserToGet))
        await dispatch(GETWISH(emailUserToGet))
    }, [])

    const setGenreWomen = () => {
        setAnimation(true)
        setGenre('Women')
        setChangeCategory("Shirts")
        setCategorieFilter('T-Shirt')
        setTimeout(() => setAnimation(false), 1000)
    }

    const setGenreMen = () => {
        setAnimation(true)
        setGenre('Men')
        setCategorieFilter('T-Shirt')
        setChangeCategory("Dresses")
        setTimeout(() => setAnimation(false), 1000)
    }

    const setCategory = (cat) => {
        setAnimation(true)
        setCategorieFilter(cat)
        setTimeout(() => setAnimation(false), 1000)
    }

    const handleSelect = async (id, sizeSelect) => {
        setSizeHome({ id: id, size: sizeSelect })
    }

    const handleCartAdd = async (name, price, brand, id, image, stock) => {
        if (!emailUser) { return toast.error('You must be logged to add products') }
        localStorage.removeItem("ResponseAdd")
        if (id !== setSizeHome.id) {
            setSizeHome({ size: 'S' })
        }
        await dispatch(ADDCART({
            name: name,
            price: price,
            brand: brand,
            id: id,
            quantity: 1,
            email: emailUser,
            image: image,
            size: sizeHome.size,
            stock: stock
        }))
        setTimeout( async() =>  await dispatch(GETCART(emailUserToGet)), 1000 )

        const responceAdd = await localStorage.getItem('ResponseAdd')
        responceAdd === "Product added" ? toast.success(responceAdd) : toast.error(responceAdd)
    }

    const handleRemoveAdd = async (id) => {
        if (!emailUser) { return toast.error('You must be logged to add products') }
        localStorage.removeItem("ResponseRemove")
        await dispatch(REMOVECART({
            Id: id,
            email: emailUser
        }))
        setTimeout( async() =>  await dispatch(GETCART(emailUserToGet)), 1000 )
        const ResponseRemove = await localStorage.getItem('ResponseRemove')
        ResponseRemove === "Product removed" ? toast.success(ResponseRemove) : toast.error(ResponseRemove)
    }

    const handleAddWish = async (Id, name, image) => {
        if (!emailUser) { return toast.error('You must be logged to add product in your wishlist') }
        if (wishes.find(item => item.Id === Id)) {
            return toast.success('This product is already in your wishlist')
        }
        await dispatch(ADDWISH({
            email: emailUser,
            Id: Id,
            image: image,
            name: name
        }))
        setTimeout( async() =>  await dispatch(GETWISH(emailUserToGet)), 1000 )
        toast.success("Product added to your wishlist")
    }

    const handleRemoveWish = async (Id) => {
        if (!emailUser) { return toast.error('You must be logged to add product in your wishlist') }
        await dispatch(REMOVEWISH({
            email: emailUser,
            Id: Id,
        }))
        setTimeout( async() =>  await dispatch(GETWISH(emailUserToGet)), 1000 )

        toast.success("Product removed of your wishlist")
    }

    const handleNoStock = () => {
        toast.error('Sorry, we don`t have stock for this product')
    }

    return (
        <div className={styles.containeHome} >
            <ToastContainer />
            <div className={styles.sortHome}>
                {loading ?
                    <div>
                        <div className={styles.loader} />
                    </div>
                    :
                    <div className={styles.forced}>
                        <Zoom className={styles.zoom1}>
                            <div className={styles.separateHome1} >
                                <div className={styles.sortEachGenre}>
                                    <p onClick={setGenreMen} className={styles.btnGenre} ><Men className={styles.genreIcon} />Men</p>
                                </div>
                                <div className={styles.sortEachGenre}>
                                    <p onClick={setGenreWomen} className={styles.btnGenre} ><Women className={styles.genreIcon} /> Women</p>
                                </div>
                            </div>
                        </Zoom>
                        <div className={styles.separateHome2} >
                            <Zoom className={styles.zoom2} >
                                <div className={styles.sortCategories} >
                                    {categories && categories.filter(item => item.name !== changeCategory).map((item, index) => (
                                        <div className={styles.boxCategory} >
                                            <p onClick={() => setCategory(item.name)} className={styles.fontCategory} >{item.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </Zoom>
                            <Zoom className={styles.zoom3} >
                                <div className={animation ? styles.animation : styles.sortCarts} >
                                    {products && products.filter(item => item.subcategory === categorieFilter && item.category === genre).slice(limits.base, limits.top).map((item, index) => (
                                        <div className={styles.boxCard} >
                                            {typeof (wishes) !== String  && !wishes.find(wish => wish.Id === item.Id) ?
                                                <div className={styles.sortStar} >
                                                    <button
                                                        onClick={() => { handleAddWish(item.Id, item.name, item.image) }}
                                                        className={styles.buttonStar} ><Star className={styles.star} />
                                                    </button>
                                                </div>
                                                :
                                                <div

                                                    className={styles.sortStar} >
                                                    <button
                                                        onClick={() => handleRemoveWish(item.Id)}
                                                        className={styles.buttonStar}  ><StarFill className={styles.star} />
                                                    </button>
                                                </div>
                                            }
                                            <Link to={{
                                                pathname: '/Details',
                                                state: {
                                                    Id: item.Id,
                                                }
                                            }}>
                                                <div className={styles.imageCard} >
                                                    <img className={styles.sizeImage} src={item.image} alt='' />
                                                </div>
                                            </Link>
                                            <div className={styles.bottomCard2} >
                                                <div className={styles.eachBottom1} >
                                                    <label className={styles.price}>
                                                        Size
                                                    </label>
                                                </div>
                                                <div className={styles.eachBottom2} >
                                                    <select
                                                        onChange={(event) => handleSelect(item.Id, event.target.value)}
                                                        className={styles.select} >
                                                        <option value='S' className={styles.option} >S</option>
                                                        <option value='M' className={styles.option} >M</option>
                                                        <option value='L' className={styles.option} >L</option>
                                                        <option value='XL' className={styles.option} >XL</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className={styles.bottomCard} >
                                                <div className={styles.eachBottom1} >
                                                    <p className={styles.price} >${item.price}</p>
                                                </div>
                                                {item.stock === 0 ?
                                                    <div className={styles.eachBottom2} >
                                                        <button onClick={handleNoStock} className={styles.cartButtom}> <CancelPresentation /></button>
                                                    </div>
                                                    :
                                                    <div className={styles.eachBottom2}>
                                                        {typeof (userCart) !== String && !userCart.find(product => product.Id === item.Id) ?
                                                            <button
                                                                onClick={() => handleCartAdd(item.name, item.price, item.brand, item.Id, item.image, item.stock)}
                                                                className={styles.cartButtom}> <CartPlusFill />
                                                            </button>
                                                            :
                                                            <button
                                                                onClick={() => handleRemoveAdd(item.Id)}
                                                                className={styles.cartButtom}> <CartDashFill />
                                                            </button>
                                                        }
                                                    </div>

                                                }

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Zoom>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;