import { Button, Col, Empty, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import adminApi from "../../../../api/admin";
import "./tintuc.css";
const { Content } = Layout;

function ManageNews() {
  const [restaurants, setRestaurants] = useState([]);
  let listRestaurant, listNews;
  const history = useHistory();
  const getRestaurants = async () => {
    const listRestaurant = await adminApi.getAllNews();
    if (listRestaurant) setRestaurants(listRestaurant.data);
  };
  const [currentNews, setCurrentNews] = useState([]);

  const getAllNewManage = async () => {
    const data = await adminApi.getManageNew();
    setCurrentNews(data.data);
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
    getAllNewManage();
  }, []);
  const switchDetailRestaurantPage = async (restaurantId) => {
    await adminApi.updateNews(restaurantId);
    getRestaurants();
    getAllNewManage();
  };
  const cancelNew = async (restaurantId) => {
    await adminApi.deleteNews(restaurantId);
    getRestaurants();
    getAllNewManage();
  };
  if (currentNews.length) {
    listNews = currentNews?.map((item) => {
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
                          T??n nh?? h??ng: {item?.Restaurant?.name}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          ?????a ch???: {item?.Restaurant?.address}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          Ch??? nh?? h??ng: {item?.User?.name}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          Ng??y ????ng: {formatdate(item?.createdAt)}
                        </p>
                        <p style={{ fontSize: 20 }}>
                          T??nh tr???ng:{" "}
                          {item?.status
                            ? "???? ???????c ????ng v??o " + formatdate(item?.updatedAt)
                            : "??ang ch??? duy???t t??? admin"}
                        </p>
                      </Col>
                      <Col span={6} pull={18}>
                        <div className="image-container">
                          <img
                            src={
                              item?.image ||
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
                  Duy???t
                </Button>
                <Button type="primary" onClick={() => cancelNew(item.id)}>
                  T??? ch???i
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
      {currentNews.length === 0 ? <Empty></Empty> : <div>{listNews}</div>}
    </div>
  );
}

ManageNews.propTypes = {};

export default ManageNews;
