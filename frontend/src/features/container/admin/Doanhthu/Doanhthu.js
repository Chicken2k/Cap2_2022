import React, { useEffect, useState } from 'react'
import { Modal, Progress } from 'antd'
import { Button } from '@material-ui/core';
import './doanhthu.css'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { userData } from '../taikhoan/taikhoanSlice';


export default function Doanhthu() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [usd, setusd] = useState(1);
    const [usd, setusd] = useState(23060);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(userData()) }


 
    useEffect(() => {
        // Axios.get("https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=6c24709f2cfc058a0499").then(data => {
        //     setusd(data.data.USD_VND)
        // })
        actionResult();
      
    },[])
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const SoNguoiDung = useSelector(state => state.taikhoan.user.data);
    const HoaDon = useSelector(state => state.hoadons.hoadon.data);
    let HoaDonDate = []
    if (HoaDon) {
        for (let i = 0; i < HoaDon.length; i++) {
            let date = new Date(HoaDon[i].createdAt);
            HoaDonDate.push({ id: HoaDon[i].id, tongtien: HoaDon[i].thanhtien, date: (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getFullYear() })
        }
    }
    let ThuNhapHomNay = 0;
    if (HoaDonDate) {
        let date = new Date();
        let dateToday = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getFullYear();
        for (let i = 0; i < HoaDonDate.length; i++) {
            if (HoaDonDate[i].date == dateToday) {
                ThuNhapHomNay += HoaDonDate[i].tongtien;
            }
        }
    }
    let ThuNhapThang = 0;
    if (HoaDonDate) {
        let date = new Date();
        let dateMonth = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getFullYear();
        for (let i = 0; i < HoaDonDate.length; i++) {
            if ((HoaDonDate[i].date).substr(3) == dateMonth) {
                ThuNhapThang += HoaDonDate[i].tongtien;
            }
        }
    }
    let ThuNhapNam = 0;
    if (HoaDonDate) {
        let date = new Date();
        let dateYear = date.getFullYear();
        for (let i = 0; i < HoaDonDate.length; i++) {
            if ((HoaDonDate[i].date).substr(6) == dateYear) {
                ThuNhapNam += HoaDonDate[i].tongtien;
            }
        }
    }
    let TongThuNhap = 0;
    if (HoaDon) {
        for (let i = 0; i < HoaDon.length; i++) {
            TongThuNhap += HoaDon[i].thanhtien;
        }
    }
    console.log(usd);
    const LoiNhuan = (a) => {
        return (a).toLocaleString();
    }

    let thunhap = Number((TongThuNhap / usd).toFixed(0));
    return (
        <div id="doanhthu">
            <h4>Doanh thu công ty</h4>
            <div className="row">
                <div className="col-md">
                    <div className="float-left mr-2">
                        <div className="icon">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                    <div className="monney">
                        <span><strong>$ {TongThuNhap ? thunhap.toLocaleString() : 0}</strong></span><br />
                        <span>Tổng thu nhập</span>
                    </div>
                </div>

                <div className="col-md">
                    <div className="float-right mr-2">
                        <div className="icon">
                            <i className="fas fa-money-bill-alt"></i>
                        </div>
                    </div>
                    <div className="monney float-right">
                        <span><strong>$ {LoiNhuan(((TongThuNhap / usd)-150).toFixed(0))}</strong></span><br />
                        <span>Lợi nhuận</span>
                    </div>
                </div>
                <div className="col-md">
                    <div className="float-left mr-2">
                        <div className="icon">
                            <i className="fas fa-users"></i>
                        </div>
                    </div>
                    <div className="monney">
                        <span><strong>{SoNguoiDung ? SoNguoiDung.length : 0}</strong></span><br />
                        <span>Tổng người dùng</span>
                    </div>
                </div>
            </div>
            <h4 className="mt-4 mb-2">Doanh thu</h4>
            <div className="container text-center">
                <div className="row pt-3 pb-2">
                    <div className="col-md-4">
                        <Progress strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} type="dashboard" percent={100} />

                        <div>
                            <h5>Doanh thu ngày</h5>
                            <div className="hr"></div>
                            <div className="mt-2">
                                <span>Tổng thu: <span className="gold">{ThuNhapHomNay.toLocaleString()} <span className="text-danger bold">vnđ</span></span></span><br />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <Progress strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} type="dashboard" percent={100} />

                        <div>
                            <h5>Doanh thu tháng</h5>
                            <div className="hr"></div>
                            <div className="mt-2">
                                <span>Tổng thu: <span className="gold">{ThuNhapThang.toLocaleString()} <span className="text-danger bold">vnđ</span></span></span><br />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Progress strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} type="dashboard" percent={100} />

                        <div>
                            <h5>Doanh thu năm</h5>
                            <div className="hr"></div>
                            <div className="mt-2">
                                <span>Tổng thu: <span className="gold">{ThuNhapNam.toLocaleString()} <span className="text-danger bold">vnđ</span></span></span><br />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}