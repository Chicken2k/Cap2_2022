import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Ngaydi from "..//Ngaydi/Ngaydi";
import Anh from "../Anh/Anh";
import Binhluan from "../Binhluan/Binhluan";
import Chitietbinhluan from "../Binhluan/Chitietbinhluan";
import City from "../Cities/City";
import Themcity from "../Cities/Themcity";
import Diadiem from "../DiaDiem/Diadiem";
import Themdiadiem from "../DiaDiem/Themdiadiem";
import Dichvu from "../Dichvu/Dichvu";
import Themdichvu from "../Dichvu/Themdichvu";
import Foodtype from "../FoodType/Foodtype";
import Themfood from "../FoodType/Themfood";

import Hoadon from "../Hoadon/Hoadon";
import { DetailRestaurant } from "../manageRestaurant/detailRestaurant";
import ManageRestaurantRoleAdmin from "../manageRestaurant/manageRestaurant";
import Themtintuc from "../manageRestaurant/Themtintuc";
import ManageNews from "../news/managerNews";
import Chitietquocgia from "../Quocgia/Chitietquocgia";
import Quocgia from "../Quocgia/Quocgia";
import Themquocgia from "../Quocgia/Themquocgia";
import Role from "../Role/Role";
import Themrole from "../Role/Themrole";
import Chitiettaikhoan from "../taikhoan/Chitiettaikhoan";
import Taikhoan from "../taikhoan/Taikhoan";
import Chitiettour from "../Tour/Chitiettour";
import Themtour from "../Tour/Themtour";
import Tour from "../Tour/Tour";
import Headers from "./../header/Header";
import Loaitour from "./../Loaitour/Loaitour";
import Themloaitour from "./../Loaitour/Themloaitour";
import "./nav.css";

export default function Nav() {
  const match = useRouteMatch();
  const { Header, Sider, Content } = Layout;
  const [state, setState] = useState({
    collapsed: true,
    visible: true,
  });
  const dispatch = useDispatch();
  //const actionResult = async () => { await dispatch(hoadoncanhanData()) }
  useEffect(() => {
    //actionResult();
    window.scrollTo(0, 0);
  }, []);
  const hoadoncanhan = useSelector(
    (state) => state.hoadoncanhans.hoadoncanhan.data
  );
  let counthoadon = 0;
  if (hoadoncanhan) {
    for (let i = 0; i < hoadoncanhan.length; i++) {
      if (hoadoncanhan[i].kiemduyet === 0) {
        counthoadon++;
      }
    }
  }
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  const user = useSelector((state) => state.infor.infor.data);
  const quanlytour = (
    <div>
      {/* <Route exact path={match.path}>
                <Doanhthu />
            </Route> */}
      <Route exact path={`${match.path}/tour`}>
        <Tour url={match.url} />
      </Route>
      <Route path={`${match.path}/tour/chitiettour/:id`}>
        <Chitiettour />
      </Route>
      <Route path={`${match.path}/tour/themtour`}>
        <Themtour />
      </Route>
      <Route path={`${match.path}/tour/suatour/:id`}>
        <Themtour />
      </Route>
      <Route path={`${match.path}/loaitour/sualoaitour/:id`}>
        <Themloaitour />
      </Route>
      <Route exact path={`${match.path}/loaitour`}>
        <Loaitour url={match.url} />
      </Route>
      <Route path={`${match.path}/loaitour/themloaitour`}>
        <Themloaitour />
      </Route>
      <Route path={`${match.path}/quocgia/suaquocgia/:id`}>
        <Themquocgia />
      </Route>
      <Route exact path={`${match.path}/quocgia`}>
        <Quocgia url={match.url} />
      </Route>
      <Route path={`${match.path}/quocgia/themquocgia`}>
        <Themquocgia />
      </Route>
      <Route exact path={`${match.path}/diadiem`}>
        <Diadiem url={match.url} />
      </Route>
      <Route path={`${match.path}/diadiem/themdiadiem`}>
        <Themdiadiem />
      </Route>
      <Route path={`${match.path}/diadiem/suadiadiem/:id`}>
        <Themdiadiem />
      </Route>
    </div>
  );
  const admin = (
    <div>
      {/* <Route exact path={match.path}>
                <Doanhthu />
            </Route> */}
      <Route exact path={`${match.path}/diadiem`}>
        <Diadiem url={match.url} />
      </Route>
      <Route path={`${match.url}/diadiem/themdiadiem`}>
        <Themdiadiem />
      </Route>
      <Route path={`${match.path}/diadiem/suadiadiem/:id`}>
        <Themdiadiem />
      </Route>
      <Route exact path={`${match.path}/ngaydi`}>
        <Ngaydi />
      </Route>
      <Route exact path={`${match.path}/hoadon`}>
        <Hoadon url={match.url} />
      </Route>
      <Route exact path={`${match.path}/anh`}>
        <Anh url={match.url} />
      </Route>
      <Route exact path={`${match.path}/dichvu`}>
        <Dichvu url={match.url} />
      </Route>
      <Route exact path={`${match.path}/binhluan`}>
        <Binhluan url={match.url} />
      </Route>
      <Route path={`${match.path}/binhluan/chitietbinhluan/:id`}>
        <Chitietbinhluan />
      </Route>
      <Route exact path={`${match.path}/tour`}>
        <Tour url={match.url} />
      </Route>
      <Route exact path={`${match.path}/role`}>
        <Role url={match.url} />
      </Route>
      <Route path={`${match.path}/role/themrole`}>
        <Themrole />
      </Route>
      <Route path={`${match.path}/dichvu/themdichvu`}>
        <Themdichvu />
      </Route>
      <Route path={`${match.path}/tour/chitiettour/:id`}>
        <Chitiettour />
      </Route>
      <Route path={`${match.path}/quocgia/chitietquocgia/:id`}>
        <Chitietquocgia />
      </Route>
      <Route path={`${match.path}/role/suarole/:id`}>
        <Themrole />
      </Route>
      <Route path={`${match.path}/dichvu/suadichvu/:id`}>
        <Themdichvu />
      </Route>
      <Route path={`${match.path}/loaitour/sualoaitour/:id`}>
        <Themloaitour />
      </Route>
      <Route path={`${match.path}/quocgia/suaquocgia/:id`}>
        <Themquocgia />
      </Route>
      <Route exact path={`${match.path}/quocgia`}>
        <Quocgia url={match.url} />
      </Route>
      <Route exact path={`${match.path}/loaitour`}>
        <Loaitour url={match.url} />
      </Route>
      <Route exact path={`${match.path}/taikhoan`}>
        <Taikhoan url={match.url} />
      </Route>
      <Route path={`${match.path}/loaitour/themloaitour`}>
        <Themloaitour />
      </Route>
      <Route path={`${match.path}/taikhoan/chitiettaikhoan/:id`}>
        <Chitiettaikhoan />
      </Route>
      <Route path={`${match.path}/quocgia/themquocgia`}>
        <Themquocgia />
      </Route>
      <Route path={`${match.path}/tour/themtour`}>
        <Themtour />
      </Route>
      <Route path={`${match.path}/tour/suatour/:id`}>
        <Themtour />
      </Route>
      <Route exact path={`${match.path}/manage-restaurant`}>
        <ManageRestaurantRoleAdmin url={match.url} />
      </Route>
      <Route path={`${match.path}/manage-restaurant/detail-Restaurant/:id`}>
        <DetailRestaurant />
      </Route>
      <Route path={`${match.path}/tintuc/themtintuc`}>
        <Themtintuc />
      </Route>
      <Route path={`${match.path}/tintuc/suatintuc/:id`}>
        <Themtintuc />
      </Route>
      <Route path={`${match.path}/manage-news`}>
        <ManageNews />
      </Route>
      <Route path={`${match.path}/food-type`}>
        <Foodtype />
      </Route>
      <Route path={`${match.path}/food-type/add`}>
        <Themfood />
      </Route>{" "}
      <Route path={`${match.path}/food-type/edit/:id`}>
        <Themfood />
      </Route>
      <Route path={`${match.path}/cities`}>
        <City />
      </Route>
      <Route path={`${match.path}/cities/add`}>
        <Themcity />
      </Route>
      <Route path={`${match.path}/cities/edit/:id`}>
        <Themcity />
      </Route>
      {/* <Route path={`${match.path}/tintuc/chitiettintuc/:id`}  >
                <Chitiettintuc />
            </Route>
            <Route exact path={`${match.path}/hoadoncanhan`}  >
                <Hoadoncanhan url={match.url} />
            </Route>
            <Route exact path={`${match.path}/kiemduyet`}>
                <Kiemduyet url={match.url} />
            </Route>
            <Route exact path={`${match.path}/phanhoi`}>
                <Phanhoi url={match.url} />
            </Route>
            <Route path ={`${match.path}/phanhoi/suaphanhoi/:id`}>
                <Suaphanhoi url={match.url} />
            </Route>
            <Route exact path ={`${match.path}/bieudo`}>
                <Bieudo url={match.url} />
            </Route>
            <Route exact path ={`${match.path}/chude`}>
                <Chude url={match.url} />
            </Route>
            <Route path={`${match.path}/chude/themchude`}  >
                <Themchude />
            </Route> */}
      {/* <Route path={`${match.path}/chude/suachude/:id`}  >
                <Themchude />
            </Route>
            <Route exact path={`${match.path}/binhluanchude`}  >
                <Binhluanchude url={match.url} />
            </Route> */}
    </div>
  );
  const menu_quanlytour = (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item
        key="1"
        icon={
          state.collapsed === true ? (
            <span className="fas fa-tachometer-alt"></span>
          ) : (
            <span className="fas fa-tachometer-alt mr-2"></span>
          )
        }
      >
        <Link to="/admin">Doanh thu</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={
          state.collapsed === true ? (
            <span className="fas fa-luggage-cart"></span>
          ) : (
            <span className="fas fa-luggage-cart mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/tour`}>Qu???n l?? tour</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={
          state.collapsed === true ? (
            <span className="fas fa-flag-usa"></span>
          ) : (
            <span className="fas fa-flag-usa mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/quocgia`}>Qu???n l?? qu???c gia</Link>
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={
          state.collapsed === true ? (
            <span className="fas fa-atlas"></span>
          ) : (
            <span className="fas fa-atlas mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/loaitour`}>Qu???n l?? lo???i tour</Link>
      </Menu.Item>
      <Menu.Item
        key="5"
        icon={
          state.collapsed === true ? (
            <span className="fas fa-place-of-worship"></span>
          ) : (
            <span className="fas fa-place-of-worship mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/diadiem`}>Qu???n l?? ?????a ??i???m</Link>
      </Menu.Item>
    </Menu>
  );
  const menu_quanlyadmin = (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      {/* <Menu.Item key="1" icon={state.collapsed === true ? <span className="fas fa-tachometer-alt" ></span> : <span className="fas fa-tachometer-alt mr-2"></span>}>
                <Link to="/admin">Doanh thu</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={state.collapsed === true ? <span className="fas fa-luggage-cart" ></span> : <span className="fas fa-luggage-cart mr-2"></span>}>
                <Link to={`${match.url}/tour`}>Qu???n l?? tour</Link>
            </Menu.Item> */}
      <Menu.Item
        key="3"
        icon={
          state.collapsed === true ? (
            <span className="fas fa-users"></span>
          ) : (
            <span className="fas fa-users mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/taikhoan`}>Qu???n l?? t??i kho???n</Link>
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={
          state.collapsed === true ? (
            <span className="far fa-newspaper"></span>
          ) : (
            <span className="far fa-newspaper mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/manage-restaurant`}>Qu???n l?? nh?? h??ng</Link>
      </Menu.Item>
      <Menu.Item
        key="5"
        icon={
          state.collapsed === true ? (
            <span className="far fa-newspaper"></span>
          ) : (
            <span className="far fa-newspaper mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/manage-news`}>Qu???n l?? tin t???c</Link>
      </Menu.Item>
      <Menu.Item
        key="6"
        icon={
          state.collapsed === true ? (
            <span className="far fa-newspaper"></span>
          ) : (
            <span className="far fa-newspaper mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/food-type`}>Qu???n l?? lo???i th???c ??n </Link>
      </Menu.Item>
      <Menu.Item
        key="7"
        icon={
          state.collapsed === true ? (
            <span className="far fa-newspaper"></span>
          ) : (
            <span className="far fa-newspaper mr-2"></span>
          )
        }
      >
        <Link to={`${match.url}/cities`}>Qu???n l?? th??nh ph???</Link>
      </Menu.Item>
      {/* <Menu.Item key="5" icon={state.collapsed === true ? <span className="fas fa-flag-usa" ></span> : <span className="fas fa-flag-usa mr-2"></span>}>
                <Link to={`${match.url}/quocgia`}>Qu???n l?? qu???c gia</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={state.collapsed === true ? <span className="fas fa-atlas" ></span> : <span className="fas fa-atlas mr-2"></span>}>
                <Link to={`${match.url}/loaitour`}>Qu???n l?? lo???i tour</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={state.collapsed === true ? <span className="fas fa-place-of-worship" ></span> : <span className="fas fa-place-of-worship mr-2"></span>}>
                <Link to={`${match.url}/diadiem`}>Qu???n l?? ?????a ??i???m</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={state.collapsed === true ? <span className="fas fa-comments" ></span> : <span className="fas fa-comments mr-2"></span>}>
                <Link to={`${match.url}/binhluan`}>Qu???n l?? b??nh lu???n</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={state.collapsed === true ? <span className="fas fa-images" ></span> : <span className="fas fa-images mr-2"></span>}>
                <Link to={`${match.url}/anh`}>Qu???n l?? ???nh</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={state.collapsed === true ? <span className="fab fa-phoenix-framework" ></span> : <span className="fab fa-phoenix-framework mr-2"></span>}>
                <Link to={`${match.url}/dichvu`}>Qu???n l?? d???ch v???</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={state.collapsed === true ? <span className="fas fa-file-alt" ></span> : <span className="fas fa-file-alt mr-2"></span>}>
                <Link to={`${match.url}/hoadon`}>Qu???n l?? ho?? ????n</Link>
            </Menu.Item>
            <Menu.Item key="12" icon={state.collapsed === true ? <span className="fas fa-user-tag" ></span> : <span className="fas fa-user-tag mr-2"></span>}>
                <Link to={`${match.url}/role`}>Qu???n l?? ph??n quy???n</Link>
            </Menu.Item>
            <Menu.Item key="13" icon={state.collapsed === true ? <span className="fas fa-clock" ></span> : <span className="fas fa-clock mr-2"></span>}>
                <Link to={`${match.url}/ngaydi`}>Qu???n l?? Ng??y ??i</Link>
            </Menu.Item>
            <Menu.Item key="14" icon={state.collapsed === true ? <span className="fas fa-check-double"></span> : <span className="fas fa-check-double"></span>}>
                <Link to={`${match.url}/kiemduyet`}>Ki???m duy???t tour {counthoadon === 0 ? "" : <Badge status="error" />}</Link>
            </Menu.Item>
            <Menu.Item key="15" icon={state.collapsed === true ? <span className="fas fa-file-invoice-dollar"></span> : <span className="fas fa-file-invoice-dollar"></span>}>
                <Link to={`${match.url}/hoadoncanhan`}>Ho?? ????n t???o tour</Link>
            </Menu.Item>
            <Menu.Item key="16" icon={state.collapsed === true ? <span className="fas fa-comments"></span> : <span className="fas fa-comments"></span>}>
                <Link to={`${match.url}/phanhoi`}>Qu???n l?? ph???n h???i tour</Link>
            </Menu.Item>
            <Menu.Item key="17" icon={state.collapsed === true ? <span className="fas fa-chart-bar"></span> : <span className="fas fa-chart-bar"></span>}>
                <Link to={`${match.url}/bieudo`}>Bi???u ?????</Link>
            </Menu.Item>
            <Menu.Item key="18" icon={state.collapsed === true ? <span className="fa fa-list-alt"></span> : <span className="fa fa-list-alt"></span>}>
                <Link to={`${match.url}/chude`}>Ch??? ?????</Link>
            </Menu.Item>
            <Menu.Item key="19" icon={state.collapsed === true ? <span className="fa fa-list-alt"></span> : <span className="fa fa-list-alt"></span>}>
                <Link to={`${match.url}/binhluanchude`}>B??nh lu???n ch??? ?????</Link>
            </Menu.Item> */}
    </Menu>
  );
  const Menu_Authentication = (role) => {
    switch (role) {
      case "admin":
        return menu_quanlyadmin;
        break;
      case "qu???n l?? tour":
        return menu_quanlytour;
        break;
      default:
        break;
    }
  };
  const Authentication = (role) => {
    switch (role) {
      case "admin":
        return admin;
      case "qu???n l?? tour":
        return quanlytour;
      default:
        break;
    }
  };
  return (
    <div id="nav">
      <Layout>
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
          <div className="logo">
            <Link to="/">
              <p className="text-center w-100">
                {state.collapsed === true ? (
                  <i className="fas fa-user-shield"></i>
                ) : (
                  <strong>Administration</strong>
                )}
              </p>
            </Link>
          </div>
          {user ? Menu_Authentication(user.role) : ""}
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Headers />
            {React.createElement(
              state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>{user ? Authentication(user.role) : ""}</Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
