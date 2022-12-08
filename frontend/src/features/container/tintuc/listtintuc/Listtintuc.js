import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Col, Row, Modal } from "antd";

import "./listtintuc.css";
import Footer from "../../trangchu/footer/Footer";
import newsApi from "../../../../api/news";
import restaurantApi from "../../../../api/restaurantApi";

export default function Listtintuc() {
  const [ listNews, setListNews ] = useState([]);
  const [ restaurants, setRestaurants] = useState([]);
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ newsInfor, setNewsinfor ] = useState({
    content: "",
    restaurantId: 0
  })
  const { content } = newsInfor; 
  const getNews = async () => {
    const data = await newsApi.getAll();
    setListNews(data.data);
  }
  const getRestarant = async () => {
    const userId = localStorage.getItem('userId');
    const data = await restaurantApi.getAll(userId);
    const listRestaurant = [];
    data.data.map((item ) => {
      const obj = {
        id: item.id,
        name: item.name
      };
      listRestaurant.push(obj);
    })
    setRestaurants(listRestaurant);
  }
  useEffect(()=> {
    getNews();
    getRestarant();
  }, [])

  const openDetailRestaurantPage = () => {

  };

  const openModal = () => {
    console.log('wtf');
    setIsModalVisible(true);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }
  const onOk = () => {
    setIsModalVisible(false);
  }
  const onSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const newsBody = {
      content: newsInfor.content,
      userId: userId,
      restaurantId: newsInfor.restaurantId
    }
    await newsApi.createNews(newsBody);
    getNews();
  }
  const onChange = (e) => {
    setNewsinfor({
      ...newsInfor,
      [e.target.name]: e.target.value,
    });
  };
  
  let listData;
  if (listNews) {
    listData = listNews.map((restaurant) => {
      return (
        <li className="restaurantItem" key={restaurant.id}>
          <Row>
            <Col span={18} push={6}>
              <p>Tên nhà hàng: {restaurant.name}</p>
              <p>{restaurant.content}</p>
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
                Danh sách tin tức
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <Modal
          title="Thêm tin tức"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={onOk}
        >
          <form onSubmit={onSubmit}>
            <div>
              <label>Áp dụng cho nhà hàng</label>
              <select name="restaurantId" value={''}>
                {restaurants.map((e, key) => {
                    return <option key={key} value={e.id} onChange={onChange}>{e.name}</option>;
                })}
            </select>
            </div>
            <div>
              <label className="labelInput">Nội dung</label>
              <textarea
                name="description"
                value={content}
                onChange={onChange}
                rows="10"
                cols="50"
              />
            </div>
          </form>
        </Modal>
        {listNews === 0 ? (
          <div>
            <div className="noRestaurant">
              <p className="message">Danh sách tin tức trống</p>
              <Button type="primary" onClick={openModal}>
                Thêm tin tức
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button type="primary" onClick={openModal}>
              Thêm tin tức
            </Button>
            <div>Danh sách nhà hàng của bạn</div>
            <ul>{listData}</ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
