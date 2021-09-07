import React, { useState, useEffect } from "react";
import { Reveal } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import styles from "../../scss/landpage/landpage.module.scss";
import logo from "../images/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { GETPRODUCTS } from "../actions";
import stylesLic from "../../scss/license/license.module.scss";
import Canvas from "../canvas/canvas";

const Landpage = () => {
  const dispatch = useDispatch();

  const [productLand, setProductLand] = useState({
    base: 0,
    top: 1,
  });

  const [animation, setAnimation] = useState(true);

  const products = useSelector((state) => state.Clothbea.products);

  useEffect(async () => {
    await dispatch(GETPRODUCTS());
  }, []);

  const buttonOne = () => {
    setAnimation(false);
    setProductLand({ base: 0, top: 1 });
    setTimeout(() => setAnimation(true), 600);
  };

  const buttonTwo = () => {
    setAnimation(false);
    setProductLand({ base: 10, top: 11 });
    setTimeout(() => setAnimation(true), 600);
  };

  const buttonThree = () => {
    setAnimation(false);
    setProductLand({ base: 20, top: 21 });
    setTimeout(() => setAnimation(true), 600);
  };

  const buttonFour = () => {
    setAnimation(false);
    setProductLand({ base: 30, top: 31 });
    setTimeout(() => setAnimation(true), 600);
  };

  const buttonFive = () => {
    setAnimation(false);
    setProductLand({ base: 40, top: 41 });
    setTimeout(() => setAnimation(true), 600);
  };

  return (
    <div className={styles.containerLand}>
      <Canvas />
      <div className={styles.sortLand}>
        <Reveal className={styles.fade}>
          <div className={styles.boxLand}>
            <div className={styles.sortTitleLand}>
              <div className={styles.containerTitle1}>
                <img className={styles.logoLand} src={logo} alt="" />
              </div>
              <div className={styles.containerTitle2}>
                <p className={styles.TitleLand}>Clothbea</p>
              </div>
            </div>
            <div className={styles.separateLand}>
              <div className={styles.sortList}>
                <p onClick={buttonOne} className={styles.numbers1ro}>
                  1
                </p>
                <p onClick={buttonTwo} className={styles.numbers2do}>
                  2
                </p>
                <p onClick={buttonThree} className={styles.numbers3ro}>
                  3
                </p>
                <p onClick={buttonFour} className={styles.numbers4to}>
                  4
                </p>
                <p onClick={buttonFive} className={styles.numbers5to}>
                  5
                </p>
              </div>
              <div className={animation ? styles.sortImage : styles.animation}>
                {products &&
                  products
                    .slice(productLand.base, productLand.top)
                    .map((item, index) => (
                      <Link
                        to={{
                          pathname: "/Details",
                          state: {
                            Id: item.Id,
                          },
                        }}
                      >
                        <img
                          key={item.Id}
                          className={styles.sortProducts}
                          src={item.image}
                          alt=""
                        />
                      </Link>
                    ))}
              </div>
            </div>
            <div className={styles.sortButton}>
              <Link style={{ textDecoration: "none" }} to="/Home">
                <div className={styles.buttonContainer}>
                  <p className={styles.buttonLand}>Discover Now</p>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal className={stylesLic.footer}>
          <div className={stylesLic.footerDiv}>
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >
              <img
                className={stylesLic.imageLic}
                alt="Licencia Creative Commons"
                src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
              />
            </a>
            <br />
            Esta obra está bajo una{" "}
            <a
              style={{ textDecoration: "none", color: "#231B1B" }}
              target="_blank"
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >
              Licencia Creative Commons Atribución-NoComercial-Compartir-Igual
              4.0 Internacional
            </a>
            .
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Landpage;
