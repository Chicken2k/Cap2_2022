import React, { useEffect, useState } from "react";
import { Link as Linkrt, useHistory } from "react-router-dom";
import { Link } from "react-scroll";

import { Button, IconButton } from "@material-ui/core";
import { Badge, Drawer, Dropdown, Menu, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import taikhoanApi from "../../../../api/taikhoanApi";
import { storage } from "../../../../firebase";
import {
  thongbaoData,
  updatethongbao,
} from "../../admin/Kiemduyet/thongbaoSlice";
import { inforData } from "../../dangnhap/dangnhapSlice";
import "./menu.css";

function ListMenu(props) {
  const [avatar, setAvatar] = useState("");
  const [state, setState] = useState({
    collapsed: false,
    visible: false,
    collapsed2: false,
    visible2: false,
    name: "",
    gioitinh: 1,
    diachi: "",
    ngaysinh: "",
    sdt: "",
    anh: "",
    linkImg: "",
    tenanh: "",
    img: "",
  });
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const showDrawer = () => {
    if (users) {
      setState({
        ...state,
        visible: true,
      });
    } else {
      message.error("Bạn cần phải đăng nhập trước!");
    }
  };
  const showDrawer2 = () => {
    if (users) {
      setState({
        ...state,
        visible2: true,
      });
    } else {
      message.error("Bạn cần phải đăng nhập trước!");
    }
  };
  const users = useSelector((state) => state.infor.infor.data);
  const [user, setUser] = useState();

  const onClose = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  const onClose2 = () => {
    setState({
      ...state,
      visible2: false,
    });
  };
  const getprofile = async () => {
    if (users) {
      var ok = await taikhoanApi.getOne(users.id).then((ok) => {
        return ok;
      });
      setUser(ok);
      setAvatar(ok.avatar);
    }
  };
  useEffect(() => {
    getprofile();
    setAvatar("");
  }, [users]);
  const actioninfor = async () => {
    await dispatch(inforData());
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    actioninfor();
    setAvatar("");
    setUser("");
    history.push("/dangnhap");
  };
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const phanquyen = () => {
    var check = users.role;
    if (check) {
      if (check === "customer" || check === "restaurant") {
        return false;
      } else {
        return true;
      }
    }
  };
  const ss = (
    <Menu>
      <Menu.Item key="0">
        <Linkrt to="/dangnhap">Đăng nhập</Linkrt>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={showDrawer}>Xem thông tin</span>
      </Menu.Item>

      {users ? (
        users.role === "customer" ? (
          <Menu.Item key="4">
            <Linkrt to="/thongtin/0">Xem lịch sử</Linkrt>
          </Menu.Item>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {users ? (
        users.role === "restaurant" ? (
          <Menu.Item key="3">
            <Linkrt to="/restaurant-information" className="nav-link">
              Quản lý nhà hàng
            </Linkrt>
          </Menu.Item>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {users ? (
        phanquyen() ? (
          <Menu.Item key="3">
            <Linkrt to="/admin" className="nav-link">
              Quản lý admin
            </Linkrt>
          </Menu.Item>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <Menu.Divider />
      <Menu.Item key="1">
        <span onClick={logout}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );
  const thongbaos = useSelector((state) => state.thongbao.thongbao.data);
  let thongbao = [];
  let checkthongbao = 0;
  if (thongbaos && users) {
    for (let i = 0; i < thongbaos.length; i++) {
      if (thongbaos[i].userId === users.id) {
        thongbao.push(thongbaos[i]);
      }
    }
  }
  if (thongbao) {
    for (let i = 0; i < thongbao.length; i++) {
      if (thongbao[i].status === 1) {
        checkthongbao++;
      }
    }
  }
  const history = useHistory();
  const actionthongbao = async () => {
    await dispatch(thongbaoData());
  };

  const linkthongbao = (id) => {
    dispatch(updatethongbao({ status: 0, idsua: id }));
    setTimeout(() => {
      actionthongbao();
    }, 500);
    history.push(`/thongtin/1`);
  };
  const sss = (
    <Menu className="sss">
      {thongbao.map((ok, index) => (
        <Menu.Item key={index}>
          <span
            onClick={() => {
              linkthongbao(ok.id);
            }}
          >
            {ok.status === 0 ? (
              <span>{ok.noidung}</span>
            ) : (
              <span className="sss-true">{ok.noidung}</span>
            )}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    var idsua = user.id;
    if (
      name.trim() === "" ||
      diachi.trim() === "" ||
      gioitinh === "" ||
      ngaysinh.trim() === "" ||
      sdt.trim() === ""
    ) {
      message.warning("Bạn chưa nhập đủ thông tin!");
    } else {
      if (img) {
        await storage.ref(`imagesUser/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesUser")
          .child(img.name)
          .getDownloadURL();
        var update = await taikhoanApi
          .edituser({
            idsua: idsua,
            name: name,
            avatar: anh,
            diachi: diachi,
            gioitinh: gioitinh,
            ngaysinh: ngaysinh,
            sdt: sdt,
            status: 1,
          })
          .then((data) => {
            return data;
          });
        // console.log(update);
        if (update) {
          getprofile();
          message.success("Sửa thông tin thành công!");
          setState({
            visible2: false,
            name: "",
            gioitinh: 1,
            diachi: "",
            ngaysinh: "",
            sdt: "",
            anh: "",
            linkImg: "",
            tenanh: "",
            img: "",
          });
        } else {
          message.error("Sửa thất bại!");
        }
      } else {
        var update = await taikhoanApi
          .edituser({
            idsua: idsua,
            name: name,
            diachi: diachi,
            sdt: sdt,
            gioitinh: gioitinh,
            ngaysinh: ngaysinh,
          })
          .then((data) => {
            return data;
          });
        // console.log(update);
        if (update) {
          getprofile();
          message.success("Sửa thông tin thành công!");
          setState({
            visible2: false,
            name: "",
            gioitinh: 1,
            diachi: "",
            ngaysinh: "",
            sdt: "",
            anh: "",
            linkImg: "",
            tenanh: "",
            img: "",
          });
        } else {
          message.error("Sửa thất bại!");
        }
      }
    }
  };
  const hangdleGioitinh = (e) => {
    setState({
      ...state,
      gioitinh: e.target.value,
    });
  };

  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      return ngay + "/" + thang + "/" + nam;
    }
  };
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      //bắt sự kiện cuộn chuột
      var trangthai = "duoi300";
      var doituongmenu = document.querySelector("#menu");
      window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
          if (trangthai == "duoi300") trangthai = "tren300";
          doituongmenu.classList.add("nholai");
        } else {
          doituongmenu.classList.remove("nholai");
        }
      });
    },
    false
  );
  const { name, diachi, ngaysinh, gioitinh, sdt, linkImg, img } = state;
  return (
    <div id="menu">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Linkrt className="food2k navbar-brand" to="/">
          Food2K
        </Linkrt>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link
                className="nav-link "
                activeClass="active"
                to="banner"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Trang chủ<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                activeClass="active"
                to="tour"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Đặt bàn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                activeClass="active"
                to="dichvu"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Dịch vụ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                activeClass="active"
                to="news"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Tin tức
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Dropdown overlay={ss} trigger={["click"]}>
                <span className="nav-link">
                  <Avatar
                    size="small"
                    src={
                      user
                        ? avatar
                          ? avatar
                          : "https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png"
                        : "https://static.yeah1.com/uploads/editors/27/2020/03/21/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"
                    }
                  >
                    VK
                  </Avatar>
                </span>
              </Dropdown>
            </li>
          </ul>
          <Dropdown overlay={sss} trigger={["click"]}>
            {checkthongbao === 0 ? (
              <Badge>
                <i class="fas fa-bell"></i>
              </Badge>
            ) : (
              <Badge dot>
                <i class="fas fa-bell"></i>
              </Badge>
            )}
          </Dropdown>
        </div>
      </nav>
      <Drawer
        style={{ zIndex: "100000" }}
        className="drawer-menu"
        title="Thông tin cá nhân"
        placement="right"
        onClose={onClose}
        visible={state.visible}
      >
        {!user ? (
          ""
        ) : (
          <div>
            <div>
              <div className="center">
                <img
                  src={
                    user
                      ? avatar
                        ? avatar
                        : 
                        "https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png"
                        
                        
                      : "https://static.yeah1.com/uploads/editors/27/2020/03/21/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"
                  }
                  className="avatar-admin"
                  alt=""
                />
              </div>
              <h4>Cá nhân</h4>
              <div className="row">
                <div className="col-md-12">
                  <p className="mb-2">
                    <span>Họ tên:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="tt-user">{user.name}</span>
                  </p>
                  <p className="mb-2">
                    <span>Giới tính:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="tt-user">
                      {user.gioitinh === +1 ? "Nam" : "Nữ"}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span>Ngày sinh:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="tt-user">{formatdate(user.ngaysinh)}</span>
                  </p>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
            <hr />

            <h4>Liên hệ</h4>
            <div className="row">
              <div className="col-md-12">
                <p className="mb-2">
                  <span>Email:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{user.email}</span>
                </p>
                <p className="mb-2">
                  <span>Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{user.sdt}</span>
                </p>
                <p className="mb-2">
                  <span>Địa chỉ:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{user.diachi}</span>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="contained"
                color="secondary"
                onClick={showDrawer2}
                className=" mt-2"
              >
                Thay đổi thông tin
              </Button>
            </div>
          </div>
        )}
      </Drawer>
      <Drawer
        style={{ zIndex: "100001" }}
        className="drawer-menu"
        title="Sửa thông tin cá nhân"
        placement="right"
        onClose={onClose2}
        visible={state.visible2}
      >
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tên người dùng</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Thêm poster</label>
            <div>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={hangdelimage}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  className="mr-5 ml-4"
                  aria-label="upload picture"
                  component="span"
                >
                  <i className="fas fa-camera-retro"></i>
                </IconButton>
              </label>
              {linkImg ? (
                <img
                  src={linkImg}
                  className="ml-5"
                  style={{ borderRadius: "100%" }}
                  height="100px"
                  width="100px"
                  alt=""
                />
              ) : (
                ""
              )}
              <br />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Giới tính</label>
            <select className="form-control" onChange={hangdleGioitinh}>
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              name="sdt"
              value={sdt}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              name="diachi"
              value={diachi}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Ngày sinh</label>
            <input
              type="date"
              name="ngaysinh"
              value={ngaysinh}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className=" mt-2"
            >
              Sửa đổi
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

ListMenu.propTypes = {};

export default ListMenu;
