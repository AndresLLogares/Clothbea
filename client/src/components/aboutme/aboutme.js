import React from 'react';
import { Fade } from "react-awesome-reveal";
import { Linkedin } from '@styled-icons/bootstrap/Linkedin';
import { Email } from '@styled-icons/evaicons-solid/Email';
import { Github } from '@styled-icons/boxicons-logos/Github';
import { Portfolio } from '@styled-icons/zondicons/Portfolio';
import styles from '../../scss/aboutme/aboutme.module.scss';
import Hi from '../images/loading.gif';

const AboutMe = () => {

    return (
        <div className={styles.containerAbout} >
            <div className={styles.sortAbout} >
                <Fade className={styles.slide} >
                    <div className={styles.boxAbout} >
                        <div className={styles.sortTitle1} >
                            <p className={styles.titleAbout} >Hi, i'm Andrés Luis Logares, the person behind this website, you can contact me by the next ways</p>
                        </div>
                        <div className={styles.secondBox}>
                            <div className={styles.firstSide} >
                                <a style={{ textDecoration: 'none' }}
                                    target="_blank"
                                    className={styles.eachLink}
                                    href="https://www.linkedin.com/in/andr%C3%A9s-luis-logares-522595172/" >
                                    <p className={styles.links} ><Linkedin className={styles.iconAbout} />Linkedin</p>
                                </a>
                                <div className={styles.eachLink} >
                                    <p className={styles.links1}><Email className={styles.iconAbout} />andresl940@hotmail.com</p>
                                </div>
                                <a style={{ textDecoration: 'none' }}
                                    target="_blank"
                                    className={styles.eachLink}
                                    href="https://github.com/AndresLLogares" >
                                    <p className={styles.links}><Github className={styles.iconAbout} />Github</p>
                                </a>
                                <a style={{ textDecoration: 'none' }}
                                    target="_blank"
                                    className={styles.eachLink}
                                    href="https://andreslogares.netlify.app/Blog">
                                    <p className={styles.links}><Portfolio className={styles.iconAbout} />Portfolio</p>
                                </a>
                            </div>
                            <div className={styles.secondSide} >
                                <img className={styles.imageAbout} src={Hi} alt='' />
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default AboutMe;