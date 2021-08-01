import React, { useState, useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
import styles from '../../scss/details/details.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTSBYID, GETWISH, GETCART, ADDWISH, REMOVEWISH, ADDCART, REMOVECART, ADDCOMMENT, REMOVECOMMENT } from '../actions';
import { CartPlusFill } from '@styled-icons/bootstrap/CartPlusFill';
import { CancelPresentation } from '@styled-icons/material-outlined/CancelPresentation';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { Star } from '@styled-icons/bootstrap/Star';
import { ToastContainer, toast } from 'react-toastify';
import { CartDashFill } from '@styled-icons/bootstrap/CartDashFill';
import Canvas from '../canvas/canvas';

const Details = (props) => {

    const [loading, setLoading] = useState(true)

    const Id = props?.history?.location?.state?.Id

    const dispatch = useDispatch()

    const emailUser = localStorage.getItem('Email')

    const product = useSelector(state => state.Clothbea.productById)

    const userCart = useSelector(state => state.Clothbea.cart)

    const wishes = useSelector(state => state.Clothbea.wishlist)

    const [sizeHome, setSizeHome] = useState({
        size: 'S',
        id: ''
    })

    const [comment, setComment] = useState('')

    const [title, setTitle] = useState('')

    let commentsUsers = product?.comments

    useEffect(async () => {
        await dispatch(PRODUCTSBYID(Id))
        await dispatch(GETCART(emailUser))
        await dispatch(GETWISH(emailUser))
        !product ? setLoading(true) : setLoading(false);
    }, [])

    const handleSelect = async (id, sizeSelect) => {
        setSizeHome({ id: id, size: sizeSelect })
    }

    const handleAddWish = async (Id, name, image) => {
        if (!emailUser) {
            setTimeout(() => window.location.href = 'https://clothbea.netlify.app/Login', 1000)
            return toast.error('You must be logged to add product in your wishlist')
        }
        if (wishes.find(item => item.Id === Id)) {
            return toast.success('This product is already in your wishlist')
        }
        await dispatch(ADDWISH({
            email: emailUser,
            Id: Id,
            image: image,
            name: name
        }))
        setTimeout(async () => await dispatch(GETWISH(emailUser)), 1000)
        toast.success("Product added to your wishlist")
    }

    const handleRemoveWish = async (Id) => {
        if (!emailUser) { return toast.error('You must be logged to add product in your wishlist') }
        await dispatch(REMOVEWISH({
            email: emailUser,
            Id: Id,
        }))
        setTimeout(async () => await dispatch(GETWISH(emailUser)), 1000)

        toast.success("Product removed of your wishlist")
    }

    const handleCartAdd = async (name, price, brand, id, image, stock) => {
        if (!emailUser) {
            setTimeout(() => window.location.href = 'https://clothbea.netlify.app/Login', 1000)
            return toast.error('You must be logged to add products')
        }
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
        setTimeout(async () => await dispatch(GETCART(emailUser)), 1000)
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
        setTimeout(async () => await dispatch(GETCART(emailUser)), 1000)
        const ResponseRemove = await localStorage.getItem('ResponseRemove')
        ResponseRemove === "Product removed" ? toast.success(ResponseRemove) : toast.error(ResponseRemove)
    }

    const handleNoStock = () => {
        toast.error(`Sorry, we don't have stock for this product`)
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    const handleSubmitComment = async (event) => {
        event.preventDefault()
        if (!emailUser) {
            setTimeout(() => window.location.href = 'https://clothbea.netlify.app/Login', 1000)
            return toast.error('You must be logged to add a comment')
        }
        else if (commentsUsers.find(item => item.email === emailUser)) {
            return toast.error(`You can't comment twice the same product`)
        }
        else if (title === '') {
            return toast.error(`Title can't be empty`)
        }
        else if (comment === '') {
            return toast.error(`Commet can't be empty`)
        }
        await dispatch(ADDCOMMENT({
            email: emailUser,
            Id: product.Id,
            comment: comment,
            title: title
        }))
        await dispatch(PRODUCTSBYID(Id))
        setComment('')
        setTitle('')
        toast.success('Comment added')
    }

    const removecomment = async (Id) => {
        await dispatch(REMOVECOMMENT(Id))
        await dispatch(PRODUCTSBYID(Id))
    }

    return (
        <div className={styles.containerDetails} >
            <Canvas />
            {loading ?
                <div className={styles.sortDetails} >
                    <div className={styles.loader} />
                </div>
                :
                <div className={styles.sortDetails} >
                    <ToastContainer
                        autoClose={800}
                        limit={3}
                    />
                    <Reveal className={styles.zoom} >

                        <div className={styles.boxDetails} >
                            <div className={styles.separateDetails} >
                                <div className={styles.sortImage1} >
                                    <img className={styles.sizeImage} src={product.image} alt='' />
                                </div>
                                <div className={styles.sortImage2} >
                                    <div className={styles.insideBox} >
                                        {typeof (wishes) !== String && !wishes.find(wish => wish.Id === product.Id) ?
                                            <div className={styles.sortStar} >
                                                <button
                                                    onClick={() => { handleAddWish(product.Id, product.name, product.image) }}
                                                    className={styles.buttonStar} ><Star className={styles.star} />
                                                </button>
                                            </div>
                                            :
                                            <div

                                                className={styles.sortStar} >
                                                <button
                                                    onClick={() => handleRemoveWish(product.Id)}
                                                    className={styles.buttonStar}  ><StarFill className={styles.star} />
                                                </button>
                                            </div>
                                        }
                                        <p className={styles.pDetails} >For: {product.category}</p>
                                        <p className={styles.pDetails} >Brand: {product.brand}</p>
                                        <p className={styles.pDetails}>Category: {product.subcategory}</p>
                                        <p className={styles.pDetails}>Name: {product.name}</p>
                                        <p className={styles.pDetails}>Price: ${product.price}</p>
                                        <label className={styles.pDetails}>Size</label>
                                        <div className={styles.sortSelect} >
                                            <select
                                                onChange={(event) => handleSelect(product.Id, event.target.value)}
                                                className={styles.select}>
                                                <option>S</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                            </select>
                                        </div>
                                        {product.stock === 0 ?
                                            <div className={styles.sortButton} >
                                                <button onClick={handleNoStock} className={styles.buttonBuy} ><CancelPresentation className={styles.cartIcon} /></button>
                                            </div>
                                            :

                                            <div className={styles.sortButton} >
                                                {typeof (userCart) !== String && !userCart.find(item => item.Id === product.Id) ?

                                                    <button
                                                        onClick={() => handleCartAdd(product.name, product.price, product.brand, product.Id, product.image, product.stock)}
                                                        className={styles.buttonBuy} ><CartPlusFill className={styles.cartIcon} /></button>
                                                    :
                                                    <button
                                                        onClick={() => handleRemoveAdd(product.Id)}
                                                        className={styles.buttonBuy} ><CartDashFill className={styles.cartIcon} /></button>

                                                }
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal className={styles.zoom} >
                        <div className={styles.secondBox} >
                            <div className={styles.sortSecondBox} >
                                <div className={styles.sortTitle} >
                                    <p className={styles.titleComment} >Leave your comment here</p>
                                </div>
                                <div className={styles.separateDetails} >
                                    <div className={styles.sortForm} >
                                        <form onSubmit={handleSubmitComment} className={styles.form} >
                                            <label className={styles.label} >
                                                Title
                                            </label>
                                            <input
                                                className={styles.input}
                                                required={true}
                                                type='text'
                                                value={title}
                                                onChange={handleTitle}
                                            />
                                            <label className={styles.label} >
                                                Review
                                            </label>
                                            <textarea
                                                className={styles.textarea}
                                                required={true}
                                                type='text'
                                                value={comment}
                                                onChange={handleComment}
                                            />
                                            <div className={styles.sortButton2} >
                                                <button type='submit' className={styles.buttonSend} >Send</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className={styles.sortReview} >
                                        <div className={styles.sortTitleReview}>
                                            <p className={styles.titleReview} >Reviews</p>
                                        </div>
                                        {commentsUsers && commentsUsers.map((item, index) => (
                                            <div className={styles.sortComments} >
                                                <div className={styles.eachItemComment} >
                                                    <p className={styles.comments} >By: {item.email}</p>
                                                </div>
                                                <div className={styles.eachItemComment} >
                                                    <p className={styles.comments}>Title: {item.title}</p>
                                                </div>
                                                <div className={styles.eachItemComment} >
                                                    <p className={styles.comments}>{item.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            }
        </div>
    )
}

export default Details;