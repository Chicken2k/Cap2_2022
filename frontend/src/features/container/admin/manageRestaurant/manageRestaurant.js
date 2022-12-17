import { Button, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import adminApi from "../../../../api/admin";
import "./tintuc.css";

function ManageRestaurantRoleAdmin() {
  const [restaurants, setRestaurants] = useState([]);
  let listRestaurant;
  const history = useHistory();
  const getRestaurants = async () => {
    const listRestaurant = await adminApi.getAll();
    if (listRestaurant) setRestaurants(listRestaurant.data);
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  const switchDetailRestaurantPage = (restaurantId) => {
    history.push({
      pathname: `manage-restaurant/detail-restaurant/${restaurantId}`,
      state: {
        id: restaurantId,
      },
    });
  };
  if (restaurants) {
    listRestaurant = restaurants.map((item) => {
      return (
        <div className="containerItem">
          <div className="containerImage">
            <img src="" />
          </div>
          <div className="containerContent">
            <p>Name: {item.name}</p>
            <p>Address: {item.address}</p>
            <p>Số điện thoại: {item.phoneNumber}</p>
            <Button
              type="primary"
              onClick={() => switchDetailRestaurantPage(item.id)}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      {restaurants.length === 0 ? <Empty></Empty> : <div>{listRestaurant}</div>}
    </div>
  );
}

ManageRestaurantRoleAdmin.propTypes = {};

export default ManageRestaurantRoleAdmin;
