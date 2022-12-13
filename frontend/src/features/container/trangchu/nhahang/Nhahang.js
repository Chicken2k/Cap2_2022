import { Button, Rate, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cityApi from "../../../../api/cityApi";
import foodApi from "../../../../api/foodApi";
import restaurantApi from "../../../../api/restaurantApi";
import "./nhahang.css";
function NhaHang(props) {
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [food, setFood] = useState([]);
  const [changeFood, setChangeFood] = useState(0);
  const [changeCity, setChangeCity] = useState(0);
  const [isLoading, setIdLoading] = useState(true);

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
  useEffect(() => {
    getCity();
    getFood();
  }, []);
  useEffect(() => {
    listRestaurant();
  }, []);
  const handleChangeCity = async (value) => {
    setChangeCity(value);
  };
  const handleChangeFood = async (value) => {
    setChangeFood(value);
  };
  const listRestaurant = async (cityId, foodId) => {
    try {
      if (!cityId && !foodId) {
        const data = await restaurantApi.getAllRestaurants();
        setData(data.data.slice(0, 6));
      } else {
        const data = await restaurantApi.getRestaurantQuery(cityId, foodId);
        setData(data.data.slice(0, 6));
      }
    } catch (err) {
      setData([]);
      return err;
    } finally {
      setIdLoading(false);
    }
  };
  const handleClickButton = (event) => {
    listRestaurant(changeCity, changeFood);
  };
  return (
    <div className="mt-5 mb-5 tour " id="tour">
      <div className="heading text-center">
        <span>Nhà hàng các thành phố</span>
        <div className="hr"></div>
        <p className="mb-4 mt-2">Món ăn Việt - Yêu thương quay về</p>
      </div>
      <div className="filter-search-container">
        <Space Wrap>
          <div className="col1">
            <span>Khu vực</span>
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
          <div className="col1">
            <span>Loại thức ăn</span>
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
          <Button type="primary" onClick={handleClickButton}>
            Tìm kiếm
          </Button>
        </Space>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {isLoading ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            data.map((ok) => (
              <div className="col-md-4 mb-2" key={ok.id}>
                <Link
                  to={{
                    pathname: `/detail-restaurant/${ok.id}`,
                    state: {
                      id: ok.id,
                    },
                  }}
                >
                  <div className="img rounded">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80img_girl.jpg"
                      className="img-fluid "
                      alt=""
                    />
                  </div>
                  <div className="content_tour">
                    <div className="title_tour text-capitalize">{ok.name}</div>
                    <div className="title_address text-capitalize">
                      {ok.address}
                    </div>
                    <div className="star float-left">
                      <Rate value="5" disabled />
                    </div>
                    {/* <div className="money float-left ml-3 text-warning">
                    {
                      <div>
                        {ok.gianguoilon.toLocaleString()} VNĐ
                        <br />
                      </div>
                    }
                  </div> */}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

NhaHang.propTypes = {};

export default NhaHang;
