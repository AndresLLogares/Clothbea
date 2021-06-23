import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../scss/create/create.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { GETCATEGORIES } from '../actions';
import { CategoryAlt } from '@styled-icons/boxicons-solid/CategoryAlt'
import { Category } from '@styled-icons/material-rounded/Category';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from "react-awesome-reveal";

const CreateCategory = () => {

    let URL = 'http://localhost:5000';

    const [category, setCategory] = useState('')

    const [genre, setGenre] = useState(['Women', 'Men'])

    const dispatch = useDispatch()

    const [checkWoman, setCheckWoman] = useState(true)

    const [checkMan, setCheckMan] = useState(true)

    const categories = useSelector(state => state.Clothbea.categories);

    let Id = 0

    if (categories.length > 0) {
        let aux = categories.map(item => item.Id)
        Id = Math.max.apply(null, aux)
    }

    useEffect(async () => {
        await dispatch(GETCATEGORIES())
    }, [])

    const handleGenreMan = () => {
        setCheckMan(!checkMan)
    }

    const handleGenreWoman = () => {
        setCheckWoman(!checkWoman)
    }

    const handleInputChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmitChange = async (event) => {
        event.preventDefault()
        if (!checkMan && !checkWoman) { return toast.error("You must choice a genre") }
        else if (!checkWoman && checkMan) { setGenre(['Men']) }
        else if (checkWoman && !checkMan) { setGenre(['Women']) }
        await axios.post(URL + '/Products/createcategories', {
            Id: Id + 1,
            name: category,
            category: genre
        })
            .then((response) => {
                toast.info(response.data)
            })
        await dispatch(GETCATEGORIES())
        setCategory('')
    }

    return (
        <div className={styles.containerCreateCat} >
            <div className={styles.sortCreate} >
                <ToastContainer />
                <Zoom className={styles.Effect} >
                    <div className={styles.createBoxCat} >
                        <div className={styles.sortTitle} >
                            <p className={styles.titleCreate} >Create Category</p>
                        </div>
                        <div className={styles.categories}>
                            <div className={styles.sortTitle2} >
                                <p className={styles.titleCreate2}  >Current Categories</p>
                            </div>
                            <div className={styles.sortCategories}>
                                {categories && categories.map((item, index) => (
                                    <div className={styles.eachCategory} >
                                        <p className={styles.styleCategory} >{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.sortForm}>
                            <form onSubmit={handleSubmitChange} className={styles.form}>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><CategoryAlt className={styles.iconsLogin} /> Women</label>
                                    <input
                                        onClick={handleGenreWoman}
                                        value={category}
                                        type='checkbox'
                                        className={styles.inputCheck}
                                        name='category'
                                        checked={checkWoman}
                                        required={false}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><CategoryAlt className={styles.iconsLogin} /> Men</label>
                                    <input
                                        onClick={handleGenreMan}
                                        value={category}
                                        type='checkbox'
                                        className={styles.inputCheck}
                                        name='category'
                                        checked={checkMan}
                                        required={false}
                                    />
                                </div>
                                <div className={styles.eachInput} >
                                    <label className={styles.label} ><Category className={styles.iconsLogin} /> Category</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={category}
                                        type='text'
                                        className={styles.input}
                                        name='category'
                                        required={true}
                                    />
                                </div>
                                <div className={styles.sortButtons} >
                                    <button type='submit' className={styles.buttonCreate} >Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}

export default CreateCategory;