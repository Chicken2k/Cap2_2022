import { Button, Empty } from "antd";
import React, { useEffect, useState } from "react";

import orderApi from "../../../api/orderApi";
import Footer from "../trangchu/footer/Footer";
import "./listOrderRestaurant.css";
export const OrderRestaurant = () => {
  const [listOrderRestaurant, setListOrderRestaurant] = useState([]);
  const userId = localStorage.getItem("userId");
  const getOrderRestaurant = async () => {
    const orderRestaurants = await orderApi.getRestaurantOrder({
      userId: Number(userId),
    });
    setListOrderRestaurant(orderRestaurants.data);
  };
  const confirmRestaurant = async (orderId, userId) => {
    await orderApi.updateOrder(orderId, userId);
    getOrderRestaurant();
  };
  const rejectOrderRestaurant = async (orderId) => {
    await orderApi.deleteOrder(orderId);
    getOrderRestaurant();
  };
  useEffect(() => {
    getOrderRestaurant();
  }, []);
  const renderListOrderRestaurant = listOrderRestaurant.map((item) => {
    const formatDate = new Date(item?.date);
    const hours = formatDate.getHours();
    const minutes = formatDate.getMinutes();
    const strDate = formatDate.toDateString();
    return (
      <li className="item-order">
        <p>Nhà hàng: {item?.Restaurant?.name}</p>
        <p>Date: {strDate}</p>
        <p>Time: {hours + ":" + minutes}</p>
        <p>Tên khách hàng: {item?.User?.name}</p>
        <p>Số lượng chỗ ngồi: {item?.quantity}</p>
        <p>Note: {item?.note}</p>
        <Button
          type="danger"
          className="btn btn-reject"
          onClick={() => rejectOrderRestaurant(item.id)}
        >
          Từ chối
        </Button>
        <Button
          type="primary"
          className="btn btn-approve"
          onClick={() => confirmRestaurant(item.id, item.User.id)}
        >
          Xác nhận
        </Button>
      </li>
    );
  });

  return (
    <div className="">
      <div className="container-content">
        <h4 className="title">Danh sách đặt bàn</h4>
        {renderListOrderRestaurant.length ? (
          renderListOrderRestaurant
        ) : (
          <Empty></Empty>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};
