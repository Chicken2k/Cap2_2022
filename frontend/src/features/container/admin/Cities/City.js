import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Popconfirm, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { cityData, removecity } from "./citySlice";
function City() {
  const columns = [
    {
      title: "Tên thành phố",
      dataIndex: "city",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const hangdleDelete = (e) => {
    dispatch(removecity(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const history = useHistory();
  const match = useRouteMatch();
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/edit/${id}`);
  };
  const cities = useSelector((state) => state.cities.city.data);
  const loading = useSelector((state) => state.cities.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(cityData());
  };

  return (
    <div id="admin">
      <div className="heading">
        <h4>Quản lý khu vực thành phố </h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/add`}>
            <Button variant="outlined" color="secondary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={cities?.map((ok, index) => ({
              key: index + 1,
              city: <span>{ok.name}</span>,
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      hangdleEdit(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                  >
                    <i className="far fa-edit mr-4"></i>
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <i className="far fa-trash-alt"></i>
                  </Popconfirm>
                </div>
              ),
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default City;
