import { Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderApi from "../../../../../api/orderApi";
import "./lichsu.css";
import "../duyettour/duyettour.css";
export default function Lichsu() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
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
  const getOrders = async () => {
    const data = await orderApi.getAll({ userId, status: true });
    setOrders(data.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="history">
      <div className="history__header">
        <h3 className="text-center">Lịch sử đặt bàn</h3>
        <div className="hr"></div>
      </div>
      <div className="history__content">
        {orders?.length === 0 ? (
          orders[0] ? (
            <div className="spin">
              <Spin className="mt-5" />
            </div>
          ) : (
            <Empty></Empty>
          )
        ) : (
          orders.map((ok, index) => (
            <Link
              to={{
                pathname: `/detail-restaurant/${ok?.Restaurant?.id}`,
                state: {
                  id: ok?.Restaurant?.id,
                },
              }}
            >
              {/* <div className="history__box" key={index}>
                <div className="history__tour">
                  <div className="history--title">
                    <div className="history--name">{ok?.Restaurant?.name}</div>
                  </div>
                  <div className="history--infor">
                    <table>
                      <tr>
                        <th>Ngày đặt bàn &emsp;&emsp;</th>
                        <th>{new Date(ok?.date)?.toDateString()}</th>
                      </tr>
                      <tr>
                        <th>Thời gian</th>
                        <th>
                          {new Date(ok?.date).getHours() +
                            ":" +
                            new Date(ok?.date).getMinutes()}
                        </th>
                      </tr>
                      <tr>
                        <th>Địa chỉ nhà hàng</th>
                        <th>{ok?.Restaurant?.address}</th>
                      </tr>
                    </table>
                    <table className="nmn">
                      <tr>
                        <th>Tên khách hàng &emsp;&emsp;</th>
                        <th>{ok?.User?.name}</th>
                      </tr>
                      <tr>
                        <th>Số lượng khách</th>
                        <th>{ok?.quantity}</th>
                      </tr>
                      <tr>
                        <th>Ghi chú</th>
                        <th>{ok?.note}</th>
                      </tr>
                      <tr>
                        <th>Thời gian đặt bàn</th>
                        <th>{formatdate(ok?.createdAt)}</th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div> */}
              
              <div className="container">
        <div className="duyettour__content">
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
                      <div className="luuytour">Thời gian đặt bàn  : {formatdate(ok?.createdAt)}</div>
                    </div>
                    <div className="btn__tour">
                      <h2 style={{ fontWeightBold: 20, color: "green" }}>
                        Đã đặt 
                      </h2>
                    </div>
                  </div>
              
        </div>
           </div>
      
      
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
