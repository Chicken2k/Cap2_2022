import React, { useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Popconfirm, Rate, Spin, Table } from 'antd'
import { binhluanchudeData, removebinhluanchude, updatebinhluanchude } from './binhluanchudeSlice';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import "./binhluan.css";
function Binhluanchude() {
    const match = useRouteMatch();
    console.log(match.url);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Bình luận',
            dataIndex: 'binhluan',
        },
        // {
        //     title: 'Phân tích bình luận',
        //     dataIndex: 'analyzeComment',
        // },
        {
            title: 'Đoạn văn trong câu',
            dataIndex: 'binhluancd',
        },
        {
            title: 'Phân tích trong đoạn',
            dataIndex: 'analyzeCmt',
        },
        {
            title: 'Chủ đề',
            dataIndex: 'chude',
        }
    ];
    const binhluanchudes = useSelector(state => state.binhluanchudes.binhluanchude.data);
    const loading = useSelector(state => state.binhluanchudes.loading)
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(binhluanchudeData()) }
    var binhluanchude = [];
    if (binhluanchudes) {
        console.log(binhluanchudes[0])
        for (let i = 0; i < binhluanchudes.length; i++) {
            if (binhluanchudes[i].Binhluan.binhluan.length === 0) {
                binhluanchude.push(binhluanchudes[i])
            } else {
                binhluanchude.unshift(binhluanchudes[i])
            }
        }
    }
    useEffect(() => {
    }, [])
    const history = useHistory()
    const hangdleDelete = e => {
        dispatch(removebinhluanchude(e));
        setTimeout(() => {
            actionResult();
        }, 500);
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>Bình luận theo chủ đề</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                 <Table columns={columns} dataSource={binhluanchude.map((ok, index) => (
                    {
                        key: index + 1,
                        id: index + 1,
                        binhluan: <span>{ok.Binhluan.binhluan}</span>,
                        // analyzeComment: <p className="text-justify"><b>{ok.Binhluan.analyzeComment}</b></p>,
                        binhluancd: <p className="text-justify"><b>{ok.binhluancd}</b></p>,
                        analyzeCmt: <p className="text-justify"><b>{ok.analyzeCmt}</b></p>,
                        chude: <span>{ok.Chude.chuDe}</span>,
                    }))} /> 
                
                }
            </div>

        </div >

    )
}

Binhluanchude.propTypes = {

}

export default Binhluanchude