import { Button, Col, Empty, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import adminApi from "../../../../api/admin";
import "./tintuc.css";
const { Content } = Layout;

function ManageRestaurantRoleAdmin() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentRestaurant, setCurrentRestaurants] = useState([]);

  let listRestaurant, listRestaurants;
  const history = useHistory();
  const getRestaurants = async () => {
    const listRestaurant = await adminApi.getAll();
    if (listRestaurant) setRestaurants(listRestaurant.data);
  };

  const getAllRestaurantManage = async () => {
    const data = await adminApi.getManageRestaurant();
    setCurrentRestaurants(data.data);
  };
  useEffect(() => {
    getRestaurants();
    getAllRestaurantManage();
  }, []);
  const switchDetailRestaurantPage = async (restaurantId) => {
    await adminApi.updateRestaurant(restaurantId, { status: true });
    getRestaurants();
    getAllRestaurantManage();
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
  const cancelNew = async (restaurantId) => {
    await adminApi.deleteRestaurant(restaurantId);
    getRestaurants();
    getAllRestaurantManage();
  };
  if (currentRestaurant.length) {
    listRestaurants = currentRestaurant?.map((item) => {
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
                      pathname: `/detail-restaurant/${item.id}`,
                      state: {
                        id: item.id,
                      },
                    }}
                  >
                    <Row>
                      <Col span={18} push={6}>
                        <p style={{ fontSize: 20 }}>
                          Tên nhà hàng: {item?.name}
                        </p>
                        <p style={{ fontSize: 20 }}>Địa chỉ: {item?.address}</p>
                        <p style={{ fontSize: 20 }}>
                          Số điện thoại: {item?.phoneNumber}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          Chủ nhà hàng: {item?.User?.name}
                        </p>
                      </Col>
                      <Col span={6} pull={18}>
                        <div className="image-container">
                          <img
                            src={
                              item?.Images[0]?.link
                                ? item?.Images[0]?.link
                                : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
                            }
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
            {item?.status ? (
              ""
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={() => switchDetailRestaurantPage(item.id)}
                >
                  Duyệt
                </Button>
                <Button type="primary" onClick={() => cancelNew(item.id)}>
                  Từ chối
                </Button>
              </>
            )}
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      {restaurants.length === 0 && currentRestaurant.length === 0 ? (
        <Empty></Empty>
      ) : (
        <div>
          <h3>Danh sách các nhà hàng hiện tại</h3>
          {listRestaurants}
        </div>
      )}
    </div>
  );
}

ManageRestaurantRoleAdmin.propTypes = {};

export default ManageRestaurantRoleAdmin;
