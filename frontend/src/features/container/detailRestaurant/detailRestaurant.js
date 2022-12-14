import {
  Button,
  Carousel,
  DatePicker,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import renderHTML from "react-render-html";
import { useHistory, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import cityApi from "../../../api/cityApi";
import foodApi from "../../../api/foodApi";
import imageApi from "../../../api/imageApi";
import orderApi from "../../../api/orderApi";
import restaurantApi from "../../../api/restaurantApi";
import Comment from "../comment/comment";

import { restaurantData } from "../manageRestaurant/restaurantSlice";
import Footer from "../trangchu/footer/Footer";
import "./detailRestaurant.css";
const { TextArea } = Input;
dayjs.extend(customParseFormat);
const format = "HH:mm";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function DetailRestaurant() {
  const location = useLocation();
  const [restaurant, setRestaurant] = useState({
    description: "<p>Hello</p>",
  });
  const { Sider, Content } = Layout;
  const [dateBook, setDateBook] = useState(dayjs());
  const [content, setcontent] = useState("");
  const [amountBook, setAmountBook] = useState(1);
  const [noteBook, setNoteBook] = useState("");
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [city, setCity] = useState([]);
  const [food, setFood] = useState([]);
  const [changeFood, setChangeFood] = useState(0);
  const [changeCity, setChangeCity] = useState(0);
  const [images, setListImage] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(restaurantData());
  };

  const getCity = async () => {
    const data = await cityApi.getAll();
    setCity(data.data);
    return data.data;
  };
  const getFood = async () => {
    const data = await foodApi.getAll();
    setFood(data.data);
    return data.data;
  };
  const [restaurantInfor, setRestaurantInfor] = useState({
    name: "",
    description: "",
    address: "",
    phoneNumber: "",
  });
  restaurantInfor.description = content;
  const { name, description, address, phoneNumber } = restaurantInfor;
  const getRestaurant = async () => {
    const restaurantItem = await restaurantApi.getRestaurantById(
      location?.state?.id
    );
    setRestaurant(restaurantItem.data);
    const listImage = await imageApi.getAll(location?.state?.id);
    setListImage(listImage.data);
  };
  useEffect(() => {
    getCity();
    getFood();
    getRestaurant();
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setUserRole(userRole);
    setUserId(userId);
    onChangeDateTime();
    onChangeNumber(1);
  }, [location]);

  const openModalDelete = (restaurantId) => {
    setRestaurantId(restaurantId);
    setIsModalVisibleDelete(true);
  };
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
  };
  const onOkDelete = async () => {
    await restaurantApi.deleteRestaurant(restaurantId);
    actionResult();
    setIsModalVisibleDelete(false);
    history.push("/restaurant-information");
  };
  const openModalUpdate = (restaurantId) => {
    setRestaurantId(restaurantId);
    setIsModalVisibleUpdate(true);
  };
  const handleCancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };

  const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
  };

  const onOkUpdate = async () => {
    let restaurantBody = {};
    const { name, address, description, phoneNumber } = restaurantInfor;
    if (
      !restaurantId ||
      !name ||
      !address ||
      !description ||
      !phoneNumber ||
      !changeCity ||
      !changeFood
    )
      message.error("B???n ch??a nh???p ????? th??ng tin");
    else {
      if (restaurantInfor.name !== "") {
        restaurantBody.name = restaurantInfor.name;
      }
      if (restaurantInfor.address !== "") {
        restaurantBody.address = restaurantInfor.address;
      }
      if (restaurantInfor.description !== "") {
        restaurantBody.description = restaurantInfor.description;
      }
      if (restaurantInfor.phoneNumber !== "") {
        restaurantBody.phoneNumber = restaurantInfor.phoneNumber;
      }
      restaurantBody.foodId = changeFood;
      restaurantBody.cityId = changeCity;
      await restaurantApi.updateRestaurant(restaurantId, restaurantBody);
      actionResult();
      getRestaurant();
      setIsModalVisibleUpdate(false);
    }
  };
  const onChange = (e) => {
    setRestaurantInfor({
      ...restaurantInfor,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeNumber = (value) => {
    setAmountBook(value);
  };

  const onChangeDateTime = (value, dateString) => {
    setDateBook(dateString);
  };
  const onChangeNoteBook = (event) => {
    setNoteBook(event.target.value);
  };
  const onClickButton = async () => {
    if (!userId) message.error("Ch??a ????ng nh???p");
    else if (!dateBook || !amountBook || !noteBook || !restaurant.id)
      message.error("Ch??a ??i???n ?????y ????? th??ng tin");
    else {
      const data = await orderApi.postOrder({
        date: dateBook,
        quantity: amountBook,
        note: noteBook,
        userId,
        restaurantId: restaurant.id,
        status: 0,
      });
      history.push("/thongtin/0");
    }
  };
  const handleChangeCity = async (value) => {
    setChangeCity(value);
  };
  const handleChangeFood = async (value) => {
    setChangeFood(value);
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(0, 10),
  });
  let renderImage = images.map((item) => {
    return (
      <div style={contentStyle}>
        <img
          src={
            item
              ? item
              : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
          }
          alt="restaurant"
          width="800"
          height="460"
        />
      </div>
    );
  });
  return (
    <div className="all">
      {userRole === "customer" && !restaurant?.status ? (
        <p>403 Authorized</p>
      ) : (
        <Layout>
          <Content className="containerCarousel">
            <Container style={{ margin: 20 }}>
              <Carousel autoplay>{renderImage}</Carousel>
            </Container>
            <Container className="Thongtinnhahangcolor">
              <div className="row card_products justify-content-center">
                <div className="col-7 col-sm-8 col-md-8 col-lg-5 ">
                  <Carousel autoplay>{renderImage}</Carousel>
                </div>
                <div
                  className="card_products_name body_cart col-5 col-sm-4 col-md-4 col-lg-7 "
                  style={{ padding: 30 }}
                >
                  <p>
                    <b className="textProducts">{restaurant?.name}</b>
                  </p>

                  <span className="iStar">
                    {userRole === "restaurant" ? (
                      <div>
                        <Button
                          type="primary"
                          className="btn-restaurant"
                          onClick={() => openModalDelete(restaurant.id)}
                        >
                          ????ng c???a
                        </Button>
                        <Button
                          type="primary"
                          className="btn-restaurant"
                          onClick={() => openModalUpdate(restaurant.id)}
                        >
                          S???a
                        </Button>
                      </div>
                    ) : (
                      <div className="book-edit-restaurant">
                        <h2>?????t ch??? nh?? h??ng</h2>
                        <div className="form-dat-ban">
                          <label for="date">Ng??y ?????t : </label>
                          {/* <br></br> */}
                          <DatePicker
                            showTime={{ format: "HH:mm" }}
                            onChange={onChangeDateTime}
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            id="date"
                          />
                          <br />
                          <label for="html">S??? l?????ng ?????t : </label>
                          <InputNumber
                            min={1}
                            max={10}
                            defaultValue={amountBook}
                            onChange={onChangeNumber}
                          />

                          <br></br>
                          <a>Y??u c???u th??m : </a>
                          <TextArea rows={4} onChange={onChangeNoteBook} />
                          <button
                            className="custom-btn btn-5"
                            onClick={onClickButton}
                          >
                            <span>?????t b??n</span>
                          </button>
                          {/* <Button className="button--red custom-btn btn-6" onClick={onClickButton}>
                          ?????t b??n
                        </Button> */}
                        </div>
                      </div>
                    )}
                  </span>
                  <span className="card__rate">S??? ng?????i ???? ????nh gi?? : </span>
                  <span className="card__rate">4.6</span>
                  <span className="card__total">(11.597 ????nh gi??)</span>
                  <p>
                    {" "}
                    {/* <button
                className="button--red"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button> */}
                  </p>
                </div>
                <div className="Thongtinnhahangcolor">
                  <hr />
                  <div className="productinfo_thongtin body_cart">
                    <div className="container">
                      <h5 className="textLMD  ">Th??ng tin nh?? h??ng</h5>
                      <table className="table-fill textDT ">
                        <tbody className="table-hover table-body">
                          <tr>
                            <td className="text-left">T??n nh?? h??ng : </td>
                            <td className="text-left"> {restaurant.name}</td>
                          </tr>
                          <tr>
                            <td className="text-left">?????a ch??? :</td>
                            <td className="text-left"> {restaurant.address}</td>
                          </tr>
                          <tr>
                            <td className="text-left">S??? ??i???n tho???i : </td>
                            <td className="text-left">
                              {" "}
                              {restaurant.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left">Lo???i h??nh qu??n : </td>
                            {/* <td className="text-left">{product.paper}</td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className=" body_cart">
                      <h5 className="textLMD mtsp">M?? t??? nh?? h??ng</h5>
                      <p className="textDT">
                        {renderHTML(restaurant.description)}
                      </p>
                      <div className="d-flex justify-content-end my-3"></div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="textLMD mtsp">B???n ????? & ?????a ??i???m</h5>
                      <iframe
                        className="mapgg"
                        src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d7670.102138707229!2d108.2537076!3d16.010856800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d16.0108547!2d108.2537076!4m3!3m2!1d16.010887699999998!2d108.2537291!5e0!3m2!1sen!2s!4v1670988135220!5m2!1sen!2s"
                        width={1127}
                        height={300}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div>
                      <hr />
                      <Comment></Comment>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            {/* <div className="restaurant-information">
            <h3 class="box-title">
              <Comment></Comment>
            </h3>
          </div> */}
          </Content>
        </Layout>
      )}
      <Modal
        title="B???n c?? mu???n ????ng c???a nh?? h??ng n??y?"
        visible={isModalVisibleDelete}
        onCancel={handleCancelDelete}
        onOk={() => onOkDelete(restaurant.id)}
      ></Modal>
      <Modal
        title="S???a th??ng tin nh?? h??ng"
        visible={isModalVisibleUpdate}
        onCancel={handleCancelUpdate}
        onOk={() => onOkUpdate(restaurant.id)}
      >
        <form>
          <div>
            <label className="labelInput">T??n nh?? h??ng</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder={restaurant?.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="labelInput">M?? t???</label>
            <JoditEditor
              value={content}
              tabIndex={1}
              onChange={(e) => setcontent(e)}
            />
          </div>
          <div>
            <label className="labelInput">?????a ch???</label>
            <input
              type="text"
              name="address"
              value={address}
              placeholder={restaurant?.address}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="labelInput">S??? ??i???n tho???i</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              placeholder={restaurant?.phoneNumber}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="labelInput">Lo???i th???c ??n</label>
            <Select
              style={{ width: 120 }}
              onChange={handleChangeFood}
              options={food?.map((food) => {
                return {
                  value: food.id,
                  label: food.name,
                };
              })}
            />
          </div>
          <div>
            <label className="labelInput">Th??nh ph???</label>
            <Select
              style={{ width: 120 }}
              onChange={handleChangeCity}
              options={city?.map((city) => {
                return {
                  value: city.id,
                  label: city.name,
                };
              })}
            />
          </div>
        </form>

        <div className="google-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245368.20484126982!2d108.07812645!3d16.071809050000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2sDa%20Nang!5e0!3m2!1sen!2s!4v1671276462656!5m2!1sen!2s"></iframe>
        </div>
      </Modal>
      <Footer></Footer>
    </div>
  );
}
