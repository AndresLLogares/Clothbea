import React, { useState, useEffect } from "react";
import styles from "../../scss/postcart/postcart.module.scss";
import { Reveal } from "react-awesome-reveal";
import { CURRENTUSER, GETCART, GETORDERS } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { TruckMonster } from "@styled-icons/fa-solid/TruckMonster";
import { Mailbox } from "@styled-icons/bootstrap/Mailbox";
import { City } from "@styled-icons/boxicons-solid/City";
import { Flag } from "@styled-icons/boxicons-regular/Flag";
import { Address } from "@styled-icons/entypo/Address";
import { DocumentOnePage } from "@styled-icons/fluentui-system-filled/DocumentOnePage";
import { RealEstate } from "@styled-icons/fluentui-system-filled/RealEstate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Canvas from "../canvas/canvas";
import "../../scss/login/login.scss";

const PostCart = (props) => {
  let URL = "https://clothbea.herokuapp.com";

  const search = props.location.search;

  const params = new URLSearchParams(search);

  const totalBuy = params.get("Total");

  const dispatch = useDispatch();

  let Id = 0;

  const orders = useSelector((state) => state.Clothbea.orders);

  const userCart = useSelector((state) => state.Clothbea.cart);

  const emailUser = localStorage.getItem("Email");

  const [loading, setLoading] = useState(true);

  const [dataUser, setDataUser] = useState({
    name: "",
    lastname: "",
    city: "",
    state: "",
    address: "",
    country: "",
    ZIP: "",
  });

  if (orders.length > 0) {
    let aux = orders.map((item) => item.Id);
    Id = Math.max.apply(null, aux) + 1;
  }

  useEffect(async () => {
    await dispatch(GETCART(emailUser));
    await dispatch(GETORDERS());
    !userCart ? setLoading(true) : setLoading(false);
  }, []);

  const handleInputChange = (event) => {
    setDataUser({ ...dataUser, [event.target.name]: event.target.value });
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    await axios
      .post(URL + "/Orders/createorder", {
        Id: Id,
        name: dataUser.name,
        lastname: dataUser.lastname,
        products: userCart,
        city: dataUser.city,
        country: dataUser.country,
        state: dataUser.state,
        address: dataUser.address,
        ZIP: parseInt(dataUser.ZIP),
        email: emailUser.toLocaleLowerCase(),
        total: totalBuy,
      })
      .then((response) => {
        if (response.data === "Order created") {
          toast.info(response.data);
          setTimeout(
            () =>
              (window.location.href = `https://clothbea.netlify.app/Payment?Id=${Id}`),
            1000
          );
        } else {
          toast.error(response.data);
        }
      });
    setDataUser({
      email: "",
      name: "",
      lastname: "",
      city: "",
      state: "",
      address: "",
      country: "",
      ZIP: "",
    });
  };

  return (
    <div className={styles.ContainerPost}>
      <Canvas />
      <ToastContainer autoClose={800} />
      <div className={styles.sortPost}>
        {loading ? (
          <div>
            <div className={styles.loader} />
          </div>
        ) : (
          <Reveal className={styles.zoom}>
            <div className={styles.boxPost}>
              <div className={styles.sortTitle}>
                <p className={styles.titlePost}>Shipping Information </p>
                <p className={styles.titlePost}>
                  {" "}
                  <TruckMonster className={styles.truck} />{" "}
                </p>
              </div>
              <div className={styles.sortForm}>
                <form onSubmit={handleSubmitChange} className={styles.form}>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="text"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="name"
                        value={dataUser.name}
                        required={true}
                      />
                      <span class="input__label">
                        {" "}
                        <DocumentOnePage className={styles.iconLabel} /> Name
                      </span>
                    </label>
                  </div>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="text"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="lastname"
                        value={dataUser.lastname}
                        required={true}
                      />
                      <span class="input__label">
                        {" "}
                        <DocumentOnePage className={styles.iconLabel} />
                        Last Name
                      </span>
                    </label>
                  </div>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="text"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="country"
                        value={dataUser.country}
                        required={true}
                      />
                      <span class="input__label">
                        <Flag className={styles.iconLabel} />
                        Country
                      </span>
                    </label>
                  </div>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="text"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="city"
                        value={dataUser.city}
                        required={true}
                      />
                      <span class="input__label">
                        {" "}
                        <City className={styles.iconLabel} />
                        City
                      </span>
                    </label>
                  </div>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="text"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="state"
                        value={dataUser.state}
                        required={true}
                      />
                      <span class="input__label">
                        <RealEstate className={styles.iconLabel} />
                        State
                      </span>
                    </label>
                  </div>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="text"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="address"
                        value={dataUser.address}
                        required={true}
                      />
                      <span class="input__label">
                        <Address className={styles.iconLabel} />
                        Address
                      </span>
                    </label>
                  </div>
                  <div className={styles.eachInput}>
                    <label class="input">
                      <input
                        class="input__field"
                        type="number"
                        placeholder=" "
                        onChange={handleInputChange}
                        name="ZIP"
                        value={dataUser.ZIP}
                        required={true}
                      />
                      <span class="input__label">
                        <Mailbox className={styles.iconLabel} />
                        ZIP
                      </span>
                    </label>
                  </div>
                  <div className={styles.productsBox}>
                    {userCart &&
                      userCart.map((item, index) => (
                        <div className={styles.eachProduct}>
                          <div className={styles.itemProduct}>
                            <p className={styles.pProduct}>{item.name}</p>
                          </div>
                          <div className={styles.itemProduct}>
                            <p className={styles.pProduct}>X {item.quantity}</p>
                          </div>
                          <div className={styles.itemProduct}>
                            <p className={styles.pProduct}>$ {item.newPrice}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className={styles.sortTotal}>
                    <p className={styles.TotalStyle}>Total: $ {totalBuy}</p>
                  </div>
                  <div className={styles.sortButton}>
                    <button type="submit" className={styles.buttonSend}>
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default PostCart;
