import { Button, Col, Empty, message, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import JoditEditor from "jodit-react";
import cityApi from "../../../api/cityApi";
import foodApi from "../../../api/foodApi";
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
    files: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setcontent] = useState("");
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [city, setCity] = useState([]);
  const [food, setFood] = useState([]);
  const [changeFood, setChangeFood] = useState(0);
  const [changeCity, setChangeCity] = useState(0);
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
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state) => state.restaurants.restaurants.data
  );
  const history = useHistory();
  const actionResult = async () => {
    await dispatch(restaurantData());
  };
  const { name, description, address, phoneNumber, files } = restaurantInfor;
  restaurantInfor.description = content;
  useEffect(() => {
    getCity();
    getFood();
    actionResult();
  }, []);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const changeHandlerFile = async (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const onSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!changeCity || !changeFood || !restaurantInfor || !userId)
      message.error("Chưa điền đủ thông tin");
    else {
      const restaurantBody = {
        name: restaurantInfor.name,
        phoneNumber: restaurantInfor.phoneNumber,
        description: restaurantInfor.description,
        address: restaurantInfor.address,
        userId: userId,
      };
      let formData = new FormData();
      formData.append("name", restaurantInfor.name);
      formData.append("phoneNumber", restaurantInfor.phoneNumber);
      formData.append("description", restaurantInfor.description);
      formData.append("address", restaurantInfor.address);
      formData.append("userId", userId);
      formData.append("status", 0);
      formData.append("image", selectedFile);
      formData.append("foodId", changeFood);
      formData.append("cityId", changeCity);
      await restaurantApi.createRestaurant(formData);
      actionResult();
    }
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
  const handleChangeCity = async (value) => {
    setChangeCity(value);
  };
  const handleChangeFood = async (value) => {
    setChangeFood(value);
  };
  let listRestaurant;
  if (restaurants) {
    listRestaurant = restaurants.map((restaurant) => {
      return (
        <li className="restaurantItem" key={restaurant.id}>
          <Row>
            <Col span={18} push={6}>
              <p>Tên nhà hàng: {restaurant.name}</p>
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
                  src={restaurant.Images[0] ? restaurant?.Images[0]?.link :
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
                  }
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
              <Link to="#" disabled>
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
              {/* <textarea
                name="description"
                value={description}
                onChange={onChange}
                rows="10"
                cols="50"
              /> */}
              <JoditEditor
                value={content}
                tabIndex={1}
                onChange={(e) => setcontent(e)}
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

            <div class="form-group">
              <label for="formFileMultiple" class="form-label">
                Chọn ảnh nhà hàng
              </label>
              <input
                class="
                block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
                name="files"
                type="file"
                id="formFileMultiple"
                onChange={changeHandlerFile}
                multiple
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
            <ul>{listRestaurant?.length ? listRestaurant : <Empty></Empty>}</ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
