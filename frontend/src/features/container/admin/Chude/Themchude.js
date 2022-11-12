import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addchude, chudeData, updatechude } from './chudeSlice';

function Themchude(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ chuDe: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(chudeData()) }
    const history = useHistory()
    const chude = useSelector(state => state.chudes.chude.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                chuDe: chude.chuDe,
                idsua: id
            })
        }
    }, [])
    const { chuDe } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (chuDe.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatechude(state));
            } else {
                const action = addchude(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/chude");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa chủ đề" : "Thêm chủ đề"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên chủ đề</label>
                        <input type="text" name="chuDe" value={chuDe} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa chủ đề" : "Thêm chủ đề"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themchude.propTypes = {

}

export default Themchude