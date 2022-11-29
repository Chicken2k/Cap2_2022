import { Button, Rate, Select, Space, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./nhahang.css";
function NhaHang(props) {
  // const dispatch = useDispatch();
  // const actionResult = async () => {
  //   await dispatch(nhahangData());
  // };
  // useEffect(() => {
  //   actionResult();
  // }, []);
  const restaurant = useSelector((state) => state.nhahangs?.nhahangs);
  let restaurants;
  if (restaurant) restaurants = restaurant.data;
  console.log(restaurants);
  // const restaurants = [
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  //   {
  //     name: "Hùng Xiệc",
  //     id: 1,
  //     address: "25 Nguyễn Chí Thanh",
  //     image:
  //       "https://pasgo.vn/Upload/anh-diem-den/king-fe-buffet-nuong-lau-linh-nam-300-193566244408.jpg",
  //   },
  // ];

  console.log(restaurants);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="mt-5 mb-5 tour " id="tour">
      <div className="heading text-center">
        <span>Nhà hàng thành phố đà nẵng</span>
        <div className="hr"></div>
        <p className="mb-4 mt-2">Món ăn Việt - Yêu thương quay về</p>
      </div>
      <div className="filter-search-container">
        <Space Wrap>
          <div className="col1">
            <span>Khu vực</span>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "disabled",
                  disabled: true,
                  label: "Disabled",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
          <div className="col1">
            <span>Loại thức ăn</span>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "disabled",
                  disabled: true,
                  label: "Disabled",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
          <Button type="primary">Tìm kiếm</Button>
        </Space>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {!restaurants.length ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            restaurants.slice(0, 6).map((ok) => (
              <div className="col-md-4 mb-2" key={ok.id}>
                <Link to={`/detail-restaurant/${ok.id}`}>
                  <div className="img rounded">
                    <img src={ok.image} className="img-fluid " alt="" />
                  </div>
                  <div className="content_tour">
                    <div className="title_tour text-capitalize">{ok.name}</div>
                    <div className="title_address text-capitalize">
                      {ok.address}
                    </div>
                    <div className="star float-left">
                      <Rate value="5" disabled />
                    </div>
                    {/* <div className="money float-left ml-3 text-warning">
                    {
                      <div>
                        {ok.gianguoilon.toLocaleString()} VNĐ
                        <br />
                      </div>
                    }
                  </div> */}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

NhaHang.propTypes = {};

export default NhaHang;
