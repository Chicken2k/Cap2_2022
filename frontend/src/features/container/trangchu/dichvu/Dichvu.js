import React from "react";
import { useSelector } from "react-redux";
import "./dichvu.css";
import "../../../../fixed.css"
import applebtn from "../../../images/apple_btn.png";
import googlebtn from "../../../images/google_btn.png";
function Dichvu(props) {
  const dichvus = useSelector(state => state.dichvus.dichvu.data);
  var dichvu = []
  if (dichvus) {
    for (let i = 0; i < dichvus.length; i++) {
      if (dichvus[i].status === 1 && dichvus[i].loadhome === 1) {
        dichvu.push(dichvus[i])
      }
    }
  }
  return (
    <div id="dichvu">
           <div className="banner">
        <div className="container">
          <h2>Đặt mọi lúc mọi nơi</h2>
          <p>Tham gia các ứng dụng trên bất kỳ thiết bị nào của bạn</p>
          <p>Hãy thử thách bản thân mình , vượt qua mọi giới hạn</p>
          <button className="button--red">Sign Up For Free</button>
          <div className="row">
            <div className="col-6 text-right">
              <img src={googlebtn} alt="google btn" />
            </div>
            <div className="col-6 text-left">
              <img src={applebtn} alt="apple btn" />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

Dichvu.propTypes = {

}

export default Dichvu