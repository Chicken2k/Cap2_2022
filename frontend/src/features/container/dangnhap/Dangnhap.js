import { Button } from "@material-ui/core";
import { message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import loginApi from "../../../api/loginApi";
import mk from "./../../images/mk.png";
import tk from "./../../images/tk.png";
import "./dangnhap.css";
import { inforData } from "./dangnhapSlice";
// import { userData } from '../admin/taikhoan/taikhoanSlice'

const role = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  RESTAURANT: "restaurant",
};
function Login(props) {
  const [state, setState] = useState({ email: "", password: "" });
  const { email, password } = state;
  // const actionuser = async () => { await dispatch(userData()) }
  const dispatch = useDispatch();
  const actioninfor = async () => {
    await dispatch(inforData());
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      message.warning("Email không đúng định dạng!");
    } else {
      if (email.trim() === "" || password.trim() === "") {
        message.warning("Bạn chưa nhập đầy đủ thông tin!");
      } else {
        let loginResponses = await loginApi
          .login({ email: email, password: password })
          .then((data) => {
            return data;
          });
        if (loginResponses.success !== false) {
          localStorage.setItem("token", loginResponses.token);
          localStorage.setItem("userId", loginResponses.user.id);
          localStorage.setItem("role", loginResponses.user.role);
          actioninfor();
          message.success("Đăng nhập thành công!");
          if (loginResponses.user.role === role.ADMIN) {
            history.push("/admin/taikhoan");
          } else if (loginResponses.user.role === role.RESTAURANT) {
            history.push("/restaurant-information");
          } else {
            history.push("/");
          }
        } else {
          message.warning("Sai tên đăng nhập hoặc mật khẩu!");
        }
      }
    }
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();
  const hangdleDK = () => {
    history.push("/dangky");
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  return (
    <Router>
      <div id="login">
        <div className="box-login">
          <form className="form" onSubmit={onsubmit}>
            <h3 className="text-uppercase text-white text-center pb-3">
              Đăng nhập{" "}
            </h3>
            <div className="input-group flex-nowrap">
              <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">
                  <img src={tk} className="img-login float-left" alt="" />
                </span>
              </div>
              <input
                type="text"
                className="form-control text-chu"
                placeholder="Tài khoản"
                value={email}
                name="email"
                onChange={onchange}
                aria-label="email"
                aria-describedby="addon-wrapping"
              />
            </div>

            <div className="input-group flex-nowrap mt-3 mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">
                  <img src={mk} className="img-login float-left" alt="" />
                </span>
              </div>
              <input
                type="password"
                className="form-control text-chu"
                placeholder="Mật khẩu"
                value={password}
                name="password"
                onChange={onchange}
                aria-label="email"
                aria-describedby="addon-wrapping"
              />
            </div>

            <div className="form-group form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange="onclick"
                />{" "}
                <span className="text-black">Nhớ mật khẩu</span>
              </label>
              <Link
                to="#"
                onClick={hangdleDK}
                className="float-right text-black"
              >
                Chưa có tài khoản?
              </Link>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-100 mb-4"
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </Router>
  );
}

Login.propTypes = {};

export default Login;
