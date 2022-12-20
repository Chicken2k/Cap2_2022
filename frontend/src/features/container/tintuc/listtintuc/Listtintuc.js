import { Button, Col, Empty, Layout, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import newsApi from "../../../../api/news";
import restaurantApi from "../../../../api/restaurantApi";
import Footer from "../../trangchu/footer/Footer";
import Themtintuc from "../tintuc/Themtintuc";
import "./listtintuc.css";
const { Content } = Layout;

export default function Listtintuc() {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const [listNews, setListNews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const [newsInfor, setNewsinfor] = useState({
    content: "",
    restaurantId: 0,
  });
  const { content } = newsInfor;
  const getNews = async () => {
    const data = await newsApi.getRestaurantNews({ userId });
    setListNews(data.data);
  };
  const getRestarant = async () => {
    const data = await restaurantApi.getAll(userId);
    const listRestaurant = [];
    data.data.map((item) => {
      const obj = {
        id: item.id,
        name: item.name,
      };
      listRestaurant.push(obj);
    });
    setRestaurants(listRestaurant);
    setRestaurantId(listRestaurant[0]?.id);
  };
  useEffect(() => {
    getNews();
    getRestarant();
  }, []);

  const openDetailRestaurantPage = () => {};

  const openModal = () => {
    console.log("wtf");
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onOk = () => {
    setIsModalVisible(false);
  };
  const onSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const newsBody = {
      content: newsInfor.content,
      userId: userId,
      restaurantId: newsInfor.restaurantId,
    };
    await newsApi.createNews(newsBody);
    getNews();
  };
  const onChange = (e) => {
    setNewsinfor({
      ...newsInfor,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeRestaurant = (value) => {
    setRestaurantId(value.value);
  };
  const onClickLink = (e) => {
    console.log(e.target);
  };

  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      var gio = e.substr(11, 2);
      var phut = e.substr(14, 2);
      return ngay + "/" + thang + "/" + nam + " " + gio + ":" + phut;
    }
  };
  let listData;
  if (listNews) {
    listData = listNews.map((restaurant) => {
      return (
        <Layout>
          <Content>
            <div className="news-box" onClick={onClickLink}>
              <li className="restaurantItem" value={restaurant.id}>
                <Link
                  to={{
                    pathname: `/news/detail/${restaurant.id}`,
                    state: {
                      id: restaurant.id,
                    },
                  }}
                >
                  <Row>
                    <Col span={18} push={6}>
                      <p style={{ fontSize: 20 }}>
                        Tên nhà hàng: {restaurant?.Restaurant?.name}
                      </p>
                      <p style={{ fontSize: 20 }}>
                        Địa chỉ: {restaurant?.Restaurant?.address}
                      </p>
                      <p style={{ fontSize: 20 }}>
                        Ngày đăng: {formatdate(restaurant?.createdAt)}
                      </p>
                      <p style={{ fontSize: 20 }}>
                        Tình trạng:{" "}
                        {restaurant?.status
                          ? "Đã được đăng vào " +
                            formatdate(restaurant?.updatedAt)
                          : "Đang chờ duyệt từ admin"}
                      </p>
                    </Col>
                    <Col span={6} pull={18}>
                      <div className="image-container">
                        <img
                          src={
                            restaurant?.image ||
                            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
                          }
                          alt="restaurant"
                          width="500"
                          height="600"
                        />
                      </div>
                    </Col>
                  </Row>
                </Link>
              </li>
            </div>
          </Content>
        </Layout>
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
          <form action="" method="get" onSubmit={onSubmit}>
            <div>
              <label>Áp dụng cho nhà hàng</label>
              <Select
                labelInValue
                defaultValue={{
                  value: restaurants[0]?.id,
                  label: restaurants[0]?.name,
                }}
                style={{ width: 120 }}
                onChange={handleChangeRestaurant}
                options={restaurants.map((restaurant) => {
                  return {
                    value: restaurant.id,
                    label: restaurant.name,
                  };
                })}
              />
            </div>
          </form>
          <Themtintuc restaurantId={restaurantId} userId={userId} />
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
          
            <div className="CoChu">Danh sách tin tức của bạn</div>
            <Button type="primary" onClick={openModal}>
              Thêm tin tức
            </Button>
            <ul>{listData?.length ? listData : <Empty></Empty>}</ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
