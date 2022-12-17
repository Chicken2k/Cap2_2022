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
  const { name, description, address, phoneNumber } = restaurantInfor;
  const getRestaurant = async () => {
    const restaurantItem = await restaurantApi.getRestaurantById(
      location?.state?.id
    );
    setRestaurant(restaurantItem.data);
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
    if (!userId) message.error("Chưa đăng nhập");
    else if (!dateBook || !amountBook || !noteBook || !restaurant.id)
      message.error("Chưa điền đầy đủ thông tin");
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
  return (
    <div className="all">
      {userRole === "customer" && !restaurant?.status ? (
        <p>403 Authorized</p>
      ) : (
        <Layout>
          <Content className="containerCarousel">
            <Container className="Thongtinnhahangcolor">
              <div className="row card_products justify-content-center">
                <div className="col-7 col-sm-8 col-md-8 col-lg-5 ">
                  <Carousel autoplay>
                    <div style={contentStyle}>
                      <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
                        alt="restaurant"
                        width="300"
                        height="160"
                      />
                    </div>
                    <div style={contentStyle}>
                      <img
                        src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt="restaurant"
                        width="300"
                        height="160"
                      />
                    </div>
                    <div style={contentStyle}>
                      <img
                        src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        alt="restaurant"
                        width="300"
                        height="160"
                      />
                    </div>
                    <div style={contentStyle}>
                      <img
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        alt="restaurant"
                        width="300"
                        height="160"
                      />
                    </div>
                  </Carousel>
                </div>
                <div
                  className="card_products_name body_cart col-5 col-sm-4 col-md-4 col-lg-7 "
                  style={{ padding: 30 }}
                >
                  <p>
                    <b className="textProducts">{restaurant.name}</b>
                  </p>

                  <span className="iStar">
                    {userRole === "restaurant" ? (
                      <div>
                        <Button
                          type="primary"
                          className="btn-restaurant"
                          onClick={() => openModalDelete(restaurant.id)}
                        >
                          Đóng cửa
                        </Button>
                        <Button
                          type="primary"
                          className="btn-restaurant"
                          onClick={() => openModalUpdate(restaurant.id)}
                        >
                          Sửa
                        </Button>
                      </div>
                    ) : (
                      <div className="book-edit-restaurant">
                        <h2>Đặt chỗ nhà hàng</h2>
                        <div className="form-dat-ban">
                          <label for="date">Ngày đặt : </label>
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
                          <label for="html">Số lượng đặt : </label>
                          <InputNumber
                            min={1}
                            max={10}
                            defaultValue={amountBook}
                            onChange={onChangeNumber}
                          />

                          <br></br>
                          <a>Yêu cầu thêm : </a>
                          <TextArea rows={4} onChange={onChangeNoteBook} />
                          <button
                            className="custom-btn btn-5"
                            onClick={onClickButton}
                          >
                            <span>Đặt bàn</span>
                          </button>
                          {/* <Button className="button--red custom-btn btn-6" onClick={onClickButton}>
                          Đặt bàn
                        </Button> */}
                        </div>
                      </div>
                    )}
                  </span>
                  <span className="card__rate">Số người đã đánh giá : </span>
                  <span className="card__rate">4.6</span>
                  <span className="card__total">(11.597 Đánh giá)</span>
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
                      <h5 className="textLMD  ">Thông tin nhà hàng</h5>
                      <table className="table-fill textDT ">
                        <tbody className="table-hover table-body">
                          <tr>
                            <td className="text-left">Tên nhà hàng : </td>
                            <td className="text-left"> {restaurant.name}</td>
                          </tr>
                          <tr>
                            <td className="text-left">Địa chỉ :</td>
                            <td className="text-left"> {restaurant.address}</td>
                          </tr>
                          <tr>
                            <td className="text-left">Số điện thoại : </td>
                            <td className="text-left">
                              {" "}
                              {restaurant.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left">Loại hình quán : </td>
                            {/* <td className="text-left">{product.paper}</td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className=" body_cart">
                      <h5 className="textLMD mtsp">Mô tả nhà hàng</h5>
                      <p className="textDT">
                        {renderHTML(restaurant.description)}
                      </p>
                      <div className="d-flex justify-content-end my-3"></div>
                    </div>
                    <hr />
                    <div>
                      <h5 className="textLMD mtsp">Bản Đồ & Địa điểm</h5>
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
        title="Bạn có muốn đóng cửa nhà hàng này?"
        visible={isModalVisibleDelete}
        onCancel={handleCancelDelete}
        onOk={() => onOkDelete(restaurant.id)}
      ></Modal>
      <Modal
        title="Sửa thông tin nhà hàng"
        visible={isModalVisibleUpdate}
        onCancel={handleCancelUpdate}
        onOk={() => onOkUpdate(restaurant.id)}
      >
        <form>
          <div>
            <label className="labelInput">Tên nhà hàng</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder={name}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="labelInput">Mô tả</label>
            {/* <textarea
              name="description"
              value={description}
              placeholder={description}
              onChange={onChange}
              rows="10"
              cols="50"
            /> */}
            <JoditEditor value={description} tabIndex={1} onChange={onChange} />
          </div>
          <div>
            <label className="labelInput">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={address}
              placeholder={address}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="labelInput">Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              placeholder={phoneNumber}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="labelInput">Loại thức ăn</label>
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
            <label className="labelInput">Thành phố</label>
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
          <iframe
            src="https://www.google.com/maps/embed?pb="
            width="600"
            height="450"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
        </div>
      </Modal>
      <Footer></Footer>
    </div>
  );
}
