import React, { useEffect,useState } from "react";
import '../../index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Login from "../container/dangnhap/Dangnhap";
import Dangky from '../container/dangky/Dangky'
import Trangchu from './Trangchu'
import Admin from './Admin'
import Menu from "../container/trangchu/menu/Menu";
import Menu2 from "../container/trangchu/menu/Menu2";
import Listtour from "../container/Listtour/Listtour";
import Tour from "../container/detailtour/tour/Tour";

import { quocgiaData } from "../container/admin/Quocgia/quocgiaSlice";
import { loaitourData } from "../container/admin/Loaitour/loaitourSlice";
import { diadiemData } from "../container/admin/DiaDiem/diadiemSlice";
import { anhData } from "../container/admin/Anh/anhSlice";
import { dichvuData } from "../container/admin/Dichvu/dichvuSlice";
import { roleData } from "../container/admin/Role/roleSlice";
import { ngaydiData } from "../container/admin/Ngaydi/ngaydiSlice";
import { tourData } from "../container/admin/Tour/tourSlice";
import { inforData } from "../container/dangnhap/dangnhapSlice";

import { hoadonData } from "../container/admin/Hoadon/hoadonSlice";
import { binhluanData } from "../container/admin/Binhluan/binhluanSlice";
import Listtintuc from "../container/tintuc/listtintuc/Listtintuc";
import Tintucdetail from "../container/tintuc/tintucdetail/Tintucdetail";
import { tagData } from "../container/admin/Tag/tagSlice";
import { tintucData } from "../container/admin/tintuc/tintucSlice";
import { thongbaoData } from "../container/admin/Kiemduyet/thongbaoSlice";
import Thongtin from "../container/trangchu/thongtin/Thongtin";
import { phanhoiData } from "../container/admin/Phanhoi/phanhoiSlice";
import { chudeData } from "../container/admin/Chude/chudeSlice";
import { binhluanchudeData } from "../container/admin/Binhluanchude/binhluanchudeSlice";


import Stripe from "../teststripe/Stripe";

export default function NestingExample() {
  const dispatch = useDispatch();
  const actionquocgia = async () => { await dispatch(quocgiaData()) }
  const actionloaitour = async () => { await dispatch(loaitourData()) }
  const actiondiadiem = async () => { await dispatch(diadiemData()) }
  const actionanh = async () => { await dispatch(anhData()) }
  const actiondichvu = async () => { await dispatch(dichvuData()) }
  const actionrole = async () => { await dispatch(roleData()) }
  const actionngaydi = async () => { await dispatch(ngaydiData()) }
  const actiontour = async () => { await dispatch(tourData()) }
  const actionbinhluan = async () => { await dispatch(binhluanData()) }
  const actionhoadon = async () => { await dispatch(hoadonData()) }
  const actioninfor = async () => { await dispatch(inforData()) }
  const actiontag = async () => { await dispatch(tagData()) }
  const actiontintuc = async () => { await dispatch(tintucData()) }
  const actionthongbao = async () => { await dispatch(thongbaoData()) }
  const actionphanhoi = async () => { await dispatch(phanhoiData()) }
  const actionchude = async () => { await dispatch(chudeData()) }
  const actionbinhluanchude = async () => { await dispatch(binhluanchudeData()) }

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
    actionbinhluanchude();
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
          <Route path="/list-tour/:id">
            <Listtour />
          </Route>
          <Route path="/list-tour">
            <Listtour />
          </Route>
          <Route path="/tour/:id">
            <Tour />
          </Route>
          <Route path="/listtintuc">
            <Listtintuc />
          </Route>
          <Route path="/detail-new/:id">
            <Tintucdetail />
          </Route>
          <Route path="/thongtin/:id">
            <Thongtin />
          </Route>
          <Route path='/stripe'>
            <Stripe />
          </Route>
        </Switch>
      </div>
      
    </Router>
    
    
  );
}

function Ldangnhap() {
  let { url } = useRouteMatch();
  return (
    <Login url={url} />
  );
}

function Ladmin() {
  let { path, url } = useRouteMatch();
  if (localStorage.getItem("token")) {
    return <Admin path={path} url={url} />
  } 
  else{
    return (<div><h1>Có lỗi</h1></div>)
  }
}