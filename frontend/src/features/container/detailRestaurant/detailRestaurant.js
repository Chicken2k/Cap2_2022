import {
  Button,
  Carousel,
  DatePicker,
  Descriptions,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
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
  const [restaurant, setRestaurant] = useState({});
  const { Sider, Content } = Layout;
  const [dateBook, setDateBook] = useState(dayjs());
  const [amountBook, setAmountBook] = useState(1);
  const [noteBook, setNoteBook] = useState("");
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(restaurantData());
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
      location.state.id
    );
    setRestaurant(restaurantItem.data);
  };
  useEffect(() => {
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
    if (!dateBook || !amountBook || !noteBook || !userId || !restaurant.id)
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
    }
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
    <div>
      <Layout>
        <Content className="containerCarousel">
          <Container style={{ margin: 20 }}>
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
          </Container>

          <Container style={{ margin: 20 }}>
            <Descriptions title="Thông tin nhà hàng">
              <Descriptions.Item label="Tên nhà hàng">
                {restaurant.name}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {restaurant.description}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {restaurant.address}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại liên hệ:">
                {restaurant.phoneNumber}
              </Descriptions.Item>
            </Descriptions>
          </Container>

          {/* <div className="restaurant-information">
            <h3 class="box-title">
              <Comment></Comment>
            </h3>
          </div> */}
          <Container style={{ margin: 20 }}>
            <Comment></Comment>
            {/* <Danhgia></Danhgia> */}
          </Container>
        </Content>
        <Sider className="actionUser">
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
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  onChange={onChangeDateTime}
                  format="DD.MM.YYYY HH:mm"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                />

                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={amountBook}
                  onChange={onChangeNumber}
                />
                <TextArea rows={4} onChange={onChangeNoteBook} />
                <Button onClick={onClickButton}>Đặt bàn</Button>
              </div>
            </div>
          )}
        </Sider>
      </Layout>
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
            <textarea
              name="description"
              value={description}
              placeholder={description}
              onChange={onChange}
              rows="10"
              cols="50"
            />
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
        </form>
      </Modal>
      <Footer></Footer>
    </div>
  );
}
