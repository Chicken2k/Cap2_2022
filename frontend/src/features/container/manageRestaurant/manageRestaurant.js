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
    const { name, description, address, phoneNumber } = restaurantInfor;
    if (
      !changeCity ||
      !changeFood ||
      !name ||
      !description ||
      !address ||
      !phoneNumber ||
      !userId
    )
      message.error("Ch??a ??i???n ????? th??ng tin");
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
              <p>T??n nh?? h??ng: {restaurant.name}</p>
              <p>?????a ch???: {restaurant.address}</p>
              <p>S??? ??i???n tho???i ?????t b??n: {restaurant.phoneNumber}</p>
              <Button
                type="primary"
                className="btn-restaurant"
                onClick={() => openDetailRestaurantPage(restaurant.id)}
              >
                Xem chi ti???t
              </Button>
            </Col>
            <Col span={6} pull={18}>
              <div className="image-container">
                <img
                  src={
                    restaurant.Images[0]
                      ? restaurant?.Images[0]?.link
                      : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
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
                <i className="fas fa-home mr-2"></i>Trang ch???
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#" disabled>
                Th??ng tin nh?? h??ng
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <Modal
          title="Th??m nh?? h??ng"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={onOk}
        >
          <form onSubmit={onSubmit}>
            <div>
              <label className="labelInput">T??n nh?? h??ng</label>
              <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div>
              <label className="labelInput">M?? t???</label>
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
              <label className="labelInput">?????a ch???</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="labelInput">S??? ??i???n tho???i</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
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

            <div class="form-group">
              <label for="formFileMultiple" class="form-label">
                Ch???n ???nh nh?? h??ng
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
              <p className="message">B???n ch??a c?? nh?? h??ng n??o</p>
              <Button type="primary" onClick={openModal}>
                Th??m nh?? h??ng
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button type="primary" onClick={openModal}>
              Th??m nh?? h??ng
            </Button>
            <div>Danh s??ch nh?? h??ng c???a b???n</div>
            <ul>{listRestaurant?.length ? listRestaurant : <Empty></Empty>}</ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
