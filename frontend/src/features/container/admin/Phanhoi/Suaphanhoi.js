import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { phanhoiData, updatephanhoi } from './phanhoiSlice';

function Suaphanhoi() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ analyzeComment: '', responseComment: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(phanhoiData()) }
    const history = useHistory()
    const phanhoi = useSelector(state => state.phanhois.phanhoi.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                analyzeComment: phanhoi.analyzeComment,
                responseComment: phanhoi.responseComment,
                idsua: id
            })
        }
    }, [])
    const { analyzeComment, responseComment } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (analyzeComment.trim() === '' || responseComment.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatephanhoi(state));
            } else {
                return;
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/phanhoi");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{"Sửa phản hồi cho bình luận"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Loại phân tích phản hồi</label>
                        <input type="text" name="analyzeComment" value={analyzeComment} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Trả lời phần phản hồi</label>
                        <input type="text" name="responseComment" value={responseComment} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{"Sửa phản hồi cho bình luận"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Suaphanhoi.propTypes = {

}

export default Suaphanhoi