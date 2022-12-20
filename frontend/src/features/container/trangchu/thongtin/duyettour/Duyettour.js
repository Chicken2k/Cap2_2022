import React, { useEffect, useState } from "react";
import orderApi from "../../../../../api/orderApi";
import "./duyettour.css";

export default function Duyettour() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const getOrders = async () => {
    const data = await orderApi.getOrderPending({ userId });
    setOrders(data.data);
  };
  const formatDate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      var gio = e.substr(11, 2);
      var phut = e.substr(14, 2);
      return ngay + "/" + thang + "/" + nam + " " + gio + ":" + phut;
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="duyettour">
      <div className="duyettour__header">
        <h3 className="text-center">Bàn đang chờ được duyệt</h3>
        <div className="hr"></div>
      </div>
      <div className="container">
        <div className="duyettour__content">
          {orders.length === 0
            ? ""
            : orders.map((ok, index) =>
                ok?.Restaurant?.name === null ? (
                  ""
                ) : (
                  <div className="duyettour__box" key={index}>
                    <div className="duyettour--name">
                      Tên nhà hàng: {ok?.Restaurant?.name}
                    </div>
                    <div className="duyettour--form">
                      <div className="luuytour">Tên khách hàng  : {ok?.User?.name}</div>
                    </div>
                    <div className="duyettour--form">
                      <div className="luuytour">Số lượng khách  : {ok?.quantity}</div>
                    </div>
                    <div className="duyettour--form">
                      <div className="giatour">
                        Địa chỉ nhà hàng : {ok?.Restaurant?.address}
                      </div>
                    </div>
                    <div className="duyettour--form">
                      <div className="giatour">
                        {/* Ngày giờ đặt bàn: {formatDate(ok?.date)} */}
                      </div>
                    </div>
                    <div className="duyettour--form">
                      <div className="luuytour"> Ngày đặt bàn : {new Date(ok?.date)?.toDateString()}</div>
                    </div>
                    {/* <div className="duyettour--form">
                      <div className="luuytour"> Thời gian :  {new Date(ok?.date).getHours() +
                            ":" +
                            new Date(ok?.date).getMinutes()}</div>
                    </div> */}
                    <div className="duyettour--form">
                      <div className="luuytour"> Yêu cầu : {ok?.note}</div>
                    </div>
                    <div className="duyettour--form">
                      <div className="luuytour">Thời gian đặt bàn  : {formatDate(ok?.createdAt)}</div>
                    </div>
                    <div className="btn__tour">
                      <h2 style={{ fontWeightBold: 20, color: "red" }}>
                        Đang chờ
                      </h2>
                    </div>
                  </div>
                  
                  
                )
              )}
        </div>
      </div>
    </div>
  );
}
