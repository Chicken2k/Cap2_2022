import { Button } from "@material-ui/core";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addcity, cityData, updatecity } from "./citySlice";

function Themcity(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({ name: "", idsua: "" });
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const actionResult = async () => {
    await dispatch(cityData());
  };
  const history = useHistory();
  const foods = useSelector((state) =>
    state.foods.food.data.find((x) => x.id === +id)
  );
  useEffect(() => {
    if (id) {
      setState({
        name: foods.food,
        idsua: id,
      });
    }
  }, []);
  const { name } = state;
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      message.error("Xin hãy nhập đầy đủ thông tin!");
    } else {
      if (id) {
        dispatch(updatecity(state));
      } else {
        const action = addcity(state);
        dispatch(action);
      }
      setTimeout(() => {
        actionResult();
      }, 700);
      history.push("/admin/cities");
    }
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>{id ? "Sửa khu vực" : "Thêm khu vực"}</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tên khu vực</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="text-center mtb">
            <Button type="submit" color="primary" variant="contained">
              {id ? "Sửa khu vực" : "Thêm khu vực"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Themcity.propTypes = {};

export default Themcity;
