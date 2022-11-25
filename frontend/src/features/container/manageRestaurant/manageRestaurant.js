import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../trangchu/footer/Footer'
import './manageRestaurant.css'
import { useSelector } from 'react-redux';
import "./checkactive.js";
import restaurantApi from '../../../api/restaurantApi';
export default function Listtour() {
    const [ restaurants, setRestaurant ] = useState([]);

    const getRestaurants = async() => {
        const userId = localStorage.getItem('userId');
        const listRestaurant = await restaurantApi.getAll(userId);
        if (listRestaurant !== undefined) {
            setRestaurant(listRestaurant.data);
        }
    }

    useEffect(() => {
        //0getRestaurants();

    });
    //const tours = useSelector(state => state.tours.tour.data);
    // const [state, setState] = useState({
    //     check: "trong",
    //     statetrongnuoc: "",
    //     statenuocngoai: ""
    // })

    // const formatdate = e => {
    //     if (e) {
    //         var ngay = e.substr(0, 2)
    //         var thang = e.substr(3, 2)
    //         var nam = e.substr(6, 4)
    //         return nam + '-' + thang + '-' + ngay;
    //     }
    // }
    // const maxDate = e => {
    //     if (e) {
    //         var ngayMax = formatdate(e[0].ngay)
    //         for (let i = 0; i < e.length; i++) {
    //             if (ngayMax <= formatdate(e[i].ngay)) {
    //                 ngayMax = formatdate(e[i].ngay)
    //             }
    //         }
    //         return ngayMax
    //     }
    // }
    // var tourtrongnuoc = []
    // if (tours) {
    //     var sort = []
    //     for (let i = 0; i < tours.length; i++) {
    //         sort.unshift(tours[i])
    //     }
    //     var date = new Date();
    //     var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
    //     for (let i = 0; i < sort.length; i++) {
    //         if (sort[i].status === 1 && sort[i].vitri === 1 && maxDate(sort[i].Ngaydis) >= today) {
    //             tourtrongnuoc.push(sort[i])
    //         }
    //     }
    // }
    // var tournuocngoai = []
    // if (tours) {
    //     var sort = []
    //     for (let i = 0; i < tours.length; i++) {
    //         sort.unshift(tours[i])
    //     }
    //     var date = new Date();
    //     var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
    //     for (let i = 0; i < sort.length; i++) {
    //         if (sort[i].status === 1 && sort[i].vitri === 2 && maxDate(sort[i].Ngaydis) >= today) {
    //             tournuocngoai.push(sort[i])
    //         }
    //     }
    // }
    // useEffect(() => {
    //     //actionNgaydi();
    //     window.scrollTo(0, 0);
    // }, [])

    // const handleChange = (value) => {
    //     setState({
    //         ...state,
    //         check: value
    //     })
    // }
    // const search = e => {
    //     const { check } = state
    //     if (check === "trong") {
    //         var tourtrongnuoc = []
    //         if (tours) {
    //             var sort = []
    //             for (let i = 0; i < tours.length; i++) {
    //                 sort.unshift(tours[i])
    //             }
    //             console.log(sort);
    //             var date = new Date();
    //             var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
    //             for (let i = 0; i < sort.length; i++) {
    //                 if (sort[i].status === 1 && sort[i].vitri === 1 && (sort[i].name).toLowerCase().search(e) === 0 && maxDate(sort[i].Ngaydis) >= today) {
    //                     tourtrongnuoc.push(sort[i])
    //                 }
    //             }
    //             console.log(tourtrongnuoc);
    //         }
    //         setState({
    //             ...state,
    //             statetrongnuoc: tourtrongnuoc
    //         })
    //     } else {
    //         var tournuocngoai = []
    //         if (tours) {
    //             var sort = []
    //             for (let i = 0; i < tours.length; i++) {
    //                 sort.unshift(tours[i])
    //             }
    //             var date = new Date();
    //             var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
    //             for (let i = 0; i < sort.length; i++) {
    //                 if (sort[i].status === 1 && sort[i].vitri === 2 && (sort[i].name).toLowerCase().search(e) === 0 && maxDate(sort[i].Ngaydis) >= today) {
    //                     tournuocngoai.push(sort[i])
    //                 }
    //             }
    //         }
    //         setState({
    //             ...state,
    //             statenuocngoai: tournuocngoai
    //         })
    //     }
    // }
    return (
        <div id="list-tour">
            <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/list-tour" disabled>Thông tin nhà hàng</Link></li>
                    </ol>
                </nav>
            </div>
            <div className="container">
                {restaurants.length === 0 ? (
                    <div>
                        <p className='message'>Bạn chưa có nhà hàng nào</p>
                        <button>Thêm nhà hàng</button>
                    </div>
                ) : (
                    <div>Nhà hàng của bạn nè</div> 
                )}
                
            </div>
            <Footer />
        </div>
    )
}
