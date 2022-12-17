import { Button } from "@material-ui/core";
import { message } from "antd";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import cloudinaryUpload from "../../../../api/cloudinaryApi";
import newsApi from "../../../../api/news";
import { tintucData } from "./tintucSlice";
function Themtintuc(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const actionResult = async () => {
    await dispatch(tintucData());
  };

  const [selectedFile, setSelectedFile] = useState();
  const [state, setState] = useState({
    load: false,
    name: "",
    idsua: "",
    status: 1,
  });
  const [content, setcontent] = useState("");

  const changeHandlerFile = async (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(async () => {
    actionResult();
    // if (id) {
    //   setState({
    //     status: tintuc.status,
    //     name: tintuc.name,
    //     tenanh: tintuc.tenanh,
    //     // facebook: tintuc.facebook,
    //     // twitch: tintuc.twitch,
    //     anh: tintuc.anh,
    //     // instagram: tintuc.instagram,
    //     tomtat: tintuc.tomtat,
    //     tacgia: tintuc.tacgia,
    //     idsua: id,
    //   });
    //   setcontent(tintuc.content);
    // }
  }, []);
  const equar = (a, b) => {
    if (a.length !== b.length) {
      return false;
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
  };
  const {
    load,
    tenanh,
    linkImg,
    img,
    name,
    tacgia,
    anh,
    idsua,
    status,
    tomtat,
  } = state;
  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, load: true });
    if (name.trim() === "" || content.trim() === "") {
      message.error("Xin hãy nhập đầy đủ thông tin!");
    } else {
      if (id) {
        console.log("Sửa News");
      } else {
        if (!props.restaurantId) message.error("Chưa chọn nhà hàng");
        else {
          let formData = new FormData();
          formData.append("image", selectedFile);
          const secure_url = await cloudinaryUpload(formData);
          const url_image = secure_url?.secure_url;
          const data = await newsApi.createNews({
            name,
            content,
            restaurantId: props.restaurantId,
            userId: Number(props.userId),
            image: url_image,
          });
          if (data) setState({ ...state, load: false });
          message.success("Thêm tin tức thành công, hãy chờ được duyệt");
          setState({ ...state, name: "" });
          setcontent("");
        }
      }
      history.push("/news");
    }
  };
  const data = [];

  //   const tintuc = useSelector((state) =>
  //     state.tintucs.tintuc.data.find((x) => x.id === +id)
  //   );
  // const tintucs = useSelector(state => state.tintucs.tintuc.data)
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (value) => {
    setState({
      ...state,
      tag_id: value,
    });
  };
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Thêm tin tức</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tiêu đề bài viết</label>
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

          <div className="form-group">
            <label htmlFor="">Nội dung</label>
            <JoditEditor
              value={content}
              tabIndex={1}
              onChange={(e) => setcontent(e)}
            />
          </div>
          <div class="form-group">
            <label for="formFileMultiple" class="form-label">
              Chọn ảnh nhà hàng
            </label>
            <input
              class="
                block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
              name="files"
              type="file"
              id="formFileMultiple"
              onChange={changeHandlerFile}
              multiple
            />
          </div>
          <div className="text-center mtb">
            {load ? (
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              ""
            )}
            <Button type="submit" variant="contained" color="primary">
              {id ? "Sửa tin tức" : "Thêm tin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Themtintuc.propTypes = {};

export default Themtintuc;
