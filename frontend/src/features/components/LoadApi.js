import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { anhData } from "../container/admin/Anh/anhSlice";
import { binhluanData } from "../container/admin/Binhluan/binhluanSlice";
import { binhluanchudeData } from "../container/admin/Binhluanchude/binhluanchudeSlice";
import { chudeData } from "../container/admin/Chude/chudeSlice";
import { diadiemData } from "../container/admin/DiaDiem/diadiemSlice";
import { dichvuData } from "../container/admin/Dichvu/dichvuSlice";
import { hoadonData } from "../container/admin/Hoadon/hoadonSlice";
import { loaitourData } from "../container/admin/Loaitour/loaitourSlice";
import { ngaydiData } from "../container/admin/Ngaydi/ngaydiSlice";
import { phanhoiData } from "../container/admin/Phanhoi/phanhoiSlice";
import { quocgiaData } from "../container/admin/Quocgia/quocgiaSlice";
import { roleData } from "../container/admin/Role/roleSlice";
import { tagData } from "../container/admin/Tag/tagSlice";
import { userData } from "../container/admin/taikhoan/taikhoanSlice";
import { tintucData } from "../container/admin/tintuc/tintucSlice";
import { tourData } from "../container/admin/Tour/tourSlice";
import { nhahangData } from "../container/trangchu/nhahang/nhahangSlice";

export default function LoadApi() {
  const dispatch = useDispatch();
  const actionquocgia = async () => {
    await dispatch(quocgiaData());
  };
  const actionnhahang = async () => {
    await dispatch(nhahangData());
  };
  const actionloaitour = async () => {
    await dispatch(loaitourData());
  };
  const actionuser = async () => {
    await dispatch(userData());
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
  const actiontintuc = async () => {
    await dispatch(tintucData());
  };
  const actiontag = async () => {
    await dispatch(tagData());
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
  useEffect(() => {
    actionquocgia();
    actionloaitour();
    actionuser();
    actiondiadiem();
    actionanh();
    actiondichvu();
    actionrole();
    actionngaydi();
    actiontour();
    actionbinhluan();
    actionhoadon();
    actiontintuc();
    actiontag();
    actionphanhoi();
    actionchude();
    actionbinhluanchude();
    actionnhahang();
  }, []);
}
