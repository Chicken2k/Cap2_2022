import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "../../index.css";

import DetailRestaurant from "../container/detailRestaurant/detailRestaurant";
import ManageRestaurant from "../container/manageRestaurant/manageRestaurant";

import Dangky from "../container/dangky/Dangky";
import Login from "../container/dangnhap/Dangnhap";
import Tour from "../container/detailtour/tour/Tour";
import Menu from "../container/trangchu/menu/Menu";
import Menu2 from "../container/trangchu/menu/Menu2";
import Admin from "./Admin";
import Trangchu from "./Trangchu";

import { anhData } from "../container/admin/Anh/anhSlice";
import { diadiemData } from "../container/admin/DiaDiem/diadiemSlice";
import { dichvuData } from "../container/admin/Dichvu/dichvuSlice";
import { loaitourData } from "../container/admin/Loaitour/loaitourSlice";
import { ngaydiData } from "../container/admin/Ngaydi/ngaydiSlice";
import { quocgiaData } from "../container/admin/Quocgia/quocgiaSlice";
import { roleData } from "../container/admin/Role/roleSlice";
import { tourData } from "../container/admin/Tour/tourSlice";
import { inforData } from "../container/dangnhap/dangnhapSlice";
import { nhahangData } from "../container/trangchu/nhahang/nhahangSlice";

import { binhluanData } from "../container/admin/Binhluan/binhluanSlice";
import { binhluanchudeData } from "../container/admin/Binhluanchude/binhluanchudeSlice";
import { chudeData } from "../container/admin/Chude/chudeSlice";
import { cityData } from "../container/admin/Cities/citySlice";
import { foodData } from "../container/admin/FoodType/foodSlice";
import { hoadonData } from "../container/admin/Hoadon/hoadonSlice";
import { thongbaoData } from "../container/admin/Kiemduyet/thongbaoSlice";
import { tintucData } from "../container/admin/manageRestaurant/tintucSlice";
import { phanhoiData } from "../container/admin/Phanhoi/phanhoiSlice";
import { tagData } from "../container/admin/Tag/tagSlice";
import Listtintuc from "../container/tintuc/listtintuc/Listtintuc";

import Tintucdetail from "../container/tintuc/tintucdetail/Tintucdetail";
import Thongtin from "../container/trangchu/thongtin/Thongtin";

import { OrderRestaurant } from "../container/listOrderRestaurant/orderRestaurant";

import CardLineChart from "../container/statistical/statistical";
import Stripe from "../teststripe/Stripe";

export default function NestingExample() {
  const dispatch = useDispatch();
  const actionquocgia = async () => {
    await dispatch(quocgiaData());
  };
  const actionloaitour = async () => {
    await dispatch(loaitourData());
  };
  const actionnhahang = async () => {
    await dispatch(nhahangData());
  };
  const actiondiadiem = async () => {
    await dispatch(diadiemData());
  };
  const actionanh = async () => {
    await dispatch(anhData());
  };
  const actiondichvu = async () => {
    await dispatch(dichvuData());
  };
  const actionrole = async () => {
    await dispatch(roleData());
  };
  const actionngaydi = async () => {
    await dispatch(ngaydiData());
  };
  const actiontour = async () => {
    await dispatch(tourData());
  };
  const actionbinhluan = async () => {
    await dispatch(binhluanData());
  };
  const actionhoadon = async () => {
    await dispatch(hoadonData());
  };
  const actioninfor = async () => {
    await dispatch(inforData());
  };
  const actiontag = async () => {
    await dispatch(tagData());
  };
  const actiontintuc = async () => {
    await dispatch(tintucData());
  };
  const actionthongbao = async () => {
    await dispatch(thongbaoData());
  };
  const actionphanhoi = async () => {
    await dispatch(phanhoiData());
  };
  const actionchude = async () => {
    await dispatch(chudeData());
  };
  const actionbinhluanchude = async () => {
    await dispatch(binhluanchudeData());
  };
  const actionFoodType = async () => {
    await dispatch(foodData());
  };
  const actionCities = async () => {
    await dispatch(cityData());
  };

  useEffect(() => {
    actionquocgia();
    actionloaitour();
    actiondiadiem();
    actionanh();
    actiondichvu();
    actionrole();
    actionngaydi();
    actiontour();
    actioninfor();
    actionbinhluan();
    actionhoadon();
    actiontintuc();
    actiontag();
    actionthongbao();
    actionphanhoi();
    actionchude();
    actionnhahang();
    actionbinhluanchude();
    actionFoodType();
    actionCities();
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/dangnhap" component="" />
          <Route path="/dangky" component="" />
          <Route path="/admin" component="" />
          <Route exact path="/">
            <Menu />
          </Route>
          <Route path="/">
            <Menu2 />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Trangchu />
          </Route>
          <Route path="/admin">
            <Ladmin />
          </Route>
          <Route path="/dangnhap">
            <Ldangnhap />
          </Route>
          <Route path="/dangky">
            <Dangky />
          </Route>
          {/* <Route path="/list-tour/:id">
            <ManageRestaurant />
          </Route> */}
          <Route path="/restaurant-information">
            <ManageRestaurant />
          </Route>
          <Route path="/detail-restaurant">
            <DetailRestaurant />
          </Route>
          <Route path="/tour/:id">
            <Tour />
          </Route>
          <Route path="/statistical">
            <CardLineChart />
          </Route>
          <Route path="/detail-new/:id">
            <Tintucdetail />
          </Route>
          <Route path="/thongtin/:id">
            <Thongtin />
          </Route>
          <Route path="/stripe">
            <Stripe />
          </Route>
          <Router path="/list-order-restaurant">
            <OrderRestaurant />
          </Router>
          <Router path="/news/detail/:id">
            <Tintucdetail />
          </Router>
          <Router path="/news">
            <Listtintuc />
          </Router>
        </Switch>
      </div>
    </Router>
  );
}

function Ldangnhap() {
  let { url } = useRouteMatch();
  return <Login url={url} />;
}

function Ladmin() {
  let { path, url } = useRouteMatch();
  if (localStorage.getItem("token")) {
    return <Admin path={path} url={url} />;
  } else {
    return (
      <div>
        <h1>Có lỗi</h1>
      </div>
    );
  }
}
