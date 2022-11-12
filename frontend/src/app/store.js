import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import taikhoanReducer from '../features/container/admin/taikhoan/taikhoanSlice'
import quocgiaReducer from "../features/container/admin/Quocgia/quocgiaSlice"
import loaitourReducer from "../features/container/admin/Loaitour/loaitourSlice"
import diadiemReducer from "../features/container/admin/DiaDiem/diadiemSlice"
import tourReducer from "../features/container/admin/Tour/tourSlice"
import anhReducer from "../features/container/admin/Anh/anhSlice"
import dichvuReducer from "../features/container/admin/Dichvu/dichvuSlice"
import roleReducer from "../features/container/admin/Role/roleSlice";
import ngaydiReducer from "../features/container/admin/Ngaydi/ngaydiSlice"
import userroleReducer from "../features/container/admin/header/userroleSlice"
import inforReducer from "../features/container/dangnhap/dangnhapSlice"
import binhluanReducer from "../features/container/admin/Binhluan/binhluanSlice"
import hoadonReducer from "../features/container/admin/Hoadon/hoadonSlice"
import tintucReducer from "../features/container/admin/tintuc/tintucSlice"
import tagReducer from "../features/container/admin/Tag/tagSlice"
import tintuctagReducer from "../features/container/admin/tintuc/tintuctagSlice"
import thanhtoanReducer from "../features/container/detailtour/tour/thanhtoanSlice"
import thongbaoReducer from "../features/container/admin/Kiemduyet/thongbaoSlice"
import hoadoncanhanReducer from "../features/container/admin/Hoadoncanhan/hoadoncanhanSlice"
import phanhoiReducer from "../features/container/admin/Phanhoi/phanhoiSlice"
import chudeReducer from "../features/container/admin/Chude/chudeSlice"
import binhluanchudeReducer from "../features/container/admin/Binhluanchude/binhluanchudeSlice"

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
  tintucs: tintucReducer,
  tags: tagReducer,
  tintuctags: tintuctagReducer,
  thanhtoans: thanhtoanReducer,
  hoadoncanhans: hoadoncanhanReducer,
  thongbao: thongbaoReducer,
  phanhois: phanhoiReducer,
  chudes: chudeReducer,
  binhluanchudes: binhluanchudeReducer
}

export default configureStore({
  reducer: rootReducer
});
