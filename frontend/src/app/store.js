import { configureStore } from "@reduxjs/toolkit";
import anhReducer from "../features/container/admin/Anh/anhSlice";
import binhluanReducer from "../features/container/admin/Binhluan/binhluanSlice";
import diadiemReducer from "../features/container/admin/DiaDiem/diadiemSlice";
import dichvuReducer from "../features/container/admin/Dichvu/dichvuSlice";
import userroleReducer from "../features/container/admin/header/userroleSlice";
import hoadonReducer from "../features/container/admin/Hoadon/hoadonSlice";
import loaitourReducer from "../features/container/admin/Loaitour/loaitourSlice";
import ngaydiReducer from "../features/container/admin/Ngaydi/ngaydiSlice";
import quocgiaReducer from "../features/container/admin/Quocgia/quocgiaSlice";
import roleReducer from "../features/container/admin/Role/roleSlice";
import taikhoanReducer from "../features/container/admin/taikhoan/taikhoanSlice";
import tourReducer from "../features/container/admin/Tour/tourSlice";
import inforReducer from "../features/container/dangnhap/dangnhapSlice";
import userReducer from "./userSlice";
//import tintucReducer from "../features/container/admin/ma/tintucSlice"
import tagReducer from "../features/container/admin/Tag/tagSlice";
//import tintuctagReducer from "../features/container/admin/tintuc/tintuctagSlice"
import binhluanchudeReducer from "../features/container/admin/Binhluanchude/binhluanchudeSlice";
import chudeReducer from "../features/container/admin/Chude/chudeSlice";
import cityReducer from "../features/container/admin/Cities/citySlice";
import foodReducer from "../features/container/admin/FoodType/foodSlice";
import hoadoncanhanReducer from "../features/container/admin/Hoadoncanhan/hoadoncanhanSlice";
import thongbaoReducer from "../features/container/admin/Kiemduyet/thongbaoSlice";
import phanhoiReducer from "../features/container/admin/Phanhoi/phanhoiSlice";
import thanhtoanReducer from "../features/container/detailtour/tour/thanhtoanSlice";
import restaurantReducer from "../features/container/manageRestaurant/restaurantSlice";
import nhahangReducer from "../features/container/trangchu/nhahang/nhahangSlice";

const rootReducer = {
  user: userReducer,
  taikhoan: taikhoanReducer,
  quocgias: quocgiaReducer,
  loaitours: loaitourReducer,
  diadiems: diadiemReducer,
  tours: tourReducer,
  anhs: anhReducer,
  dichvus: dichvuReducer,
  roles: roleReducer,
  ngaydis: ngaydiReducer,
  userroles: userroleReducer,
  infor: inforReducer,
  binhluans: binhluanReducer,
  hoadons: hoadonReducer,
  //tintucs: tintucReducer,
  tags: tagReducer,
  //tintuctags: tintuctagReducer,
  thanhtoans: thanhtoanReducer,
  hoadoncanhans: hoadoncanhanReducer,
  thongbao: thongbaoReducer,
  phanhois: phanhoiReducer,
  chudes: chudeReducer,
  binhluanchudes: binhluanchudeReducer,
  restaurants: restaurantReducer,
  nhahangs: nhahangReducer,
  foods: foodReducer,
  cities: cityReducer,
};

export default configureStore({
  reducer: rootReducer,
});
