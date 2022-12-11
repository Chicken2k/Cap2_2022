import { Card, Col, Empty, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Link as Linkrt } from "react-router-dom";
import newsApi from "../../../../api/news";
import "./tintuc.css";
const { Meta } = Card;

function Tintuc(props) {
  const [tintucs, setTinTuc] = useState([]);
  const getNews = async () => {
    const data = await newsApi.getAll();
    console.log(data);
    setTinTuc(data.data);
  };
  useEffect(() => {
    getNews();
  }, []);
  const tintuc1 = [];
  const tintuc2 = [];
  const tintuc3 = [];
  console.log(tintucs);
  // if (tintucs) {
  //   var sort = [];
  //   for (let i = 0; i < tintucs.length; i++) {
  //     if (tintucs[i].status === 1) {
  //       sort.unshift(tintucs[i]);
  //     }
  //   }
  //   for (let i = 0; i < sort.length; i++) {
  //     if (tintucs[i].status === 1) {
  //       if (tintuc1.length < 2) {
  //         tintuc1.push(sort[i]);
  //       } else {
  //         if (tintuc2.length < 2) {
  //           tintuc2.push(sort[i]);
  //         } else {
  //           if (tintuc3.length < 4) {
  //             tintuc3.push(sort[i]);
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // const tomtat1 = (e) => {
  //   var chu = "";
  //   for (let i = 0; i < e.length; i++) {
  //     if (chu.length < 225) {
  //       chu += e[i];
  //     }
  //   }
  //   chu = chu + "...";
  //   return chu;
  // };
  // const tomtat2 = (e) => {
  //   var chu = "";
  //   for (let i = 0; i < e.length; i++) {
  //     if (chu.length < 140) {
  //       chu += e[i];
  //     }
  //   }
  //   chu = chu + "...";
  //   return chu;
  // };
  return (
    <div id="news">
      <div className="heading text-center">
        <span>
          <Link to="/listtintuc">Tin tức về ưu đãi của nhà hàng</Link>
        </span>
        <div className="hr"></div>
        <p className="mb-4">Cập nhật các tin tức của các nhà hàng</p>
      </div>
      <div className="container">
        <div className="row mb-4" style={{ margin: "0, auto" }}>
          {tintucs.length ? (
            tintucs.slice(0, 4).map((ok) => (
              <div className="col-sm-6 mb-3 site-card-wrapper" key={ok.id}>
                <Linkrt to={`/news/detail/${ok.id}`}>
                  <Row
                    justify={"space-between"}
                    style={{ border: "1px solid" }}
                    wrap={true}
                  >
                    <Col>
                      <Card
                        title={ok.name}
                        bordered={true}
                        hoverable
                        style={{ margin: "0 auto", width: "50%" }}
                        cover={
                          <img
                            alt="example"
                            display="block"
                            src="https://www.scb.com.vn/picture/redsun_01_03_08_2019_14_23_45_.jpg"
                            max-width="100%"
                            height="auto"
                          />
                        }
                      >
                        <div className=" p-3">
                          <strong>Nhà hàng: {ok.Restaurant.name}</strong>
                        </div>
                        <div className=" p-3">
                          <strong>Địa chỉ: {ok.Restaurant.address}</strong>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Linkrt>
              </div>
            ))
          ) : (
            <Empty></Empty>
          )}
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="row "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Tintuc.propTypes = {};

export default Tintuc;
