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
                      <div className="giatour">
                        Địa chỉ: {ok?.Restaurant?.address}
                      </div>
                    </div>
                    <div className="duyettour--form">
                      <div className="giatour">
                        Ngày giờ đặt bàn: {formatDate(ok?.date)}
                      </div>
                    </div>
                    <div className="duyettour--form">
                      <div className="luuytour">{ok?.note}</div>
                    </div>
                    <div className="btn__tour">
                      {/* <Popconfirm
                        title="Bạn có chắc chắn？"
                        icon={
                          <QuestionCircleOutlined style={{ color: "green" }} />
                        }
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          className="mr-1"
                        >
                          Đồng ý
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="Bạn có chắc chắn？"
                        icon={
                          <QuestionCircleOutlined style={{ color: "green" }} />
                        }
                      >
                        <Button color="secondary" variant="contained">
                          Huỷ
                        </Button>
                      </Popconfirm> */}
                      <h3 style={{ fontWeightBold: 20, color: "red" }}>
                        Đang chờ
                      </h3>
                    </div>
                  </div>
                )
              )}
        </div>
      </div>
    </div>
  );
}
