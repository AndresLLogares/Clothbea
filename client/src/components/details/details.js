import React, { useState, useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import styles from '../../scss/details/details.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTSBYID } from '../actions';
import { CartPlusFill } from '@styled-icons/bootstrap/CartPlusFill';
import { CancelPresentation } from '@styled-icons/material-outlined/CancelPresentation';

const Details = (props) => {

    const [loading, setLoading] = useState(true)

    const Id = props?.history?.location?.state?.Id

    const dispatch = useDispatch()

    const product = useSelector(state => state.Clothbea.productById)

    useEffect(() => {
        dispatch(PRODUCTSBYID(Id))
        !product ? setLoading(true) : setLoading(false);
    }, [])

    console.log("DETAILS", product)

    return (
        <div className={styles.containerDetails} >
            <div className={styles.sortDetails} >
                <Zoom className={styles.zoom} >
                    <div className={styles.boxDetails} >
                        {loading ?
                            <div>
                                <div className={styles.loader} />
                            </div>
                            :
                            <div className={styles.separateDetails} >
                                <div className={styles.sortImage1} >
                                    <img className={styles.sizeImage} src={product.image} alt='' />
                                </div>
                                <div className={styles.sortImage2} >
                                    <div className={styles.insideBox} >
                                        <p className={styles.pDetails} >For: {product.category}</p>
                                        <p className={styles.pDetails} >Brand: {product.brand}</p>
                                        <p className={styles.pDetails}>Category: {product.subcategory}</p>
                                        <p className={styles.pDetails}>Name: {product.name}</p>
                                        <p className={styles.pDetails}>Price: ${product.price}</p>
                                        <label className={styles.pDetails}>Size</label>
                                        <div className={styles.sortSelect} >
                                            <select className={styles.select}>
                                                <option>S</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                            </select>
                                        </div>
                                        {product.stock === 0 ?
                                            <div className={styles.sortButton} >
                                                <button className={styles.buttonBuy} ><CancelPresentation className={styles.cartIcon} /></button>
                                            </div>
                                            :
                                            <div className={styles.sortButton} >
                                                <button className={styles.buttonBuy} ><CartPlusFill className={styles.cartIcon} /></button>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </Zoom>
                <Zoom className={styles.zoom} >
                    {loading ?
                        <div>
                            <div className={styles.loader} />
                        </div>
                        :
                        <div className={styles.secondBox} >
                            <div className={styles.sortSecondBox} >
                                <div className={styles.sortTitle} >
                                    <p className={styles.titleComment} >Leave your comment here</p>
                                </div>
                                <div className={styles.separateDetails} >
                                    <div className={styles.sortForm} >
                                        <form className={styles.form} >
                                            <label className={styles.label} >
                                                Title
                                            </label>
                                            <input
                                                className={styles.input}
                                            />
                                            <label className={styles.label} >
                                                Review
                                            </label>
                                            <textarea
                                                className={styles.textarea}
                                            />
                                            <div className={styles.sortButton2} >
                                                <button className={styles.buttonSend} >Send</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className={styles.sortReview} >
                                        <div className={styles.sortTitleReview}>
                                            <p className={styles.titleReview} >Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Zoom>
            </div>
        </div>
    )
}

export default Details;