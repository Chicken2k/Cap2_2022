
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
function Footer(props) {

  const chuyentrang = (url) => {
    window.location.href = url;
  }
  return (
    <div id="footer">
      <footer className="page-footer font-small blue pt-4 container">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            {
              <div className="col-md-6 mt-md-0 mt-3" >
                <h5 className="text-uppercase text-danger mt-3 footer">Liên hệ</h5>
                <p>
                  <strong>Email: </strong>
                  <i>buag@travel.com</i>
                </p>
                <p>
                  <strong>Số điện thoại: </strong>
                  <i>+0236</i>
                </p>
                <p>
                  <strong>Địa chỉ: </strong>
                  <i>Da Nang</i>
                </p>
              </div>
            }
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase text-danger footer">Links</h5>

              <ul className="list-unstyled">
                <li>
                  <Link to="#">
                    <span className="fa fa-angle-double-right mr-2"></span>
                  Trang chủ
               </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="fa fa-angle-double-right mr-2"></span>
                    Tin tức
               </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="fa fa-angle-double-right mr-2"></span>
                  Dịch vụ
               </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="fa fa-angle-double-right mr-2"></span>
                  Khuyến mãi
               </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-md-0 mb-3 mxh ">
              <h5 className="text-uppercase text-danger footer">Thanh vien</h5>
              {
                <ul className="text_footer">
                  <li>Trần Đại Quý</li>
                  <li>Lê Viết Cường</li>
                  <li>Thái Tiến Minh Quân</li>
                  <li>Vũ Văn Tiến</li>
                </ul>
              }
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
        <Link to="https://mdbootstrap.com/" className="text_Buag">
          BUAG TRAVEL.
       </Link>
        </div>
      </footer>
    </div >

  )
}

Footer.propTypes = {

}

export default Footer
