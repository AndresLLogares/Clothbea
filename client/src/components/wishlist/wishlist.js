import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GETWISH, REMOVEWISH } from "../actions";
import { Reveal } from "react-awesome-reveal";
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import SadStar from "../images/SadStar.gif";
import { Link } from "react-router-dom";
import styles from "../../scss/wishlist/wishlist.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Canvas from "../canvas/canvas";

const WishList = () => {
  const emailUser = localStorage.getItem("Email");

  const nameUser = localStorage.getItem("UserName");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const wishes = useSelector((state) => state.Clothbea.wishlist);

  useEffect(async () => {
    await dispatch(GETWISH(emailUser));
    setLoading(false);
  });

  const removeWish = async (Id) => {
    await dispatch(
      REMOVEWISH({
        email: emailUser,
        Id: Id,
      })
    );
    setTimeout(async () => await dispatch(GETWISH(emailUser)), 500);
    toast.success("Product removed of your wishlist");
  };

  return (
    <div className={styles.containerWish}>
      <Canvas />
      <div className={styles.sortWish}>
        <ToastContainer autoClose={800} limit={2} />
        <Reveal className={styles.zoom}>
          {loading ? (
            <div>
              <div className={styles.loader} />
            </div>
          ) : (
            <div className={styles.boxWish}>
              <div className={styles.sortTitle}>
                <div className={styles.eachTitle}>
                  <p className={styles.titleWish}>
                    This is your wishlist {nameUser}{" "}
                  </p>
                </div>
                <div className={styles.eachTitle}>
                  <p className={styles.titleWish}>
                    <StarFill className={styles.starWish} />{" "}
                  </p>
                </div>
              </div>
              <div className={styles.sortWishes}>
                {wishes.length !== 0 ? (
                  wishes.map((item) => (
                    <div className={styles.cartWish}>
                      <div className={styles.sortTitleWish}>
                        <p className={styles.titleCart}>{item.name}</p>
                      </div>
                      <div className={styles.sortButton}>
                        <button
                          className={styles.buttonRemove}
                          onClick={() => removeWish(item.Id)}
                        >
                          Remove <SquaredCross className={styles.cross} />{" "}
                        </button>
                      </div>
                      <Link
                        to={{
                          pathname: "/Details",
                          state: {
                            Id: item.Id,
                          },
                        }}
                      >
                        <div className={styles.sortImageCart}>
                          <img
                            className={styles.imageCart}
                            src={item.image}
                            alt=""
                          />
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className={styles.sortNowish}>
                    <div className={styles.sortTitle2}>
                      <p className={styles.titleWish2}>
                        You have not added products in your wishlist yet
                      </p>
                    </div>
                    <div className={styles.sortSad}>
                      <img className={styles.imageSad} src={SadStar} alt="" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
};

export default WishList;
