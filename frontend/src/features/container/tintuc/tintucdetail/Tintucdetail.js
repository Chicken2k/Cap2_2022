import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import newsApi from "../../../../api/news";
// import Footer from "../../trangchu/footer/Footer";
import "./Tintucdetail.css";

import renderHTML from "react-render-html";

function Tintucdetail(props) {
  localStorage.setItem("menu", "nothome");
  const location = useLocation();

  const newId = Number(location?.pathname?.split("/")[3]);
  const [tintuc, setTinTuc] = useState({});
  const getTinTuc = async () => {
    const news = await newsApi.getOne(newId);
    console.log(news);
    setTinTuc(news);
  };
  useEffect(() => {
    getTinTuc();
  }, []);

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
  console.log(tintuc);
  return (
    <div id="new-detail">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Tin tức</Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="content-new">
        <div className="container bg-white">
          {!tintuc ? (
            <Spin></Spin>
          ) : (
            <div className="row mt-5 mb-5">
              <div className="col-md-9" key={tintuc?.id}>
                <div className="name-new mb-4">
                  <h2>{tintuc?.data?.name}</h2>
                </div>
                <div className="content">
                  {renderHTML(tintuc?.data?.content || "")}
                  <div className="text-right">
                    <p>
                      Ngày đăng:{" "}
                      <i>
                        <strong>{formatdate(tintuc?.data?.createdAt)}</strong>
                      </i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default Tintucdetail;
