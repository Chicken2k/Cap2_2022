import React from "react";
import "./banner.css";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
function Banner(props) {
  const anh = useSelector(state => state.anhs.anh.data);
  var banner = []
  if (anh) {
    for (let i = 0; i < anh.length; i++) {
      if (anh[i].status === +1 && anh[i].banner === +1) {
        banner.push(anh[i]);
      }
    }
  }
  return (
    <div id="banner">
      {/* <Carousel autoplay effect="fade">
        {!banner ? '' :
          banner.map(ok => (
            <div className="fit" key={ok.id}>
              <img src={ok.link} alt="" />
            </div>
          ))}
      </Carousel> */}
            <div className="cover">
        <div className="cover__content">
          <h1 className="text_datbanbanner">ĐẶT BÀN ONLINE</h1>
          <h5 className="text_datbanbanner">
          ĐẶT BÀN TRỰC TUYẾN NHANH NHẤT
          </h5>
        </div>
      </div>
      <div className="intro">
        <div className="intro__content">
          <div className="row">
            <div className="col-4 ">
              <div className="intro__items">
                <div className="intro__icon">
                </div>
                <div className="intro__details">
                  <p>Đặt Bàn Online Cho Nhà Hàng</p>
                </div>
              </div>
            </div>
            <div className="col-4 ">
              <div className="intro__items">
                <div className="intro__icon">
                </div>
                <div className="intro__details">
                  <p>Quán Lẩu</p>
                </div>
              </div>
            </div>
            <div className="col-4 ">
              <div className="intro__items">
                <div className="intro__icon">
             
                </div>
                <div className="intro__details">
                  <p>Quán Nướng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

Banner.propTypes = {

}

export default Banner
