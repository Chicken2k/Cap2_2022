import { Button, Col, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import adminApi from "../../../../api/admin";
import "./tintuc.css";
const { Content } = Layout;

function ManageNews() {
  const [restaurants, setRestaurants] = useState([]);
  let listRestaurant;
  const history = useHistory();
  const getRestaurants = async () => {
    const listRestaurant = await adminApi.getAllNews();
    if (listRestaurant) setRestaurants(listRestaurant.data);
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

  const onClickLink = (e) => {
    console.log(e.target);
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  const switchDetailRestaurantPage = async (restaurantId) => {
    await adminApi.updateNews(restaurantId);
    getRestaurants();
  };
  const cancelNew = async (restaurantId) => {
    await adminApi.deleteNews(restaurantId);
    getRestaurants();
  };
  if (restaurants) {
    listRestaurant = restaurants.map((item) => {
      return (
        <div className="containerItem">
          <div className="containerImage">
            <img src="" />
          </div>
          <div className="containerContent">
            <Layout>
              <Content>
                <div className="news-box" onClick={onClickLink}>
                  <Link
                    to={{
                      pathname: `/news/detail/${item.id}`,
                      state: {
                        id: item.id,
                      },
                    }}
                  >
                    <Row>
                      <Col span={18} push={6}>
                        <p style={{ fontSize: 20 }}>
                          Tên nhà hàng: {item?.Restaurant?.name}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          Địa chỉ: {item?.Restaurant?.address}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          Ngày đăng: {formatdate(item?.createdAt)}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          Tình trạng:{" "}
                          {item?.status
                            ? "Đã được đăng vào " + formatdate(item?.updatedAt)
                            : "Đang chờ duyệt từ admin"}
                        </p>
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
                  </Link>
                </div>
              </Content>
            </Layout>
            <Button
              type="primary"
              onClick={() => switchDetailRestaurantPage(item.id)}
            >
              Duyệt
            </Button>
            <Button type="primary" onClick={() => cancelNew(item.id)}>
              Từ chối
            </Button>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      {restaurants === 0 ? (
        <div>Danh sách trống</div>
      ) : (
        <div>{listRestaurant}</div>
      )}
    </div>
  );
}

ManageNews.propTypes = {};

export default ManageNews;
