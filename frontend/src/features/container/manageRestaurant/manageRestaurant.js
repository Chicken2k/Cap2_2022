import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import restaurantApi from "../../../api/restaurantApi";
import Footer from "../trangchu/footer/Footer";
import "./checkactive.js";
import "./manageRestaurant.css";
import { restaurantData } from "./restaurantSlice";

export default function Listtour() {
  const [restaurantInfor, setRestaurantInfor] = useState({
    name: "",
    description: "",
    address: "",
    phoneNumber: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state) => state.restaurants.restaurants.data
  );
  const history = useHistory();
  const actionResult = async () => {
    await dispatch(restaurantData());
  };
  const { name, description, address, phoneNumber } = restaurantInfor;
  useEffect(() => {
    actionResult();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const onSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const restaurantBody = {
      name: restaurantInfor.name,
      phoneNumber: restaurantInfor.phoneNumber,
      description: restaurantInfor.description,
      address: restaurantInfor.address,
      userId: userId,
    };
    await restaurantApi.createRestaurant(restaurantBody);
    actionResult();
  };
  const onOk = () => {
    onSubmit();
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setRestaurantInfor({
      ...restaurantInfor,
      [e.target.name]: e.target.value,
    });
  };

  const openDetailRestaurantPage = (restaurantId) => {
    history.push({
      pathname: `/detail-restaurant/${restaurantId}`,
      state: { id: restaurantId },
    });
  };
  let listRestaurant;
  if (restaurants) {
    listRestaurant = restaurants.map((restaurant) => {
      return (
        <li className="restaurantItem" key={restaurant.id}>
          <Row>
            <Col span={18} push={6}>
              <p>Tên nhà hàng: {restaurant.name}</p>
              <p>{restaurant.description}</p>
              <p>Địa chỉ: {restaurant.address}</p>
              <p>Số điện thoại đặt bàn: {restaurant.phoneNumber}</p>
              <Button
                type="primary"
                className="btn-restaurant"
                onClick={() => openDetailRestaurantPage(restaurant.id)}
              >
                Xem chi tiết
              </Button>
            </Col>
            <Col span={6} pull={18}>
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
                  alt="restaurant"
                  width="500"
                  height="600"
                />
              </div>
            </Col>
          </Row>
        </li>
      );
    });
  }
  return (
    <div id="list-tour">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/list-tour" disabled>
                Thông tin nhà hàng
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <Modal
          title="Thêm nhà hàng"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={onOk}
        >
          <form onSubmit={onSubmit}>
            <div>
              <label className="labelInput">Tên nhà hàng</label>
              <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div>
              <label className="labelInput">Mô tả</label>
              <textarea
                name="description"
                value={description}
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
                onChange={onChange}
              />
            </div>
            <div>
              <label className="labelInput">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal>
        {restaurants === 0 ? (
          <div>
            <div className="noRestaurant">
              <p className="message">Bạn chưa có nhà hàng nào</p>
              <Button type="primary" onClick={openModal}>
                Thêm nhà hàng
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button type="primary" onClick={openModal}>
              Thêm nhà hàng
            </Button>
            <div>Danh sách nhà hàng của bạn</div>
            <ul>{listRestaurant}</ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
